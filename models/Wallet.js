const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wallet = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", wallet);
module.exports = Wallet;
