const mongoose = require('mongoose');
// const CryptoJS = require('crypto-js');

const shipmentSchema = new mongoose.Schema({
  goodsType: {
    type: String,
  },
  trackingEmail: {
    type: String,
  },
  polarCool: {
    type: String,
  },
  polarCoolInvoice: {
    type: String,
  },
  goatInvoice: {
    type: String,
  },
  selesbyInvoice: {
    type: String,
  },
  goat: {
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
  airwayBill: {
    type: String,
  },
  selesby: {
    type: String,
  },
  truckItDocs: {
    type: String,
  },
  truckItDetails: {
    type: String,
  },
  polarCoolLabels: {
    type: String,
  },
  adelideAndPerthFreightForwarder: {
    type: String,
  },
  polarCoolBookingTemplate: {
    type: String,
  },
  airwayBillNumber: {
    type: String,
    required: true,
  },
  packingList: {
    type: String,
  },
  polarCoolInvoiceFeeCheck: {
    type: Boolean,
  },
  GOATInvoiceFeeCheck: {
    type: Boolean,
  },
  selebyInvoiceFeeCheck: {
    type: Boolean,
  },
  SELESBYrelatedDocumentCheck: {
    type: Boolean,
  },
  GOATrelatedDocumentCheck: {
    type: Boolean,
  },
  polarCoolInvoiceFeeCheck: {
    type: Boolean,
  },
  //////////Dates
  clearanceDate: {
    type: String,
  },

  monthlyAccount: {
    type: String,
  },
  dateofArrival: {
    type: String,
  },
  dateFromCourier: {
    type: String,
  },
  estimatedTimeOfArrivalEnd: {
    type: String,
  },
  estimatedTimeOfArrivalStart: {
    type: String,
  },
  warehouseArrivalDate: {
    type: String,
  },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
