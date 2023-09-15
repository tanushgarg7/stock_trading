const company = {
  IBM: "IBM",
  Netflix: "NFLX",
  Microsoft: "MSFT",
  Tesla: "TSLA",
  WellsFargo: "WFS",
  GoldmanSachs: "GS",
  TCS: "TCS",
};
const api = (name, api_key) =>
  `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company[name]}&interval=1min&apikey=${api_key}`;

module.exports = company;
module.exports = api;
