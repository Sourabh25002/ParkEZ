// Import necessary modules
import express from "express";
import cors from "cors"; // Enable Cross-Origin Resource Sharing
import morgan from "morgan"; // HTTP request logger
import cookieParser from "cookie-parser"; // Parse cookies from the request
import dotenv from "dotenv"; // Load environment variables

// Initialize the app and load environment variables
const app = express();
dotenv.config();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Handle cross-origin requests
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
