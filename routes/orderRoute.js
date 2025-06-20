const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  placeOrder,
  getUserOrders,
  getOrderById
} = require('../controllers/orderController');

router.post('/placeOrder', protect, placeOrder);
router.get('/getUserOrders', protect, getUserOrders);
router.get('/getOrderById/:id', protect, getOrderById);


module.exports = router;