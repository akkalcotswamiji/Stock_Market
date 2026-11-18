
require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.TWELVE_DATA_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

const stocks = [
  { symbol: "RELIANCE", name: "Reliance Industries" },
  { symbol: "TCS", name: "Tata Consultancy Services" },
  { symbol: "INFY", name: "Infosys" },
  { symbol: "HDFCBANK", name: "HDFC Bank" },
  { symbol: "ICICIBANK", name: "ICICI Bank" },
  { symbol: "ITC", name: "ITC Limited" }
];

let cachedQuotes = null;
let lastFetched = 0;

app.get("/api/quotes", async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({
      error: "API key missing. Check your .env file."
    });
  }

  if (cachedQuotes && Date.now() - lastFetched < 60000) {
    return res.json({
      updatedAt: new Date(lastFetched).toISOString(),
      data: cachedQuotes
    });
  }

  try {
    const results = await Promise.all(
      stocks.map(async (stock) => {
        const url = new URL(
          "https://api.twelvedata.com/quote"
        );

        url.searchParams.set("symbol", stock.symbol);
        url.searchParams.set("mic_code", "XNSE");
        url.searchParams.set("apikey", API_KEY);

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "error" || data.code) {
          return {
            ...stock,
            error: data.message || "Quote unavailable"
          };
        }

        return {
          ...stock,
          price: Number(data.close),
          change: Number(data.change),
          percentChange: Number(data.percent_change),
          open: Number(data.open),
          high: Number(data.high),
          low: Number(data.low),
          volume: Number(data.volume)
        };
      })
    );

    cachedQuotes = results;
    lastFetched = Date.now();

    res.json({
      updatedAt: new Date(lastFetched).toISOString(),
      data: results
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to fetch market data."
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `MarketX running at http://localhost:${PORT}`
  );
});
