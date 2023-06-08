import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).send({
      message: "Missing name, email or password.",
    });
  }
  const newUser = {
    name,
    email,
    password,
  };
  try {
    let hashedPassword = await bcrypt.hash(password, 12);
    newUser.password = hashedPassword;
  } catch (err) {
    return next(err);
  }

  try {
    const user = await new User({
      token: generateVerificationToken(newUser),
      ...newUser,
    }).save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({
      message: "User not found.",
    });
  }

  if (!email || !password) {
    return res.status(422).send({
      message: "Missing email or password.",
    });
  }
  try {
    res.send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const generateVerificationToken = (user) => {
  const verificationToken = jwt.sign(
    { ID: user._id, email: user.email },
    "thisisatopsecretkey",
    { expiresIn: "7d" }
  );
  return verificationToken;
};

export { register, login };
