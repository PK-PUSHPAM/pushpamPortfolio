import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
} from "../../services/messageService";

const ManageMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      setPageError("");

      const response = await getAllMessages();
      setMessages(response.data || []);
    } catch (error) {
      setPageError(error.message || "Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markMessageAsRead(id);

      setMessages((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item,
        ),
      );
    } catch (error) {
      alert(error.message || "Failed to mark message as read");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.message || "Failed to delete message");
    }
  };

  return (
    <AdminLayout
      title="Manage Messages"
      subtitle="View and manage contact form submissions."
    >
      {isLoading ? (
        <div className="card" style={{ padding: "24px" }}>
          Loading messages...
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

      {!isLoading && !pageError && messages.length === 0 ? (
        <div className="card" style={{ padding: "24px" }}>
          No messages found.
        </div>
      ) : null}

      {!isLoading && !pageError && messages.length > 0 ? (
        <div className="grid">
          {messages.map((item) => (
            <div key={item._id} className="card" style={{ padding: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "14px",
                }}
              >
                <div>
                  <h3 style={{ marginBottom: "6px" }}>{item.name}</h3>
                  <p style={{ color: "var(--muted)" }}>{item.email}</p>
                </div>

                <span
                  className="badge"
                  style={{
                    background: item.isRead
                      ? "rgba(34, 197, 94, 0.12)"
                      : "rgba(109, 124, 255, 0.12)",
                  }}
                >
                  {item.isRead ? "Read" : "Unread"}
                </span>
              </div>

              {item.subject ? (
                <p style={{ marginBottom: "10px", fontWeight: 700 }}>
                  Subject: {item.subject}
                </p>
              ) : null}

              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  marginBottom: "18px",
                }}
              >
                {item.message}
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {!item.isRead ? (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleMarkRead(item._id)}
                  >
                    Mark as Read
                  </button>
                ) : null}

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </AdminLayout>
  );
};

export default ManageMessagesPage;
