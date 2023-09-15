const History = require("../models/History.js");
const express = require("express");
const router = express.Router();

router.post("/create", async function (req, res) {
  try {
    const history = new History({
      user_id: req.body.user_id,
    });

    await history.save();
    res.status(201).json({ success: true, result: history });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});
router.patch("/addtoHistory", async function (req, res) {
  try {
    const history = await History.findById(req.body.h_id);
    history.orders.push(req.body.orderId);
    await history.save();
    res.status(200).json(history);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
})

module.exports = router;
