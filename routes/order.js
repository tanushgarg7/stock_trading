const express = require("express");
const router = express.Router();
const api = require("../datasets/stockData.js");
const Order = require("../models/Order.js");
const User = require("../models/User.js");
const Wallet = require("../models/Wallet.js");
const axios = require("axios");
const getStockPrice = require("../datasets/stockPrice.js");

router.post("/create", async function (req, res) {
  try {
    const user = await User.findById(req.body.user_id);
    if (!user)
      throw {
        status: 404,
        message: "User not found",
      };

    const stockApi = api(req.body.company, process.env.API);
    const stockPrice = await axios
      .get(stockApi)
      .then((res) => getStockPrice(res));

    const wallet = await Wallet.findById(user.wallet);
    const walletBalance = wallet["balance"];

    if (
      walletBalance < stockPrice * req.body.quantity &&
      req.body.type === "BUY"
    )
      throw {
        status: 400,
        message: "Insufficient Wallet balance",
      };

    const order = await Order.create({
      user_id: req.body.user_id,
      stock: req.body.company,
      stock_price: stockPrice,
      quantity: req.body.quantity,
      order_type: req.body.type,
    });

    if (req.body.type === "BUY") {
      wallet.balance -= stockPrice * req.body.quantity;
    } else {
      wallet.balance += stockPrice * req.body.quantity;
    }

    const history = await axios
      .patch("http://localhost:8012/history/addtoHistory", {
        h_id: user.history,
        orderId: order._id,
      })
      .then((result) => {
        return result.data;
      });
    let portfolio;
    if (req.body.type === "BUY") {
      portfolio = await axios
        .patch("http://localhost:8012/portfolio/update", {
          p_id: user.portfolio,
          type: "BUY",
          quantity: order.quantity,
          price: stockPrice,
          company: order.stock,
        })
        .then((result) => {
          return result.data;
        });
    } else {
      portfolio = await axios
        .patch("http://localhost:8012/portfolio/update", {
          p_id: user.portfolio,
          type: "SELL",
          quantity: req.body.quantity,
          stock_id: req.body.stock_id,
        })
        .then((result) => {
          return result.data;
        });
    }

    await wallet.save();
    res.status(201).json({ order, portfolio, history, wallet });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
});

module.exports = router;
