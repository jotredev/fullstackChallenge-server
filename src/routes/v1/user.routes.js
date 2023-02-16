import express from "express";
import { validatorCreateUser } from "../../validators/user.validator";
import { createUser } from "../../controllers/user.controller";
const router = express.Router();

// Create user
router.post("/", validatorCreateUser, createUser);

export default router;
