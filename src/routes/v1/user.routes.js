import express from "express";
import {
  validatorCreateUser,
  validatorPermission,
} from "../../validators/user.validator";
import {
  addPermission,
  createUser,
  deletePermission,
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
router
  .route("/permission/:id")
  .post(validatorPermission, addPermission)
  .delete(validatorPermission, deletePermission);

export default router;
