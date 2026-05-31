import JWT from "jsonwebtoken";
export const userMW = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.json({ success: false, message: "Unauthorized. Please login to continue." });
    }
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.json({ success: false, message: "Invalid token. Please login again." });
    }
}