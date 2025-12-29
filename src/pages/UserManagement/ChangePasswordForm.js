import { useState, useEffect, useRef } from "react";
import { axiosPrivate } from "../../api/useAxiosPrivate";

export default function ChangePasswordForm({ email, incomingRole, onClose, refreshUsers }) {

  console.log("🔹 Component Loaded With Props:", { email, incomingRole });

  const [password, setPassword] = useState("");
  const [role, setRole] = useState("SUBAGENT");  // default
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    console.log("🔹 useEffect Triggered | Incoming Role =", incomingRole);

    let normalized = "SUBAGENT";

    if (Array.isArray(incomingRole)) {
      normalized = incomingRole.some(r => r.includes("AGENT")) ? "AGENT" : "SUBAGENT";
    } 
    
    else if (typeof incomingRole === "string") {
      normalized = incomingRole.includes("AGENT") ? "AGENT" : "SUBAGENT";
    }

    setRole(normalized);

    return () => {
      console.log("🔻 Component Unmounted");
      isMounted.current = false;
    };
  }, [incomingRole]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Submit Clicked");

    if (!password.trim()) {
      alert("Password is required");
      console.log("❌ Password empty");
      return;
    }

    try {
      if (isMounted.current) setLoading(true);

      console.log("📤 Sending API Request", {
        email,
        password,
        role
      });

      const res = await axiosPrivate.post("/changethepassword", {
        email,
        password,
        role
      });

      console.log("✔ API Success:", res?.data);

      if (!isMounted.current) return;

      alert("Password updated successfully");
      refreshUsers?.();   // refresh table safely
      onClose();

    } catch (err) {
      console.error("❌ API Error:", err);
      if (isMounted.current) alert("Failed to update password");

    } finally {
      if (isMounted.current) setLoading(false);
    }
  };


  return (
    <div className="password-overlay">
      <div className="password-form">
        <div className="form-header">
          <h3>Change Password</h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div className="username-display">
          <label>Email</label>
          <input type="text" value={email} disabled />
        </div>

        <form onSubmit={handleSubmit}>
          <label>User Role</label>

          <select
            value={role}
            onChange={(e) => {
              console.log("🔄 Role Changed:", e.target.value);
              setRole(e.target.value);
            }}
          >
            <option value="SUBAGENT">SUBAGENT</option>
            <option value="AGENT">AGENT</option>
          </select>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
