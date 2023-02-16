import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./database/config";
import userRoutes from "./routes/v1/user.routes";
// Create express app
const app = express();

// Configure express app
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));

// Configure environment variables
dotenv.config();

// Connect to database
dbConnect();

// Configure express app
const PORT = process.env.PORT || 4000;

// Cors
app.use(cors());

// Routing
app.use("/api/v1/users", userRoutes);

// Start express app
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
