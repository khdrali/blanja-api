import { createRecipeModels } from "../models/recipe.js";
import dotenv from "dotenv";
dotenv.config();

export const createRecipeController = async (req, res) => {
  try {
    const { title, ingredients, image_recipe, video_url } = req.body;
    const date = new Date();
    const result = createRecipeModels({
      title: title,
      ingredients: ingredients,
      image_recipe: image_recipe,
      videos: [video_url],
      created_at: date,
    });

    res.json({
      valid: true,
      status: 200,
      message: "Successfully Add Recipe",
      data: result,
    });
  } catch (error) {
    res.json({
      valid: false,
      status: 500,
      message: error,
    });
  }
};
