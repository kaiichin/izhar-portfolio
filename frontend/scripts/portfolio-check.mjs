import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const paths = {
  page: join(root, "app", "page.tsx"),
  rootLayout: join(root, "app", "layout.tsx"),
  styles: join(root, "app", "globals.css"),
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
const data = readFileSync(paths.data, "utf8");
const layout = readFileSync(paths.layout, "utf8");
const lanyard = readFileSync(paths.lanyard, "utf8");
const agents = readFileSync(paths.agents, "utf8");

assert(rootLayout.includes("PortfolioLayout"), "Root layout should use the shared layout");
assert(data.includes("Izhar Octafirlian Susilo"), "profile data should contain the full name");
assert(layout.includes("<Lanyard"), "shared layout should render the lanyard");
assert(lanyard.includes("y: -8"), "lanyard should connect above the viewport edge");
assert(lanyard.includes('imageFit === "contain" ? Math.min : Math.max'), "ID images should preserve their aspect ratio");
assert(lanyard.includes('"/profile/izhar.jpeg"'), "ID card should use the profile photo");
const mobileStyles = styles.slice(
  styles.indexOf("@media (max-width: 650px)"),
  styles.indexOf("@media (max-width: 420px)")
);
assert(
  lanyard.includes('className="interactive-lanyard-layer"') &&
    mobileStyles.includes(".interactive-lanyard-layer") &&
    mobileStyles.includes("position: absolute !important;"),
  "mobile lanyard should scroll with the page"
);
assert(agents.includes("run lint/build"), "project verification rules should remain documented");

console.log("Portfolio checks passed.");
