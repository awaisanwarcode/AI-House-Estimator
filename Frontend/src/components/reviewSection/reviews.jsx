import { useEffect, useState } from "react";
import "./reviews.css";
import { getReviewsApi, submitReview } from "../../apiCalls/apiCalls";
import axios from "axios";

export const Reviews = () => {
    let [reviewData, setReviewdata] = useState({
        name: "",
        email: "",
        role: "",
        review: ""
    })
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviewsApi(setReviews);
    }, []);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setReviewdata((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    let [notification, setNotification] = useState(null);
    let [notificationType, setNotificationType] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitReview(reviewData, setNotification, setNotificationType);
    }

    return (
        <>
            <section className="testimonialSection">
                <div className="sectionHeader">
                    <span>Testimonials</span>
                    <h2>What People Say About Us</h2>
                    <p>
                        Homeowners and builders trust our AI-powered planning
                        platform to make smarter construction decisions.
                    </p>
                </div>
                <div className="testimonialGrid">
                    {
                        (reviews.length > 0) ?
                            reviews.map((item, idx) => (
                                <div className="testimonialCard" key={idx}>
                                    <p>
                                        “{item.review}”
                                    </p>
                                    <div className="userInfo">
                                        <div className="avatar">{item.userName.charAt(0)}</div>
                                        <div>
                                            <h4>{item.userName}</h4>
                                            <span>{item.userRole}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <p>No reviews yet. Be the first to share your experience!</p>
                    }
                </div>

            </section>

            <section className="reviewForm">
                <div className="formContainer">
                    <h2 className="formHeading">
                        Share Your Experience
                    </h2>

                    <p className="formSubHeading">
                        Your feedback helps us improve the platform and
                        build a better experience for everyone.
                    </p>

                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        <div className="inputGroup">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={reviewData.name}
                                onChange={(e) => { handleChange(e) }}
                                required
                            />

                            <input
                                type="text"
                                name="role"
                                placeholder="Your Role"
                                value={reviewData.role}
                                onChange={(e) => { handleChange(e) }}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                value={reviewData.email}
                                onChange={(e) => { handleChange(e) }}
                                placeholder="Your Email"
                                required
                            />
                        </div>

                        <textarea
                            placeholder="Write your review here..."
                            name="review"
                            value={reviewData.review}
                            onChange={(e) => { handleChange(e) }}
                            rows="6"
                            required
                        ></textarea>

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

                        <button type="submit">
                            Submit Review
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};