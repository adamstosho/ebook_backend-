const express = require("express");
const Ebook = require('../models/ebookmodel');
const router = express.Router();
const { createEbook, updateEbook, getAllEbooks, getAnEbook, getBestSellers } = require("../controllers/ebookController");
const { adminProtect } = require("../middleware/authMiddleware");



router.post("/createEbook", adminProtect, createEbook);
router.put("/updateEbook/:id", adminProtect, updateEbook);
router.get("/getAllEbooks", getAllEbooks);
router.get("/getAnEbook/:id", getAnEbook);
router.get("/getBestSellers", getBestSellers);

module.exports = router