import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";

const AdminDashboardPage = () => {
  const cards = [
    {
      title: "Projects",
      description: "Add and manage portfolio projects.",
      link: "/admin/projects",
    },
    {
      title: "Skills",
      description: "Manage skill categories and items.",
      link: "/admin/skills",
    },
    {
      title: "Profile",
      description: "Update hero, about, and profile data.",
      link: "/admin/profile",
    },
    {
      title: "Messages",
      description: "Read contact form submissions.",
      link: "/admin/messages",
    },
  ];

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="Control your portfolio content from one place."
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {cards.map((card) => (
          <div key={card.title} className="card" style={{ padding: "24px" }}>
            <h3 style={{ marginBottom: "10px" }}>{card.title}</h3>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.7,
                marginBottom: "18px",
              }}
            >
              {card.description}
            </p>

            <Link to={card.link} className="btn btn-primary">
              Open
            </Link>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
