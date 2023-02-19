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
/**
 * @Route POST /api/v1/users/
 * @openapi
 * /users:
 *   post:
 *    tags:
 *      - Users
 *    summary: "Create user"
 *    description: "Create user"
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/createUser'
 *    responses:
 *      201:
 *        description: "Usuario creado correctamente"
 *      403:
 *        description: "No tienes permisos para realizar esta acción"
 *      404:
 *        description: "El email ya se encuentra registrado"
 *      500:
 *        description: "Error del servidor"
 */
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
  .put(validatorPermission, checkAuth, deletePermission);

export default router;
