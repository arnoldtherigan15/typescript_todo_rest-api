import TodoController from "../controllers/TodoController";
import BaseRouter from "./BaseRouter";
import { authentication, authorization } from "../middlewares/Auth";

class UserRouter extends BaseRouter {
    public routes(): void {
        this.router.use(authentication);
        this.router.get("/", TodoController.showAll);
        this.router.post("/", TodoController.create);
        this.router.delete("/:id", authorization, TodoController.destroy);
    }
}

export default new UserRouter().router;