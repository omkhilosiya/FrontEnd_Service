import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
