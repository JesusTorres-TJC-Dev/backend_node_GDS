import { NextFunction, Response } from "express";
import Roles from "../config/Roles";
import { RequestExt } from "../interfaces/req-ext.interface";

const checkRoleAdmin = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        const isAdmin = Roles.ADMIN === user?.userInfo.user_role

        if (!isAdmin) return res.status(401).send("NO_TIENES_ACCESO_A_ESTE_SERVICIO")

        next()
    } catch (error) {
        res.status(400)
        res.send({
            message: 'SESSION_NO_VALIDA',
            err: error
        })
    }
}

const checkRoleTeacher = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        const isTeacher = Roles.TEACHER === user?.userInfo.role

        if (!isTeacher) return res.status(401).send("NO_TIENES_ACCESO_A_ESTE_SERVICIO")

        next()
    } catch (error) {
        res.status(400)
        res.send({
            message: 'SESSION_NO_VALIDA',
            err: error
        })
    }
}

const checkRoleStudent = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        const isStudent = Roles.STUDENT === user?.userInfo.role

        if (!isStudent) return res.status(401).send("NO_TIENES_ACCESO_A_ESTE_SERVICIO")

        next()
    } catch (error) {
        res.status(400)
        res.send({
            message: 'SESSION_NO_VALIDA',
            err: error
        })
    }
}

export {
    checkRoleAdmin,
    checkRoleTeacher,
    checkRoleStudent,
}