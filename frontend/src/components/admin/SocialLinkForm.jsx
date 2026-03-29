import { useEffect, useState } from "react";

const defaultFormState = {
  platform: "",
  url: "",
  icon: "",
  isActive: true,
  displayOrder: 0,
};

const SocialLinkForm = ({
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
      platform: initialData.platform || "",
      url: initialData.url || "",
      icon: initialData.icon || "",
      isActive: Boolean(initialData.isActive),
      displayOrder: initialData.displayOrder ?? 0,
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

    if (!formData.platform.trim() || !formData.url.trim()) {
      alert("Platform and URL are required.");
      return;
    }

    onSubmit({
      platform: formData.platform.trim(),
      url: formData.url.trim(),
      icon: formData.icon.trim(),
      isActive: formData.isActive,
      displayOrder: Number(formData.displayOrder) || 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ padding: "24px", display: "grid", gap: "16px" }}
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
      >
        <div>
          <label className="form-label">Platform</label>
          <input
            className="input"
            type="text"
            name="platform"
            placeholder="GitHub"
            value={formData.platform}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Display Order</label>
          <input
            className="input"
            type="number"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="form-label">URL</label>
        <input
          className="input"
          type="text"
          name="url"
          placeholder="https://github.com/..."
          value={formData.url}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form-label">Icon</label>
        <input
          className="input"
          type="text"
          name="icon"
          placeholder="Optional icon text or URL"
          value={formData.icon}
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
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />
        Active
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
              ? "Update Link"
              : "Add Link"}
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

export default SocialLinkForm;
