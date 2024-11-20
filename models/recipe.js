import db from "../db.js";

export const createRecipeModels = async (params) => {
  const { title, ingredients, image_recipe, videos, created_at } = params;
  const resultRecipe =
    await db`INSERT INTO public.recipe(title,ingredients,image_recipe,created_at) VALUES (${title},${ingredients},${image_recipe},${created_at})`;

  const recipe = resultRecipe[0];

  const resultVideo =
    await db`INSERT INTO public.video(video_url,recipe_id) VALUES (${videos}, ${recipe.id})`;

  const video = resultVideo[0];

  return { recipe, video };
};
