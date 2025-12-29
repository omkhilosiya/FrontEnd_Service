import "./subagent.css";

const StatCard = ({ title, value, color }) => {
  return (
    <div className="stat-card">
      <span className={`stat-dot ${color}`}></span>
      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>    
    </div>
  );
};

export default StatCard;
