const mongoose = require('mongoose');
// const CryptoJS = require('crypto-js');

const monthlyShipmentSchema = new mongoose.Schema({
  goodsType: {
    type: String,
  },
  adelaidePallets: {
    type: Number,
    default: 0,
  },
  perthPallets: {
    default: 0,
    type: Number,
  },
  sydneyPallets: {
    default: 0,
    type: Number,
  },
  melbournePallets: {
    default: 0,
    type: Number,
  },
  brisbonPallets: {
    type: Number,
  },

  adelaideBoxes: {
    default: 0,
    type: Number,
  },
  perthBoxes: {
    default: 0,
    type: Number,
  },
  sydneyBoxes: {
    type: Number,
    default: 0,
  },
  melbourneBoxes: {
    default: 0,
    type: Number,
  },
  brisbonBoxes: {
    type: Number,
  },
  boxes: {
    type: Number,
  },
  ribbons: {
    type: Number,
  },
  createdAt: { type: Date, expires: 2592000, default: Date.now },
});
const MonthlyShipment = mongoose.model(
  'MonthlyShipment',
  monthlyShipmentSchema
);

module.exports = MonthlyShipment;
