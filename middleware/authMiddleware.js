const User = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const adminProtect = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (!user.isAdmin) {
        res.status(403); // Forbidden
        throw new Error("Access denied: not an admin");
    }

    req.user = user;
    next();
});
const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    
    req.user = user;
    next();
});

module.exports = {
    adminProtect,
    protect
}