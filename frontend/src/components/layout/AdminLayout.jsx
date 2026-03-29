import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = ({ title, subtitle, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Projects", path: "/admin/projects" },
    { label: "Skills", path: "/admin/skills" },
    { label: "Profile", path: "/admin/profile" },
    { label: "Messages", path: "/admin/messages" },
    { label: "Social Links", path: "/admin/social-links" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("portfolio_admin_token");
    navigate("/admin/login");
  };

  const handleNavClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-inner">
          <div className="admin-sidebar-top">
            <Link
              to="/admin/dashboard"
              onClick={handleNavClick}
              className="admin-brand"
            >
              Pushpam<span style={{ color: "var(--accent)" }}>Admin</span>
            </Link>

            <button
              type="button"
              className="admin-close-btn"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="admin-nav">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`admin-nav-link ${isActive ? "active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="btn btn-secondary admin-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      {isSidebarOpen ? (
        <button
          type="button"
          className="admin-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <main className="admin-main">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-menu-btn"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>

          <div>
            <h1 className="admin-title">{title}</h1>
            {subtitle ? <p className="admin-subtitle">{subtitle}</p> : null}
          </div>
        </div>

        <div>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
