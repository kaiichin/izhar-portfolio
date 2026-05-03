import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = join(root, "app", "page.tsx");
const agentsPath = join(root, "AGENTS.md");
const resumePath = join(root, "public", "resume", "Izhar_Octafirlian_Susilo.pdf");

const requiredPageSnippets = [
  "Izhar Octafirlian Susilo",
  "Computer Science student",
  "Game Developer",
  "Web Developer",
  "AI/ML Builder",
  "Building <span>Software </span>",
  "including game development, web applications, and machine learning.",
  "ODOL Truck Detection",
  "HomeHeal",
  "The Cabin",
  "github.com/kaiichin",
  "linkedin.com/in/izhar-octafirlian-susilo",
  "mailto:Izharsusilo12@gmail.com",
  "/resume/Izhar_Octafirlian_Susilo.pdf",
  "/profile/izhar.jpeg",
  "Enschede, Netherlands"
];

const requiredAgentsSnippets = [
  "goal / context / constraints / done criteria",
  "professional portfolio quality",
  "internship credibility",
  "run lint/build"
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(pagePath), "app/page.tsx should exist");
assert(existsSync(agentsPath), "AGENTS.md should exist");
assert(existsSync(resumePath), "resume PDF should be copied to public/resume");

const page = readFileSync(pagePath, "utf8");
const agents = readFileSync(agentsPath, "utf8");

for (const snippet of requiredPageSnippets) {
  assert(page.includes(snippet), `app/page.tsx should include: ${snippet}`);
}

assert(!page.includes(">Izhar OS<"), "top navigation should not show Izhar OS brand text");

for (const snippet of requiredAgentsSnippets) {
  assert(agents.includes(snippet), `AGENTS.md should include: ${snippet}`);
}

console.log("Portfolio content checks passed.");
