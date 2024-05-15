import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

// database connection
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection FAILED !", error);
  });
