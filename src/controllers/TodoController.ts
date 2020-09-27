import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
const { Todo } = require("../db/models");

class TodoController  {
  public async showAll (req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await Todo.findAll()
      return res.json({ todos });
    } catch (error) { next(new HttpException(500, "InternalServerError", ["internal server error"])) } 
  }

  public async create (req: Request, res: Response, next: NextFunction) {
    try {
      const { title } = req.body;
      const todo = await Todo.create({ title });
      return res.status(201).json({ todo });
    } catch (error) { next(new HttpException(500, "InternalServerError", ["internal server error"])) } 
  }
}

export default new TodoController()
