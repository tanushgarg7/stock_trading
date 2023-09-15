function getStockPrice(res) {
  return parseFloat(res.data["Time Series (1min)"][
    Object.keys(res.data["Time Series (1min)"])[0]
  ]["1. open"]);
}

module.exports = getStockPrice;
