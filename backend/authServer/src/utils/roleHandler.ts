import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../config/jwt.config";

export const roleHandler = function (roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "The user is not authorized" });
      }
      const { roles: userRoles } = jwt.verify(token, secret) as any;
      let hasRole = false;
      userRoles.forEach((role: string) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "You don't have access" });
      }
      next();
    } catch (err) {
      console.log("roleHandler error", err);
      return res
        .status(403)
        .json({ message: "The user is not authorized role" });
    }
  };
};
