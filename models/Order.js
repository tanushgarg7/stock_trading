const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
        stock: String,
        stock_price: Number,
        quantity: {
            type: Number,
            default: 1
        },
        order_type: {
            type: String,
            enum : ['BUY','SELL']
        }
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", order);
module.exports = Order;