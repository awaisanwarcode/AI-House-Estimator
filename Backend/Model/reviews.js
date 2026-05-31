import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true , unique: true},
    userRole: { type: String, required: true },
    review: { type: String, required: true },
});


const reviewModel = mongoose.model("reviews", reviewSchema);

export default reviewModel;