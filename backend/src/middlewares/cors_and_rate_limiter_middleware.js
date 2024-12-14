import cors from "cors"; // Enable Cross-Origin Resource Sharing
import rateLimit from "express-rate-limit"; // Rate limiting middleware

/**
 * Get CORS configuration
 * @param {string[]} allowedOrigins - Array of allowed origins
 * @returns {function} Configured CORS middleware
 */
export const configureCors = (allowedOrigins) => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Grant access
      } else {
        console.error(`CORS error: Unauthorized origin - ${origin}`); // Log unauthorized origin
        callback(new Error("Not allowed by CORS")); // Deny access
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow CRUD methods
    credentials: true, // Allow credentials (cookies, headers, etc.)
  });
};

/**
 * Get rate limiter configuration
 * @returns {function} Configured rate limiter middleware
 */
export const configureRateLimiter = () => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
};
