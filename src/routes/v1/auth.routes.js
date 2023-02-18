import express from "express";
import { getProfile, login } from "../../controllers/auth.controller";
import checkAuth from "../../middlewares/checkAuth";
import { validatorLogin } from "../../validators/auth.validator";
const router = express.Router();

// Login
router.post("/login", validatorLogin, login);
// Get profile
router.get("/profile", checkAuth, getProfile);

export default router;
