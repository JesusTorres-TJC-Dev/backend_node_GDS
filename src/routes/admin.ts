import { Router } from "express";
import { checkRoleAdmin } from "../middlewares/roles";
import { checkJwt } from "../middlewares/session";

const router = Router()

// Admin Category
import { createCategoryCtrl, deleteCategoryByIdCtrl, editCategoryByIdCtrl, editStatusCateogryByIdCtrl, getAllCategoriesCtrl, getCategoryByIdCtrl } from "../controllers/admin/category";

// Admin Subcategories
import { createSubCategoryCtrl, editStatusSubCategoryByIdCtrl, editSubCategoryByIdCtrl, getAllSubCategoryCtrl, getSubCategoryByIdCtrl } from "../controllers/admin/subcategory";

// Admin Users
import { getAllUsersCtrl } from "../controllers/admin/users";



// Routes Category
router.post("/category/create", checkJwt, checkRoleAdmin, createCategoryCtrl)
router.get("/category/all", checkJwt, checkRoleAdmin, getAllCategoriesCtrl)
router.get("/category/get/:category_id", checkJwt, checkRoleAdmin, getCategoryByIdCtrl)
router.post("/category/edit/:category_id", checkJwt, checkRoleAdmin, editCategoryByIdCtrl)
router.post("/category/status/:category_id", checkJwt, checkRoleAdmin, editStatusCateogryByIdCtrl)
router.delete("/category/delete/:category_id", checkJwt, checkRoleAdmin, deleteCategoryByIdCtrl)

// Routes SubCategory
router.post("/subcategory/create", checkJwt, checkRoleAdmin, createSubCategoryCtrl)
router.get("/subcategory/all", checkJwt, checkRoleAdmin, getAllSubCategoryCtrl)
router.get("/subcategory/get/:subcategory_id", checkJwt, checkRoleAdmin, getSubCategoryByIdCtrl)
router.post("/subcategory/edit/:subcategory_id", checkJwt, checkRoleAdmin, editSubCategoryByIdCtrl)
router.post("/subcategory/status/:subcategory_id", checkJwt, checkRoleAdmin, editStatusSubCategoryByIdCtrl)
router.delete("/subcategory/delete/:subcategory_id", checkJwt, checkRoleAdmin)

// Routes Users
router.get("/users/", checkJwt, checkRoleAdmin, getAllUsersCtrl)

export { router }