import { Request, Response, NextFunction } from "express";
const { Todo } = require("../db/models");

class TodoController  {
  public async showAll (req: any, res: Response, next: NextFunction) {
    try {
      const todos = await Todo.findAll({ where: { userId: req.loggedUser.id } })
      return res.json({ todos });
    } catch (err) { next(err) } 
  }

  public async create (req: any, res: Response, next: NextFunction) {
    try {
      let { id } = req.loggedUser
      const { title } = req.body;
      const todo = await Todo.create({ title, userId:id });
      return res.status(201).json({ todo });
    } catch (err) { next(err) } 
  }

  public async destroy (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await Todo.destroy({ where:{ id } });
      return res.status(200).json({ msg: `todo id : ${id} is deleted` });
    } catch (err) { next(err) } 
  }
}

export default new TodoController()
