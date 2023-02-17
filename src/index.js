import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// Routes
import userRoutes from "./routes/v1/user.routes";
import authRoutes from "./routes/v1/auth.routes";
import postRoutes from "./routes/v1/post.routes";
// Database
import { sequelize } from "./database/config";
import "./models/user.model";
import "./models/permission.model";
import "./models/log.model";
import "./models/post.model";

// Create express app
const app = express();

// Configure express app
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));

// Configure environment variables
dotenv.config();

// Connect to database
(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Configure express app
const PORT = process.env.PORT || 4000;

// Cors
app.use(cors());

// Routing
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);

// Start express app
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
