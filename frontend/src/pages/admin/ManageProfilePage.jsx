import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { getProfile, upsertProfile } from "../../services/profileService";

const ManageProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    bio: "",
    about: "",
    profileImage: "",
    resumeUrl: "",
    location: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const response = await getProfile();
        const profile = response.data;

        if (profile) {
          setFormData({
            fullName: profile.fullName || "",
            title: profile.title || "",
            bio: profile.bio || "",
            about: profile.about || "",
            profileImage: profile.profileImage || "",
            resumeUrl: profile.resumeUrl || "",
            location: profile.location || "",
            email: profile.email || "",
          });
        }
      } catch (error) {
        setPageError(error.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.fullName.trim() || !formData.title.trim()) {
      setStatusMessage("Full name and title are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setStatusMessage("");

      const response = await upsertProfile({
        fullName: formData.fullName.trim(),
        title: formData.title.trim(),
        bio: formData.bio.trim(),
        about: formData.about.trim(),
        profileImage: formData.profileImage.trim(),
        resumeUrl: formData.resumeUrl.trim(),
        location: formData.location.trim(),
        email: formData.email.trim(),
      });

      setStatusMessage(response.message || "Profile saved successfully.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to save profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Manage Profile"
      subtitle="Update public portfolio identity, about content, and contact details."
    >
      {isLoading ? (
        <div className="card" style={{ padding: "24px" }}>
          Loading profile...
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

      {!isLoading && !pageError ? (
        <form
          onSubmit={handleSubmit}
          className="card"
          style={{
            padding: "24px",
            display: "grid",
            gap: "16px",
          }}
        >
          {statusMessage ? (
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: "rgba(109, 124, 255, 0.12)",
                border: "1px solid rgba(109, 124, 255, 0.24)",
                color: "#dbe1ff",
              }}
            >
              {statusMessage}
            </div>
          ) : null}

          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            <div>
              <label className="form-label">Full Name</label>
              <input
                className="input"
                type="text"
                name="fullName"
                placeholder="Pushpam Kumar"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label">Title</label>
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Full Stack Developer"
                value={formData.title}
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
              <label className="form-label">Email</label>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label">Location</label>
              <input
                className="input"
                type="text"
                name="location"
                placeholder="Meerut, India"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Short Bio</label>
            <textarea
              className="textarea"
              name="bio"
              placeholder="Short hero section bio"
              value={formData.bio}
              onChange={handleChange}
              style={{ minHeight: "110px" }}
            />
          </div>

          <div>
            <label className="form-label">About Content</label>
            <textarea
              className="textarea"
              name="about"
              placeholder="Detailed about section content"
              value={formData.about}
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
              <label className="form-label">Profile Image URL</label>
              <input
                className="input"
                type="text"
                name="profileImage"
                placeholder="https://image-url.com/profile.png"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="form-label">Resume URL</label>
              <input
                className="input"
                type="text"
                name="resumeUrl"
                placeholder="https://your-resume-link.com"
                value={formData.resumeUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      ) : null}
    </AdminLayout>
  );
};

export default ManageProfilePage;
