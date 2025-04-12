const mongoose = require('mongoose');
const { Schema } = mongoose; // Or just use mongoose.Schema directly below


const OrderSchema = new mongoose.Schema({
   
    name: String,
    qty: Number,
    price: Number,
    mode: String,
})

module.exports ={OrderSchema};