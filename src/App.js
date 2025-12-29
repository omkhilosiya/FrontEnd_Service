import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import DashboardLayout from "./layout/DashboardLayout";

import Login from "./pages/auth/SignIn/Login";
import Register from "./pages/auth/SignUp/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import Services from "./pages/Services/Services";
import Wallet from "./pages/Wallet/Wallet";
import Support from "./pages/Support/Support";
import UserManagement from "./pages/UserManagement/UserManagement";
import SubAgents from "./pages/Agents/SubAgents";
import AllSubAgent from "./pages/AddBalance/AllSubAgent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sub-agents" element={<SubAgents />} />
            <Route path="services" element={<Services />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="support" element={<Support />} />
            <Route path="usermanagement" element={<UserManagement />} />
            <Route path="addbalance" element={<AllSubAgent />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
