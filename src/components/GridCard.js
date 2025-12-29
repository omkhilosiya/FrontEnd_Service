export default function GridCard({ title, bgcolor }) {
  return (
    <div
      style={{
        background: bgcolor,
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        fontWeight: "600",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      {title}
    </div>
  );
}
