import { useEffect, useState } from "react";
import "./heroSec.css";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
    const images = [
        "https://images.pexels.com/photos/7587470/pexels-photo-7587470.jpeg",
        "https://images.pexels.com/photos/18701139/pexels-photo-18701139.jpeg",
        "https://images.pexels.com/photos/28575436/pexels-photo-28575436.jpeg"
    ];
    const [currentImg, setCurrentImg] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setCurrentImg((prev) => (
                prev === images.length - 1 ? 0 : prev + 1
            ));
            setFade(false);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="heroImgCont">
                <img
                    src={images[currentImg]}
                    alt="Modern house"
                    className="heroImg"
                    style={(fade) ? { opacity: 0.5 } : { opacity: 1 }}
                />
                <div className="heroOverlay">
                    <h1>
                        Estimate Your <span>Dream House</span> Cost Instantly
                    </h1>
                    <p>
                        Get quick, accurate estimates for your dream home based on area, budget,
                        and customization preferences. Build smarter, plan better.
                    </p>
                    <button className="heroButton" onClick={() => { navigate("/estimate") }}>
                        Start Building →
                    </button>
                </div>
            </div>
        </section>
    );
};