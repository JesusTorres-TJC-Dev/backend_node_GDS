import { sign, verify } from "jsonwebtoken"
import { userEmailVerify } from "../interfaces/auth.interface";

const JWT_SECRET = process.env.JWT_SECRET || "tjc.GDS.consulting.SAP.010100101"

const generateToken = (id: string, user_role: string) => {
    const jwt = sign(
        {
            "userInfo": {
                id,
                user_role
            }
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
    //console.log("token: ", jwt)
    return jwt
}

const generateTokenForConfirmEmail = ({user_email, user_code}: userEmailVerify) => {
    const jwt = sign(
        {
            "dataUserVerify": {
                user_email,
                user_code
            }
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
    //console.log("token: ", jwt)
    return jwt
}

const verifyToken = (jwt: string) => {
    console.log("jwt: ", jwt)
    console.log("JWT_SECRET: ", JWT_SECRET)
    const isOk = verify(jwt, JWT_SECRET)
    console.log(isOk)
    return isOk
}

export {
    generateToken,
    verifyToken,
    generateTokenForConfirmEmail
}