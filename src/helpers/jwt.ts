import jwt from "jsonwebtoken";
import { SECRET } from "../config/env";

export const generateToken = (payload: object): string => {
    console.log(SECRET,"<<<<<<<<< SECRET");
    
    return jwt.sign(payload, SECRET);
}

export const verifyToken = (payload: any): any=> {
    return jwt.verify(payload, SECRET);
}
