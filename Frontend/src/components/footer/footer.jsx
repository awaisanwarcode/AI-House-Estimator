import "./footer.css";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaArrowRight
} from "react-icons/fa";

export const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="footerTop">
                <div className="footerBrand">
                    <div className="logoBox">
                        AI
                    </div>
                    <h2>House Estimator</h2>
                    <p>
                        Smart AI-powered construction estimation,
                        budget planning, and interior suggestions
                        for modern homes.
                    </p>
                    <div className="socialIcons">
                        <a href="/">
                            <FaFacebookF />
                        </a>
                        <a href="/">
                            <FaInstagram />
                        </a>
                        <a href="/">
                            <FaLinkedinIn />
                        </a>
                        <a href="/">
                            <FaGithub />
                        </a>
                    </div>
                </div>
                <div className="footerLinks">
                    <div className="footerColumn">
                        <h3>Quick Links</h3>
                        <a href="/">Home</a>
                        <a href="/">Features</a>
                        <a href="/">Estimations</a>
                        <a href="/">Contact</a>
                    </div>
                    <div className="footerColumn">
                        <h3>Services</h3>
                        <a href="/">Budget Planning</a>
                        <a href="/">AI Suggestions</a>
                        <a href="/">Interior Themes</a>
                        <a href="/">Cost Reports</a>
                    </div>
                </div>
                <div className="footerNewsletter">
                    <h3>Contact Us</h3>
                    <p className="contactText">
                        Connect with us for smart AI-based
                        house estimation and modern interior
                        planning solutions.
                    </p>
                    <div id="contactUs" className="contactInfo">
                        <div className="contactItem">
                            <FaEnvelope />
                            <span>aihouseestimator@gmail.com</span>
                        </div>
                        <div className="contactItem">
                            <FaPhoneAlt />
                            <span>+92 317 3441884</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footerBottom">
                <p>
                    © 2026 AI House Estimator. All rights reserved.
                </p>
            </div>
        </footer>
    )
}