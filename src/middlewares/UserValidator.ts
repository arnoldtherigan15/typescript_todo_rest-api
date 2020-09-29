import { Request, Response, NextFunction, response } from "express";
import { body, validationResult } from "express-validator";
const { User } = require("../db/models");

class Validator {
    public validateRegister: any[];
    public validateLogin: any[];
    constructor() {
        this.validateRegister = [
            body("email").isString().withMessage("email must be string"),
            body("email").isEmail().withMessage("invalid email format"),
            body("email").custom(async value => {
                try {
                    const user = await User.findOne({
                        where: {
                            email: value
                        }
                    })
                    if(user) throw "Email is already in used"
                    else return true
                } catch (error) {
                    throw error
                }
            }),
            body("password").isLength({ min: 6 }).withMessage("password minimal 6 char"),
            (req: Request, res: Response, next: NextFunction) => {
                let errors = validationResult(req);
                if(!errors.isEmpty()) next(errors.array())
                else next()
            }
        ]

        this.validateLogin = [
            body("email").isString().withMessage("email must be string"),
            body("email").isEmail().withMessage("invalid email format"),
            body("email").notEmpty().withMessage("email is required"),
            body("password").notEmpty().withMessage("password is required"),
            (req: Request, res: Response, next: NextFunction) => {
                let errors = validationResult(req);
                if(!errors.isEmpty()) next(errors.array())
                else next()
            }
        ]
    }
}

export default new Validator()