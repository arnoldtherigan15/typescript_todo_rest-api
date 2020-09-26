import UserController from "../controllers/UserController";
import BaseRouter from "./BaseRouter"

class UserRouter extends BaseRouter {
    public routes(): void {
        this.router.get("/",UserController.showAll);
        this.router.post("/register",UserController.register);
        this.router.get("/login",UserController.login);
    }
}

export default new UserRouter().router;