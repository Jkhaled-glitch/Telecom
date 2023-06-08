import { Router } from "express";

const articleRouter = Router();

import {
  deleteArticleByName,

  addArticle,
  getArticleByTitle,
  updateArticleByName,
} from "../controllers/articleController.js";

articleRouter.post("/add", addArticle);
articleRouter.delete("/delete/:name", deleteArticleByName);


articleRouter.get("/get/:title", getArticleByTitle);
articleRouter.put("/update/:name", updateArticleByName);

export default articleRouter;
