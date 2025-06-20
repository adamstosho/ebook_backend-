const jwt = require("jsonwebtoken");
const Ebook = require('../models/ebookmodel');

const generateToken = (id) => {
  try{
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log("Token generated successfully");
    return token;
  }catch (error) {
    console.error("Token generation failed:", error.message);
    return null;
};
}


const generateUniqueId = async () => {
  const latestEbook = await Ebook.findOne().sort({id: -1 }).lean();
  let newId = 1000;
  if(latestEbook && !isNaN(latestEbook.id)) {
    newId = parseInt(latestEbook.id) + 1;
  }
  return newId.toString();
} 

module.exports = {generateToken, generateUniqueId};