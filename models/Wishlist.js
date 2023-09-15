const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishList = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stocks: [String],
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("WishList", wishList);
module.exports = WishList;
