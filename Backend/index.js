import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Router from "./router/routes.js";
const app = express();
app.use(cookieParser());

const PORT = process.env.PORT;
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
));
app.use(express.json());
app.use(Router);
app.listen(PORT, () => {
    console.log(`Alhumdulilah App is listening at ${PORT} .....`);
})