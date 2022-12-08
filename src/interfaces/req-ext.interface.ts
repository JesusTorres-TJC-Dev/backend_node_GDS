import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { userEmailVerify } from "./auth.interface";

type userinfo = {
    id: string,
    user_role: string
}

// type emailConfirmInfo = {
//     id: string,
//     role: string
// }

export interface RequestExt extends Request {
    user?: JwtPayload | { userInfo: userinfo },
    dataUserVerifyInfo?: JwtPayload | { dataUserVerify: userEmailVerify },
}