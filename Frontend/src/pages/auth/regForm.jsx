import { useEffect, useState } from "react";
import "./regForm.css";
import { Navbar } from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../../apiCalls/apiCalls";
export const RegForm = () => {

    let [otp, setOtp] = useState(null);
    let [notification, setNotification] = useState(null);
    let [notificationType, setNotificationType] = useState(null);
    let [loading, setLoading] = useState(false);

    let [formData, setFormData] = useState({
        fName: "",
        sName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp) {
            formData.otp = otp;
        }
        registerUserApi(formData, setOtp, setNotification, setNotificationType, setLoading);
    }

    const navigate = useNavigate();
    return (
        <>
            <header>
                <Navbar />
            </header>
            <section className="regSec">
                <div className="regLftSec">
                    <span className="tagLine">
                        Smart AI Planning Platform
                    </span>
                    <h1>
                        Design & Estimate Your Dream House
                    </h1>
                    <p>
                        Create modern house plans, estimate construction costs,
                        explore architectural styles, and get AI-powered insights
                        for your future home — all in one intelligent platform.
                    </p>
                    <div className="regBtns">
                        <button className="homeBtn" onClick={() => navigate("/")}>
                            ← Back Home
                        </button>
                    </div>
                </div>
                <form className="regForm" onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="formTop">
                        <h2>Create Account</h2>
                        <p>
                            Start planning your dream home with AI assistance.
                        </p>
                    </div>
                    <label>
                        First Name
                        <input
                            type="text"
                            name="fName"
                            placeholder="Enter your first name"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                    <label>
                        Last Name
                        <input
                            type="text"
                            name="sName"
                            placeholder="Enter your last name"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                    <label>
                        Email Address
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            placeholder="Create strong password"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                    {
                        otp &&
                        <label>
                            Verification Code
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter 6-digit OTP"
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </label>
                    }

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

                    <button className="submitBtn" disabled={loading}>
                        {
                            otp
                                ? (loading) ? "verifying" : "Verify Account"
                                : (loading) ? "Sending OTP" : "Send OTP"
                        }
                    </button>
                    <p className="loginText">
                        Already have an account?
                        <span onClick={() => { navigate("/login") }}> Sign in</span>
                    </p>
                </form>
            </section>
        </>
    )
}