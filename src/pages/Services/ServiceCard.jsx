export default function ServiceCard({ title, onClick }) {
  return (
    <div className="service-card">
      <div>
        <h3>{title}</h3>
        <p>Select the service to get started</p>
      </div>
      <button onClick={onClick}>Select</button>
    </div>
  );
}
