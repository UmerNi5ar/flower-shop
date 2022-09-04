const multer = require('multer');
const Shipment = require('../models/shipmentModel');
const MonthlyShipment = require('../models/monthlyShipmentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { findByIdAndUpdate } = require('../models/shipmentModel');
const fs = require('fs');
const path = require('path');
const { listeners } = require('process');

exports.getShipments = catchAsync(async (req, res, next) => {
  const shipments = await Shipment.find();
  res.status(200).json({
    status: 'success',
    shipments,
  });
});
exports.getMonthlyShipments = catchAsync(async (req, res, next) => {
  const shipments = await MonthlyShipment.find();

  let daysSeven = [];
  let daysFifteen = [];
  let daysThirty = [];

  const timeCheck = (d) => {
    let today = new Date();
    let createdOn = new Date(d);

    let msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    let diff = (+today - +createdOn) / msInDay;
    //////////////////////////////////////////////
    //////////////////////////////////
    //////////////////
    return diff;
  };
  response = {};

  for (let i = 0; shipments.length > i; i++) {
    let timePassed = timeCheck(`${shipments[i].createdAt.toISOString()}`);

    if (timePassed < 8) {
      daysSeven.push(shipments[i]);
    }
    if (timePassed < 16) {
      daysFifteen.push(shipments[i]);
    }
    if (timePassed < 30) {
      daysThirty.push(shipments[i]);
    }
  }

  const seven = {
    adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
  };
  const fifteen = {
    adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
  };
  const thirty = {
    adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
  };
  const goodsType = {
    hardGoods: { adelaide: 0, perth: 0, sydney: 0, melbourne: 0 },
    flowers: { adelaide: 0, perth: 0, sydney: 0, melbourne: 0 },
  };
  daysSeven.forEach((el) => {
    if (el.adelaidePallets) {
      seven.adelaidePallets += el.adelaidePallets;
    }

    if (el.perthPallets) {
      seven.perthPallets += el.perthPallets;
    }
    if (el.melbournePallets) seven.melbournePallets += el.melbournePallets;
    if (el.sydneyPallets) seven.sydneyPallets += el.sydneyPallets;
    ///
    if (el.adelaideBoxes) seven.adelaideBoxes += el.adelaideBoxes;
    if (el.perthBoxes) {
      seven.perthBoxes += el.perthBoxes;
    }
    if (el.melbourneBoxes) seven.melbourneBoxes += el.melbourneBoxes;

    if (el.sydneyBoxes) seven.sydneyBoxes += el.sydneyBoxes;
  });

  daysFifteen.forEach((el) => {
    if (el.adelaidePallets) fifteen.adelaidePallets += el.adelaidePallets;
    if (el.perthPallets) fifteen.perthPallets += el.perthPallets;
    if (el.melbournePallets) fifteen.melbournePallets += el.melbournePallets;
    if (el.sydneyPallets) fifteen.sydneyPallets += el.sydneyPallets;
    //
    if (el.adelaideBoxes) fifteen.adelaideBoxes += el.adelaideBoxes;
    if (el.perthBoxes) fifteen.perthBoxes += el.perthBoxes;
    if (el.melbourneBoxes) fifteen.melbourneBoxes += el.melbourneBoxes;
    if (el.sydneyBoxes) fifteen.sydneyBoxes += el.sydneyBoxes;
  });

  daysThirty.forEach((el) => {
    if (el.adelaidePallets) {
      if (el.goodsType === 'flowers') goodsType.flowers.adelaide += 1;
      if (el.goodsType === 'hardGoods') goodsType.flowers.adelaide += 1;
      thirty.adelaidePallets += el.adelaidePallets;
    }
    if (el.perthPallets) {
      if (el.goodsType === 'flowers') goodsType.flowers.perth += 1;
      if (el.goodsType === 'hardGoods') goodsType.flowers.perth += 1;
      thirty.perthPallets += el.perthPallets;
    }
    if (el.melbournePallets) {
      if (el.goodsType === 'flowers') goodsType.flowers.melbourne += 1;
      if (el.goodsType === 'hardGoods') goodsType.flowers.melbourne += 1;
      thirty.melbournePallets += el.melbournePallets;
    }
    if (el.sydneyPallets) {
      if (el.goodsType === 'flowers') goodsType.flowers.sydney += 1;
      if (el.goodsType === 'hardGoods') goodsType.flowers.sydney += 1;
      thirty.sydneyPallets += el.sydneyPallets;
    }
    //
    if (el.adelaideBoxes) {
      thirty.adelaideBoxes += el.adelaideBoxes;
    }
    if (el.perthBoxes) {
      thirty.perthBoxes += el.perthBoxes;
    }
    if (el.melbourneBoxes) {
      thirty.melbourneBoxes += el.melbourneBoxes;
    }
    if (el.sydneyBoxes) {
      thirty.sydneyBoxes += el.sydneyBoxes;
    }
  });
  const tableData = [
    {
      company: 'Sydney',
      LastWeekPellets: seven.sydneyPallets,
      LastWeekBoxes: seven.sydneyBoxes,
      ///
      FifteenDaysPellets: fifteen.sydneyPallets,
      FifteenDaysBoxes: fifteen.sydneyBoxes,
      //
      MonthlyPellets: thirty.sydneyPallets,
      MonthlyBoxes: thirty.sydneyBoxes,
      hardGoods: goodsType.hardGoods.sydney,
      flowers: goodsType.flowers.sydney,
    },
    {
      company: 'Adelaide',
      LastWeekPellets: seven.adelaidePallets,
      LastWeekBoxes: seven.adelaideBoxes,

      ///
      FifteenDaysPellets: fifteen.adelaidePallets,
      FifteenDaysBoxes: fifteen.adelaideBoxes,
      //
      MonthlyPellets: thirty.adelaidePallets,
      MonthlyBoxes: thirty.adelaideBoxes,
      hardGoods: goodsType.hardGoods.adelaide,
      flowers: goodsType.flowers.adelaide,
    },
    {
      company: 'Perth',
      LastWeekBoxes: seven.perthBoxes,
      LastWeekPellets: seven.perthPallets,
      ///
      FifteenDaysPellets: fifteen.perthPallets,
      FifteenDaysBoxes: fifteen.perthBoxes,
      //
      MonthlyPellets: thirty.perthPallets,
      MonthlyBoxes: thirty.perthBoxes,
      hardGoods: goodsType.hardGoods.perth,
      flowers: goodsType.flowers.perth,
    },
    {
      company: 'Melbourne',
      LastWeekBoxes: seven.melbourneBoxes,
      LastWeekPellets: seven.melbournePallets,
      ///
      FifteenDaysPellets: fifteen.melbournePallets,
      FifteenDaysBoxes: fifteen.melbourneBoxes,
      //
      MonthlyPellets: thirty.melbournePallets,
      MonthlyBoxes: thirty.melbourneBoxes,
      hardGoods: goodsType.hardGoods.melbourne,
      flowers: goodsType.flowers.melbourne,
    },
  ];

  res.status(200).json({
    status: 'success',
    tableData,
  });
});

exports.createShipment = catchAsync(async (req, res, next) => {
  const monthlyData = {
    goodsType: req.body.goodsType,
    adelaidePallets: req.body.adelaidePallets,
    perthPallets: req.body.perthPallets,
    sydneyPallets: req.body.sydneyPallets,
    melbournePallets: req.body.melbournePallets,
    adelaideBoxes: req.body.adelaideBoxes,
    perthBoxes: req.body.perthBoxes,
    sydneyBoxes: req.body.sydneyBoxes,
    melbourneBoxes: req.body.melbourneBoxes,
  };
  const monthly = await MonthlyShipment.create(monthlyData);

  let rq = req.body;
  const body = { ...rq, monthlyAccount: monthly._id.toString() };

  const shipment = await Shipment.create(body);

  res.status(200).json({
    status: 'success',
    shipment,
  });
});

const fileExists = async (path) =>
  !!(await fs.promises.stat(path).catch((e) => false));

exports.deleteImages = async (req, res, next) => {
  const files = req.body.files;
  if (files.length !== 0) {
    await files.forEach(async (file) => {
      if (!file) return;
      let fileName = file[1];
      const fileCheck = await fileExists(
        path.join(`${__dirname}/../uploads/files`, fileName)
      );

      if (fileCheck) {
        fs.unlink(
          path.join(`${__dirname}/../uploads/files`, fileName),
          (err) => {
            if (err) {
              next(new AppError('Failed to delete flie', 404));
            }
            return;
          }
        );
      }
    });
  }
  next();
};
exports.deleteShipment = catchAsync(async (req, res, next) => {
  const files = [
    req.body.adelideAndPerthFreightForwarder,
    req.body.selesbyInvoice,
    req.body.goatInvoice,
    req.body.selesby,
    req.body.polarCoolInvoice,
    req.body.goat,
    req.body.truckItDocs,
    req.body.polarCoolLabels,
    req.body.polarCoolBookingTemplate,
    req.body.airwayBill,
    req.body.packingList,
  ];

  if (files.length !== 0) {
    await files.forEach(async (file) => {
      if (!file) return;
      let fileName = file;
      const fileCheck = await fileExists(
        path.join(`${__dirname}/../uploads/files`, fileName)
      );
      console.log(path.join(`${__dirname}/../uploads/files`, fileName));

      if (fileCheck) {
        fs.unlink(
          path.join(`${__dirname}/../uploads/files`, fileName),
          (err) => {
            if (err) {
              next(new AppError('Failed to delete flie', 404));
            }
            return;
          }
        );
      }
    });
  }
  await MonthlyShipment.findByIdAndDelete({
    _id: req.body.monthlyAccount,
  });

  const response = await Shipment.findOneAndDelete({
    _id: req.body._id,
  });

  res.status(202).json({
    status: 'success',
    shipment: response,
  });
});
exports.updateShipment = catchAsync(async (req, res, next) => {
  const monthlyData = {
    goodsType: req.body.goodsType,
    adelaidePallets: req.body.adelaidePallets,
    perthPallets: req.body.perthPallets,
    sydneyPallets: req.body.sydneyPallets,
    melbournePallets: req.body.melbournePallets,
    adelaideBoxes: req.body.adelaideBoxes,
    perthBoxes: req.body.perthBoxes,
    sydneyBoxes: req.body.sydneyBoxes,
    melbourneBoxes: req.body.melbourneBoxes,
  };

  const monthly = await MonthlyShipment.findByIdAndUpdate(
    req.body.monthlyAccount,
    monthlyData,
    {
      new: true,
      useFindAndModify: true,
    }
  );

  const updatedShipment = await Shipment.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true, useFindAndModify: true }
  );
  console.log(updatedShipment);
  res.status(200).json({
    status: 'success',
    updatedShipment,
  });
});

////////Multer

const multerStorage = multer.diskStorage({
  destination: (req, file, callB) => {
    callB(null, './uploads/files');
  },
  filename: (req, file, callB) => {
    const ext = file.mimetype.split('/')[1];
    callB(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, files, callB) => {
  if (
    files.mimetype.startsWith('image') ||
    files.mimetype.startsWith('application')
  ) {
    callB(null, true);
  } else {
    callB(new AppError('File not supported', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
exports.imageUpload = upload.fields([
  { name: 'adelideAndPerthFreightForwarder', maxCount: 1 },
  { name: 'polarCoolLabels', maxCount: 1 },
  { name: 'polarCoolInvoice', maxCount: 1 },

  { name: 'polarCoolBookingTemplate', maxCount: 1 },
  { name: 'airwayBill', maxCount: 1 },
  { name: 'packingList', maxCount: 1 },

  { name: 'selesby', maxCount: 1 },
  { name: 'selesbyInvoice', maxCount: 1 },
  { name: 'goatInvoice', maxCount: 1 },

  { name: 'truckItDocs', maxCount: 1 },
  { name: 'polarCool', maxCount: 1 },
  { name: 'goat', maxCount: 1 },
]);
//////////////// Left for end will optimize

exports.completeShitment = catchAsync(async (req, res, next) => {
  let names = {};
  let a = { ...req.files };
  let b = Object.values(a).forEach((file) => {
    if (file[0]) names = { ...names, [file[0].fieldname]: file[0].filename };
  });

  const updatedShipment = await Shipment.findByIdAndUpdate(
    req.body.id,
    {
      ...names,
    },
    { new: true, useFindAndModify: true }
  );

  res.status(200).json({
    names,
  });
});
