import { useEffect, useState } from "react";
import { createMessage } from "../../services/messageService";
import { getProfile } from "../../services/profileService";
import { getAllSocialLinks } from "../../services/socialLinkService";
import SocialLinks from "../../components/common/SocialLinks";

const ContactSection = () => {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const [profileResponse, socialLinksResponse] = await Promise.all([
          getProfile(),
          getAllSocialLinks(),
        ]);

        setProfile(profileResponse.data || null);

        const activeLinks = (socialLinksResponse.data || []).filter(
          (item) => item.isActive,
        );

        setSocialLinks(activeLinks);
      } catch (error) {
        console.error("Failed to load contact data:", error.message);
      }
    };

    fetchContactData();
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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus({
        type: "error",
        text: "Name, email and message are required.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ type: "", text: "" });

      const response = await createMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setStatus({
        type: "success",
        text: response.message || "Message sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        text: error.message || "Failed to send message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{ marginBottom: "28px" }}>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">
            Have a project idea, internship opportunity, or collaboration in
            mind? Send me a message or reach out directly using the contact
            details below.
          </p>
        </div>

        <div className="contact-grid">
          <div className="card contact-info-card">
            <h3 style={{ marginBottom: "18px" }}>Let’s connect</h3>

            <div style={{ display: "grid", gap: "14px", marginBottom: "20px" }}>
              <div className="contact-info-item">
                <span className="contact-info-label">Email</span>
                <p className="contact-info-value">
                  {profile?.email || "Add your email from admin panel"}
                </p>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-label">Location</span>
                <p className="contact-info-value">
                  {profile?.location || "Add your location from admin panel"}
                </p>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-label">Role</span>
                <p className="contact-info-value">
                  {profile?.title || "Full Stack Developer"}
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ marginBottom: "12px" }}>Social Links</h4>
              <SocialLinks links={socialLinks} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card contact-form-card">
            {status.text ? (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background:
                    status.type === "success"
                      ? "rgba(34, 197, 94, 0.12)"
                      : "rgba(239, 68, 68, 0.12)",
                  border:
                    status.type === "success"
                      ? "1px solid rgba(34, 197, 94, 0.24)"
                      : "1px solid rgba(239, 68, 68, 0.24)",
                  color: status.type === "success" ? "#bbf7d0" : "#fecaca",
                }}
              >
                {status.text}
              </div>
            ) : null}

            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              <input
                className="input"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                className="input"
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <input
              className="input"
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />

            <textarea
              className="textarea"
              name="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
