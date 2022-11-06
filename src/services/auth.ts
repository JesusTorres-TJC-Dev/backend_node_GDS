import { Auth } from "../interfaces/auth.interface";
import { UserAttributes } from "../interfaces/User.interface";
import db from "../models";
import { encrypt, verified } from "../utils/bcryptHandle";
import { generateToken } from "../utils/jwt.handle";
const User = db.User

//
const registerUser = async ({ userName, email, password }: UserAttributes) => {
    const checkIs = await User.findAll({where: {email: email}})

    if(checkIs && checkIs.lenght >= 1) return "ALREADY_USER"

    const passHash = await encrypt(password)

    const registerNewUser = await User.create({ userName, email, password: passHash })

    return registerNewUser
}

const loginUser = async (authUser: Auth) => {
    const {email, password} = authUser

    const checkIs = await User.findAll({where: {email: email}})

    if(!checkIs) return "NOT_FOUND_USER"

    const passwordHash = checkIs[0].password
    const isCorrect = await verified(password, passwordHash)
    
    //console.log("isCorrect: ", isCorrect)

    if(!isCorrect) return "PASSWORD_INCORRECT"
    const id = checkIs[0].id.toString()

    const token = generateToken(id)

    const data = {
        token: token,
        user: checkIs[0]
    }

    return data
}

export {
    registerUser,
    loginUser,
}