// Browser regression checks using an installed Chromium browser; no extra packages.
// Start the portfolio first, then run: npm run test:browser
// Optional: PORTFOLIO_URL, BROWSER_PATH, PORTFOLIO_SCREENSHOTS (output directory).

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const browserPath = [
  process.env.BROWSER_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
].find((path) => path && existsSync(path));
assert(browserPath, "No installed Chromium browser found. Set BROWSER_PATH; this script never downloads one.");
assert((await fetch(base)).ok, `Start the portfolio server at ${base} before running browser checks.`);

const profile = await mkdtemp(join(process.env.TMPDIR || tmpdir(), "portfolio-browser-"));
const browser = spawn(browserPath, [
  "--headless=new",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--use-angle=swiftshader",
  "--enable-unsafe-swiftshader",
  "about:blank",
], { stdio: "ignore" });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let socket;
const pending = new Map();
let sequence = 0;
const errors = [];

async function waitUntil(check, message, timeout = 15000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    if (await check()) return;
    await sleep(100);
  }
  throw new Error(message);
}

function send(method, params = {}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`CDP command timed out: ${method}`));
    }, 15000);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timer); resolve(value); },
      reject: (error) => { clearTimeout(timer); reject(error); },
    });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  assert(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function navigate(path) {
  await send("Page.navigate", { url: `${base}${path}` });
  await waitUntil(() => evaluate(`location.pathname === ${JSON.stringify(path)} && document.readyState === 'complete' && !!document.querySelector('.content-section')`), `Page did not load: ${path}`);
  await sleep(350);
}

async function capture(name) {
  if (!process.env.PORTFOLIO_SCREENSHOTS) return;
  await mkdir(process.env.PORTFOLIO_SCREENSHOTS, { recursive: true });
  const screenshot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  const path = join(process.env.PORTFOLIO_SCREENSHOTS, `${name}.png`);
  await writeFile(path, Buffer.from(screenshot.data, "base64"));
  console.log(`Screenshot: ${path}`);
}

try {
  let port;
  await waitUntil(async () => {
    try {
      port = (await readFile(join(profile, "DevToolsActivePort"), "utf8")).split("\n")[0];
      return Boolean(port);
    } catch {
      assert(browser.exitCode === null, "Chromium exited before opening its debugging port.");
      return false;
    }
  }, "Chromium debugging port did not open.");
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const target = targets.find((entry) => entry.type === "page");
  assert(target, "Chromium has no page target.");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const request = pending.get(message.id);
      if (request) {
        pending.delete(message.id);
        if (message.error) request.reject(new Error(JSON.stringify(message.error)));
        else request.resolve(message.result);
      }
    }
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
    if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
      errors.push(message.params.args.map((arg) => arg.value || arg.description || "").join(" "));
    }
  });
  await send("Page.enable");
  await send("Runtime.enable");

  for (const [width, height] of [[1440, 1000], [390, 844], [320, 740]]) {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 650 });
    for (const [path, heading] of [["/", "Primary Focus"], ["/projects", "My Projects"], ["/journey", "My Journey"], ["/certificates", "My Certificates"], ["/contact", "Contact"]]) {
      await navigate(path);
      assert(await evaluate(`document.querySelector('.content-section').innerText.includes(${JSON.stringify(heading)})`), `${path}: heading missing`);
      const layout = await evaluate(`(() => {
        const section = document.querySelector('.content-section');
        return {
          viewport: innerWidth,
          page: document.documentElement.scrollWidth,
          sectionWidth: section.clientWidth,
          contentWidth: section.scrollWidth,
          buttons: [...section.querySelectorAll('button, .project-link')].map(el => ({text:el.textContent, width:el.clientWidth, content:el.scrollWidth}))
        };
      })()`);
      assert(layout.page <= width + 1, `${path} at ${width}px: horizontal page overflow ${JSON.stringify(layout)}`);
      if (layout.contentWidth > layout.sectionWidth + 1) {
        console.log("Overflow probe:", await evaluate(`(() => {
          const section = document.querySelector('.content-section');
          const right = section.getBoundingClientRect().right;
          const offenders = [...section.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > right + 1).slice(0, 6).map(el => el.className);
          return {offenders};
        })()`));
        await capture(`overflow-${width}`);
      }
      assert(layout.contentWidth <= layout.sectionWidth + 1, `${path} at ${width}px: section overflow ${JSON.stringify(layout)}`);
      assert(layout.buttons.every((button) => button.content <= button.width + 1), `${path} at ${width}px: button text overflow`);
      if (width >= 650) {
        assert.equal(await evaluate("getComputedStyle(document.querySelector('.portfolio-content')).gridColumnStart"), "2", "Shared content must remain in the second grid column.");
      }
      assert(await evaluate(`(() => {
        const elements = ['.site-logo', '.standalone-nav-dock', '.theme-switch'].map(selector => document.querySelector(selector).getBoundingClientRect());
        const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
        return !elements.some((a, index) => elements.slice(index + 1).some(b => overlaps(a, b)));
      })()`), `${path} at ${width}px: header controls overlap`);
      console.log(`PASS ${width}px ${path}`);
      if (width !== 320 && path === "/contact") {
        if (width < 650) await evaluate("document.querySelector('.content-section').scrollIntoView()");
        assert(await evaluate(`(() => {
          const logo = document.querySelector('.site-logo').getBoundingClientRect();
          const heading = document.querySelector('.content-section h2').getBoundingClientRect();
          return logo.right <= heading.left || logo.left >= heading.right || logo.bottom <= heading.top || logo.top >= heading.bottom;
        })()`), "Logo must not cover the contact heading after scrolling.");
        await capture(`contact-${width}`);
      }
    }
  }

  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await navigate("/contact");
  // Simulate browser clipboard outcomes without changing the system clipboard.
  await evaluate(`Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{writeText:async value => {window.__copiedEmail=value;}}}); document.querySelector('.email-copy-row button').click()`);
  await waitUntil(() => evaluate("document.querySelector('.email-copy-row button').textContent.includes('Copied')"), "Copy success did not render.");
  assert.equal(await evaluate("window.__copiedEmail"), await evaluate("document.querySelector('.email-copy-row > span').textContent"));
  await waitUntil(() => evaluate("document.querySelector('.email-copy-row button').textContent.trim() === 'Copy'"), "Copy success did not reset.");
  console.log("PASS clipboard success and reset");

  for (const clipboard of ["{writeText:async () => {throw new DOMException('Denied', 'NotAllowedError')}}", "undefined"]) {
    await evaluate(`Object.defineProperty(navigator, 'clipboard', {configurable:true, value:${clipboard}}); document.querySelector('.email-copy-row button').click()`);
    await waitUntil(() => evaluate("document.querySelector('.copy-feedback').textContent.includes('Could not copy')"), "Copy failure did not show fallback.");
    assert.equal(await evaluate("getSelection().toString()"), await evaluate("document.querySelector('.email-copy-row > span').textContent"));
  }
  console.log("PASS clipboard denied and unavailable: message and selected email");
  await capture("contact-copy-fallback");

  await evaluate("Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{writeText:async () => {}}}); document.querySelector('.email-copy-row button').click()");
  await waitUntil(() => evaluate("document.querySelector('.email-copy-row button').textContent.includes('Copied')"), "Clipboard retry did not recover.");
  assert.equal(await evaluate("document.querySelector('.copy-feedback').textContent.trim()"), "");
  console.log("PASS clipboard retry recovery");

  await evaluate("document.querySelector('.theme-switch input').click()");
  const theme = await evaluate("document.documentElement.dataset.theme");
  await navigate("/contact");
  assert.equal(await evaluate("document.documentElement.dataset.theme"), theme);
  assert.equal(await evaluate("document.querySelector('.theme-switch input').checked"), theme === "dark");
  await capture("contact-dark");
  console.log("PASS theme persistence");

  await evaluate("document.querySelector('nav a[href=\"/projects\"]').click()");
  await waitUntil(() => evaluate("location.pathname === '/projects' && document.querySelector('.projects-page') !== null"), "Navigation to Projects failed.");
  assert.equal(await evaluate("document.querySelector('nav a[aria-current=page]').getAttribute('href')"), "/projects");
  assert.equal(await evaluate("document.querySelectorAll('.dashboard-project-card').length"), 4);
  console.log("PASS navigation, active page, and project cards");
  assert.deepEqual(errors, [], `Browser errors: ${errors.join("; ")}`);
  console.log("Browser checks passed.");
} finally {
  if (socket?.readyState === WebSocket.OPEN) {
    try { await send("Browser.close"); } catch { /* Chromium may close before replying. */ }
    socket.close();
  }
  if (browser.exitCode === null) {
    await Promise.race([new Promise((resolve) => browser.once("exit", resolve)), sleep(3000)]);
    if (browser.exitCode === null) browser.kill();
  }
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
}
