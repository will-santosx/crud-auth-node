import { Request, Response } from "express";
import { _Request } from "../index";
import prisma from "../index";
import { hashPassword, comparePassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    res.status(400).json({ error: "Email already exists" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Email or password is wrong" });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(user.id);
    res.header("Authorization", token).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserInfo = async (req: _Request, res: Response) => {
  const userId = req.user as number;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
