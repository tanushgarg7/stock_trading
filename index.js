const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

const userRoutes = require("./routes/user.js");
const wishlistRoutes = require("./routes/wishlist.js");
const walletRoutes = require("./routes/wallet.js");
const orderRoutes = require("./routes/order.js");
const historyRoutes = require("./routes/history.js");
const portfolioRoutes = require("./routes/portfolio.js");


app.use("/user", userRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/wallet", walletRoutes);
app.use("/order", orderRoutes);
app.use("/history", historyRoutes);
app.use("/portfolio", portfolioRoutes);


app.use("/", (req, res) => {
  res.send("Welcome");
});
const server = app.listen(process.env.PORT || 8012);

server.on("listening", () => {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.unpmvga.mongodb.net/?retryWrites=true&w=majority`,
    () => {
      console.log("connected to mongodb server");
    }
  );
  console.log(`Server is running on port ${process.env.PORT || 8012}`);
});
