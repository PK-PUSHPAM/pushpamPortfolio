import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/authService";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const existingToken = localStorage.getItem("portfolio_admin_token");

    if (existingToken) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage("Please enter email and password.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const response = await loginAdmin({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      localStorage.setItem("portfolio_admin_token", response.token);

      const redirectPath = location.state?.from?.pathname || "/admin/dashboard";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-center">
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ width: "min(100%, 460px)", padding: "32px" }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Admin Login</h1>

        <p
          style={{
            color: "var(--muted)",
            marginBottom: "24px",
            lineHeight: 1.7,
          }}
        >
          Login to manage projects, skills, profile, social links, and messages.
        </p>

        {errorMessage ? (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px 14px",
              borderRadius: "12px",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.24)",
              color: "#fecaca",
            }}
          >
            {errorMessage}
          </div>
        ) : null}

        <div style={{ display: "grid", gap: "16px" }}>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Enter admin email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="input"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
