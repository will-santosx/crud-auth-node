import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

export default prisma;

export interface _Request extends Request {
  user?: number;
}
