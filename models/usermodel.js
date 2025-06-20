const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    trim: true,
    unique: true
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  password: {
    type: String,
    required: [true, "Please input a password"]
  },

  name: {
    type: String,
    required: true
  },

  cartList: {
    type: Array,
    default: []
  },

  orderList: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('User', userSchema);
