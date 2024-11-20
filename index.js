import express from "express";
const app = express();
import pkg from "body-parser";
const port = 4000;
import sellerRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import recipeRoutes from "./routes/recipe.js";

const { urlencoded, json } = pkg;
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/user", sellerRoutes);
app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "app running",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
