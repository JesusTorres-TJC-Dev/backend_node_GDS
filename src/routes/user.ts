import { Router } from "express";
import { getAllUsersCtrl } from "../controllers/admin/users";
import { checkRoleAdmin } from "../middlewares/roles";
import { checkJwt } from "../middlewares/session";

const router = Router()

router.get("/", checkJwt, checkRoleAdmin, getAllUsersCtrl)

export { router }