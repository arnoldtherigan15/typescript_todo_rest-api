import { Request, Response } from "express";

class TodoController  {
  public showAll(req: Request, res: Response): Response {
    return res.json({
      message: "Hello TODOOO",
    });
  }
}

export default new TodoController()
