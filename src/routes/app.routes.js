import { Router } from "express";
import userRoutes from "./users.routes.js"

const AllRoutes = Router();

AllRoutes.use(userRoutes);

export default AllRoutes;