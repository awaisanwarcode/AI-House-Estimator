import { useNavigate } from "react-router-dom";
import "./CTASec.css";

export const CTASec = () => {
    const navigate = useNavigate();
    return (
        <section className="ctaSection">

            <div className="ctaContent">

                <span>Start Today</span>

                <h2>
                    Ready To Design And Estimate
                    Your Dream House?
                </h2>

                <p>
                    Get accurate construction estimates, planning insights,
                    and AI-powered recommendations in minutes.
                </p>

                <div className="ctaBtns">

                    <button
                        className="primaryBtn"
                        onClick={() => navigate("/estimate")}
                    >
                        Start Estimation
                    </button>

                    <button
                        className="secondaryBtn"
                        onClick={() => navigate("/register")}
                    >
                        Create Account
                    </button>

                </div>

            </div>

        </section>
    )
}