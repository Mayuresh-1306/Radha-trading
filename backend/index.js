require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Import Your Models ---
const { UserModel } = require('./model/UserModel');
const { HoldingsModel } = require('./model/HoldingsModel');
const { PositionsModel } = require('./model/PositionsModel');
const { OrdersModel } = require('./model/OrdersModel');

const JWT_SECRET = process.env.JWT_SECRET || 'Mayuresh_1306'; //
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors({
    origin: [
        'http://localhost:3000', // For local development
         'http://localhost:5173', 
        'https://radha-trading-frontend.onrender.com' // Your future frontend on Render
        // Add other domains if needed (e.g., custom domain)
    ],
    credentials: true, // Allows cookies/auth headers if you use them
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Explicitly allowed headers
}));
app.use(bodyParser.json());

// =========================================================================
// 1. JWT AUTHENTICATION MIDDLEWARE
// =========================================================================
const protectRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Verify token format "Bearer <token>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. Please log in.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info for use in subsequent routes
        next();
    } catch (ex) {
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

// =========================================================================
// 2. AUTHENTICATION ROUTES
// =========================================================================

// User Registration
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        if (error.code === 11000) { 
            return res.status(409).json({ error: "Email already in use." });
        }
        res.status(500).json({ error: "Server error during registration." });
    }
});

// User Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
        res.status(200).json({ token, name: user.name });
    } catch (error) {
        res.status(500).json({ error: "Server error during login." });
    }
});

// =========================================================================
// 3. PROTECTED DATA ROUTES (Middleware Applied)
// =========================================================================

// Fetch Dashboard Holdings
app.get("/allHoldings", protectRoute, async(req , res)=> {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch holdings." });
  }
});

// Fetch Dashboard Positions
app.get("/allPositions", protectRoute, async(req , res)=> {
  try {
    let allPostions = await PositionsModel.find({});
    res.json(allPostions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch positions." });
  }
});

// Place New Trading Order
app.post('/newOrder', protectRoute, async (req, res)=> {
    if (!req.body || !req.body.name) { 
        return res.status(400).send("Error: Missing order data.");
    }

    const newOrder = new OrdersModel({
       name: req.body.name,
       qty: req.body.qty,
       price: req.body.price,
       mode: req.body.mode,
    });

    try {
       await newOrder.save();
       res.send("Order saved!");
    } catch (error) {
       res.status(500).send("Failed to save order.");
    }
});

// =========================================================================
// 4. MONGODB CONNECTION
// =========================================================================
mongoose.connect(uri)
.then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
});
