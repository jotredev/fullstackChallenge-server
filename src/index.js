import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import openApiConfig from "../documentation/swagger";
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

// Configure express app
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

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

// Cors
app.use(cors());

// Routing
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
// Routing documentation
app.use(
  "/api/v1/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openApiConfig)
);

// Start express app
if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

export default app;
