// Halaman About — teks diambil dari data/portfolio.ts (cukup edit di sana).
// Icon ditaruh di sini supaya file data tetap simpel (teks saja).

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
  Sparkles,
  Terminal,
  Users,
  Workflow,
} from "lucide-react";
import Reveal from "../components/Reveal";
import TextType from "../components/TextType";
import Folder from "../components/Folder";
import {
  aboutIntro,
  focusAreas,
  highlights,
  languages,
  skills,
  strengths,
  ui,
} from "../data/portfolio";

// Urutan icon harus sama dengan urutan daftar di data/portfolio.ts
const focusIcons = [PanelsTopLeft, ScanSearch, Gamepad2, Workflow];
const skillIcons = [
  PanelsTopLeft,
  Code2,
  Sparkles,
  Boxes,
  Terminal,
  Database,
  FileCode2,
  Globe2,
  GitBranch,
  Github,
  Container,
  Bot,
];
const strengthIcons = [RefreshCw, Users, Puzzle];

export default function AboutPage() {
  return (
    <section className="content-section about-section">
      <TextType
        as="h1"
        className="page-title"
        text={ui.about.greetings}
        typingSpeed={90}
        deletingSpeed={45}
        pauseDuration={5000}
        cursorCharacter="|"
      />
      <div className="page-accent-line" />

      <Reveal>
        <div className="intro-card">
          <p>{aboutIntro[0]}</p>
          <br />
          <p>{aboutIntro[1]}</p>
        </div>
      </Reveal>

      <h2 className="center-title">{ui.about.focus}</h2>

      <div className="focus-grid">
        {focusAreas.map((area, index) => {
          const Icon = focusIcons[index] ?? PanelsTopLeft;

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

      <h2 className="center-title">{ui.about.details}</h2>

      <Reveal>
        <div className="details-card">
          <div>
            <h3>{ui.about.highlights}</h3>

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
            <h3>{ui.about.languages}</h3>

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
          <h2 id="tech-stack-title">{ui.about.techStack}</h2>

          <div className="tech-folder-showcase">
            <Folder
              className="tech-folder"
              color="#d97757"
              size={1.5}
              expandedContent={
                <div className="folder-skills-grid">
                  {skills.map((skill, index) => {
                    const Icon = skillIcons[index] ?? Code2;

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
            <p>{ui.about.folderHint}</p>
          </div>
        </section>
      </Reveal>

      <h2 className="center-title">{ui.about.strengths}</h2>

      <div className="strength-grid">
        {strengths.map((strength, index) => {
          const Icon = strengthIcons[index] ?? Puzzle;

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
