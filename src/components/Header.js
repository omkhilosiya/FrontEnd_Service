import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/useAxiosPrivate";
import { useSelector } from "react-redux";

const styles = {
  
  right: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  logoutBox: {
    position: "absolute",
    top: "40px",
    right: "0",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    padding: "8px",
    zIndex: 100,
  },
  logoutBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
  },
};

export default function Header() {
  const auth = useSelector((state) => state.auth);
  const username = auth?.username;
  console.log(username);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosPrivate.post("/user/logout", {
        username: username,
      });

      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div style={styles.right}>
      <FaUserCircle
        size={28}
        color="#2a3b6b"
        style={{ cursor: "pointer" }}
        onClick={() => setShowLogout(!showLogout)}
      />

      {showLogout && (
        <div style={styles.logoutBox}>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
