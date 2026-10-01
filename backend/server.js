const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from your app and parse JSON bodies
app.use(cors());
app.use(express.json());

// Root route: quick check that the server is alive
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Simple test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend" });
});

// Example route that accepts data (test it later from your app)
app.post("/api/echo", (req, res) => {
  res.json({ received: req.body });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});