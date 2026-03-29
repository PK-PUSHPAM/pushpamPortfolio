import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import SocialLinkForm from "../../components/admin/SocialLinkForm";
import {
  getAllSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../../services/socialLinkService";

const ManageSocialLinksPage = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");

  const fetchSocialLinks = async () => {
    try {
      setIsLoading(true);
      setPageError("");

      const response = await getAllSocialLinks();
      setSocialLinks(response.data || []);
    } catch (error) {
      setPageError(error.message || "Failed to load social links");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const handleAddClick = () => {
    setSelectedLink(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (item) => {
    setSelectedLink(item);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setSelectedLink(null);
    setIsFormVisible(false);
  };

  const handleSubmit = async (payload) => {
    try {
      setIsFormSubmitting(true);

      if (selectedLink?._id) {
        const response = await updateSocialLink(selectedLink._id, payload);

        setSocialLinks((prev) =>
          prev.map((item) =>
            item._id === selectedLink._id ? response.data : item,
          ),
        );
      } else {
        const response = await createSocialLink(payload);
        setSocialLinks((prev) => [...prev, response.data]);
      }

      setSelectedLink(null);
      setIsFormVisible(false);
    } catch (error) {
      alert(error.message || "Failed to save social link");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this social link?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSocialLink(id);
      setSocialLinks((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.message || "Failed to delete social link");
    }
  };

  return (
    <AdminLayout
      title="Manage Social Links"
      subtitle="Add, edit, and control visible social platforms."
    >
      <div style={{ display: "grid", gap: "24px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddClick}
          >
            Add New Link
          </button>
        </div>

        {isFormVisible ? (
          <SocialLinkForm
            initialData={selectedLink}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isFormSubmitting}
          />
        ) : null}

        {isLoading ? (
          <div className="card" style={{ padding: "24px" }}>
            Loading social links...
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

        {!isLoading && !pageError && socialLinks.length === 0 ? (
          <div className="card" style={{ padding: "24px" }}>
            No social links found.
          </div>
        ) : null}

        {!isLoading && !pageError && socialLinks.length > 0 ? (
          <div className="grid">
            {socialLinks.map((item) => (
              <div key={item._id} className="card" style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: "6px" }}>{item.platform}</h3>
                    <p
                      style={{ color: "var(--muted)", wordBreak: "break-word" }}
                    >
                      {item.url}
                    </p>
                  </div>

                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <span className="badge">
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="badge">
                      Order: {item.displayOrder ?? 0}
                    </span>
                  </div>
                </div>

                {item.icon ? (
                  <p style={{ color: "var(--muted)", marginBottom: "14px" }}>
                    Icon: {item.icon}
                  </p>
                ) : null}

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default ManageSocialLinksPage;
