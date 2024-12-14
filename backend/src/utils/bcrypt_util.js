import bcrypt from "bcrypt";

// Function to hash the password during user registration
export const hashPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds for hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds); // Generate hashed password
  return hashedPassword;
};

// Function to verify the password during user login
export const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword); // Compare input password with stored hashed password
  return isMatch;
};
