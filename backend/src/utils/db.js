import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to establish a connection to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // Log a success message with the host of the MongoDB connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log the error message if the connection fails
    console.error(`Error: ${error.message}`);

    // Exit the process with a failure code (1) to indicate an error occurred
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
export default connectDB;
