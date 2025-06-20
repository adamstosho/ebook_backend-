const mongoose = require("mongoose");
const usermodel = require("./usermodel");

const cartSchema = new mongoose.Schema({
  userId:{
    
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    unique: true
  },
  cartList: {
    type: Array,
    default: []
  }

})

module.exports = mongoose.model("Cart", cartSchema);
// This code defines a Cart model using Mongoose, which includes a reference to the User model and an array for the cart items. The userId field is required, ensuring that each cart is associated with a specific user. The cartList field is initialized as an empty array by default, allowing for dynamic addition of items to the cart.