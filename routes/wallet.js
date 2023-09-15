const Wallet = require("../models/Wallet.js");
const express = require("express");
const router = express.Router();

router.post("/create", async function (req, res) {
  try {
    const wallet = new Wallet({
      user_id: req.body.user_id,
    });

    await wallet.save();
    res.status(201).json({ success: true, result: wallet });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

router.patch("/addBalance", async function (req, res) {
  try {
    const wallet = await Wallet.findById(req.body.wallet_id);
    wallet.balance += req.body.balance;
    await wallet.save();

    res.status(200).json({ success: true, result: wallet });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

module.exports = router;
