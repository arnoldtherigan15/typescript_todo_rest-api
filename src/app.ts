import express from "express";
import { UserRouter, TodoRouter } from "./routes";
import morgan from "morgan";
import cors from "cors";
import { config as dotenv } from "dotenv";
import errorHandler from "./middlewares/ErrorHandler";

class App {
  public app: express.Application;

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'))
    this.app.use(cors())
  }

  private routes():void {
    this.app.use("/users", UserRouter)
    this.app.use("/todos", TodoRouter)
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  constructor() {
    this.app = express();
    this.config();
    dotenv()
    this.routes()
    this.initializeErrorHandling()
  }
}

export default new App().app;