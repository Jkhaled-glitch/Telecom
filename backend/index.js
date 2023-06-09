import "./config/connect.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoute from "./routes/authRouter.js";
import articleRouter from "./routes/articleRouter.js";
import router from "./routes/routers.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/articles", articleRouter);

app.use("/api", router);


app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});




app.listen(process.env.PORT || 8000, () =>
  console.log(`Server is running on PORT ${process.env.PORT}...`)
);
