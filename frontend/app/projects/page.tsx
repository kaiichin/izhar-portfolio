import { projects } from "../../data/portfolio";

export default function ProjectsPage() {
  return (
    <section className="content-section projects-page">
        <h2>My Projects</h2>

        <div className="page-accent-line" />

        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project.title} className="dashboard-project-card">
              <div className={`project-art project-art-${index + 1}`}>
                <span>{project.title.slice(0, 2).toUpperCase()}</span>
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
                  View Project ↗
                </a>
              ) : (
                <span className="project-link disabled">
                  Link added soon
                </span>
              )}
            </article>
          ))}
        </div>
    </section>
  );
}
