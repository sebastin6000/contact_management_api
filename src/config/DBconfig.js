import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    // the below code we are going to connect to the database
    const connectDB = await mongoose.connect(
      process.env.MONGDB_CONNECTION_STRING
    );
  } catch (error) {}
};

export default databaseConnection;
