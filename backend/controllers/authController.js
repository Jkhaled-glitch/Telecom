import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).send({
      message: "Missing name, email, or password.",
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
  try {
    if (!email || !password) {
      return res.status(422).send({
        message: "Missing email or password.",
      });
    }
  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "User not found.",
      });
    }

    // Comparer le mot de passe fourni avec celui enregistré dans la base de données
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).send({
        //invalid password
        message: "Invalid email or password.",
      });
    }
  
    // Login réussi, renvoyer l'utilisateur
    console.log(user)
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const generateVerificationToken = (user) => {
  const verificationToken = jwt.sign(
    { ID: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return verificationToken;
};

export { register, login };
