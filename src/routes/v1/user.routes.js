import express from "express";
import { validatorCreateUser } from "../../validators/user.validator";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../../controllers/user.controller";
const router = express.Router();

// Create user, get all users
router.route("/").post(validatorCreateUser, createUser).get(getAllUsers);
// Get user
router.route("/:id").get(getUserById);
export default router;
