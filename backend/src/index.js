// Import necessary modules
import express from "express";
import cors from "cors"; // Enable Cross-Origin Resource Sharing
import morgan from "morgan"; // HTTP request logger
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser"; // Parse cookies from the request
import dotenv from "dotenv"; // Load environment variables

// Initialize the app and load environment variables
const app = express();
dotenv.config();

// Middleware setup

const allowedOrigins = ["https://example.com"]; // Add your allowed domains here

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with allowed origins or no origin (e.g., same-origin or Postman)
      callback(null, true);
    } else {
      // Log an error for unauthorized origins
      console.error(`CORS error: Unauthorized origin - ${origin}`);
      callback(new Error("Not allowed by CORS"));
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

app.use(cors(corsOptions)); // Apply CORS middleware with options
app.use(limiter); // Apply the rate limiter to all requests
app.use(helmet()); // Use Helmet for security
app.use(express.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Log HTTP requests
app.use(cookieParser()); // Parse cookies

// Define the root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server on the specified port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}!`);
});
