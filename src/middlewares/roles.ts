import { NextFunction, Response } from "express";
import Roles from "../config/Roles";
import { RequestExt } from "../interfaces/req-ext.interface";

const checkRoleAdmin = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        // console.log("role: ", user?.userInfo)
        // const isAdmin = Roles.includes(user?.userInfo.role)
        const isAdmin = Roles[0] === user?.userInfo.role
        // console.log(isAdmin)
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

        const isAdmin = Roles[1] === user?.userInfo.role

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

const checkRoleStudent = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const user = req.user

        const isAdmin = Roles[2] === user?.userInfo.role

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

export {
    checkRoleAdmin,
    checkRoleTeacher,
    checkRoleStudent,
}