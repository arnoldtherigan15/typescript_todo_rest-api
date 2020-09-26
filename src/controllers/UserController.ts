import { Request, Response } from "express";
import { hashPassword } from "../helpers/bcrypt";
const { User } = require("../db/models")

class UserController {
  public async showAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.findAll()
      return res.json({
        users,
      });
    } catch (error) {
      console.log(error,'<<<<< Error show All');
      
      return res.status(500).json({err: error});
    }
  }
  public async register(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const hashedPassword: string = await hashPassword(password);
    const user = await User.create({
      email,
      password: hashedPassword
    });
    return res.status(201).json({
      status: 201,
      message: "User success to register",
      user
    });
  }
  public login(req: Request, res: Response): Response {
    return res.json({
      message: "user login",
    });
  }
}

export default new UserController()
