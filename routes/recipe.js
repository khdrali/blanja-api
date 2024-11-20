import express from "express";
import { createRecipeController } from "../controllers/recipe.js";

const router = express.Router();

router.post("/add", createRecipeController);

export default router;
