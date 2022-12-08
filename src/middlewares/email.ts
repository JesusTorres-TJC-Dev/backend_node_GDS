import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/req-ext.interface";
import { verifyToken } from "../utils/jwt.handle";

const checkJwtConfirmEmail = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        
        const { user_token_verify } = req.params || ' '
        
        const data = verifyToken(user_token_verify) as { user_email: string, user_code: string }
        
        console.log(data)
        
        if (!data) return res.status(401).send("NO_TIENES_UN_JWT_VALIDO")

        req.dataUserVerifyInfo = data
        next()
    } catch (error) {
        res.status(400)
        res.send({
            message: 'TOKEN_NO_VALIDO',
            err: error
        })
    }
}

export { checkJwtConfirmEmail }