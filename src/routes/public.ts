import { Router } from "express";
import { getAllCategoriesPublicCtrl } from "../controllers/public/category";

const router = Router()

router.get("/categories", getAllCategoriesPublicCtrl)

export { router }