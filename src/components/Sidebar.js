import { NavLink } from "react-router-dom";
import { FaThLarge, FaUserFriends, FaWallet, FaHome } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";

export default function Sidebar({ userRole }) {
  return (
    <div style={styles.container}>
      {/* Logo */}
      <div style={styles.logoBox}>
        <div style={styles.logoIcon}></div>
        <h2 style={styles.logoText}>Fastag</h2>
      </div>

      {/* Menu */}
      <div style={styles.menuBox}>
        <NavItem to="/dashboard" icon={<FaThLarge />} label="Dashboard" />

        {userRole === "ADMIN" && (
          <>
            <NavItem to="/sub-agents" icon={<FaUserFriends />} label="Sub Agents" />
            <NavItem to="/services" icon={<FiSettings />} label="Services" />
            <NavItem to="/wallet" icon={<FaWallet />} label="Wallet" />
            <NavItem to="/support" icon={<BiSupport />} label="Support" />
            <NavItem to="/usermanagement" icon={<FaHome />} label="User Management" />
            <NavItem to="/addbalance" icon={<FaWallet  />} label="Add Balance" />
          </>
        )}

        {userRole === "SUBAGENT" && (
          <>
            <NavItem to="/sub-agents" icon={<FaUserFriends />} label="Sub Agents" />
            <NavItem to="/services" icon={<FiSettings />} label="Services" />
            <NavItem to="/wallet" icon={<FaWallet />} label="Wallet" />
            <NavItem to="/support" icon={<BiSupport />} label="Support" />
          </>
        )}

        {userRole === "AGENT" && (
          <>
            <NavItem to="/services" icon={<FiSettings />} label="Services" />
            <NavItem to="/wallet" icon={<FaWallet />} label="Wallet" />
            <NavItem to="/support" icon={<BiSupport />} label="Support" />
          </>
        )}
      </div>
    </div>
  );
}

/* Reusable Menu Item */
function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...styles.menuItem,
        background: isActive ? "#3c4ad0" : "transparent",
        color: isActive ? "white" : "#2c3e50",
        fontWeight: isActive ? "600" : "500",
      })}
    >
      <span style={styles.icon}>{icon}</span>
      {label}
    </NavLink>
  );
}

const styles = {
  container: {
    width: "250px",
    height: "100vh",
    background: "#ffffff",
    padding: "25px 15px",
    borderRight: "1px solid #eee",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingBottom: "20px",
    marginBottom: "20px",
    borderBottom: "1px solid #f0f0f0",
  },

  logoIcon: {
    width: "35px",
    height: "35px",
    background: "linear-gradient(135deg, #6c5ce7, #a55eea)",
    borderRadius: "8px",
  },

  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: 0,
  },

  menuBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    borderRadius: "8px",
    fontSize: "16px",
    textDecoration: "none",
    transition: "0.3s",
  },

  icon: {
    fontSize: "18px",
  },
};
