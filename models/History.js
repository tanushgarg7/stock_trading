const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const history = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
        orders: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Order",
		}]
	},
	{
		timestamps: true,
	}
);

const History = mongoose.model("History", history);
module.exports = History;