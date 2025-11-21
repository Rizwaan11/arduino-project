import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Temporary variable to store latest readings
let latestReadings = {
  temperature: null,
  humidity: null,
  timestamp: null,
};

app.get("/", (req, res) => {
  console.log("🏠 Home Route Accessed");
  res.send("Welcome to the ESP32 Readings Server");
});
// ESP32 → Backend (POST readings)
app.post("/api/readings", (req, res) => {
  const { temperature, humidity } = req.body;

  if (temperature === undefined || humidity === undefined) {
    return res.status(400).json({ message: "Missing readings" });
  }

  latestReadings = {
    temperature,
    humidity,
    timestamp: new Date().toISOString(),
  };

  console.log("📥 New Readings Received:", latestReadings);

  res.json({ message: "Readings saved", latestReadings });
});

// Backend → Browser (show readings in webpage)
app.get("/readings", (req, res) => {
  res.render("readings", { latestReadings });
});

// Check from Postman
app.get("/api/readings", (req, res) => {
  res.json(latestReadings);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
