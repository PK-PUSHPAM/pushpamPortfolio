import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import SkillForm from "../../components/admin/SkillForm";
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillService";

const ManageSkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  useEffect(() => {
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

  const handleAddClick = () => {
    setSelectedSkill(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (skill) => {
    setSelectedSkill(skill);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setSelectedSkill(null);
    setIsFormVisible(false);
  };

  const handleSubmit = async (payload) => {
    try {
      setIsFormSubmitting(true);

      if (selectedSkill?._id) {
        const response = await updateSkill(selectedSkill._id, payload);

        setSkills((prev) =>
          prev.map((item) =>
            item._id === selectedSkill._id ? response.data : item,
          ),
        );
      } else {
        const response = await createSkill(payload);
        setSkills((prev) => [...prev, response.data]);
      }

      setSelectedSkill(null);
      setIsFormVisible(false);
    } catch (error) {
      alert(error.message || "Failed to save skill");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.message || "Failed to delete skill");
    }
  };

  return (
    <AdminLayout
      title="Manage Skills"
      subtitle="Add, edit, and organize skills for the public portfolio."
    >
      <div style={{ display: "grid", gap: "24px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddClick}
          >
            Add New Skill
          </button>
        </div>

        {isFormVisible ? (
          <SkillForm
            initialData={selectedSkill}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isFormSubmitting}
          />
        ) : null}

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
          <div className="grid">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <div key={category} className="card" style={{ padding: "24px" }}>
                <h3
                  style={{
                    marginBottom: "18px",
                    textTransform: "capitalize",
                    fontSize: "1.2rem",
                  }}
                >
                  {category}
                </h3>

                <div className="grid">
                  {items.map((skill) => (
                    <div
                      key={skill._id}
                      style={{
                        padding: "18px",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "16px",
                          flexWrap: "wrap",
                          marginBottom: "12px",
                        }}
                      >
                        <div>
                          <h4 style={{ marginBottom: "6px" }}>{skill.name}</h4>
                          <p style={{ color: "var(--muted)" }}>
                            {skill.level || "Intermediate"}
                          </p>
                        </div>

                        <span className="badge">
                          Order: {skill.displayOrder ?? 0}
                        </span>
                      </div>

                      {skill.icon ? (
                        <p
                          style={{
                            color: "var(--muted)",
                            marginBottom: "14px",
                            wordBreak: "break-word",
                          }}
                        >
                          Icon: {skill.icon}
                        </p>
                      ) : null}

                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => handleEditClick(skill)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => handleDelete(skill._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default ManageSkillsPage;
