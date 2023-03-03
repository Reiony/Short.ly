import { Router } from "express";
import { signUpUser } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signUpSchema } from "../schemas/userSchema.js";


const userRoutes = Router();

userRoutes.post("signup",validateSchema(signUpSchema), signUpUser)

export default userRoutes;