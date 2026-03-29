import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/profileService";
import { getAllSocialLinks } from "../../services/socialLinkService";
import SocialLinks from "../common/SocialLinks";

const Footer = () => {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchFooterData = async () => {
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
        console.error("Failed to load footer data:", error.message);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3 style={{ marginBottom: "10px" }}>
            {profile?.fullName || "Pushpam"}
          </h3>

          <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            {profile?.title || "Full Stack Developer"}
          </p>

          {profile?.location ? (
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              {profile.location}
            </p>
          ) : null}
        </div>

        <div>
          <h4 style={{ marginBottom: "12px" }}>Quick Links</h4>

          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <Link to="/projects">All Projects</Link>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: "12px" }}>Connect</h4>
          <SocialLinks links={socialLinks} />
        </div>

        <div>
          <h4 style={{ marginBottom: "12px" }}>Contact</h4>

          <p
            style={{
              color: "var(--muted)",
              lineHeight: 1.7,
              wordBreak: "break-word",
            }}
          >
            {profile?.email || "Add your email from admin panel"}
          </p>

          <p style={{ color: "var(--muted)", marginTop: "12px" }}>
            © {new Date().getFullYear()} {profile?.fullName || "Pushpam"}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
