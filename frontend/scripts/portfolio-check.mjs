// Cek cepat: pastikan file penting ada + isi wajib tidak hilang.
// Jalan: npm run test (dari folder frontend/)

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const root = process.cwd();
const paths = {
  page: join(root, "app", "page.tsx"),
  rootLayout: join(root, "app", "layout.tsx"),
  styles: join(root, "app", "globals.css"),
  responsive: join(root, "app", "styles", "responsive.css"),
  data: join(root, "data", "portfolio.ts"),
  layout: join(root, "components", "PortfolioLayout.tsx"),
  lanyard: join(root, "components", "InteractiveLanyard.tsx"),
  agents: join(root, "..", "AGENTS.md"),
  photo: join(root, "public", "profile", "izhar.jpeg"),
  card: join(root, "public", "lanyard", "card.glb"),
  strap: join(root, "public", "lanyard", "lanyard.png"),
  resume: join(root, "public", "resume", "Izhar_Octafirlian_Susilo.pdf"),
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const [name, path] of Object.entries(paths)) {
  assert(existsSync(path), `${name} file should exist`);
}

const rootLayout = readFileSync(paths.rootLayout, "utf8");
const styles = readFileSync(paths.styles, "utf8");
const responsive = readFileSync(paths.responsive, "utf8");
const data = readFileSync(paths.data, "utf8");
const layout = readFileSync(paths.layout, "utf8");
const lanyard = readFileSync(paths.lanyard, "utf8");
const agents = readFileSync(paths.agents, "utf8");

assert(rootLayout.includes("PortfolioLayout"), "Root layout should use the shared layout");
assert(styles.includes("./styles/about.css"), "globals.css should import per-page styles");
assert(data.includes("Izhar Octafirlian Susilo"), "profile data should contain the full name");
assert(!data.includes("Sofware Developer"), "typo 'Sofware' should stay fixed");
assert(layout.includes("<Lanyard"), "shared layout should render the lanyard");
assert(lanyard.includes("y: -8"), "lanyard should connect above the viewport edge");
assert(lanyard.includes('imageFit === "contain" ? Math.min : Math.max'), "ID images should preserve their aspect ratio");
assert(lanyard.includes('"/profile/izhar.jpeg"'), "ID card should use the profile photo");
const mobileStyles = responsive.slice(
  responsive.indexOf("@media (max-width: 650px)"),
  responsive.indexOf("@media (max-width: 420px)")
);
assert(
  lanyard.includes('className="interactive-lanyard-layer"') &&
    mobileStyles.includes(".interactive-lanyard-layer") &&
    mobileStyles.includes("position: absolute !important;"),
  "mobile lanyard should scroll with the page"
);
assert(agents.includes("run lint/build"), "project verification rules should remain documented");

// Evaluate the real data module so asset checks follow edited portfolio entries.
const compiled = ts.transpileModule(data, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const context = { exports: {} };
runInNewContext(compiled, context);
const { profile, projects, certificates, ui } = context.exports;

for (const asset of [
  profile.photoPath,
  profile.logoPath,
  profile.resumePath,
  ...projects.map((project) => project.image).filter(Boolean),
  ...certificates.map((certificate) => certificate.href).filter(Boolean),
]) {
  assert(asset.startsWith("/") && !asset.startsWith("//") && !asset.includes(".."), `Invalid local asset: ${asset}`);
  assert(existsSync(join(root, "public", asset.slice(1))), `Missing portfolio asset: ${asset}`);
}

for (const match of styles.matchAll(/@import\s+["'](.+?)["']/g)) {
  assert(existsSync(join(root, "app", match[1])), `Missing imported stylesheet: ${match[1]}`);
}

assert(ui.contact.copyError.trim(), "Clipboard failures should have a manual-copy message");
assert(ui.about.greetings.length > 0, "About page should have a greeting");

// Catch hardcoded visible JSX text and accessible labels before they spread again.
const uiFiles = [
  "app/page.tsx",
  "app/projects/page.tsx",
  "app/journey/page.tsx",
  "app/certificates/page.tsx",
  "app/contact/page.tsx",
  "components/PortfolioLayout.tsx",
  "components/Navbar.tsx",
  "components/Folder.tsx",
];
for (const file of uiFiles) {
  const source = ts.createSourceFile(file, readFileSync(join(root, file), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  function visit(node) {
    const rawText = ts.isJsxText(node) && node.text.trim();
    const rawLabel = ts.isJsxAttribute(node) &&
      ["aria-label", "alt", "title", "placeholder"].includes(node.name.getText(source)) &&
      node.initializer && ts.isStringLiteral(node.initializer) && node.initializer.text.trim();
    assert(!rawText && !rawLabel, `${file}: Move UI text into data/portfolio.ts: ${rawText || rawLabel}`);
    ts.forEachChild(node, visit);
  }
  visit(source);
}

console.log("Portfolio checks passed.");
