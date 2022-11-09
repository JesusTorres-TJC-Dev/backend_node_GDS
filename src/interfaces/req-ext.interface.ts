import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

type userinfo = {
    id: string,
    role: string
}

export interface RequestExt extends Request {
    user?: JwtPayload | { userInfo: userinfo }
}