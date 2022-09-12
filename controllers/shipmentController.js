const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Shipment = require('../models/shipmentModel');
const MonthlyShipment = require('../models/monthlyShipmentModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getShipments = catchAsync(async (req, res, next) => {
  const shipments = await Shipment.find();
  res.status(200).json({
    status: 'success',
    shipments,
  });
});
exports.getMonthlyShipments = catchAsync(async (req, res, next) => {
  const shipments = await MonthlyShipment.find();

  const daysSevenFlowers = [];
  const daysFifteenFlowers = [];
  const daysThirtyFlowers = [];
  const daysSevenHardGoods = [];
  const daysFifteenHardGoods = [];
  const daysThirtyHardGoods = [];

  ////
  const adelaideShipments = [];

  const timeCheck = (d) => {
    const today = new Date();
    const createdOn = new Date(d);

    const msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diff = (+today - +createdOn) / msInDay;

    return diff;
  };
  // let response = {};

  // eslint-disable-next-line no-plusplus
  for (let i = 0; shipments.length > i; i++) {
    const timePassed = timeCheck(`${shipments[i].createdAt.toISOString()}`);
    if (shipments[i].goodsType === 'flowers') {
      adelaideShipments.push(shipments[i].adelaideBoxes);
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

  ////
  const sevenFlowers = {
    // adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    // adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
    brisbonBoxes: 0,
    brisbonPallets: 0,
  };
  const fifteenFlowers = {
    // adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    // adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
    brisbonBoxes: 0,
    brisbonPallets: 0,
  };
  const thirtyFlowers = {
    // adelaideBoxes: 0,
    perthBoxes: 0,
    melbourneBoxes: 0,
    sydneyBoxes: 0,
    // adelaidePallets: 0,
    perthPallets: 0,
    melbournePallets: 0,
    sydneyPallets: 0,
    brisbonBoxes: 0,
    brisbonPallets: 0,
  };

  let totalFlowers = 0;
  const goodsType = {
    flowers: { adelaide: 0, perth: 0, sydney: 0, melbourne: 0 },
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

  daysSevenFlowers.forEach((el) => {
    // if (el.adelaidePallets) {
    //   sevenFlowers.adelaidePallets += el.adelaidePallets;
    // }
    // if (el.perthPallets) {
    //   sevenFlowers.perthPallets += el.perthPallets;
    // }
    if (el.melbournePallets)
      sevenFlowers.melbournePallets += el.melbournePallets;
    if (el.sydneyPallets) sevenFlowers.sydneyPallets += el.sydneyPallets;
    ///
    // if (el.adelaideBoxes) sevenFlowers.adelaideBoxes += el.adelaideBoxes;
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
    // if (el.adelaidePallets)
    //   fifteenFlowers.adelaidePallets += el.adelaidePallets;
    if (el.perthPallets) fifteenFlowers.perthPallets += el.perthPallets;
    if (el.melbournePallets)
      fifteenFlowers.melbournePallets += el.melbournePallets;
    if (el.sydneyPallets) fifteenFlowers.sydneyPallets += el.sydneyPallets;
    //
    // if (el.adelaideBoxes) fifteenFlowers.adelaideBoxes += el.adelaideBoxes;
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
    totalFlowers += 1;
    // if (el.adelaidePallets) {
    //   thirtyFlowers.adelaidePallets += el.adelaidePallets;
    // }
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
    // if (el.adelaideBoxes) {
    //   thirtyFlowers.adelaideBoxes += el.adelaideBoxes;
    // }
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
    // {
    //   company: 'Adelaide',
    //   LastWeekPellets: sevenFlowers.adelaidePallets,
    //   LastWeekBoxes: sevenFlowers.adelaideBoxes,

    //   ///
    //   FifteenDaysPellets: fifteenFlowers.adelaidePallets,
    //   FifteenDaysBoxes: fifteenFlowers.adelaideBoxes,
    //   //
    //   MonthlyPellets: thirtyFlowers.adelaidePallets,
    //   MonthlyBoxes: thirtyFlowers.adelaideBoxes,
    // },
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
  ];

  const tableData = {
    hardGoods: daysThirtyHardGoods,
    flowers: tableDataFlowers,
    adelaideShipments,
    totalFlowers,
  };
  res.status(200).json({
    status: 'success',
    tableData,
  });
});

exports.createShipment = catchAsync(async (req, res, next) => {
  let monthlyData = {
    goodsType: req.body.goodsType,
    adelaidePallets: req.body.adelaidePallets,
    perthPallets: req.body.perthPallets,
    sydneyPallets: req.body.sydneyPallets,
    melbournePallets: req.body.melbournePallets,
    adelaideBoxes: { createdAt: Date.now() },
    perthBoxes: req.body.perthBoxes,
    sydneyBoxes: req.body.sydneyBoxes,
    melbourneBoxes: req.body.melbourneBoxes,
    brisbonBoxes: req.body.brisbonBoxes,
    brisbonPallets: req.body.brisbonPallets,
    boxes: req.body.boxes,
    ribbons: req.body.ribbons,
    extraInputs: { createdAt: Date.now() },
  };
  if (req.body.extraInputs && req.body.extraInputs.length > 0)
    req.body.extraInputs.forEach((el) => {
      monthlyData = {
        ...monthlyData,
        extraInputs: { ...monthlyData.extraInputs, ...el },
      };
    });
  if (req.body.adelaideBoxes && req.body.adelaideBoxes.length > 0)
    req.body.adelaideBoxes.forEach((el) => {
      monthlyData = {
        ...monthlyData,
        adelaideBoxes: { ...monthlyData.adelaideBoxes, ...el },
      };
    });
  console.log(monthlyData);
  const rq = req.body;
  const monthly = await MonthlyShipment.create(monthlyData);
  // console.log(monthly, 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm');
  // if (!monthly) new AppError('Monthly was not created', 404);
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
  console.log('filessss  sssssssssssssssssssssssssssssssssssssssssss 🤣😂😁😁');
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
