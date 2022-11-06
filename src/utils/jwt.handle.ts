import { sign, verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "tjc.GDS.consulting.SAP.010100101"

const generateToken = (id: string) => {
    const jwt = sign({id}, JWT_SECRET, {
        expiresIn: "1h"
    });
    //console.log("token: ", jwt)
    return jwt
}

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET)
    return isOk
}

export {
    generateToken,
    verifyToken,
}