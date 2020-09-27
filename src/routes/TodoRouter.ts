import TodoController from "../controllers/TodoController";
import BaseRouter from "./BaseRouter";
import {authentication} from "../middlewares/Auth";
import validator from "../middlewares/TodoValidator";

class UserRouter extends BaseRouter {
    public routes(): void {
        this.router.get("/", authentication, TodoController.showAll);
        this.router.post("/", authentication, validator.validate, TodoController.create)
    }
}

export default new UserRouter().router;