import { GoogleGenAI } from "@google/genai";
import argon2 from "argon2";
import mongoose from "mongoose";
import User from "../Model/user.js";
import { sendEmail } from "../utils/sendEmail.js";
import pendingUser from "../Model/pendingUser.js";
import JWT from "jsonwebtoken";
import reviewModel from "../Model/reviews.js";


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,

});

await mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected");
    })


export const estimateBudget = async (req, res) => {
    try {

        const houseData = req.body;

        const prompt = `
                You are an AI house construction estimator.

                Analyze the following house details and return a SHORT and structured response.

                House Details:
                - Area: ${houseData.area} sq ft
                - Rooms: ${houseData.rooms}
                - House Type: ${houseData.houseType}
                - Location: ${houseData.location}
                - Budget: ${houseData.budgetRange}
                - Preferred Currency: ${houseData.currency}
                - Description: ${houseData.desc}
                - Style: ${houseData.architecturalStyle}

                Instructions:
                - Keep the response concise.
                - List the recommended building materials suitable for constructing the house within the given budget under the materials section.
                - Use ${houseData.currency} Currency.
                - Do NOT generate long paragraphs.
                - Use short bullet points.
                - Detect unrealistic values and mention them briefly.
                - Keep each section under 3 lines.
                - Give practical and realistic estimates.

                Return the response in this exact JSON format only:

                {
                "warnings": [],
                "projectSummary": {
                "area": "",
                "houseType": "",
                "style": ""
                },
                "estimatedCost": {
                    "low": "",
                    "high": "",
                    "currency": "USD"
                },
                "timeline": {
                "design": "",
                "construction": "",
                "total": ""
                },
                "materials": [],
                "materialBreakdown": {
                    "perRoomCost": "",
                    "perFloorCost": "",
                    "perCeilingCost": "",
                    "notes": []
                },   
                "interiorRecommendations": [],
                "budgetFeasibility": {
                "status": "",
                "message": ""
            }
        }

        Return ONLY valid JSON.
        Do not add markdown.
        Do not add explanations outside JSON.
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        res.json({
            success: true,
            estimate: response.text
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error generating estimate"
        });
    }
};

export const registerUser = async (req, res) => {
    try {
        let { fName, sName, email, password } = req.body;
        if (!fName || !sName || !email || !password) {
            res.json({ success: false, message: "Some fields value is missing." });
        }

        let existingUser = await User.findOne({ email });

        let pendingUserData = await pendingUser.findOne({ email });

        if (pendingUserData) {
            return res.json({
                success: false,
                message: "Email is already registered. Please check your inbox for the verification OTP."
            });
        }

        if (existingUser) {
            return res.json({
                success: false,
                message: "Email already registered. User already exists."
            });
        } else {
            const otp = Math.floor(100000 + Math.random() * 900000);
            await pendingUser.create({
                email,
                firstName: fName,
                secondName: sName,
                password: await argon2.hash(password),
                otp,
                otpExpiry: new Date(Date.now() + 5 * 60 * 1000)
            });
            await sendEmail(email, otp, res);
        }
    } catch (error) {
        res.json({ success: false, message: "Something want wrong." });
    }
}


export const createUser = async (req, res) => {
    let { fName, sName, email, password } = req.body;
    try {
        let userData = await pendingUser.findOne({ email });
        let userExsist = await User.findOne({ email });
        if (userExsist) {
            return res.json({ success: false, message: "Email already registered. User already exists." });
        }
        if (!userData) {
            return res.json({ success: false, message: "No pending registration found for this email." });
        } else if (userData.otp != req.body.otp) {
            return res.json({ success: false, message: "Invalid OTP. Please check your email and try again." });
        } else if (userData.otpExpiry < new Date()) {
            return res.json({ success: false, message: "OTP has expired. Please register again." });
        } else {
            await User.create({
                email,
                firstName: fName,
                secondName: sName,
                password: userData.password
            });
            await pendingUser.deleteOne({ email });
            const token = JWT.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            res.json({ success: true, message: "Account verified and created successfully." });
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Something went wrong." });
    }
}


export const loginUser = async (req, res) => {
    let { email, password } = req.body;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.json({ success: false, message: "No account found with this email. Register first." });
        }
        if (await argon2.verify(userData.password, password)) {
            const token = JWT.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            res.json({ success: true, message: "Login successful." });
        } else {
            res.json({ success: false, message: "Incorrect credentials. Please try again." });
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Something went wrong." });
    }
}


export const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.json({ success: true, message: "Logout successful." });
}

export const addReview = async (req, res) => {
    let { review, name, email, role } = req.body;
    let tokenEmail = req.user.email;

    if (email != tokenEmail) {
        return res.json({ success: false, message: "Unauthorized. Email does not match token." });
    }

    try {
        if (!review || !email || !role || !name) {
            return res.json({ success: false, message: "All fields are required." });
        }
        let userData = await User.findOne({ email: req.user.email });
        let reviewExsist = await reviewModel.findOne({ userEmail: req.user.email });
        if (reviewExsist) {
            return res.json({ success: false, message: "Review already exists for this user." });
        }
        if (!userData) {
            return res.json({ success: false, message: "User not found." });
        }
        const newReview = await reviewModel.create({
            userName: name,
            userEmail: tokenEmail,
            userRole: role,
            review
        });
        res.json({ success: true, message: "Review added successfully." });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Something went wrong." });
    }
}


export const getReviews = async (req, res) => {
    try {
        let Reviews = await reviewModel.find({});
        let recentReviews = [];
        for (let i = Reviews.length - 1; i >= 0; i--) {
            if (recentReviews.length <= 5) {
                recentReviews.push(Reviews[i]);
            }
        }
        res.json({ success: true, reviews: recentReviews });
    } catch (error) {
        res.json({ success: false, message: "something went wrong" });
    }
}