import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { axiosPublic } from "../../../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../app/authSlice";
import { scheduleAutoLogout } from "../../../components/scheduleAutoLogout";

const LOGIN_URL = "/signin";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
  console.log("AUTH STATE:", auth);
}, [auth]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  

  try {
    const response = await axiosPublic.post(
      LOGIN_URL,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = response.data;
    const token = data.jwtToken;

    if (!token) throw new Error("Token missing");

    // Save token
    localStorage.setItem("token", token);

    // 🔥 CORRECT Redux dispatch
    dispatch(loginSuccess(data));

      // Optional: auto logout
    scheduleAutoLogout(token);

    toast.success("Login successful!");

    

    // 🚀 Redirect (NO BACK)
    navigate("/dashboard", { replace: true });

    

  } catch (err) {
    let msg = "Login Failed";

    if (!err?.response) msg = "No Server Response";
    else if (err.response?.status === 400) msg = "Missing Username or Password";
    else if (err.response?.status === 401) msg = "Invalid Credentials";

    toast.error(msg);
  }
};


  return (
    <section className="auth-section">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1 className="center-header">Sign In</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          className="input-field"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
          className="input-field"
          required
        />

        <button className="auth-btn">Sign In</button>
      </form>

      <ToastContainer />

      <p className="redirect-text">
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
