import { Router } from "express";
import urlRouter from "./urls.routes.js";
import userRoutes from "./users.routes.js"

const AllRoutes = Router();

AllRoutes.use([userRoutes,urlRouter]);

export default AllRoutes;