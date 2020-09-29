import { NextFunction, Request, Response } from "express";
import { comparePassword } from "../helpers/bcrypt";
import { generateToken } from "../helpers/jwt"
const { User } = require("../db/models");

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
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password
      });
      return res.status(201).json({
        status: 201,
        message: "User success to register",
        user: { id: user.id, email: user.email }
      });
    } catch (err) { next(err) }
  }
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: { email }
      });
      if(user) {
        const isUser = comparePassword(password, user.password);
        const payload = {
          id: user.id,
          email
        };
        const token = generateToken(payload);
        if(isUser) return res.json({
          status: 200,
          message: "User success to login",
          token
        }) 
        else throw { msg: "email or password is wrong" };
      } else throw { msg: "email or password is wrong" };
    } catch (err) { next(err) }

  }
}

export default new UserController()
