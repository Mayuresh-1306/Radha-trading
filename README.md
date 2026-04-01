<<<<<<< HEAD
# Radha Trading — Business Management & Trading Platform

A full-stack MERN application for stock portfolio management, real-time trading, and advanced analytics.

## Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Frontend    | React 18 + Vite, Bootstrap 5           |
| Backend     | Node.js, Express, Mongoose             |
| Database    | MongoDB Atlas                           |
| AI/ML       | Python, FastAPI, FinBERT (HuggingFace) |

---

## Project Structure

```
radha-trading/
├── frontend/          # React + Vite SPA
│   └── src/
│       ├── dashboard/ # Dashboard layout, pages & components
│       ├── context/   # AuthContext (state management)
│       └── ...
├── backend/           # Express REST API
│   ├── index.js       # Server, routes, Knapsack algorithm
│   ├── model/         # Mongoose models
│   └── schemas/       # Mongoose schemas
├── ai-service/        # Python FinBERT sentiment micro-service
│   ├── sentiment_service.py
│   ├── requirements.txt
│   └── venv/          # Virtual environment
└── README.md
```

---

## Quick Start

### 1. Backend

```bash
cd backend
npm install
# Create .env with MONGO_URL and JWT_SECRET
node index.js
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev          # → http://localhost:5173
```

### 3. AI Sentiment Service (optional)

```bash
cd ai-service
venv\Scripts\activate          # Windows
pip install -r requirements.txt
uvicorn sentiment_service:app --reload --port 8000
```

> **Note:** The first run downloads the FinBERT model (~440 MB). Requires Python 3.9+ and ~1 GB of disk space.

---

## Features

### Mobile-Responsive Dashboard
- **Sticky header** — navbar stays fixed at the top while scrolling.
- **Hamburger sidebar** — slide-in navigation on screens < 768 px.
- **Holdings card view** — holdings render as individual cards on mobile instead of a wide table.

### 0/1 Knapsack Budget Optimizer (DSA)

The backend exposes a `GET /api/knapsack?budget=<amount>` endpoint that uses the classic **0/1 Knapsack Dynamic Programming** algorithm to suggest the most profitable combination of stocks within a given budget.

#### Algorithm Details

| Property         | Value                          |
| ---------------- | ------------------------------ |
| **Approach**     | Bottom-up Dynamic Programming  |
| **Time Complexity**  | **O(n × W)** — `n` = number of stock items, `W` = budget (discretized to whole rupees) |
| **Space Complexity** | **O(n × W)** — 2-D DP table   |
| **Correctness**  | Optimal (exhaustive sub-problem evaluation) |

**How it works:**

1. Each holding from `HoldingsModel` is treated as a knapsack item:
   - **Weight** = `price × qty` (total cost to acquire the holding)
   - **Value** = estimated profit derived from the `net` percentage field
2. A 2-D DP table `dp[i][w]` is built where `dp[i][w]` represents the maximum achievable profit using the first `i` stocks with a budget of `w`.
3. After filling the table, a backtracking step reconstructs the selected stocks.

**Example request:**

```bash
curl -H "Authorization: Bearer <token>" \
     "http://localhost:3002/api/knapsack?budget=50000"
```

**Example response:**

```json
{
  "budget": 50000,
  "selectedStocks": [
    { "name": "RELIANCE", "qty": 2, "pricePerUnit": 2500, "totalCost": 5000, "estimatedProfit": 250, "net": "+5.0%" }
  ],
  "totalCost": 5000,
  "estimatedProfit": 250,
  "algorithm": "0/1 Knapsack (Dynamic Programming)",
  "timeComplexity": "O(n × W)"
}
```

### AI Sentiment Analysis

A standalone Python micro-service powered by [ProsusAI/FinBERT](https://huggingface.co/ProsusAI/finbert) that classifies stock-related news headlines as **Positive**, **Neutral**, or **Negative**.

- Endpoint: `GET http://localhost:8000/sentiment?symbol=RELIANCE`
- The React `Holdings.jsx` component fetches sentiment for each stock and displays a colour-coded badge in both table and card views.

---

## Environment Variables

### Backend (`.env`)

| Variable     | Description                     |
| ------------ | ------------------------------- |
| `MONGO_URL`  | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing      |
| `PORT`       | Server port (default: 3002)     |

### Frontend (`.env`)

| Variable    | Description              |
| ----------- | ------------------------ |
| `VITE_API`  | Backend API base URL     |

---

## License

This project is for educational and portfolio purposes.
=======
# Radha Trading 📈

A robust full-stack trading and business management platform. This application streamlines inventory tracking, sales logging, and data management for trading businesses, built using the MERN stack.

## 📂 Project Structure

Based on the repository layout, the project is organized into two primary directories:

* **backend/**: The Node.js and Express server handling API logic, database schemas (Models), and server-side routing.
* **frontend/**: The React.js application providing the user interface, including mobile-optimized CSS overrides.
* **.gitignore**: Prevents environment variables (`.env`) and dependency folders (`node_modules`) from being tracked.

## 🚀 Features

* **Inventory Tracking**: Manage and monitor stock levels in real-time.
* **Sales Management**: Log daily transactions and view historical sales data.
* **Mobile Responsive**: Includes specific CSS overrides for a seamless mobile experience.
* **Full-Stack Architecture**: Separation of concerns between the client and server for better scalability.

## 🛠️ Tech Stack

* **Frontend**: React.js, CSS
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Version Control**: Git & GitHub

## ⚙️ Getting Started

### Prerequisites

* **Node.js** (v14 or higher recommended)
* **MongoDB** (Local installation or a MongoDB Atlas URI)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Mayuresh-1306/Radha-trading.git](https://github.com/Mayuresh-1306/Radha-trading.git)
    cd Radha-trading
    ```

2.  **Configure the Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file and add your MONGO_URI and PORT
    npm start
    ```

3.  **Configure the Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

## 👤 Author

**Mayuresh**
* GitHub: [@Mayuresh-1306](https://github.com/Mayuresh-1306)

---
*Last Updated: 2025*
>>>>>>> b085c64d0393bf38cbddb4872889bca5d02cb301
