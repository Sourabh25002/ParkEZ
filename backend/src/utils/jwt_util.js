import jwt from "jsonwebtoken";

// Secrets for signing the tokens
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Token expiration durations
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRY; // Example: 15 minutes
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRY; // Example: 7 days

/*
 * Generate access and refresh tokens for a user
 * @param {Object} payload - Payload to encode in the token (e.g., user ID, email)
 * @returns {Object} - Object containing accessToken and refreshToken
 */
export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });

  return { accessToken, refreshToken };
};

/*
 * Verify an access token
 * @param {string} token - The access token to verify
 * @returns {Object} - Decoded payload if valid, or throws an error if invalid
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (err) {
    const error = new Error("Invalid or expired access token");
    error.statusCode = 401; // Unauthorized
    throw error;
  }
};

/*
 * Verify a refresh token
 * @param {string} token - The refresh token to verify
 * @returns {Object} - Decoded payload if valid, or throws an error if invalid
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (err) {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 403; // Forbidden
    throw error;
  }
};
