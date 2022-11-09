import { Auth } from "./auth.interface";

export interface UserAttributes extends Auth {
    id: string,
    userName: string,
    role: string
}