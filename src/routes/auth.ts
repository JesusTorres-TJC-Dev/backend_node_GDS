import { Router } from "express";
import { confirmRegisterCtrl, loginCtrl, registerCtrl, resendEmailForAccountVerifyCtrl } from "../controllers/auth";
import { checkJwtConfirmEmail } from "../middlewares/email";

const router = Router()

router.post("/register", registerCtrl)
router.post("/verify/resendEmail", resendEmailForAccountVerifyCtrl)
router.post("/verify/:user_token_verify", checkJwtConfirmEmail, confirmRegisterCtrl)
router.post("/login", loginCtrl)

export { router }