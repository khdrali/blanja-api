import express from "express";
import {
  login,
  requestOtpController,
  verifyOtpController,
} from "../controllers/auth.js";
import {
  handleValidationErrors,
  validateLogin,
} from "../middlewares/validation.js";

const authRoutes = express.Router();

authRoutes.post("/login", validateLogin, handleValidationErrors, login);
authRoutes.post("/request-otp", requestOtpController);
authRoutes.post("/verify-otp", verifyOtpController);

export default authRoutes;
