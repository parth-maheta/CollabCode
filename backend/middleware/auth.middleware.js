import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers?.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      res.cookie("token", "");
      return res
        .status(401)
        .json({ message: "Unauthorized: Token is blacklisted." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Please authenticate." });
  }
};
