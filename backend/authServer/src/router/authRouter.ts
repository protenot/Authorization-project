import { Router } from "express";
import authController from "../controllers/auth.controller";
import { check } from "express-validator";
import { authHandler } from "../utils/authHandler";
import { roleHandler } from "../utils/roleHandler";

const authRouter: Router = Router();

authRouter.post(
  "/registration",
  [
    check("userName", "The user name cannot be empty").notEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 6, max: 25 }),
  ],

  authController.registration,
);
authRouter.post("/login", authController.login);
authRouter.get("/users", roleHandler(["ADMIN"]), authController.getUsers);
authRouter.get("/currentUser", authHandler, authController.currentUser);

export default authRouter;
