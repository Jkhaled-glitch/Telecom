import { model, Schema } from "mongoose";

const MaterielSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  nature: {
    type: String,
    required: true,
   // unique: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Materiel = model("Material", MaterielSchema);

export default Materiel;
