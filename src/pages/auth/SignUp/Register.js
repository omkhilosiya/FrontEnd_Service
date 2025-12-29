import { useRef, useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosPrivate , axiosPublic } from '../../../api/axios';
const REGISTER_URL = '/signup';

const Register = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState(''); 
    const [email, setEmail] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password, phoneNo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phoneNo.length !== 10) {
            toast.error("Phone number must be 10 digits");
            return;
        }

        console.log(username)


        try {
            const response = await axiosPrivate .post(
                REGISTER_URL,
                JSON.stringify({ username, password, phoneNo , email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const accessToken = response?.data?.jwtToken;
            const roles = response?.data?.roles[0];

            setAuth({ username, password , roles, accessToken });
            setUsername('');
            setPassword('');
            setPhoneNo('');
            setEmail('');
            toast.success("Registration successful!");

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 500);

        } catch (err) {
            let msg = "Registration Failed";

            if (!err?.response) msg = "No Server Response";
            else if (err.response?.status === 400) msg = "Missing Username or Password";
            else if (err.response?.status === 401) msg = "Unauthorized";

            setErrMsg(msg);
            toast.error(msg);
            errRef.current.focus();
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

            <h1 className="center-header">Sign Up</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="input-field"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="input-field"
                    required
                />

                <label htmlFor="password">Email</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="input-field"
                    required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    id="phone"
                    value={phoneNo}
                    maxLength={10}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setPhoneNo(value);
                    }}
                    className="input-field"
                    required
                />
                

                <button className="auth-btn">Sign Up</button>
            </form>

            <ToastContainer />

            <p className="redirect-text">
                Already have an account?<br />
                <span className="line">
                    <Link to="/login">Sign In</Link>
                </span>
            </p>
        </section>
    );
};

export default Register;
