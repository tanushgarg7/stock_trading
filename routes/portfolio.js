const Portfolio = require("../models/Portfolio.js");
const express = require("express");
const router = express.Router();

router.get("/:id", async function (req, res) {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) throw { status: 404, message: "Portfolio not found" };

    res.status(200).json({ success: true, result: portfolio });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

router.post("/create", async function (req, res) {
  try {
    const portfolio = new Portfolio({
      user_id: req.body.user_id,
    });

    await portfolio.save();
    res.status(201).json({ success: true, result: portfolio });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});
router.patch("/update", async function (req, res) {
  try {
    const portfolio = await Portfolio.findById(req.body.p_id);

    if (req.body.type === "BUY") {
      const newStock = {
        company: req.body.company,
        quantity: req.body.quantity,
        price: req.body.price,
      };

      portfolio.stocks.push(newStock);
    } else {
      const stock = await portfolio.stocks.id(req.body.stock_id);

      if (stock.quantity == req.body.quantity) {
        stock.remove();
      } else {
        const newQuantity = stock.quantity - req.body.quantity;

        const newStock = { ...stock, quantity: newQuantity };

        stock.set(newStock);
      }
    }
    await portfolio.save();
    res.status(200).json(portfolio);
  } catch (err) {
    console.log(err.message);
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

module.exports = router;
