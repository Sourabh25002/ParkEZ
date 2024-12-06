// ==========================
// Module Imports (Libraries)
// ==========================
import express from "express";
import morgan from "morgan"; // HTTP request logger
import helmet from "helmet"; // Secure HTTP headers
import cookieParser from "cookie-parser"; // Parse cookies from the request
import dotenv from "dotenv"; // Load environment variables
import bodyParser from "body-parser"; // Middleware to parse request bodies

// ==========================
// Local Imports (Project Files)
// ==========================
import {
  configureCors,
  configureRateLimiter,
} from "./middlewares/cors_and_rate_limiter_middleware.js"; // Import CORS and rate limiter
import connectDB from "./utils/db_util.js"; // MongoDB connection utility

// ==========================
// Application Setup
// ==========================
dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup

// Get allowed origins for CORS from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",") // Split by commas to create an array
  : []; // Default to an empty array if the variable is not defined

// Apply middlewares
app.use(configureCors(allowedOrigins)); // Use configured CORS middleware
app.use(configureRateLimiter()); // Use configured rate limiter middleware
app.use(helmet()); // Use Helmet for security
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Log HTTP requests
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // Parse JSON payloads in requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Define the root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server on the specified port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}!`);
});
