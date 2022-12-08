import { Request, Response } from "express";
import { RequestExt } from "../interfaces/req-ext.interface";
import { confirmRegister, loginUser, registerUser, resendEmailForAccountVerify } from "../services/auth";
import { handleHttp } from "../utils/error.handle";

const registerCtrl = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const userCreate = await registerUser(body)
        res.status(200).json({
            userCreate,
            success: true,
            msg: 'Registrado con exito'
        })
    } catch (error) {
        handleHttp(res, 'ERROR_REGISTER_USER', error)
    }
}


const confirmRegisterCtrl = async (req: RequestExt, res: Response) => {
    try {
        const errors = [
            "USER_NOT_FOUND",
            "CODE_VERIFY_NOT_FOUND",
            "CODE_NOT_VALID_FOR_THIS_USER",
        ]
        
        const emailConfirm = req.dataUserVerifyInfo
        const { user_email, user_code } = emailConfirm?.dataUserVerify
        
        const congirmRegister = await confirmRegister(user_email, user_code)
        
        if(errors.includes(congirmRegister)) return handleHttp(res, congirmRegister, "error")
        
        res.status(200).json(
            {
                congirmRegister,
                success: true,
                msg: 'Verificado con exito'
            }
        )
    } catch (error) {
        handleHttp(res, 'ERROR_VERIFY_USER', error)
    }
}
const resendEmailForAccountVerifyCtrl = async (req: Request, res: Response) => {
    try {
        const errors = [
            "USER_NOT_FOUND",
            "USER_VERIFY"
        ]

        const { body } = req
        const userResendEmail = await resendEmailForAccountVerify(body)

        if(errors.includes(userResendEmail)) return handleHttp(res, userResendEmail, 'error')
        
        res.status(200).json({
            userResendEmail,
            success: true,
            msg: 'Email reenviado con exito'
        })
    } catch (error) {
        handleHttp(res, 'ERROR_RESEND_EMAIL_USER', error)
    }
}

const loginCtrl = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const responseLogUser = await loginUser(body)

        if(responseLogUser == "PASSWORD_INCORRECT"){
            res.status(401).send(responseLogUser)
        }else{
            res.status(200).send(responseLogUser)
        }
    } catch (error) {
        handleHttp(res, 'ERROR_AUTH_USER', error)
    }
}

export {
    registerCtrl,
    loginCtrl,
    confirmRegisterCtrl,
    resendEmailForAccountVerifyCtrl,
}