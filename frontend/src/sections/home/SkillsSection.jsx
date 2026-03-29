import { useEffect, useMemo, useState } from "react";
import { getAllSkills } from "../../services/skillService";

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        setPageError("");

        const response = await getAllSkills();
        setSkills(response.data || []);
      } catch (error) {
        setPageError(error.message || "Failed to load skills");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const groupedSkills = useMemo(() => {
    return skills.reduce((acc, item) => {
      const category = item.category || "Other";

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(item);
      return acc;
    }, {});
  }, [skills]);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            These are the technologies I use to design, build, and manage full
            stack web applications.
          </p>
        </div>

        {isLoading ? (
          <div className="card" style={{ padding: "24px" }}>
            Loading skills...
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

        {!isLoading && !pageError && skills.length === 0 ? (
          <div className="card" style={{ padding: "24px" }}>
            No skills found.
          </div>
        ) : null}

        {!isLoading && !pageError && skills.length > 0 ? (
          <div className="skills-groups-grid">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <div key={category} className="card skill-group-card">
                <div className="skill-group-head">
                  <h3>{category}</h3>
                  <span className="badge">{items.length} Skills</span>
                </div>

                <div className="skill-badges-wrap">
                  {items.map((skill) => (
                    <span key={skill._id} className="skill-pill">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SkillsSection;
