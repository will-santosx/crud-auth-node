import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const generateToken = (id: number): string => {
  return jwt.sign({ id }, secret, { expiresIn: "1d" });
};
