import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "../../services/projectService";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const response = await getAllProjects();
        const allProjects = response.data || [];
        const featuredProjects = allProjects.filter((item) => item.featured);

        setProjects(featuredProjects.slice(0, 3));
      } catch (error) {
        setPageError(error.message || "Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "flex-end",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">
              A selection of projects that reflect my development style,
              technical direction, and problem-solving approach.
            </p>
          </div>

          <Link to="/projects" className="btn btn-secondary">
            View All Projects
          </Link>
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
            No featured projects found.
          </div>
        ) : null}

        {!isLoading && !pageError && projects.length > 0 ? (
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {projects.map((project) => (
              <article key={project._id} className="card project-card">
                <div
                  className="project-card-image"
                  style={{
                    background: project.coverImage
                      ? `url(${project.coverImage}) center/cover no-repeat`
                      : "linear-gradient(135deg, rgba(109,124,255,0.35), rgba(34,211,238,0.18))",
                  }}
                />

                <div style={{ padding: "22px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                      marginBottom: "12px",
                    }}
                  >
                    {project.category ? (
                      <span className="badge">{project.category}</span>
                    ) : null}

                    {project.featured ? (
                      <span className="badge">Featured</span>
                    ) : null}
                  </div>

                  <h3 style={{ marginBottom: "10px" }}>{project.title}</h3>

                  <p
                    style={{
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      marginBottom: "18px",
                    }}
                  >
                    {project.shortDescription}
                  </p>

                  {Array.isArray(project.techStack) &&
                  project.techStack.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        marginBottom: "18px",
                      }}
                    >
                      {project.techStack.slice(0, 4).map((item, index) => (
                        <span key={`${project._id}-${index}`} className="badge">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <Link
                    to={`/projects/${project.slug}`}
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProjectsSection;
