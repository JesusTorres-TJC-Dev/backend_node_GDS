import { Request, Response } from "express";
import { getAllUsers } from "../../services/user";
import { handleHttp } from "../../utils/error.handle";

const getAllUsersCtrl = async (req: Request, res: Response) => {
    try {
        const responseUsers = await getAllUsers()
        res.status(200).json(responseUsers)
    } catch (error) {
        handleHttp(res, 'ERROR_GET_USERS', error)
    }
}

export {
    getAllUsersCtrl,
}