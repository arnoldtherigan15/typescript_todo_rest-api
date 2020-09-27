import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt";
import HttpException from "../exceptions/HttpException";
const { User } = require("../db/models");

export const authentication = (req: Request | any, res: Response, next: NextFunction): any => {
    try {
        const { token } = req.headers
        if(!token) throw { msg: "token must be provided" }
        const decoded = verifyToken(token)
        const user = User.findOne({
            where: { email: decoded.email }
        })
        if(!user) throw { status: 401, msg: "authentication failed" };
        else {
            req.loggedUser = decoded;
            next()
        }
    } catch (error) {
        next(new HttpException(error.status, "AuthenticationError", error.msg))
    }
}