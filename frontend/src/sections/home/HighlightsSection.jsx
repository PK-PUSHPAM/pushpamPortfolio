const HighlightsSection = () => {
  const items = [
    {
      title: "Responsive UI",
      text: "Mobile-first layouts with clean spacing and smooth structure.",
    },
    {
      title: "Full Stack Projects",
      text: "Frontend + backend products with practical real-world logic.",
    },
    {
      title: "Admin Dashboard",
      text: "Manage content dynamically instead of hardcoding everything.",
    },
    {
      title: "REST APIs",
      text: "Structured APIs with auth, CRUD flows, and scalable routing.",
    },
  ];

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="highlights-strip card">
          {items.map((item) => (
            <div key={item.title} className="highlight-item">
              <h3 className="highlight-title">{item.title}</h3>
              <p className="highlight-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
