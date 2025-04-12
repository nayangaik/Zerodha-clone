const express = require('express');
const app = express();
require('dotenv').config(); // Ensure JWT_SECRET is in your .env file
const cors = require('cors');
// Use express built-in body parser instead of the separate 'body-parser' package
 const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// --- Import Models ---
const HoldingsModel = require('./model/HoldingsModels');
const PositionsModel = require('./model/PositionsModels');
const OrderModels = require('./model/OrderModels');
const UserModel = require('./model/UserModel'); // Import the new User model

// --- Environment Variables ---
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET; // Add this to your .env file!

if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
    process.exit(1); // Exit if secret is missing
}
app.use(cors()); // 
app.use(bodyParser.json()); // <-- KEEP THIS LINE
app.use(bodyParser.urlencoded({ extended: true }));

// --- Database Connection & Server Start ---
mongoose.connect(uri)
    .then(() => {
        console.log("MongoDB connected successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit if DB connection fails
    });


// Add this to backend/index.js


// =========================================
// === AUTHENTICATION ROUTES ================
// =========================================

// --- Signup Route ---
app.post("/api/auth/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic Validation
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ username: username.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "Username already taken." }); // 409 Conflict
        }

        // Create new user (password hashing is handled by the pre-save hook in UserModel)
        const newUser = new UserModel({ username, password });
        await newUser.save();

        // Don't send password back, even hashed
        res.status(201).json({ message: "User created successfully!" }); // 201 Created

    } catch (error) {
        console.error("Signup Error:", error);
        // Handle Mongoose validation errors specifically
        if (error.name === 'ValidationError') {
            // Extract specific validation messages if needed
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: "Validation failed", errors: messages });
        }
        res.status(500).json({ message: "Server error during signup." });
    }
});

// --- Login Route ---
app.post("/api/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        // Find user by username
        const user = await UserModel.findOne({ username: username.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." }); // Use generic message
        }

        // Compare provided password with stored hash
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." }); // Use generic message
        }

        // --- Generate JWT ---
        const payload = {
            userId: user._id,
            username: user.username
            // Add other relevant non-sensitive info if needed (e.g., roles)
        };

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
        );

        // Send token (and optionally basic user info) back to client
        res.status(200).json({
            message: "Login successful!",
            token: token,
            user: { // Send only non-sensitive info
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});


// =========================================
// === AUTHORIZATION MIDDLEWARE ============
// =========================================

const protectRoute = (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Attach user info (excluding password) to the request object
            // You might want to fetch the fresh user data from DB here if needed
            req.user = { userId: decoded.userId, username: decoded.username }; // Attach decoded payload
            next(); // Proceed to the next middleware/route handler

        } catch (error) {
            console.error('Token verification failed:', error.message);
            // Handle specific JWT errors
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Not authorized, token failed' });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Not authorized, token expired' });
            }
            // Generic error for other issues
            return res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};


// =========================================
// === PROTECTED API ROUTES ================
// =========================================
// Apply the 'protectRoute' middleware BEFORE the route handlers that need protection

// --- Positions ---
// TODO: Modify to fetch positions *only for the logged-in user* (using req.user.userId)
app.get("/api/positions", protectRoute, async (req, res) => {
    try {
        // Example: Fetch positions associated with the logged-in user
        // const dbPositions = await PositionsModel.find({ userId: req.user.userId });
        const dbPositions = await PositionsModel.find({ userId: req.user.userId }); // Fetch all for now
        console.log(`Fetched ${dbPositions.length} positions for user ${req.user.username}.`);
        res.status(200).json(dbPositions);
    } catch (error) {
        console.error("Error fetching positions from DB:", error);
        res.status(500).json({ message: "Failed to fetch positions data", error: error.message });
    }
});

// --- Holdings ---
// TODO: Modify to fetch holdings *only for the logged-in user*
app.get("/api/holdings", protectRoute, async (req, res) => {
    try {
        // Example: Fetch holdings associated with the logged-in user
        // const dbHoldings = await HoldingsModel.find({ userId: req.user.userId });
        const dbHoldings = await HoldingsModel.find({ userId: req.user.userId }); // Fetch all for now
        console.log(`Fetched ${dbHoldings.length} holdings for user ${req.user.username}.`);
        res.status(200).json(dbHoldings);
    } catch (error) {
        console.error("Error fetching holdings from DB:", error);
        res.status(500).json({ message: "Failed to fetch holdings data", error: error.message });
    }
});

// --- Place Buy Order ---
// TODO: Associate the order with the logged-in user
app.post("/api/orders", protectRoute, async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;
        const userId = req.user.userId; // Get user ID from the protectRoute middleware

        // Basic Validation (keep existing)
        if (!name || !qty || !price || !mode) {
            return res.status(400).json({ message: "Missing required order fields (name, qty, price, mode)." });
        }
        // ... (keep other validations) ...

        console.log(`Received buy order request from user ${req.user.username}:`, req.body);

        // Create a new order document, associating it with the user
        const newOrder = new OrderModels({
            userId: userId, // Add the user ID
            name: name,
            qty: qty,
            price: price,
            mode: mode,
            // timestamp: new Date(),
            // status: 'PENDING'
        });

        const savedOrder = await newOrder.save();
        console.log("Buy order saved successfully:", savedOrder);
        res.status(201).json({ message: "Buy order placed successfully!", order: savedOrder });

    } catch (error) {
        console.error("Error processing buy order:", error);
        if (error.name === 'ValidationError') {
             return res.status(400).json({ message: "Order validation failed", error: error.message });
        }
        res.status(500).json({ message: "Failed to place buy order", error: error.message });
    }
});

// --- Get Orders ---
// TODO: Modify to fetch orders *only for the logged-in user*
app.get("/api/orders", protectRoute, async (req, res) => {
    try {
        // Example: Fetch orders associated with the logged-in user
        // const dbOrders = await OrderModels.find({ userId: req.user.userId }).sort({ _id: -1 });
        const dbOrders = await OrderModels.find({ userId: req.user.userId }).sort({ _id: -1 }); // Fetch all for now
        console.log(`Fetched ${dbOrders.length} orders for user ${req.user.username}.`);
        res.status(200).json(dbOrders);
    } catch (error) {
        console.error("Error fetching orders from DB:", error);
        res.status(500).json({ message: "Failed to fetch orders data", error: error.message });
    }
});


// =========================================
// === OTHER ROUTES (Example: Data Seeding) ===
// =========================================


// === DATA SEEDING ROUTES (Use with caution!) ===
// =========================================
// These routes insert the static data from data.js for the defaultUserId.
// Best used once for initial setup. Consider removing or protecting them afterwards.

// --- Seed Positions ---
app.get("/seed/positions", async (req, res) => { // Changed path for clarity
    try {
        // Import static data (ensure path is correct relative to index.js)
        // Note: Path might need adjustment depending on your exact folder structure
        const { positions } = require('../dashboard/src/data/data.js'); 

        if (!positions || positions.length === 0) {
             return res.status(400).json({ message: "No positions data found to import." });
        }

        // Optional: Clear existing positions for the default user before inserting
        // const defaultUserId = positions[0]?.userId; // Get userId from data
        // if (defaultUserId) {
        //     await PositionsModel.deleteMany({ userId: defaultUserId });
        //     console.log(`Cleared existing positions for user ${defaultUserId}`);
        // } else {
        //     console.warn("Could not determine defaultUserId from positions data to clear existing entries.");
        // }

        console.log(`Importing ${positions.length} static positions...`);
        const insertedPositions = await PositionsModel.insertMany(positions, { ordered: false }); // ordered:false attempts to insert all, even if some fail (e.g., duplicates)
        console.log(`${insertedPositions.length} positions added/processed.`);

        res.status(200).json({
            message: "Static positions data processed.",
            count: insertedPositions.length,
        });
    } catch (error) {
        console.error("Error in /seed/positions route:", error);
        // Handle potential duplicate key errors if unique index exists and data is re-inserted
        if (error.code === 11000) { // MongoDB duplicate key error code
             return res.status(409).json({ message: "Duplicate data detected. Some positions might not have been inserted.", error: error.message });
        }
        res.status(500).json({ message: "Failed to process positions data", error: error.message });
    }
});

// --- Seed Holdings ---
app.get("/seed/holdings", async (req, res) => { // Added route for holdings
    try {
        // Import static data (ensure path is correct relative to index.js)
        const { holdings } = require('../dashboard/src/data/data.js'); 

        if (!holdings || holdings.length === 0) {
             return res.status(400).json({ message: "No holdings data found to import." });
        }

        // Optional: Clear existing holdings for the default user before inserting
        // const defaultUserId = holdings[0]?.userId;
        // if (defaultUserId) {
        //     await HoldingsModel.deleteMany({ userId: defaultUserId });
        //     console.log(`Cleared existing holdings for user ${defaultUserId}`);
        // } else {
        //      console.warn("Could not determine defaultUserId from holdings data to clear existing entries.");
        // }

        console.log(`Importing ${holdings.length} static holdings...`);
        const insertedHoldings = await HoldingsModel.insertMany(holdings, { ordered: false });
        console.log(`${insertedHoldings.length} holdings added/processed.`);

        res.status(200).json({
            message: "Static holdings data processed.",
            count: insertedHoldings.length,
        });
    } catch (error) {
        console.error("Error in /seed/holdings route:", error);
         if (error.code === 11000) {
             return res.status(409).json({ message: "Duplicate data detected. Some holdings might not have been inserted.", error: error.message });
        }
        res.status(500).json({ message: "Failed to process holdings data", error: error.message });
    }
});

