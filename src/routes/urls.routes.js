import { Router } from "express";
import { shortenUrl } from "../controllers/url.controller";
import { authValidation } from "../middlewares/authValidation.middleware";


const urlRouter = Router();

urlRouter.post("/urls/shorten", authValidation, shortenUrl)
/* urlRouter.post("/urls/:id",)
urlRouter.get("/urls/open/:shortUrl",)
urlRouter.delete("/urls/:id",) 
urlRouter.get("/ranking",) */

export default urlRouter;
