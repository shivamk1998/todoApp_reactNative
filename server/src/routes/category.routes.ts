import express from "express";
import { createCategories, deleteCategory, getAllCategories, updateCategory } from "../controllers/category.controller";
import { autenticationMiddleware } from "../middleware"

const categoryRoutes= express.Router();
categoryRoutes.use(autenticationMiddleware)
categoryRoutes.route("/").get(getAllCategories)
categoryRoutes.route("/create").post(createCategories)
categoryRoutes.route("/delete/:id").delete(deleteCategory)
categoryRoutes.route("/update").put(updateCategory)

export default categoryRoutes;