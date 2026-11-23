// Halaman Projects — daftar project diedit di data/portfolio.ts (PROJECTS).

import Image from "next/image";
import { projects, ui } from "../../data/portfolio";

export default function ProjectsPage() {
  return (
    <section className="content-section projects-page">
      <h1 className="page-title">{ui.projects.title}</h1>

      <div className="page-accent-line" />

      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="dashboard-project-card">
            <div className="project-art">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={360}
                />
              ) : (
                <span>{project.title.slice(0, 2).toUpperCase()}</span>
              )}
            </div>

            <h3 className="project-label">{project.title}</h3>

            <p className="project-description">{project.description}</p>

            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                {ui.projects.view}
              </a>
            ) : (
              <span className="project-link disabled">{ui.projects.missingLink}</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
