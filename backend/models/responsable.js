import { model, Schema } from "mongoose";

const ResponsableSchema = Schema({
  contact: {
    type: String,
    required: true,
  },
  responsable: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
});

const Responsable = model("_Responsable", ResponsableSchema);

export default Responsable;
