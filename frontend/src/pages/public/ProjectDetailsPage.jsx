import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getProjectBySlug } from "../../services/projectService";

const ProjectDetailsPage = () => {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const response = await getProjectBySlug(slug);
        setProject(response.data || null);
      } catch (error) {
        setPageError(error.message || "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  return (
    <>
      <Navbar />

      <main className="section">
        <div className="container">
          <div style={{ marginBottom: "20px" }}>
            <Link to="/projects" className="btn btn-secondary">
              ← Back to Projects
            </Link>
          </div>

          {isLoading ? (
            <div className="card" style={{ padding: "24px" }}>
              Loading project...
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

          {!isLoading && !pageError && project ? (
            <article className="project-details-wrap">
              <div
                className="project-details-image card"
                style={{
                  background: project.coverImage
                    ? `url(${project.coverImage}) center/cover no-repeat`
                    : "linear-gradient(135deg, rgba(109,124,255,0.35), rgba(34,211,238,0.18))",
                }}
              />

              <div className="card project-details-content">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "16px",
                  }}
                >
                  {project.category ? (
                    <span className="badge">{project.category}</span>
                  ) : null}

                  {project.featured ? (
                    <span className="badge">Featured</span>
                  ) : null}
                </div>

                <h1 className="section-title" style={{ marginBottom: "16px" }}>
                  {project.title}
                </h1>

                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.8,
                    fontSize: "1.02rem",
                    marginBottom: "22px",
                  }}
                >
                  {project.fullDescription || project.shortDescription}
                </p>

                {Array.isArray(project.techStack) &&
                project.techStack.length > 0 ? (
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{ marginBottom: "12px" }}>Tech Stack</h3>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      {project.techStack.map((item, index) => (
                        <span key={`${project._id}-${index}`} className="badge">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="project-details-actions">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      Live Demo
                    </a>
                  ) : null}

                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary"
                    >
                      GitHub Repo
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProjectDetailsPage;
