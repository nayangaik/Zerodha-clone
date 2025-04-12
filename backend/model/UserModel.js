// backend/model/UserModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'], // Example validation
    },
    // You can add more fields like email, name, creation date etc.
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// --- Password Hashing Middleware ---
// Hash password before saving a new user
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt (10 rounds is generally good)
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pass error to the next middleware/handler
    }
});

// --- Password Comparison Method ---
// Method to compare candidate password with the hashed password in the DB
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


const UserModel = mongoose.model('User', userSchema); // 'User' will be the collection name 'users'

module.exports = UserModel;
