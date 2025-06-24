const express = require("express");
const User = require("../models/usermodel")
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

const {
  registerUser,
  registerAdmin,
  loginUser,
  logoutUser,
  getUserProfile,
  loginStatus
} = require("../controllers/userController");



router.post("/register", registerUser);
router.post("/register-admin", registerAdmin);
router.post("/login", loginUser);
router.get('/logout', logoutUser);
router.get("/profile", protect, getUserProfile);
router.get("/loginStatus", loginStatus)



module.exports = router;
