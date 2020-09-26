import { Request, Response, NextFunction } from "express"

export const authentication = (req: Request, res: Response, next: NextFunction): any => {
    console.log('masuk middle ware');
    next();
}