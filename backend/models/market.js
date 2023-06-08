import { model, Schema } from "mongoose";

const MarketSchema = Schema({
  reference: {
    type: String,
    required: true,
  },
  nomEntreprise: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    type: String,
    required: true,
  },
});

const Market = model("_markets", MarketSchema);

export default Market;
