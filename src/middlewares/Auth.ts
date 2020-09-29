import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt";
const { User, Todo } = require("../db/models");

export const authentication = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers
        if(!token) throw { status: 401, msg: "token must be provided" }
        const decoded = verifyToken(token)
        const user = await User.findOne({
            where: { email: decoded.email }
        })
        if(!user) throw { status: 401, msg: "authentication failed" };
        else {
            req.loggedUser = decoded;
            next()
        }
    } catch (err) {
        console.log(err,'<<<<errr');
        
        next(err)
    }
}

export const authorization = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        let todo = await Todo.findByPk(id);
        if(!todo) throw { status: 404, msg: "todo not found" };
        else if (todo.userId == req.loggedUser.id) next();
        else throw { status: 403, msg: "you're not authorize to do this" };
    } catch (err) {
        next(err)
    }
}