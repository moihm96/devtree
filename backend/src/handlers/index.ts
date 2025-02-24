import { Request, Response } from "express";
import slug from "sluggo";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("Un usuario con ese mail ya esta registrado");
    return res.status(409).json({ error: error.message });
  }

  const handle = slug(req.body.handle, { separator: "" });
  const clearHandle = handle.replaceAll("-", "");

  const handleExists = await User.findOne({ handle: clearHandle });
  console.log(handle);
  console.log(clearHandle);
  console.log(handleExists);

  if (handleExists) {
    const error = new Error("Nombre de usuario no disponible");
    return res.status(409).json({ error: error.message });
  }

  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = clearHandle;
  await user.save();

  res.status(201).send("Registro creado correctamente");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ error: error.message });
  }

  const isPasswordCorrect = await checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error("¡Contraseña incorrecta!");
    return res.status(401).json({ error: error.message });
  }

  res.send("Autenticado....");
};
