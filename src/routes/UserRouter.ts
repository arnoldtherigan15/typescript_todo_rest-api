import UserController from "../controllers/UserController";
import BaseRouter from "./BaseRouter";
import UserValidator from "../middlewares/UserValidator";

class UserRouter extends BaseRouter {
    public routes(): void {
        this.router.get("/",UserController.showAll);
        this.router.post("/register", UserController.register);
        this.router.post("/login", UserValidator.validateLogin, UserController.login);
    }
}

export default new UserRouter().router;