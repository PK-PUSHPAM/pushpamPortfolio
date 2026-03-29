import { useEffect, useState } from "react";
import { getProfile } from "../../services/profileService";
import { getAllSocialLinks } from "../../services/socialLinkService";
import SocialLinks from "../../components/common/SocialLinks";

const HeroSection = () => {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);

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
        console.error("Failed to load hero data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const fullName = profile?.fullName || "Pushpam";
  const title = profile?.title || "Full Stack Developer";
  const bio =
    profile?.bio ||
    "I build modern, responsive, and production-focused web applications with clean UI, scalable structure, and solid backend logic.";

  return (
    <section className="section hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="badge hero-badge">
            {isLoading ? "Loading..." : title}
          </span>

          <h1 className="hero-title">
            Building clean and
            <span className="hero-title-accent"> scalable </span>
            web products.
          </h1>

          <p className="hero-description">
            Hi, I’m <strong>{fullName}</strong>. {bio}
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>

            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>

            {profile?.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                Resume
              </a>
            ) : null}
          </div>

          <div className="hero-socials">
            <SocialLinks links={socialLinks} />
          </div>
        </div>

        <div className="hero-visual card">
          <div className="hero-visual-glow" />

          {profile?.profileImage ? (
            <img
              src={profile.profileImage}
              alt={fullName}
              className="hero-profile-image"
            />
          ) : (
            <div className="hero-visual-placeholder">
              <div className="hero-code-window">
                <div className="hero-code-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="hero-code-lines">
                  <span>{`const developer = "${fullName}";`}</span>
                  <span>{`const role = "${title}";`}</span>
                  <span>{"build(cleanUI, backendLogic, scalableApps);"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
