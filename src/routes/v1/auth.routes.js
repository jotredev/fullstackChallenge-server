import express from "express";
import { getProfile, login } from "../../controllers/auth.controller";
import checkAuth from "../../middlewares/checkAuth";
import { validatorLogin } from "../../validators/auth.validator";
const router = express.Router();

/**
 * @Route POST /api/v1/auth/login
 * @openapi
 * /auth/login:
 *   post:
 *    tags:
 *      - Auth
 *    summary: "Login"
 *    description: "Login del usuario para acceder a la aplicación"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/login'
 *    responses:
 *      201:
 *        description: "Login exitoso"
 *      403:
 *        description: "Usuario o contraseña incorrectos"
 *      404:
 *        description: "El usuario no se encuentra registrado"
 *      500:
 *        description: "Error del servidor"
 */
router.post("/login", validatorLogin, login);
/**
 * @Route POST /api/v1/auth/profile
 */
router.get("/profile", checkAuth, getProfile);

export default router;
