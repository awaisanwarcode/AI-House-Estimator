import mongoose from "mongoose";

const userShemea = new mongoose.Schema({
    firstName: { type: String, require: true },
    secondName: { type: String, require: true },
    email: { type: String, require: true , unique: true },
    password: { type: String, require: true },
});

const User = mongoose.model("User", userShemea);

export default User;