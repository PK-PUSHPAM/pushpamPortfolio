import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="card cta-card">
          <div>
            <h2 className="cta-title">
              Want a clean, modern, and solid web product?
            </h2>

            <p className="cta-description">
              I focus on building responsive interfaces, structured frontend
              code, and backend-driven web applications that are practical and
              scalable.
            </p>
          </div>

          <div className="cta-actions">
            <a href="#contact" className="btn btn-primary">
              Start a Conversation
            </a>

            <Link to="/projects" className="btn btn-secondary">
              Explore Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
