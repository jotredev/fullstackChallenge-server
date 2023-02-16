import express from "express";
import { getProfile, login } from "../../controllers/auth.controller";
import { validatorLogin } from "../../validators/auth.validator";
const router = express.Router();

// Login
router.post("/", validatorLogin, login);
// Get profile
router.get("/profile", getProfile);

export default router;
