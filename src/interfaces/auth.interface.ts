import { User } from "./User.interface";

export interface Login {
    user_email: string,
    user_password: string
}

export interface Register extends User {}

export interface userEmailVerify {
    user_email: string;
    user_code: string;
}

export interface UserEmailVerifyAttributes extends userEmailVerify {
    code_id: number;
    user_code_verify: boolean;
}