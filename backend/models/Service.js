import { model, Schema } from "mongoose";

const ServiceSchema = Schema({
  ref_market: {
    type: String,
    required: true,
  },
    ordre: {
    type: String,
    required: true,
  },
  
});

const Service = model("Service", ServiceSchema);

export default Service;
