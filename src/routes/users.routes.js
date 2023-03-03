import { Router } from "express";
import { getUserProfilebyId, signInUser, signUpUser } from "../controllers/user.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { signInSchema, signUpSchema } from "../schemas/userSchema.js";

const userRoutes = Router();

userRoutes.post("/signup", validateSchema(signUpSchema), signUpUser);
userRoutes.post("/signin", validateSchema(signInSchema), signInUser);
userRoutes.get("/users/me", authValidation, getUserProfilebyId)

export default userRoutes;
