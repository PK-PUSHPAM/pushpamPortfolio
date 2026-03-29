import { useEffect, useState } from "react";

const defaultFormState = {
  name: "",
  icon: "",
  category: "",
  level: "Intermediate",
  displayOrder: 0,
};

const SkillForm = ({
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
      name: initialData.name || "",
      icon: initialData.icon || "",
      category: initialData.category || "",
      level: initialData.level || "Intermediate",
      displayOrder: initialData.displayOrder ?? 0,
    });
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "displayOrder" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.category.trim()) {
      alert("Skill name and category are required.");
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      icon: formData.icon.trim(),
      category: formData.category.trim(),
      level: formData.level.trim(),
      displayOrder: Number(formData.displayOrder) || 0,
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
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div>
          <label className="form-label">Skill Name</label>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="React"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Category</label>
          <input
            className="input"
            type="text"
            name="category"
            placeholder="Frontend"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div>
          <label className="form-label">Level</label>
          <select
            className="input"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="form-label">Display Order</label>
          <input
            className="input"
            type="number"
            name="displayOrder"
            placeholder="0"
            value={formData.displayOrder}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="form-label">Icon / Icon URL</label>
        <input
          className="input"
          type="text"
          name="icon"
          placeholder="Optional icon text or URL"
          value={formData.icon}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Skill"
              : "Add Skill"}
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

export default SkillForm;
