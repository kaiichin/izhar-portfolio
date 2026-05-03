import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const baseUrl = process.env.PORTFOLIO_BASE_URL ?? "http://127.0.0.1:3000";
const desktopPath = "C:/Users/Lenovo/Documents/New project/portfolio-desktop.png";
const mobilePath = "C:/Users/Lenovo/Documents/New project/portfolio-mobile.png";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function collectMetrics(page) {
  return page.evaluate(() => {
    const bodyText = document.body.innerText;
    const links = Array.from(document.querySelectorAll("a")).map((link) => ({
      text: link.textContent?.trim() ?? "",
      href: link.getAttribute("href")
    }));

    return {
      title: document.title,
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasHorizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth,
      hasName: bodyText.includes("Izhar Octafirlian Susilo"),
      hasHeadline: bodyText.includes("Building") && bodyText.includes("Software") && bodyText.includes("Solves"),
      hasProjects: [
        "ODOL Truck Detection",
        "HomeHeal",
        "The Cabin"
      ].every((project) => bodyText.includes(project)),
      hasHiddenProjectCopy: !bodyText.includes("Zero-DCE Low-Light Enhancement"),
      hasRemovedBrand: !bodyText.includes("Izhar OS"),
      hasProfileImage: Boolean(
        document.querySelector('[aria-label="Portrait of Izhar Octafirlian Susilo"]')
      ),
      bodyBackground: getComputedStyle(document.body).backgroundColor,
      bodyFont: getComputedStyle(document.body).fontFamily,
      links
    };
  });
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1200 },
  deviceScaleFactor: 1
});

await page.goto(baseUrl, { waitUntil: "networkidle" });
const desktop = await collectMetrics(page);
await page.screenshot({ path: desktopPath, fullPage: true });

await page.setViewportSize({ width: 390, height: 1400 });
await page.goto(baseUrl, { waitUntil: "networkidle" });
const mobile = await collectMetrics(page);
await page.screenshot({ path: mobilePath, fullPage: true });

const resumeResponse = await page.request.get(
  `${baseUrl}/resume/Izhar_Octafirlian_Susilo.pdf`
);
await browser.close();

assert(desktop.hasName, "desktop should show full name");
assert(desktop.hasHeadline, "desktop should show the positioning headline");
assert(desktop.hasProjects, "desktop should show featured projects");
assert(desktop.hasHiddenProjectCopy, "desktop should only show the selected three project cards");
assert(desktop.hasRemovedBrand, "desktop should not show Izhar OS brand text");
assert(desktop.hasProfileImage, "desktop should show the profile photo");
assert(desktop.bodyFont.includes("Inter"), "desktop should use the Inter font");
assert(!desktop.hasHorizontalOverflow, "desktop should not horizontally overflow");
assert(mobile.hasRemovedBrand, "mobile should not show Izhar OS brand text");
assert(mobile.hasProfileImage, "mobile should show the profile photo");
assert(!mobile.hasHorizontalOverflow, "mobile should not horizontally overflow");
assert(resumeResponse.status() === 200, "resume PDF should return 200");

console.log(
  JSON.stringify(
    {
      desktop,
      mobile,
      resumeStatus: resumeResponse.status(),
      screenshots: { desktopPath, mobilePath }
    },
    null,
    2
  )
);
