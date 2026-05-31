import "./navbar.css";
import { Form, useNavigate } from "react-router-dom";
import image from "../../assets/image.png";
import { useEffect, useState } from "react";
import { logOutApi } from "../../apiCalls/apiCalls";
export const Navbar = () => {
    const navigate = useNavigate();
    let [showMenu, setShowMenu] = useState(false);
    let loggedIn = false;
    if (localStorage.getItem("isLoggedIn") === "true") {
        loggedIn = true;
    }
    return (
        <nav>
            <div className="navbar">
                <div className="lft-nav" onClick={() => { navigate("/") }}>
                    <div className="logo">
                        <img src={image} alt="logo" />
                        house-estimator
                    </div>
                </div>
                <ul className={`${(showMenu) ? "respons-navLink" : "nav-links"}`}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/estimate">Estimator</a></li>
                    <li><a href="#contact">Contact</a></li>
                    {
                        (loggedIn) ? (
                            <li><a href="#" onClick={(e) => { e.preventDefault(); logOutApi(); }}>log out</a></li>
                        ) : (
                            <>
                                <li><a href="/register">Register</a></li>
                                <li><a href="/login">login</a></li>
                            </>
                        )

                    }
                </ul>
                <div className="humburgerIcon" onClick={() => { setShowMenu(!showMenu) }}>
                    {showMenu ? "✖" : "☰"}
                </div>
            </div>
        </nav>
    )
}