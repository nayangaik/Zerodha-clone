// backend/model/OrderModels.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',                       
        required: [true, "User ID is required for an order."], 
        index: true                         
    },
    name: {
        type: String,
        required: [true, "Stock name is required."]
    },
    qty: {
        type: Number,
        required: [true, "Quantity is required."],
        min: [1, "Quantity must be at least 1."] // Example validation
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
        min: [0, "Price cannot be negative."] // Example validation
    },
    mode: { // e.g., 'BUY' or 'SELL'
        type: String,
        required: [true, "Order mode (BUY/SELL) is required."],
        enum: ['BUY', 'SELL'] // Restrict possible values
    },
    status: { // Optional: Track order status
        type: String,
        default: 'EXECUTED', // Or 'PENDING', 'CANCELLED' etc.
        enum: ['PENDING', 'EXECUTED', 'CANCELLED']
    },
    timestamp: { // Add a timestamp for when the order was created/placed
        type: Date,
        default: Date.now
    }
    // Add other relevant fields if needed (e.g., order type: Market, Limit)
});

const OrderModels = mongoose.model('Order', orderSchema); // Collection name will be 'orders'

module.exports = OrderModels;
