import Article from "../models/Article.js";

const addArticle = async (req, res, next) => {
  try {
    const article = await new Article(req.body).save();
    res.status(201).send(article);
  } catch (err) {
    console.log(err);
  }
};



// delete article by name
const deleteArticleByName = async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ name: req.params.name });
    res.status(200).send(article);
  } catch (error) {
    console.log(err);
  }
};

// get articles by title
const getArticleByTitle = async (req, res) => {
  try {
    const article = await Article.find({ title: req.params.title });
    res.status(200).send(article);
  } catch (error) {
    console.log(err);
  }
};

// update article by name
const updateArticleByName = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params.name);

    const filter = { name: req.params.name };
    const update = req.body;

    const article = await Article.findOne(filter);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    const newArticle = await Article.findOneAndUpdate(filter, update, { new: true });

      console.log(newArticle);
    res.status(200).send(newArticle);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  addArticle,
  deleteArticleByName,
  getArticleByTitle,
  updateArticleByName,
};
