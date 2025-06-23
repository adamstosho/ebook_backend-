const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/index");
const User = require("../models/usermodel");

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 24 hours
        sameSite: "none",
        secure: false, // For local development
    });

    if (user) {
        const { _id, name, email, isAdmin, orderList, cartList } = user;
        res.status(201).json({
            _id,
            name,
            email,
            cartList,
            orderList,
            isAdmin,
            
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// Register Admin
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be at least 6 characters");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400);
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 24 hours
        sameSite: "none",
        secure: false, // For local development
    });

    if (user) {
        const { _id, name, email, isAdmin, orderList, cartList } = user;
        res.status(201).json({
            _id,
            name,
            email,
            cartList,
            orderList,
            isAdmin,
        });
    } else {
        res.status(400);
        throw new Error("Invalid admin data");
    }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide both email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid password");
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 24 hours
        sameSite: "none",
        secure: false, // For local development
    });

    const { _id, name, isAdmin, cartList, orderList } = user;
    res.status(200).json({
        _id,
        name,
        email,
        cartList,
        orderList,
        isAdmin,
        
    });
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), 
        sameSite: "none",
        secure: false,
    });

    res.status(200).json({ message: "Logged out successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user;
    if (user) {
        const { _id, name, email, isAdmin, orderList, cartList } = user;
        res.status(200).json({
            _id,
            name,
            email,
            cartList,
            orderList,
            isAdmin,
            
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}
);



module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    logoutUser,
    getUserProfile
};