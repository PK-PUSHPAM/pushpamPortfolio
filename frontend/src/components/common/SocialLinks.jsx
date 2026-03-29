const SocialLinks = ({ links = [] }) => {
  if (!Array.isArray(links) || links.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      {links.map((item) => (
        <a
          key={item._id || `${item.platform}-${item.url}`}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="social-link-chip"
        >
          {item.platform}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
