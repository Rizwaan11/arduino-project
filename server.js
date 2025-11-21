import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

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

app.post("/readings", (req, res) => {
  console.log("📥 New ESP32 Data Received:");
  console.log(req.body);
  console.log("------------------------------");

  res.json({ success: true, message: "Data received" });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
