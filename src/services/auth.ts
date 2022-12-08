import db from "../models";
import { v4 as uuidv4 } from "uuid";
import { Login, Register } from "../interfaces/auth.interface";
import { encrypt, verified } from "../utils/bcryptHandle";
import { generateToken, generateTokenForConfirmEmail } from "../utils/jwt.handle";
import { getTemplate, sendEmail } from "./email";
import Roles from "../config/Roles";
import { findAllParse } from "../utils/findAllParse.handle";
const User = db.User
const UserVerifyTable = db.UserVerify

//
const registerUser = async (regiserUser: Register) => {
    const { 
        user_email,
        user_password,
        user_role,
        user_name,
        user_last_name,
        user_phone,
        user_country
    } = regiserUser

    const checkIs = await User.findAll({where: {user_email: user_email}})

    if(checkIs && checkIs.lenght >= 1) return "ALREADY_USER"

    const passHash = await encrypt(user_password)

    const registerNewUser = await User.create({ user_email, user_password: passHash, user_role, user_name, user_last_name, user_phone, user_country })

    if (user_role != Roles.ADMIN){
        verifyAccountMethod(user_email, user_name, user_role, false)
    }

    return registerNewUser
}

const confirmRegister = async (user_email: string, user_code: string) => {
    const user = await User.findAll({ where: {user_email: user_email} })
    const userParse = findAllParse(user)
    const cant = userParse.length
    
    if(cant === 0) return "USER_NOT_FOUND"

    const UserVerify = await UserVerifyTable.findAll({ where: {user_email: user_email} })
    const userVerifyParse = findAllParse(UserVerify)
    const cantVerify = userVerifyParse.length

    if(cantVerify === 0) return "CODE_VERIFY_NOT_FOUND"
    
    if (user_code !== userVerifyParse[0].user_code) return "CODE_NOT_VALID_FOR_THIS_USER"
    
    await User.update({user_verify: true}, { where: {user_email: user_email} })
    await UserVerifyTable.update({user_code_verify: true}, { where: {user_email: user_email} })

    return "USER VERIFIED"
}

const resendEmailForAccountVerify = async (resendEmailData: Register) => {
    const { user_email } = resendEmailData

    const user = await User.findAll({ attributes: ['user_name', 'user_role', 'user_verify'], where: {user_email: user_email} })
    const userParse = findAllParse(user)
    const userCant = userParse.length

    if(userCant === 0) return "USER_NOT_FOUND"
    if(userParse[0].user_verify) return "USER_VERIFY"

    verifyAccountMethod(user_email, userParse[0].user_name, userParse[0].user_role, true)

    return "EMAIL_RESEND"
}

const loginUser = async (authUser: Login) => {
    const {user_email, user_password} = authUser

    const checkIs = await User.findAll({where: {user_email: user_email}})

    if(checkIs && checkIs.lenght === 0) return "NOT_FOUND_USER"

    const passwordHash = checkIs[0].user_password
    const isCorrect = await verified(user_password, passwordHash)

    if(!isCorrect) return "PASSWORD_INCORRECT"
    const id = checkIs[0].id.toString()
    const user_role = checkIs[0].user_role.toString()

    const user_token = generateToken(id, user_role)

    const data = {
        user_token: user_token,
        user: checkIs[0]
    }

    return data
}


export {
    registerUser,
    confirmRegister,
    loginUser,
    resendEmailForAccountVerify,
}


//METHODS PRIVATES

const verifyAccountMethod = async (user_email: string, user_name: string, user_role: string, resend?: boolean) => {
    const user_code = uuidv4()

    const user_token_verify = generateTokenForConfirmEmail({ user_email, user_code })

    const template = getTemplate(user_name, user_token_verify, user_role)

    if(resend) await UserVerifyTable.destroy({ where: { user_email: user_email }})
    
    await UserVerifyTable.create({ user_email, user_code })

    await sendEmail(user_email, `Este es un email de prueba para ${user_role}`, template)
}