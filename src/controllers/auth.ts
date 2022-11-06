import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth";
import { handleHttp } from "../utils/error.handle";

const registerCtrl = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const userCreate = await registerUser(body)
        res.status(200).send(userCreate)
    } catch (error) {
        handleHttp(res, 'ERROR_REGISTER_USER', error)
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
}