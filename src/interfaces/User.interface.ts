import Roles from "../config/Roles";
import { Login } from "./auth.interface";

export interface User extends Login {
    user_role: Roles;
    user_name: string;
    user_last_name: string;
    user_phone: string;
    user_country: string;
}

export interface UserAttributes extends User {
    user_id: number;
    user_verify: boolean;
    user_image: string;
}

export interface UserPaymentMethodsAttributes {

}