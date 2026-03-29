import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />

      <main className="page-center">
        <div
          className="card"
          style={{
            padding: "32px",
            width: "min(100%, 700px)",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "12px" }}>404</h1>

          <p
            style={{
              color: "var(--muted)",
              marginBottom: "20px",
              lineHeight: 1.7,
            }}
          >
            The page you are looking for does not exist.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>

            <Link to="/projects" className="btn btn-secondary">
              View Projects
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default NotFoundPage;
