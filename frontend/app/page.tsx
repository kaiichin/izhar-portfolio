import {
  Bot,
  Boxes,
  Code2,
  Container,
  Database,
  FileCode2,
  Gamepad2,
  GitBranch,
  Github,
  Globe2,
  PanelsTopLeft,
  Puzzle,
  RefreshCw,
  ScanSearch,
  Terminal,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import Reveal from "../components/Reveal";
import TextType from "../components/TextType";
import Folder from "../components/Folder";
import { profile } from "../data/portfolio";

const focusAreas = [
  {
    icon: PanelsTopLeft,
    title: "Web Development",
    text: "Creating clean, responsive websites with modern frontend and backend technologies",
  },
  {
    icon: ScanSearch,
    title: "Machine Learning & Computer Vision",
    text: "Training and evaluating models using data",
  },
  {
    icon: Gamepad2,
    title: "Game Engineering",
    text: "Exploring gameplay programming, game mechanics, and interactive systems using Unity",
  },
  {
    icon: Workflow,
    title: "AI & Automation",
    text: "Learning how AI tools and automation can improve useful products",
  },
];

const highlights = [
  "Built and deployed computer vision applications",
  "Developed web platforms with FastAPI and Laravel",
  "Built a Unity game with an international team",
  "Led student events and earned Best Mentor at BINUS",
];

const languages = [
  { name: "English", level: "Fluent", width: "85%" },
  { name: "Indonesian", level: "Native", width: "100%" },
];

const skills = [
  { name: "React + Next.js", category: "Web", icon: PanelsTopLeft },
  { name: "TypeScript", category: "Language", icon: Code2 },
  { name: "Tailwind CSS", category: "Interface", icon: Sparkles },
  { name: "Unity + C#", category: "Interactive", icon: Boxes },
  { name: "Python", category: "Language", icon: Terminal },
  { name: "SQL", category: "Database", icon: Database },
  { name: "JavaScript", category: "Language", icon: FileCode2 },
  { name: "HTML + CSS", category: "Frontend", icon: Globe2 },
  { name: "Git", category: "Versioning", icon: GitBranch },
  { name: "GitHub", category: "Versioning", icon: Github },
  { name: "Docker", category: "Deployment", icon: Container },
  { name: "AI Tools", category: "Automation", icon: Bot },
];

const strengths = [
  {
    icon: RefreshCw,
    title: "Adaptability",
    text: "I adapt quickly to different technologies, projects, and environments.",
  },
  {
    icon: Users,
    title: "Teamwork",
    text: "I collaborate effectively across academic, international, and organization teams.",
  },
  {
    icon: Puzzle,
    title: "Problem Solving",
    text: "I break unfamiliar problems into smaller steps and test practical solutions.",
  },
];

export default function AboutPage() {
  return (
    <section className="content-section about-section">
        <TextType
          as="h1"
          className="page-title"
          text={["Hello, welcome.", "A little about me."]}
          typingSpeed={90}
          deletingSpeed={45}
          pauseDuration={5000}
          cursorCharacter="|"
        />
        <div className="page-accent-line" />

        <Reveal>
          <div className="intro-card">
            <p>I&apos;m Izhar, a Computer Science student at BINUS University. Recently completed 
            an exchange program at Saxion University of Applied Sciences, studied 
            Creative Media and Game Technologies (CMGT).</p>
            <br />
            <p>Currently looking for a software development internship where I can 
              contribute to real projects and continue building my skills. I&apos;m interested 
              in AI Engineer, Web Programming and Game Engineer. Outside of coding, 
              I&apos;m a big fan of games and football.</p>

          </div>
        </Reveal>

        <h2 className="center-title">Primary Focus</h2>

        <div className="focus-grid">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <Reveal key={area.title} delay={index * 0.08}>
                <article className="focus-card">
                  <Icon size={28} />
                  <h3>{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <h2 className="center-title">Highlights & Languages</h2>

        <Reveal>
          <div className="details-card">
            <div>
              <h3>Highlights</h3>

              <ul className="highlight-list">
                {highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="highlight-dot" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Languages</h3>

              {languages.map((language) => (
                <div className="language-row" key={language.name}>
                  <div className="language-label">
                    <strong>{language.name}</strong>
                    <span>{language.level}</span>
                  </div>

                  <div className="language-bar">
                    <span style={{ width: language.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <section className="tech-stack" aria-labelledby="tech-stack-title">
            <h2 id="tech-stack-title">Tech Stack</h2>

            <div className="tech-folder-showcase">
              <Folder
                className="tech-folder"
                color="#d97757"
                size={1.5}
                expandedContent={
                  <div className="folder-skills-grid">
                    {skills.map((skill) => {
                      const Icon = skill.icon;

                      return (
                        <article className="skill-card" key={skill.name}>
                          <Icon size={25} />
                          <div>
                            <h3>{skill.name}</h3>
                            <p>{skill.category}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                }
              />
              <p>Open skill folder</p>
            </div>
          </section>
        </Reveal>

        <h2 className="center-title">Strengths</h2>

        <div className="strength-grid">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;

            return (
              <Reveal key={strength.title} delay={index * 0.08}>
                <article className="strength-card">
                  <Icon size={25} />
                  <h3>{strength.title}</h3>
                  <p>{strength.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
    </section>
  );
}
