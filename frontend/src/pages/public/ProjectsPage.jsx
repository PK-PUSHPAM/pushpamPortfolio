import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getAllProjects } from "../../services/projectService";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const response = await getAllProjects();
        setProjects(response.data || []);
      } catch (error) {
        setPageError(error.message || "Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />

      <main className="section">
        <div className="container">
          <div className="projects-page-hero">
            <span className="badge">Portfolio Work</span>

            <h1 className="section-title" style={{ marginTop: "16px" }}>
              All Projects
            </h1>

            <p className="section-subtitle">
              These projects represent my work in frontend systems, backend
              APIs, authentication flows, dashboards, and full stack application
              building.
            </p>
          </div>

          {isLoading ? (
            <div className="card" style={{ padding: "24px" }}>
              Loading projects...
            </div>
          ) : null}

          {!isLoading && pageError ? (
            <div
              className="card"
              style={{
                padding: "24px",
                color: "#fecaca",
                border: "1px solid rgba(239, 68, 68, 0.24)",
              }}
            >
              {pageError}
            </div>
          ) : null}

          {!isLoading && !pageError && projects.length === 0 ? (
            <div className="card" style={{ padding: "24px" }}>
              No projects found.
            </div>
          ) : null}

          {!isLoading && !pageError && projects.length > 0 ? (
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              }}
            >
              {projects.map((project) => (
                <article
                  key={project._id}
                  className="card project-card polished-project-card"
                >
                  <div
                    className="project-card-image"
                    style={{
                      background: project.coverImage
                        ? `url(${project.coverImage}) center/cover no-repeat`
                        : "linear-gradient(135deg, rgba(109,124,255,0.35), rgba(34,211,238,0.18))",
                    }}
                  />

                  <div style={{ padding: "22px" }}>
                    <div className="project-card-top-meta">
                      {project.category ? (
                        <span className="badge">{project.category}</span>
                      ) : null}
                      {project.featured ? (
                        <span className="badge">Featured</span>
                      ) : null}
                    </div>

                    <h3 style={{ marginBottom: "10px" }}>{project.title}</h3>

                    <p className="project-card-description">
                      {project.shortDescription}
                    </p>

                    {Array.isArray(project.techStack) &&
                    project.techStack.length > 0 ? (
                      <div className="project-tech-list">
                        {project.techStack.slice(0, 5).map((item, index) => (
                          <span
                            key={`${project._id}-${index}`}
                            className="badge"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div
                      style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                    >
                      <Link
                        to={`/projects/${project.slug}`}
                        className="btn btn-primary"
                      >
                        View Details
                      </Link>

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary"
                        >
                          Live
                        </a>
                      ) : null}

                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary"
                        >
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectsPage;
