import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { _Request } from "..";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

interface JwtPayload {
  id: number;
}

export const authMiddleware = (
  req: _Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, secret) as JwtPayload;
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
