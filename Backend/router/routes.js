import express from "express";
import * as controller from "../controller/controller.js";
import { userMW } from "../Middlewares/usermiddleware.js";
const Router = express.Router();
Router.post("/estimate", controller.estimateBudget);
Router.post("/user/register", controller.registerUser);
Router.post("/user/verify-otp", controller.createUser);
Router.post("/user/login", controller.loginUser);
Router.get("/user/logout", controller.logoutUser);
Router.post("/user/add-review", userMW ,controller.addReview);
Router.get("/reviews",controller.getReviews);

export default Router;