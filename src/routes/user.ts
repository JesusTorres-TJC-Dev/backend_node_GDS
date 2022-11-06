import { Router } from "express";
import { getAllUsersCtrl } from "../controllers/admin/users";

const router = Router()

router.get("/", getAllUsersCtrl)

export { router }