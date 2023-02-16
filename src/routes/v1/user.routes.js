import express from "express";
import {
  validatorAddPermission,
  validatorCreateUser,
} from "../../validators/user.validator";
import {
  addPermission,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../controllers/user.controller";
const router = express.Router();

// Create user, get all users
router.route("/").post(validatorCreateUser, createUser).get(getAllUsers);
// Get user
router.route("/:id").get(getUserById).put(updateUser);
// Add permission
router.route("/add-permission/:id").post(validatorAddPermission, addPermission);

export default router;
