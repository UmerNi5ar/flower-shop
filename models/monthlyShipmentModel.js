const mongoose = require('mongoose');
// const CryptoJS = require('crypto-js');

const monthlyShipmentSchema = new mongoose.Schema({
  goodsType: {
    type: String,
  },
  adelaidePallets: {
    type: Number,
  },
  perthPallets: {
    type: Number,
  },
  sydneyPallets: {
    type: Number,
  },
  melbournePallets: {
    type: Number,
  },

  adelaideBoxes: {
    type: Number,
  },
  perthBoxes: {
    type: Number,
  },
  sydneyBoxes: {
    type: Number,
  },
  melbourneBoxes: {
    type: Number,
  },
  createdAt: { type: Date, expires: 2592000, default: Date.now },
});
const MonthlyShipment = mongoose.model(
  'MonthlyShipment',
  monthlyShipmentSchema
);

module.exports = MonthlyShipment;
