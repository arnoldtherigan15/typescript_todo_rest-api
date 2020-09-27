import { Request, Response, NextFunction, response } from "express";
import { body, validationResult } from "express-validator";
import HttpException from "../exceptions/HttpException";

class Validator {
    public validate: any[];
    constructor() {
        this.validate = [
            body("title").isString().withMessage("title must be string"),
            body("title").notEmpty().withMessage("title is required"),
            (req: Request, res: Response, next: NextFunction) => {
                let errors = validationResult(req);
                if(!errors.isEmpty()) next(new HttpException(400, "ExpressValidationError", errors.array()))
                else next()
            }
        ]
    }
}

export default new Validator()