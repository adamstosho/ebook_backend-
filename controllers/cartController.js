
const Cart = require("../models/cartmodel");
const asyncHandler = require("express-async-handler");
const Ebook = require("../models/ebookmodel");

const addToCart = asyncHandler(async (req, res) => {

  const userId = req.user._id; // Get user ID from the request
  const {id} = req.body; // Get ebook ID from the request body

  
    let cart = await Cart.findOne({ userId });
    const ebook = await Ebook.findOne({id})

    if (!ebook) {
      res.status(404);
      throw new Error("Ebook not found");
    }

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ 
        userId, 
        cartList: [ebook]
    })


  }else{
    const existingCartIndex = cart.cartList.findIndex(
      item => item.id === id
    );
    if(existingCartIndex !== -1){
    res.status(400)
    throw new Error("Ebook already exists in the cart");
    }else{
      // If cart exists, add the ebook to the cartList
      cart.cartList.push(ebook);
    }
  }

  const savedCart = await cart.save();
  res.status(201).json(savedCart);
});

const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from the request
  const { id } = req.body; // Get ebook ID from the request body

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const existingCartIndex = cart.cartList.findIndex(
    item => item.id === id
  );

  if (existingCartIndex === -1) {
    res.status(404);
    throw new Error("Ebook not found in the cart");
  }

  // Remove the ebook from the cartList
  cart.cartList.splice(existingCartIndex, 1);

  const savedCart = await cart.save();
  res.status(200).json(savedCart);
})

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from the request

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  // Clear the cartList
  cart.cartList = [];

  const clearedCart = await cart.save();
  res.status(200).json(clearedCart);
});

const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from the request

  const cart = await Cart.findOne({ userId })
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.status(200).json(cart)
})


module.exports = {
  addToCart, removeFromCart, clearCart, getUserCart
  // Other cart-related functions can be added here
};