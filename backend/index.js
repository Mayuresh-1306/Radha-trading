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
app.get("/allHoldings", protectRoute, async (req, res) => {
    try {
        let allHoldings = await HoldingsModel.find({});
        res.json(allHoldings);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch holdings." });
    }
});

// Fetch Dashboard Positions
app.get("/allPositions", protectRoute, async (req, res) => {
    try {
        let allPostions = await PositionsModel.find({});
        res.json(allPostions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch positions." });
    }
});

// Place New Trading Order
app.post('/newOrder', protectRoute, async (req, res) => {
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
// 4. 0/1 KNAPSACK — BUDGET OPTIMIZER (DSA)
// =========================================================================
/**
 * Classic 0/1 Knapsack Dynamic Programming algorithm.
 *
 * Given a budget (capacity) and an array of stocks, determine the
 * most profitable subset of stocks that can be purchased without
 * exceeding the budget.
 *
 * Each stock is treated as a single "item":
 *   weight = price × qty   (total cost to buy that holding)
 *   value  = estimated profit based on the `net` percentage
 *
 * Time  Complexity: O(n × W)  where n = number of stocks, W = budget
 * Space Complexity: O(n × W)  for the DP table
 *
 * @param {number}   budget  — maximum amount the user can spend
 * @param {Object[]} stocks  — array from HoldingsModel
 * @returns {{ selectedStocks: Object[], totalCost: number, estimatedProfit: number }}
 */
function knapsackBudgetOptimizer(budget, stocks) {
    const n = stocks.length;
    // Discretise budget to whole-number rupees
    const W = Math.floor(budget);

    // Pre-compute weight and value for each stock
    const items = stocks.map((s) => {
        const cost = Math.round(s.price * s.qty);          // weight
        const netPct = parseFloat(String(s.net).replace('%', '')) || 0;
        const profit = Math.abs((netPct / 100) * cost);      // value
        return { stock: s, cost, profit };
    });

    // Build DP table: dp[i][w] = max profit using first i items with capacity w
    const dp = Array.from({ length: n + 1 }, () => new Float64Array(W + 1));

    for (let i = 1; i <= n; i++) {
        const { cost, profit } = items[i - 1];
        for (let w = 0; w <= W; w++) {
            dp[i][w] = dp[i - 1][w]; // exclude item i
            if (cost <= w) {
                dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - cost] + profit);
            }
        }
    }

    // Backtrack to find selected items
    const selected = [];
    let remaining = W;
    for (let i = n; i > 0; i--) {
        if (dp[i][remaining] !== dp[i - 1][remaining]) {
            selected.push(items[i - 1]);
            remaining -= items[i - 1].cost;
        }
    }

    return {
        selectedStocks: selected.map((s) => ({
            name: s.stock.name,
            qty: s.stock.qty,
            pricePerUnit: s.stock.price,
            totalCost: s.cost,
            estimatedProfit: +s.profit.toFixed(2),
            net: s.stock.net,
        })),
        totalCost: selected.reduce((sum, s) => sum + s.cost, 0),
        estimatedProfit: +dp[n][W].toFixed(2),
    };
}

// ── Knapsack API Endpoint ──
app.get('/api/knapsack', protectRoute, async (req, res) => {
    try {
        const budget = parseFloat(req.query.budget);
        if (!budget || budget <= 0) {
            return res.status(400).json({ error: 'Provide a valid positive budget query parameter.' });
        }

        const stocks = await HoldingsModel.find({});
        if (!stocks.length) {
            return res.status(404).json({ error: 'No holdings available for analysis.' });
        }

        const result = knapsackBudgetOptimizer(budget, stocks);
        res.json({
            budget,
            ...result,
            algorithm: '0/1 Knapsack (Dynamic Programming)',
            timeComplexity: 'O(n × W)',
        });
    } catch (error) {
        res.status(500).json({ error: 'Knapsack analysis failed.' });
    }
});

// =========================================================================
// 5. LONGEST INCREASING SUBSEQUENCE — TECHNICAL TREND ANALYSIS (DSA)
// =========================================================================
/**
 * Longest Increasing Subsequence (LIS) using Dynamic Programming.
 *
 * Analyses an array of historical stock prices to determine
 * whether the stock is in a "True Growth" phase.
 *
 * A growth phase is detected when the LIS length is ≥ 60% of
 * total price data points — meaning a strong upward trend
 * dominates the price history.
 *
 * Time  Complexity: O(n²)
 * Space Complexity: O(n)
 *
 * @param {number[]} prices — array of historical prices (oldest → newest)
 * @returns {{ lisLength, totalPrices, growthRatio, isGrowthPhase, subsequence }}
 */
function longestIncreasingSubsequence(prices) {
    const n = prices.length;
    if (n === 0) return { lisLength: 0, totalPrices: 0, growthRatio: 0, isGrowthPhase: false, subsequence: [] };

    // dp[i] = length of LIS ending at index i
    const dp = new Array(n).fill(1);
    // parent[i] = index of previous element in the LIS ending at i
    const parent = new Array(n).fill(-1);

    let maxLen = 1;
    let maxIdx = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (prices[j] < prices[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            maxIdx = i;
        }
    }

    // Backtrack to reconstruct the subsequence
    const subsequence = [];
    let idx = maxIdx;
    while (idx !== -1) {
        subsequence.unshift(prices[idx]);
        idx = parent[idx];
    }

    const growthRatio = n > 0 ? maxLen / n : 0;

    return {
        lisLength: maxLen,
        totalPrices: n,
        growthRatio: +growthRatio.toFixed(4),
        isGrowthPhase: growthRatio >= 0.6,   // ≥ 60% = True Growth
        subsequence,
    };
}

// ── Verify Prediction API Endpoint ──
app.get('/verify-prediction', async (req, res) => {
    try {
        const symbol = req.query.symbol;
        if (!symbol) {
            return res.status(400).json({ error: 'Provide a stock symbol query parameter.' });
        }

        // Fetch all orders for this stock from the database
        const orders = await OrdersModel.find({ name: { $regex: new RegExp(symbol, 'i') } });

        // Fetch holding data for current price
        const holding = await HoldingsModel.findOne({ name: { $regex: new RegExp(symbol, 'i') } });

        // Build price history from orders (use order prices)
        let priceHistory = orders.map(o => o.price).filter(p => p > 0);

        // If no orders found, generate sample price history from holding data
        if (priceHistory.length < 3 && holding) {
            const avg = holding.avg || holding.price;
            const current = holding.price;
            // Generate a synthetic price path to demonstrate LIS
            priceHistory = [
                avg * 0.92,
                avg * 0.96,
                avg * 0.94,
                avg,
                avg * 1.02,
                avg * 0.98,
                avg * 1.04,
                current * 0.97,
                current * 0.99,
                current,
            ].map(p => +p.toFixed(2));
        }

        // Run LIS analysis
        const lisResult = longestIncreasingSubsequence(priceHistory);

        // Compare current price vs average entry price
        let priceVsAvg = 'neutral';
        if (holding) {
            const avg = holding.avg || 0;
            const current = holding.price || 0;
            if (current > avg * 1.02) priceVsAvg = 'above_avg';
            else if (current < avg * 0.98) priceVsAvg = 'below_avg';
        }

        // Determine technical signal
        let technicalSignal = 'neutral';
        if (lisResult.isGrowthPhase && priceVsAvg === 'above_avg') {
            technicalSignal = 'strong_growth';
        } else if (lisResult.isGrowthPhase) {
            technicalSignal = 'growth';
        } else if (!lisResult.isGrowthPhase && priceVsAvg === 'below_avg') {
            technicalSignal = 'decline';
        }

        res.json({
            symbol: symbol.toUpperCase(),
            priceHistory,
            lisResult,
            priceVsAvg,
            technicalSignal,
            holdingData: holding ? {
                name: holding.name,
                qty: holding.qty,
                avg: holding.avg,
                currentPrice: holding.price,
                net: holding.net,
            } : null,
            algorithm: 'Longest Increasing Subsequence (Dynamic Programming)',
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(n)',
        });
    } catch (error) {
        console.error('Verify prediction error:', error);
        res.status(500).json({ error: 'Prediction verification failed.' });
    }
});

// =========================================================================
// 6. MONGODB CONNECTION
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
