import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized invalid token" });
    }

    const user = await User.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
