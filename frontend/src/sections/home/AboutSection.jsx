import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";

const AboutSection = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const response = await getProfile();
        setProfile(response.data || null);
      } catch (error) {
        setPageError(error.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            My focus is not just making things look good. I care about
            structure, usability, backend flow, and building products that are
            easy to extend.
          </p>
        </div>

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
          <div className="about-grid">
            <div className="card about-main-card">
              <h3 className="about-card-title">Who I am</h3>
              <p className="about-main-text">
                {profile?.about ||
                  "Profile content is not available yet. Add your profile details from the admin panel."}
              </p>
            </div>

            <div className="about-stats-grid">
              <div className="card about-mini-card">
                <h4>Full Name</h4>
                <p>{profile?.fullName || "Not added yet"}</p>
              </div>

              <div className="card about-mini-card">
                <h4>Role</h4>
                <p>{profile?.title || "Not added yet"}</p>
              </div>

              <div className="card about-mini-card">
                <h4>Location</h4>
                <p>{profile?.location || "Not added yet"}</p>
              </div>

              <div className="card about-mini-card">
                <h4>Email</h4>
                <p>{profile?.email || "Not added yet"}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AboutSection;
