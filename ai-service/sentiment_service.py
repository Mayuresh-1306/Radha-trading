"""
Radha Trading — AI Sentiment Analysis Micro-Service
=====================================================
Lightweight FastAPI service using TextBlob NLP to
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
from textblob import TextBlob

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

# ── Placeholder headlines per symbol (replace with a real news API) ──
SAMPLE_HEADLINES = {
    "RELIANCE":   "Reliance Industries posts record quarterly revenue beating analyst estimates",
    "TCS":        "TCS wins mega deal worth $2 billion from a European bank",
    "INFY":       "Infosys revises guidance downwards amid global slowdown fears",
    "HDFCBANK":   "HDFC Bank net profit rises 20% year-on-year on strong loan growth",
    "ICICIBANK":  "ICICI Bank reports stable asset quality and robust deposit growth",
    "SBIN":       "State Bank of India faces pressure from rising NPAs in farm sector",
    "WIPRO":      "Wipro shares fall after weak guidance for upcoming quarter",
    "BHARTIARTL": "Bharti Airtel gains subscribers as 5G rollout accelerates across India",
    "KOTAKBANK":  "Kotak Mahindra Bank under RBI scrutiny over IT compliance issues",
    "LT":         "Larsen & Toubro bags infrastructure orders worth 15000 crore",
}


def get_headline(symbol: str) -> str:
    """Return a sample headline for the symbol, or a generic one."""
    return SAMPLE_HEADLINES.get(
        symbol.upper(),
        f"{symbol} stock shows mixed trading signals in the current market session",
    )


def analyze_with_textblob(text: str) -> dict:
    """
    Use TextBlob to get polarity (-1 to +1) and map it to
    positive / neutral / negative with a confidence score.
    """
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity  # -1.0 (negative) to +1.0 (positive)

    if polarity > 0.1:
        sentiment = "positive"
    elif polarity < -0.1:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    # Map polarity magnitude to a 0-1 confidence score
    confidence = min(abs(polarity) * 1.5, 1.0)

    return {"sentiment": sentiment, "confidence": round(confidence, 4)}


@app.get("/sentiment")
def sentiment_endpoint(symbol: str = Query(..., description="Stock symbol")):
    """
    Analyse sentiment for a stock symbol using TextBlob NLP.

    Returns:
        {
            "symbol":     "RELIANCE",
            "headline":   "...",
            "sentiment":  "positive" | "neutral" | "negative",
            "confidence": 0.94
        }
    """
    headline = get_headline(symbol)
    result = analyze_with_textblob(headline)

    return {
        "symbol":     symbol.upper(),
        "headline":   headline,
        "sentiment":  result["sentiment"],
        "confidence": result["confidence"],
    }


@app.get("/health")
def health_check():
    return {"status": "ok", "model": "TextBlob-NLP"}


# ── Auto-start when run with: python sentiment_service.py ──
if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Radha Trading AI Sentiment Service on http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
