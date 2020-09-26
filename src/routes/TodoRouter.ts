import TodoController from "../controllers/TodoController";
import BaseRouter from "./BaseRouter"
import {authentication} from "../middlewares/Auth"

class UserRouter extends BaseRouter {
    public routes(): void {
        this.router.get("/", authentication, TodoController.showAll);
    }
}

export default new UserRouter().router;