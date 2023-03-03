import { Router } from "express";
import { getShortenedUrl, getUrlDetails, shortenUrl } from "../controllers/url.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { urlSchema } from "../schemas/urlSchema.js"


const urlRouter = Router();

urlRouter.post("/urls/shorten", authValidation, validateSchema(urlSchema), shortenUrl)
urlRouter.get("/urls/:id", getUrlDetails)
urlRouter.get("/urls/open/:shortUrl", getShortenedUrl)
/* urlRouter.delete("/urls/:id",) 
urlRouter.get("/ranking",)  */

export default urlRouter;
