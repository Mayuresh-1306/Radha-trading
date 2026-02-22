"""
Radha Trading — AI Sentiment Analysis Micro-Service
=====================================================
Standalone FastAPI service using ProsusAI/FinBERT to
classify stock-related news headlines as Positive,
Neutral, or Negative.

Run:
    cd ai-service
    venv\\Scripts\\activate        (Windows)
    pip install -r requirements.txt
    uvicorn sentiment_service:app --reload --port 8000
"""

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

app = FastAPI(title="Radha Trading — Sentiment Service")

# ── CORS — allow frontend origins ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://radha-trading-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load FinBERT model once at startup ──
MODEL_NAME = "ProsusAI/finbert"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model=model,
    tokenizer=tokenizer,
    return_all_scores=False,
)

# ── Placeholder headlines per symbol (replace with a real news API) ──
SAMPLE_HEADLINES = {
    "RELIANCE":  "Reliance Industries posts record quarterly revenue beating analyst estimates",
    "TCS":       "TCS wins mega deal worth $2 billion from a European bank",
    "INFY":      "Infosys revises guidance downwards amid global slowdown fears",
    "HDFCBANK":  "HDFC Bank net profit rises 20% year-on-year on strong loan growth",
    "ICICIBANK": "ICICI Bank reports stable asset quality and robust deposit growth",
    "SBIN":      "State Bank of India faces pressure from rising NPAs in farm sector",
    "WIPRO":     "Wipro shares fall after weak guidance for upcoming quarter",
    "BHARTIARTL":"Bharti Airtel gains subscribers as 5G rollout accelerates across India",
    "KOTAKBANK": "Kotak Mahindra Bank under RBI scrutiny over IT compliance issues",
    "LT":        "Larsen & Toubro bags infrastructure orders worth ₹15,000 crore",
}


def get_headline(symbol: str) -> str:
    """Return a sample headline for the symbol, or a generic one."""
    return SAMPLE_HEADLINES.get(
        symbol.upper(),
        f"{symbol} stock shows mixed trading signals in the current market session",
    )


@app.get("/sentiment")
def analyze_sentiment(symbol: str = Query(..., description="Stock symbol")):
    """
    Analyse sentiment for a stock symbol using FinBERT.

    Returns:
        {
            "symbol":     "RELIANCE",
            "headline":   "...",
            "sentiment":  "positive" | "neutral" | "negative",
            "confidence": 0.94
        }
    """
    headline = get_headline(symbol)
    result = sentiment_pipeline(headline)[0]

    return {
        "symbol":     symbol.upper(),
        "headline":   headline,
        "sentiment":  result["label"].lower(),   # positive / neutral / negative
        "confidence": round(result["score"], 4),
    }


@app.get("/health")
def health_check():
    return {"status": "ok", "model": MODEL_NAME}
