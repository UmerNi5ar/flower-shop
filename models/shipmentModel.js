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
    type: Array,
  },
  polarCoolInvoice: {
    type: Array,
  },
  goatInvoice: {
    type: Array,
  },
  selesbyInvoice: {
    type: Array,
  },
  goat: {
    type: Array,
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
  brisbonPallets: {
    type: Number,
  },
  melbournePallets: {
    type: Number,
  },
  deleteFiles: {
    type: Array,
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
  brisbonBoxes: {
    type: Number,
  },
  boxes: {
    type: Number,
  },
  ribbons: {
    type: Number,
  },
  airwayBill: {
    type: Array,
  },
  adelaideAirwayBill: {
    type: Array,
  },
  perthAirwayBill: {
    type: Array,
  },
  selesby: {
    type: Array,
  },
  truckItDocs: {
    type: Array,
  },
  truckItDetails: {
    type: String,
  },
  polarCoolLabels: {
    type: Array,
  },
  adelideAndPerthFreightForwarder: {
    type: Array,
  },
  polarCoolBookingTemplate: {
    type: Array,
  },
  airwayBillNumber: {
    type: String,
  },
  adelaideAirwayBillNumber: {
    type: String,
  },
  perthAirwayBillNumber: {
    type: String,
  },
  packingList: {
    type: Array,
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
  extraInputs: {
    type: Array,
  },
  adelaideBoxes: {
    type: Object,
  },
  adelaide: {
    type: Object,
  },
  perth: {
    type: Object,
  },
  brisbane: {
    type: Object,
  },
  melbourne: {
    type: Object,
  },
  sydney: {
    type: Object,
  },
  dateOfArrivalSydney: {
    type: Object,
  },
  dateOfArrivalPerth: {
    type: Object,
  },
  dateOfArrivalMelbourne: {
    type: Object,
  },
  dateOfArrivalBrisbane: {
    type: Object,
  },
  dateOfArrivalAdelaide: {
    type: Object,
  },
  hardGoodsCompany: {
    type: String,
  },
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
