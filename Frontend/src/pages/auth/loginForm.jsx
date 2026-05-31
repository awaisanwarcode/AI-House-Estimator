import { useState } from "react";
import "./loginForm.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { loginUserApi } from "../../apiCalls/apiCalls";
export const LoginForm = () => {
    let [userData, setUserdata] = useState({
        email: "",
        password: ""
    });

    let [notification, setNotification] = useState(null);
    let [notificationType, setNotificationType] = useState(null);
    let [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUserApi(userData, setNotification, setNotificationType, setLoading);
    }

    const navigate = useNavigate();
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="loginSec">

                <form className="loginBox" onSubmit={(e) => { handleSubmit(e) }}>

                    <div className="loginHeader">
                        <h2>Welcome Back</h2>
                        <p>Login to continue building your dream house estimates</p>
                    </div>

                    <label>
                        Email Address
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={userData.email}
                            onChange={(e) => setUserdata({ ...userData, email: e.target.value })}
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={userData.password}
                            onChange={(e) => setUserdata({ ...userData, password: e.target.value })}
                        />
                    </label>

                    {
                        (notification) ?
                            <div className={(notificationType) ? `notificationDiv ${notificationType} ` : ``}>
                                <p>
                                    {notification}
                                </p>
                            </div>
                            :
                            <></>
                    }

                    <button className="loginBtn" disabled={loading}>
                        {(loading) ? "Logging in..." : "Login"}
                    </button>

                    <p className="switchText">
                        Don’t have an account? <span onClick={() => { navigate("/register") }}>Register</span>
                    </p>

                </form>

            </section>
        </>
    )
}