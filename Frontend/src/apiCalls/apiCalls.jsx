import axios from "axios";
let Url = "http://localhost:3000";

export const estimateBudgetApi = (formData, setResponse, setLoading) => {
    setLoading(true);
    axios.post(`${Url}/estimate`, formData)
        .then((res) => {
            const parsedEstimate = JSON.parse(res.data.estimate);
            setResponse(parsedEstimate);
            setLoading(false);
        }).catch((err) => {
            console.log("Error = ", err);
            setLoading(false);
        })
}

export const registerUserApi = (formData, setOtp, setNotification, setNotificationType, setLoading) => {
    let api;
    setLoading(true);
    if (formData.otp) {
        api = `${Url}/user/verify-otp`;
    } else {
        api = `${Url}/user/register`;
    }

    axios.post(api, formData, { withCredentials: true })
        .then((res) => {
            if (res.data.success && res.data.otpSent) {
                setOtp(res.data.otpSent);
                setNotification(res.data.message);
                setNotificationType("success");
                setLoading(false);
            } else if (res.data.success && !res.data.otpSent) {
                setNotification(res.data.message);
                setNotificationType("success");
                localStorage.setItem("isLoggedIn", "true");
                setLoading(false);
            } else if (!res.data.success) {
                setNotification(res.data.message);
                setNotificationType("error");
                setLoading(false);
            }
        }).catch((err) => {
            setNotification("Something went wrong. Please try again.");
            setNotificationType("error");
            setLoading(false);
        })
}

export const loginUserApi = (formData, setNotification, setNotificationType, setLoading) => {
    setLoading(true);
    axios.post(`${Url}/user/login`, formData, {
        withCredentials: true
    })
        .then((res) => {
            if (res.data.success) {
                setNotification(res.data.message);
                setNotificationType("success");
                localStorage.setItem("isLoggedIn", "true");
                setLoading(false);
            } else {
                setNotification(res.data.message);
                setNotificationType("error");
                setLoading(false);
            }
        }).catch((err) => {
            setNotification("Something went wrong. Please try again.");
            setNotificationType("error");
            setLoading(false);
        })
}

export const submitReview = (reviewData, setNotification, setNotificationType) => {
    axios.post(`${Url}/user/add-review`, reviewData, {
        withCredentials: true
    }).then((res) => {
        setNotification(res.data.message);
        setNotificationType("success");
    }).catch((err) => {
        setNotification("Something went wrong. Please try again.");
        setNotificationType("error");
    })
}

export const getReviewsApi = (setReviews) => {
    axios.get(`${Url}/reviews`).then((res) => {
        setReviews(res.data.reviews);
    }).catch((err) => {
        console.log(err);
    });
}

export const logOutApi = () => {
    axios.get(`${Url}/user/logout`, {
        withCredentials: true
    }).then((res) => {
        console.log(res.data);
        if (res.data.success) {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/";
        }
    }).catch((err) => {
        console.log(err);
    })
}




// Resources for you:

// Referral Template: https://docs.google.com/document/d/13SXSlLCAWqUJSsCWBlOLgeGHC39NdYLm4kWiW2q3KAw/edit?usp=sharing

// Project Ideas for you to make in 2026: https://docs.google.com/document/d/13SXSlLCAWqUJSsCWBlOLgeGHC39NdYLm4kWiW2q3KAw/edit?usp=sharing