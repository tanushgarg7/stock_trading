const Wishlist = require("../models/Wishlist.js");
const express = require("express");
const router = express.Router();

router.get("/:id", async function (req, res) {
  try {
    const wishlist = await Wishlist.findById(req.params.id);
    if (!wishlist) throw { status: 404, message: "Wishlist not found" };

    res.status(200).json({ success: true, result: wishlist });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

router.post("/create", async function (req, res) {
  try {
    const wishlist = new Wishlist({
      user_id: req.body.user_id,
      stocks: [],
    });

    await wishlist.save();
    res.status(201).json({ success: true, result: wishlist });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});
router.patch("/addToWishlist", async function (req, res) {
  try {
    const wishlist = await Wishlist.findById(req.body.wishlist_id);
    if (!wishlist) throw { status: 404, message: "Wishlist not found" };

    let setStocks = new Set(wishlist.stocks);
    setStocks.add(req.body.company);
    wishlist.stocks = Array.from(setStocks);
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

router.delete("/remove/:wishlist_id/:company", async function (req, res) {
  try {
    const wishlist = await Wishlist.findById(req.params.wishlist_id);
    if (!wishlist) throw { status: 404, message: "Wishlist not found" };

    wishlist.stocks.map((item, key) => {
      if (item === req.params.company) {
        wishlist.stocks.splice(key, 1);
        return;
      }
    });

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
});

module.exports = router;
