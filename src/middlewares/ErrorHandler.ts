import { Response, Request, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction): void {
    let status = err.status || 500;
    let message = err.message || "internal server error";
    let errors:any[] = []
    console.log(typeof errors,">>>>>TYEP");
    
    if(err.message == "ExpressValidationError") {
        err.errors.forEach(err => {
            errors.push(err.msg)
        });
    } else errors.push(err.errors)

    res.status(status).json({ status, message, errors })
}

export default errorHandler