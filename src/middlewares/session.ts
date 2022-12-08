import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/req-ext.interface";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization?.split(" ").pop() || ''
        const isUser = verifyToken(jwtByUser) as { id: string, user_role: string }

        if (!isUser) return res.status(401).send("NO_TIENES_UN_JWT_VALIDO")

        req.user = isUser
        next()
    } catch (error) {
        res.status(400)
        res.send({
            message: 'SESSION_NO_VALIDA',
            err: error
        })
    }
}

export { checkJwt }