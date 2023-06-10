import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Méthode pour comparer le mot de passe
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};

const User = model("user", UserSchema);

export default User;









