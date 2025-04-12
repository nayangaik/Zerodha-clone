// backend/model/HoldingsModel.js
const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required for a holding."],
        index: true
    },
    name: { // Name of the stock/asset
        type: String,
        required: true
    },
    qty: { // Quantity held
        type: Number,
        required: true,
        min: 0
    },
    avgPrice: { // Average buy price
        type: Number,
        required: true,
        min: 0
    },
    ltp: { // Last Traded Price (you might update this periodically)
        type: Number,
        required: true,
        min: 0
    },
    // You can calculate these values when querying or store them if needed frequently
    // currentValue: { type: Number },
    // investmentValue: { type: Number },
    // profitAndLoss: { type: Number },
    // dayChange: { type: Number },
    // dayChangePercentage: { type: Number }
});

// Optional: Create a compound index for efficient user-specific holding lookups
holdingSchema.index({ userId: 1, name: 1 }, { unique: true }); // Ensure a user doesn't have duplicate entries for the same stock name

const HoldingsModel = mongoose.model('Holding', holdingSchema); // Collection name will be 'holdings'

module.exports = HoldingsModel;
