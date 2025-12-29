import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header  from "../components/Header";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const auth = useSelector((state) => state.auth);
  const userRole = auth?.roles?.[0];
  console.log(userRole);
  
  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <Sidebar userRole={userRole} />
      </div>
      {/* Main */}
      <div style={styles.main}>
        <div style={styles.header}>
          <Header />
        </div>

        <div style={styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: "#f8f9ff",
  },

  sidebar: {
    background: "#fff",
    borderRight: "1px solid #e5e5e5",
  },

  main: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    height: "65px",
    background: "#fff",
    borderBottom: "1px solid #e5e5e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    padding: "0 30px",
  },

  pageContent: {
    flex: 1,
    padding: "20px 0px 20px 90px",
    overflowY: "auto",
  },
};
