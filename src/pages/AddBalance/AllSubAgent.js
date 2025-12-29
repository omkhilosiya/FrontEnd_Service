import { useEffect, useState } from "react";
import AddBalanceModal from "./AddBalanceModal";
import { axiosPrivate } from "../../api/useAxiosPrivate"; // ✅ use this
import "./allSubAgent.css";

export default function AllSubAgent() {
  const [subAgents, setSubAgents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchSubAgents();
  }, []);

  const fetchSubAgents = async () => {
    try {
      const res = await axiosPrivate.get("/subagents");
      setSubAgents(res.data);
    } catch (error) {
      console.error("Failed to fetch sub agents", error);
    }
  };

  return (
    <div className="subagents-page">
      <h2 className="page-title">Sub Agents</h2>

      <table className="subagents-table">
        <thead>
          <tr>
            <th className="table-head">Username</th>
            <th className="table-head">Balance</th>
            <th className="table-head">Action</th>
          </tr>
        </thead>
        <tbody>
          {subAgents.map((user) => (
            <tr key={user.userId} className="table-row">
              <td className="table-cell username-cell">{user.username}</td>
              <td className="table-cell balance-cell">
                ₹ {user.balance}
              </td>
              <td className="table-cell action-cell">
                <button
                  className="add-balance-btn"
                  onClick={() => setSelectedUser(user)}
                >
                  Add Balance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <AddBalanceModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSuccess={fetchSubAgents}
        />
      )}
    </div>
  );
}
