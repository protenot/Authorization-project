import { Router } from "express";
//import { authHandler } from "../utils/authHandler";
import { roleHandler } from "../utils/roleHandler";
import usersController from "../controllers/users.controller";

const usersRouter: Router = Router();

usersRouter.get("/", roleHandler(["ADMIN"]), usersController.getUsers);
usersRouter.get("/:id", roleHandler(["ADMIN"]), usersController.getOneUser);
usersRouter.post("/add", roleHandler(["ADMIN"]), usersController.addUser);
usersRouter.delete(
  "/delete/:id",
  roleHandler(["ADMIN"]),
  usersController.deleteUser,
);
usersRouter.put("/edit/:id", roleHandler(["ADMIN"]), usersController.editUser);

export default usersRouter;
