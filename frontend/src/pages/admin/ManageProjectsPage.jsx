import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import ProjectForm from "../../components/admin/ProjectForm";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

const ManageProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddClick = () => {
    setSelectedProject(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setSelectedProject(null);
    setIsFormVisible(false);
  };

  const handleSubmit = async (payload) => {
    try {
      setIsFormSubmitting(true);

      if (selectedProject?._id) {
        const response = await updateProject(selectedProject._id, payload);

        setProjects((prev) =>
          prev.map((item) =>
            item._id === selectedProject._id ? response.data : item,
          ),
        );
      } else {
        const response = await createProject(payload);
        setProjects((prev) => [response.data, ...prev]);
      }

      setSelectedProject(null);
      setIsFormVisible(false);
    } catch (error) {
      alert(error.message || "Failed to save project");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.message || "Failed to delete project");
    }
  };

  return (
    <AdminLayout
      title="Manage Projects"
      subtitle="Add, edit, and delete portfolio projects from here."
    >
      <div style={{ display: "grid", gap: "24px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddClick}
          >
            Add New Project
          </button>
        </div>

        {isFormVisible ? (
          <ProjectForm
            initialData={selectedProject}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isFormSubmitting}
          />
        ) : null}

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
          <div className="grid">
            {projects.map((project) => (
              <div
                key={project._id}
                className="card"
                style={{ padding: "24px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: "8px" }}>{project.title}</h3>
                    <p style={{ color: "var(--muted)" }}>{project.slug}</p>
                  </div>

                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {project.featured ? (
                      <span className="badge">Featured</span>
                    ) : null}
                    {project.category ? (
                      <span className="badge">{project.category}</span>
                    ) : null}
                  </div>
                </div>

                <p
                  style={{
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    marginBottom: "16px",
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
                    {project.techStack.map((item, index) => (
                      <span key={`${project._id}-${index}`} className="badge">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleEditClick(project)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>

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
            ))}
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default ManageProjectsPage;
