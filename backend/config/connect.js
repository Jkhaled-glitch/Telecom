import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log("Database connected..");
})
.catch((err)=>console.log("failed to connect to database"));
