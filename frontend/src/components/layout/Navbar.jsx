import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/profileService";

const Navbar = () => {
  const [profile, setProfile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data || null);
      } catch (error) {
        console.error("Failed to load navbar profile:", error.message);
      }
    };

    fetchProfile();
  }, []);

  const brandName = profile?.fullName || "Pushpam";

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container navbar-wrap">
        <Link to="/" className="site-brand" onClick={handleMenuClose}>
          {brandName}
          <span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        <button
          type="button"
          className="site-menu-btn"
          onClick={handleMenuToggle}
        >
          ☰
        </button>

        <nav className={`site-nav ${isMenuOpen ? "open" : ""}`}>
          <a href="#about" onClick={handleMenuClose}>
            About
          </a>
          <a href="#skills" onClick={handleMenuClose}>
            Skills
          </a>
          <a href="#projects" onClick={handleMenuClose}>
            Projects
          </a>
          <a href="#contact" onClick={handleMenuClose}>
            Contact
          </a>

          {profile?.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              onClick={handleMenuClose}
            >
              Resume
            </a>
          ) : null}

          <Link
            to="/admin/login"
            className="btn btn-primary"
            onClick={handleMenuClose}
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
