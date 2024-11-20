import express from "express";
import {
  getAllUserController,
  CreateUserController,
} from "../controllers/user.js";
import {
  validateCreate,
  handleValidationErrors,
} from "../middlewares/validation.js";

const router = express.Router();

router.get("/", getAllUserController);

router.post(
  "/add",
  validateCreate,
  handleValidationErrors,
  CreateUserController
);

export default router;
