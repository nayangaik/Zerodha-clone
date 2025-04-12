// backend/model/PositionsModel.js
const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required for a position."],
        index: true
    },
    product: { // e.g., MIS, CNC/NRML
        type: String,
        required: true
    },
    name: { // Name of the stock/asset
        type: String,
        required: true
    },
    qty: { // Quantity (can be negative for short positions)
        type: Number,
        required: true
    },
    avgPrice: { // Average price of the position
        type: Number,
        required: true,
        min: 0
    },
    ltp: { // Last Traded Price
        type: Number,
        required: true,
        min: 0
    },
    // You can calculate P&L when querying or store it
    // profitAndLoss: { type: Number },
});

// Optional: Compound index
positionSchema.index({ userId: 1, name: 1, product: 1 }, { unique: true }); // Ensure uniqueness per user, stock, and product type

const PositionsModel = mongoose.model('Position', positionSchema); // Collection name will be 'positions'

module.exports = PositionsModel;
