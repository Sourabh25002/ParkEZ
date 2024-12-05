// Import necessary modules
import express from "express";
import cors from "cors"; // Enable Cross-Origin Resource Sharing
import morgan from "morgan"; // HTTP request logger
import helmet from "helmet"; // Secure HTTP headers
import rateLimit from "express-rate-limit"; // Rate limiting middleware
import cookieParser from "cookie-parser"; // Parse cookies from the request
import dotenv from "dotenv"; // Load environment variables
import bodyParser from "body-parser"; // Middleware to parse request bodies
import connectDB from "./utils/db.js"; // MongoDB connection utility

// Initialize the app and load environment variables
const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware setup

// Get allowed origins for CORS from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",") // Split by commas to create an array
  : []; // Default to an empty array if the variable is not defined

// Configure CORS options to restrict origins and allow credentials
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests from allowed origins or no origin (e.g., same-origin or Postman)
      callback(null, true); // Grant access
    } else {
      console.error(`CORS error: Unauthorized origin - ${origin}`); // Log unauthorized origin
      callback(new Error("Not allowed by CORS")); // Deny access
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow CRUD methods
  credentials: true, // Allow credentials (cookies, headers, etc.)
};

// Rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply middlewares
app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use(limiter); // Apply the rate limiter to all requests
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
