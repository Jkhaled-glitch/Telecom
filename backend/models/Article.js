import { model, Schema } from "mongoose";

const ArticleSchema = Schema({
  title: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
    unique: false,
  },
  Designation: {
    type: String,
    required: false,
  },
  unit: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  quantity: {
    type: String,
    required: false,
  },
  observations: {
    type: String,
    required: false,
  },
});

const Article = model("Article", ArticleSchema);

export default Article;
