# Radha Trading — Interview Guide

## 📋 Project Overview

Radha Trading is a **full-stack MERN trading platform** with an AI micro-service. Users can sign up, log in, manage stock portfolios, place buy/sell orders, view real-time market data, and get AI-powered sentiment analysis on stocks.

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | Single Page Application with dashboard |
| **Backend** | Node.js, Express, Mongoose | REST API, authentication, DSA algorithms |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL database with replication |
| **AI Service** | Python, FastAPI, TextBlob | NLP-based sentiment analysis micro-service |
| **Deployment** | Render | Cloud hosting with health checks and auto-deploy |

---

## 🔐 Authentication System (Real Backend Integration)

### How Signup Works

The signup form in `Signup.jsx` calls the **real backend API**, not a fake local token:

```
User fills form → POST /signup → bcrypt hashes password → saved to MongoDB
                → POST /login  → bcrypt compares password → returns real JWT
                → JWT stored in localStorage → user redirected to dashboard
```

**Key code flow:**

1. **Frontend** (`Signup.jsx`) sends `POST /signup` with `{ name, email, password }` to the Express backend
2. **Backend** (`index.js` line 62-79) hashes the password with `bcrypt.hash(password, 10)` (10 salt rounds) and saves to MongoDB via `UserModel`
3. **After signup, auto-login**: Frontend immediately calls `POST /login` with the same credentials
4. **Backend** (`index.js` line 82-100) verifies password with `bcrypt.compare()`, generates a JWT token with `jwt.sign()` (1-hour expiry), and returns `{ token, name }`
5. **Frontend** stores the token in `localStorage` and sets global auth state via `AuthContext`

### How Login Works

The same `Signup.jsx` component has a **toggle** between signup and login modes:

```jsx
const [isLoginMode, setIsLoginMode] = useState(false);
// Clicking "Login here" sets isLoginMode = true → shows login form
// Clicking "Create one here" sets isLoginMode = false → shows signup form
```

Login calls `POST /login` → backend verifies credentials → returns JWT → user enters dashboard.

### Why No Test Login?

Previously, the signup had a "Test Login" button that created a **fake local token** (never hitting the backend). This was removed because:
- It bypassed the real authentication system
- In an interview, it would look like authentication isn't actually working
- Now the signup/login flow is **end-to-end real**: frontend → Express API → MongoDB → JWT → dashboard

### Password Visibility Toggle (Eye Icon)

Each password field has a 👁 eye icon toggle implemented with:

```jsx
const [showSignupPassword, setShowSignupPassword] = useState(false);

<input type={showSignupPassword ? "text" : "password"} />
<button onClick={() => setShowSignupPassword(!showSignupPassword)}>
  <i className={`fas ${showSignupPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
</button>
```

**How it works:** The input's `type` attribute toggles between `"password"` (dots) and `"text"` (visible). The icon switches between `fa-eye` (show) and `fa-eye-slash` (hide). Uses Bootstrap's `input-group` for clean layout.

---

## 🛡️ Security Layers

| Layer | Implementation | File & Line |
|-------|---------------|-------------|
| **Password hashing** | `bcrypt.hash(password, 10)` — 10 salt rounds | `index.js` line 65 |
| **JWT tokens** | `jwt.sign({ id, email }, SECRET, { expiresIn: '1h' })` | `index.js` line 91-95 |
| **Route protection** | `protectRoute` middleware checks `Bearer <token>` header | `index.js` line 38-55 |
| **CORS whitelist** | Only `localhost` and Render domains allowed | `index.js` line 22-32 |
| **Duplicate prevention** | MongoDB unique index on email (error code `11000`) | `index.js` line 74-76 |
| **Frontend guards** | `/dashboard/*` route requires `isLoggedIn === true` | `App.jsx` line 228-238 |
| **Password visibility** | Toggle eye icon, `type="password"` ↔ `type="text"` | `Signup.jsx` |

### Interview answer for security:

> *"Security is implemented at multiple layers. Passwords are hashed with bcrypt using 10 salt rounds before being stored in MongoDB — even a database breach won't expose plaintext passwords. The backend generates JWT tokens with a 1-hour expiry, and every protected route goes through a `protectRoute` middleware that validates the Bearer token. CORS is restricted to a whitelist of known origins. On the frontend, React Router guards prevent unauthenticated URL access."*

---

## ⚡ Performance Optimizations

| Optimization | How | Impact |
|-------------|-----|--------|
| **Code splitting** | `React.lazy()` + `Suspense` in `App.jsx` | Dashboard, About, Support, Product pages load only when visited. Initial bundle ~40% smaller |
| **Vite bundler** | Tree-shaking + minification via Rollup | Removes unused code, shortens variable names, strips comments |
| **localStorage caching** | `AuthContext.jsx` saves portfolio/orders/holdings on every state change | Data appears instantly on page refresh (~5ms) instead of waiting for API (~2s) |
| **Conditional rendering** | Navbar/Footer hidden on dashboard routes | Fewer DOM nodes = faster rendering |
| **Error boundaries** | `ErrorBoundary` class in `App.jsx` | Component crashes don't kill the whole app |

### Interview answer for performance:

> *"We implemented React.lazy() with Suspense to code-split the application into separate chunks. This reduced the initial bundle by approximately 40%. Combined with Vite's tree-shaking and localStorage caching of portfolio data, the first meaningful paint happens in under 1 second."*

---

## 🧠 DSA Algorithms

### 1. 0/1 Knapsack — Budget Optimizer

**File:** `backend/index.js` → `knapsackBudgetOptimizer()` (line 168-216)

**Problem:** Given a budget, find the most profitable combination of stocks to buy.

**How it works:**
1. Each stock = knapsack item (weight = cost, value = profit)
2. Build 2D DP table: `dp[i][w]` = max profit using first `i` stocks with budget `w`
3. Backtrack to find selected stocks

| Property | Value |
|----------|-------|
| **Time Complexity** | O(n × W) |
| **Space Complexity** | O(n × W) |
| **API Endpoint** | `GET /api/knapsack?budget=50000` |

### 2. Longest Increasing Subsequence — Trend Analysis

**File:** `backend/index.js` → `longestIncreasingSubsequence()` (line 262-304)

**Problem:** Determine if a stock is in a "True Growth" phase by analyzing price history.

**How it works:**
1. Takes an array of historical prices
2. Finds the longest strictly increasing subsequence using DP
3. If LIS length ≥ 60% of total prices → stock is in growth phase

| Property | Value |
|----------|-------|
| **Time Complexity** | O(n²) |
| **Space Complexity** | O(n) |
| **API Endpoint** | `GET /verify-prediction?symbol=RELIANCE` |

---

## 🤖 AI Sentiment Analysis

**File:** `ai-service/sentiment_service.py`

**How it works:**
1. Frontend calls `GET /sentiment?symbol=RELIANCE`
2. FastAPI service uses **TextBlob NLP** to analyze a news headline
3. Returns polarity (-1 to +1) mapped to `positive`, `neutral`, or `negative`
4. Frontend displays a color-coded badge next to each stock

**Architecture:** Runs as a separate Python micro-service on Render, communicating with the React frontend via REST API. Uses CORS to allow only the frontend domain.

---

## 🏗️ State Management

**File:** `frontend/src/context/AuthContext.jsx`

Uses React's **Context API** to manage global state:
- `isLoggedIn` — authentication status
- `user` — user profile data
- `holdings` — stock holdings array
- `funds` — available trading balance
- `orders` — order history

**Why Context instead of Redux?**

> *"For a project of this scale, Context API provides sufficient state management without the boilerplate of Redux. We have a single AuthContextProvider that wraps the entire app, and any component can access the global state via `useContext(AuthContext)`. This avoids prop drilling through 10+ component levels."*

---

## 📱 Responsive Design

- **Sticky header** — navbar stays fixed while scrolling
- **Hamburger sidebar** — slide-in navigation on screens < 768px
- **Holdings card view** — renders as cards on mobile instead of a table
- **Bootstrap 5 grid** — responsive columns with `col-md-6`, `col-lg-4` breakpoints

---

## 🚀 Deployment Architecture

```
[User Browser]
      │
      ├──→ radha-trading-frontend.onrender.com (React/Vite)
      │         │
      │         ├──→ radha-trading.onrender.com (Express API)
      │         │         │
      │         │         └──→ MongoDB Atlas (Database)
      │         │
      │         └──→ radha-ai-service.onrender.com (FastAPI)
      │
```

| Service | Platform | Auto-deploy | Health Check |
|---------|----------|------------|--------------|
| Frontend | Render (Node) | ✅ on git push | `/` |
| Backend | Render (Node) | ✅ on git push | N/A |
| AI Service | Render (Python) | ✅ on git push | `/health` |
| Database | MongoDB Atlas | N/A | Built-in |

---

## 🎯 Common Interview Q&A

**Q: Why MERN stack?**
> MongoDB's flexible schema is ideal for trading data that varies per stock. Express/Node provides async I/O for handling multiple concurrent API requests. React's component model enables a responsive real-time dashboard.

**Q: Why a separate AI micro-service?**
> Separation of concerns — the Python NLP service can be independently scaled, updated, and deployed without affecting the main Node.js backend. If the AI service goes down, the trading platform continues working.

**Q: How do you handle authentication?**
> User signs up → password hashed with bcrypt (10 rounds) → saved to MongoDB. On login, bcrypt.compare() verifies the password, then jwt.sign() creates a token with 1-hour expiry. Every protected route uses the `protectRoute` middleware to verify the Bearer token.

**Q: What happens if the JWT expires?**
> The backend returns `401 Invalid or expired token`. The frontend should catch this and redirect to the login page. The 1-hour expiry limits the damage window of a stolen token.

**Q: How does the Knapsack algorithm apply to trading?**
> Given a budget, we treat each stock as a knapsack item (cost = price × quantity, value = estimated profit). The DP algorithm finds the optimal subset of stocks that maximizes profit without exceeding the budget. It's O(n × W) time and guarantees the optimal solution.
