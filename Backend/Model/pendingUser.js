import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, require: true },
    secondName: { type: String, require: true },
    password: { type: String, required: true },
    otp: { type: Number, required: true },
    otpExpiry: { type: Date, required: true }
})

const pendingUser = mongoose.model("pendingUsers", pendingUserSchema);

export default pendingUser;