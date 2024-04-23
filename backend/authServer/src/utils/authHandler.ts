import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../config/jwt.config";
import { UserType } from "../models/User";
//import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserType | JwtPayload;
    }
  }
}

export const authHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
 /*  if (req.method === "OPTIONS") {
    next();
  } */
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "The user is not authorized" });
    }
    const decodedData = jwt.verify(token, secret);

    req.user = decodedData as UserType;
    console.log ('req.user', req.user)

    next();
  } catch (err) {
    console.log("authHandler error", err);
    return res.status(403).json({ message: "The user is not authorized" });
  }
};
