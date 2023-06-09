import { model, Schema } from "mongoose";

const AttachementSchema = Schema({
  title: {
        type: String,
        required: true,
      },
  
  entreprise: {
    type: String,
    required: false,
  },
  operation: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  delai: {
    type: String,
    required: false,
  },
  
});

const Attachement = model("Attachement", AttachementSchema);

export default Attachement;
