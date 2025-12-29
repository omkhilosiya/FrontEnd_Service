import { useState } from "react";
import { axiosPrivate } from "../../api/useAxiosPrivate";
import "./allSubAgent.css";

export default function AddBalanceModal({ user, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");

  const handleAddBalance = async () => {
    try {
      await axiosPrivate.post("/add-balance", {
        userId: user.userId,
        amount: Number(amount),
        note: "Admin added balance",
        date: new Date().toISOString()
      });

      onSuccess(); // refresh list
      onClose();
    } catch (error) {
      console.error("Failed to add balance", error);
      alert("Failed to add balance");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Balance</h3>
        <p>User: {user.username}</p>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleAddBalance}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
