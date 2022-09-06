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

  let daysSevenFlowers = [];
  let daysFifteenFlowers = [];
  let daysThirtyFlowers = [];
  let daysSevenHardGoods = [];
  let daysFifteenHardGoods = [];
  let daysThirtyHardGoods = [];

  const timeCheck = (d) => {
    let today = new Date();
    let createdOn = new Date(d);

    let msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    let diff = (+today - +createdOn) / msInDay;

    return diff;
  };
  // let response = {};

  for (let i = 0; shipments.length > i; i++) {
    const timePassed = timeCheck(`${shipments[i].createdAt.toISOString()}`);
    if (shipments[i].goodsType === 'flowers') {
      if (timePassed < 8) {
        daysSevenFlowers.push(shipments[i]);
      }
      if (timePassed < 16) {
        daysFifteenFlowers.push(shipments[i]);
      }
      if (timePassed < 30) {
        daysThirtyFlowers.push(shipments[i]);
      }
    } else {
      if (timePassed < 8) {
        daysSevenHardGoods.push(shipments[i]);
      }
      if (timePassed < 16) {
        daysFifteenHardGoods.push(shipments[i]);
      }
      if (timePassed < 30) {
        daysThirtyHardGoods.push(shipments[i]);
      }
    }
  }

  const seven = {
    ribbons: 0,
    boxes: 0,
  };
  const fifteen = {
    ribbons: 0,
    boxes: 0,
  };
  const thirty = {
    ribbons: 0,
    boxes: 0,
  };
  ////
  const sevenFlowers = {
    adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
    brisbonBoxes: 0,
    brisbonPallets: 0,
  };
  const fifteenFlowers = {
    adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
    brisbonBoxes: 0,
    brisbonPallets: 0,
  };
  const thirtyFlowers = {
    adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
    brisbonBoxes: 0,
    brisbonPallets: 0,
  };
  let totalHardGoods = 0;
  let totalFlowers = 0;
  // const goodsType = {
  //   hardGoods: { adelaide: 0, perth: 0, sydney: 0, melbourne: 0 },
  //   flowers: { adelaide: 0, perth: 0, sydney: 0, melbourne: 0 },

  // };

  daysSevenHardGoods.forEach((el) => {
    if (el.boxes) seven.boxes += el.boxes;
    if (el.ribbons) seven.ribbons += el.ribbons;
  });

  daysFifteenHardGoods.forEach((el) => {
    if (el.boxes) fifteen.boxes += el.boxes;
    if (el.ribbons) fifteen.ribbons += el.ribbons;
  });

  daysThirtyHardGoods.forEach((el) => {
    totalHardGoods += 1;
    if (el.boxes) thirty.boxes += el.boxes;
    if (el.ribbons) thirty.ribbons += el.ribbons;
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////

  daysSevenFlowers.forEach((el) => {
    if (el.adelaidePallets) {
      sevenFlowers.adelaidePallets += el.adelaidePallets;
    }
    if (el.perthPallets) {
      sevenFlowers.perthPallets += el.perthPallets;
    }
    if (el.melbournePallets)
      sevenFlowers.melbournePallets += el.melbournePallets;
    if (el.sydneyPallets) sevenFlowers.sydneyPallets += el.sydneyPallets;
    ///
    if (el.adelaideBoxes) sevenFlowers.adelaideBoxes += el.adelaideBoxes;
    if (el.perthBoxes) {
      sevenFlowers.perthBoxes += el.perthBoxes;
    }
    if (el.melbourneBoxes) sevenFlowers.melbourneBoxes += el.melbourneBoxes;

    if (el.sydneyBoxes) sevenFlowers.sydneyBoxes += el.sydneyBoxes;
    if (el.brisbonPallets) {
      sevenFlowers.brisbonPallets += el.brisbonPallets;
    }
    if (el.brisbonBoxes) {
      sevenFlowers.brisbonBoxes += el.brisbonBoxes;
    }
  });

  daysFifteenFlowers.forEach((el) => {
    if (el.adelaidePallets)
      fifteenFlowers.adelaidePallets += el.adelaidePallets;
    if (el.perthPallets) fifteenFlowers.perthPallets += el.perthPallets;
    if (el.melbournePallets)
      fifteenFlowers.melbournePallets += el.melbournePallets;
    if (el.sydneyPallets) fifteenFlowers.sydneyPallets += el.sydneyPallets;
    //
    if (el.adelaideBoxes) fifteenFlowers.adelaideBoxes += el.adelaideBoxes;
    if (el.perthBoxes) fifteenFlowers.perthBoxes += el.perthBoxes;
    if (el.melbourneBoxes) fifteenFlowers.melbourneBoxes += el.melbourneBoxes;
    if (el.sydneyBoxes) fifteenFlowers.sydneyBoxes += el.sydneyBoxes;
    if (el.brisbonPallets) {
      fifteenFlowers.brisbonPallets += el.brisbonPallets;
    }
    if (el.brisbonBoxes) {
      fifteenFlowers.brisbonBoxes += el.brisbonBoxes;
    }
  });

  daysThirtyFlowers.forEach((el) => {
    console.log(el);
    totalFlowers += 1;
    if (el.adelaidePallets) {
      thirtyFlowers.adelaidePallets += el.adelaidePallets;
    }
    if (el.perthPallets) {
      thirtyFlowers.perthPallets += el.perthPallets;
    }
    if (el.melbournePallets) {
      thirtyFlowers.melbournePallets += el.melbournePallets;
    }
    if (el.sydneyPallets) {
      thirtyFlowers.sydneyPallets += el.sydneyPallets;
    }

    //
    if (el.adelaideBoxes) {
      thirtyFlowers.adelaideBoxes += el.adelaideBoxes;
    }
    if (el.perthBoxes) {
      thirtyFlowers.perthBoxes += el.perthBoxes;
    }
    if (el.melbourneBoxes) {
      thirtyFlowers.melbourneBoxes += el.melbourneBoxes;
    }
    if (el.sydneyBoxes) {
      thirtyFlowers.sydneyBoxes += el.sydneyBoxes;
    }
    if (el.brisbonPallets) {
      thirtyFlowers.brisbonPallets += el.brisbonPallets;
    }
    if (el.brisbonBoxes) {
      thirtyFlowers.brisbonBoxes += el.brisbonBoxes;
    }
  });

  //////////////////
  const tableDataHardGoods = [
    {
      LastWeekRibbons: seven.ribbons,
      LastWeekBoxes: seven.boxes,
      ///
      FifteenDaysRibbons: fifteen.ribbons,
      FifteenDaysBoxes: fifteen.boxes,
      //
      MonthlyRibbons: thirty.ribbons,
      MonthlyBoxes: thirty.boxes,
    },
  ];

  const tableDataFlowers = [
    {
      company: 'Sydney',
      LastWeekPellets: sevenFlowers.sydneyPallets,
      LastWeekBoxes: sevenFlowers.sydneyBoxes,
      ///
      FifteenDaysPellets: fifteenFlowers.sydneyPallets,
      FifteenDaysBoxes: fifteenFlowers.sydneyBoxes,
      //
      MonthlyPellets: thirtyFlowers.sydneyPallets,
      MonthlyBoxes: thirtyFlowers.sydneyBoxes,
    },
    {
      company: 'Adelaide',
      LastWeekPellets: sevenFlowers.adelaidePallets,
      LastWeekBoxes: sevenFlowers.adelaideBoxes,

      ///
      FifteenDaysPellets: fifteenFlowers.adelaidePallets,
      FifteenDaysBoxes: fifteenFlowers.adelaideBoxes,
      //
      MonthlyPellets: thirtyFlowers.adelaidePallets,
      MonthlyBoxes: thirtyFlowers.adelaideBoxes,
    },
    {
      company: 'Perth',
      LastWeekBoxes: sevenFlowers.perthBoxes,
      LastWeekPellets: sevenFlowers.perthPallets,
      ///
      FifteenDaysPellets: fifteenFlowers.perthPallets,
      FifteenDaysBoxes: fifteenFlowers.perthBoxes,
      //
      MonthlyPellets: thirtyFlowers.perthPallets,
      MonthlyBoxes: thirtyFlowers.perthBoxes,
    },
    {
      company: 'Melbourne',
      LastWeekBoxes: sevenFlowers.melbourneBoxes,
      LastWeekPellets: sevenFlowers.melbournePallets,
      ///
      FifteenDaysPellets: fifteenFlowers.melbournePallets,
      FifteenDaysBoxes: fifteenFlowers.melbourneBoxes,
      //
      MonthlyPellets: thirtyFlowers.melbournePallets,
      MonthlyBoxes: thirtyFlowers.melbourneBoxes,
    },
    {
      company: 'Brisbon',
      LastWeekBoxes: sevenFlowers.brisbonBoxes,
      LastWeekPellets: sevenFlowers.brisbonPallets,
      ///
      FifteenDaysPellets: fifteenFlowers.brisbonPallets,
      FifteenDaysBoxes: fifteenFlowers.brisbonBoxes,
      //
      MonthlyPellets: thirtyFlowers.brisbonPallets,
      MonthlyBoxes: thirtyFlowers.brisbonBoxes,
    },
    {
      totalFlowers,
    },
  ];
  const tableData = {
    hardGoods: tableDataHardGoods,
    flowers: tableDataFlowers,
    totalFlowers,
    totalHardGoods: totalHardGoods,
  };

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
    brisbonBoxes: req.body.brisbonBoxes,
    brisbonPallets: req.body.brisbonPallets,
    boxes: req.body.boxes,
    ribbons: req.body.ribbons,
  };
  const monthly = await MonthlyShipment.create(monthlyData);
  console.log(monthly);

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
    brisbonBoxes: req.body.brisbonBoxes,
    brisbonPallets: req.body.brisbonPallets,
    boxes: req.body.boxes,
    ribbons: req.body.ribbons,
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
