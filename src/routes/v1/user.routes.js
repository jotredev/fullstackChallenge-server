import express from "express";
import {
  validatorCreateUser,
  validatorPermission,
} from "../../validators/user.validator";
import {
  addPermission,
  createUser,
  deletePermission,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../controllers/user.controller";
import checkAuth from "../../middlewares/checkAuth";
const router = express.Router();

// Create user, get all users
router
  .route("/")
  .post(validatorCreateUser, checkAuth, createUser)
  .get(checkAuth, getAllUsers);
// Get user, update user and delete user
router
  .route("/:id")
  .get(checkAuth, getUserById)
  .put(checkAuth, updateUser)
  .delete(checkAuth, deleteUser);
// Add permission
router
  .route("/permission/:id")
  .post(validatorPermission, checkAuth, addPermission)
  .delete(validatorPermission, checkAuth, deletePermission);

export default router;
