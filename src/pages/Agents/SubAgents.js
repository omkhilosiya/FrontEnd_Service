import { useEffect, useState } from "react";
import { getAgents } from "./agentService";
import StatCard from "./StatCard";
import "./subagent.css";

const SubAgents = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("SUBAGENTS"); // AGENTS | SUBAGENTS

  const fetchData = async (value = "") => {
    try {
      setLoading(true);
      const res = await getAgents(value);
      setData(res.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchData(value);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!data) return null;

  /* 🔹 Stats based on active tab */
  const stats =
    activeTab === "AGENTS"
      ? {
          total: data.totalAgents ?? 0,
          active: data.activeAgents ?? 0,
          inactive: data.inactiveAgents ?? 0,
        }
      : {
          total: data.totalSubAgents ?? 0,
          active: data.activeSubAgents ?? 0,
          inactive: data.inactiveSubAgents ?? 0,
        };

  /* 🔹 Table data */
  const list =
    activeTab === "AGENTS"
      ? data.agents ?? []
      : data.subAgents ?? [];

  return (
    <div className="subagents-page">
      <h2>Agents & Subagents</h2>
      <p className="subtitle">Activity in last 7 days</p>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "AGENTS" ? "active" : ""}`}
          onClick={() => setActiveTab("AGENTS")}
        >
          Agents
        </button>
        <button
          className={`tab ${activeTab === "SUBAGENTS" ? "active" : ""}`}
          onClick={() => setActiveTab("SUBAGENTS")}
        >
          Subagents
        </button>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <StatCard title="Total" value={stats.total} color="purple" />
        <StatCard title="Active" value={stats.active} color="green" />
        <StatCard title="Inactive" value={stats.inactive} color="red" />
      </div>

      {/* Table Header */}
      <div className="table-header">
        <h3>
          {activeTab === "AGENTS" ? "Agents List" : "Sub Agents List"}
        </h3>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <table className="agent-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Joined Date</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Wallet Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No records found
              </td>
            </tr>
          ) : (
            list.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {new Date(item.createdDate).toLocaleDateString()}
                </td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>₹ {item.wallet?.balance ?? 0}</td>
                <td>
                  <span
                    className={
                      item.status ? "status active" : "status inactive"
                    }
                  >
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubAgents;
