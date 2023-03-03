import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/userSchema.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(signUpSchema), signUpUser);
userRoutes.post("/signin", validateSchema(signInSchema), signInUser);

export default userRoutes;
