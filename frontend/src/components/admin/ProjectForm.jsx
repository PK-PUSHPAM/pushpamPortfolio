import { useEffect, useState } from "react";

const defaultFormState = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  coverImage: "",
  featured: false,
  category: "web",
};

const ProjectForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState(defaultFormState);

  useEffect(() => {
    if (!initialData) {
      setFormData(defaultFormState);
      return;
    }

    setFormData({
      title: initialData.title || "",
      slug: initialData.slug || "",
      shortDescription: initialData.shortDescription || "",
      fullDescription: initialData.fullDescription || "",
      techStack: Array.isArray(initialData.techStack)
        ? initialData.techStack.join(", ")
        : "",
      githubUrl: initialData.githubUrl || "",
      liveUrl: initialData.liveUrl || "",
      coverImage: initialData.coverImage || "",
      featured: Boolean(initialData.featured),
      category: initialData.category || "web",
    });
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.slug.trim() ||
      !formData.shortDescription.trim()
    ) {
      alert("Title, slug and short description are required.");
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      slug: formData.slug.trim().toLowerCase(),
      shortDescription: formData.shortDescription.trim(),
      fullDescription: formData.fullDescription.trim(),
      techStack: formData.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      githubUrl: formData.githubUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
      coverImage: formData.coverImage.trim(),
      featured: formData.featured,
      category: formData.category.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        padding: "24px",
        display: "grid",
        gap: "16px",
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
          >
            Title
          </label>
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Project title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
          >
            Slug
          </label>
          <input
            className="input"
            type="text"
            name="slug"
            placeholder="online-voting-system"
            value={formData.slug}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
        >
          Short Description
        </label>
        <textarea
          className="textarea"
          name="shortDescription"
          placeholder="Short project summary"
          value={formData.shortDescription}
          onChange={handleChange}
          style={{ minHeight: "110px" }}
        />
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
        >
          Full Description
        </label>
        <textarea
          className="textarea"
          name="fullDescription"
          placeholder="Detailed project explanation"
          value={formData.fullDescription}
          onChange={handleChange}
        />
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
          >
            Tech Stack
          </label>
          <input
            className="input"
            type="text"
            name="techStack"
            placeholder="React, Node.js, MongoDB"
            value={formData.techStack}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
          >
            Category
          </label>
          <input
            className="input"
            type="text"
            name="category"
            placeholder="web"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
          >
            GitHub URL
          </label>
          <input
            className="input"
            type="text"
            name="githubUrl"
            placeholder="https://github.com/..."
            value={formData.githubUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
          >
            Live URL
          </label>
          <input
            className="input"
            type="text"
            name="liveUrl"
            placeholder="https://yourproject.com"
            value={formData.liveUrl}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label
          style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}
        >
          Cover Image URL
        </label>
        <input
          className="input"
          type="text"
          name="coverImage"
          placeholder="https://image-url.com/image.png"
          value={formData.coverImage}
          onChange={handleChange}
        />
      </div>

      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          fontWeight: 700,
        }}
      >
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
        />
        Mark as featured project
      </label>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Project"
              : "Add Project"}
        </button>

        {onCancel ? (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default ProjectForm;
