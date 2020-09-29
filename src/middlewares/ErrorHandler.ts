import { Response, Request, NextFunction } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction):void {

    let status = err.status || 500;
    let message = err.message || "internal server error";
    let errors:any[] = []

    type errorType = {
        msg: string,
        message: string
    }

    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            err.errors.forEach((e: errorType) => {
                errors.push(e.message)
            });
            status = 400;
            break;
        case "JsonWebTokenError":
            status = 401;
            errors.push("invalid token")
            break;
        default:
            status = err.status || 500;
            message = err.msg || "internal server error";
            errors.push(message);
            break;
    }


    res.status(status).json({ errors })
}

export default errorHandler