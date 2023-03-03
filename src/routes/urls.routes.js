import { Router } from "express";
import { shortenUrl } from "../controllers/url.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten", authValidation, shortenUrl)
/* urlRouter.post("/urls/:id",)
urlRouter.get("/urls/open/:shortUrl",)
urlRouter.delete("/urls/:id",) 
urlRouter.get("/ranking",) */

export default urlRouter;
