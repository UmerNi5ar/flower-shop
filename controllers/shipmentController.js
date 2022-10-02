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
  const deleted = await Shipment.findOneAndDelete({
    _id: req.body._id,
  });
  const files = [
    deleted.adelideAndPerthFreightForwarder,
    deleted.selesbyInvoice,
    deleted.goatInvoice,
    deleted.selesby,
    deleted.polarCoolInvoice,
    deleted.goat,
    deleted.truckItDocs,
    deleted.polarCoolLabels,
    deleted.polarCoolBookingTemplate,
    deleted.airwayBill,
    deleted.packingList,
    deleted.adelaideAirwayBill,
    deleted.perthAirwayBill,
  ];

  await MonthlyShipment.findByIdAndDelete({
    _id: req.body.monthlyAccount,
  });

  if (files.length !== 0) {
    await files.forEach(async (arr) => {
      arr.forEach(async (file) => {
        const fileName = file;
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
    });
  }

  res.status(202).json({
    status: 'success',
    shipment: deleted,
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
  const files = req.body.deleteFiles;

  const monthly = await MonthlyShipment.findByIdAndUpdate(
    req.body.monthlyAccount,
    monthlyData,
    {
      new: true,
      useFindAndModify: true,
    }
  );
  // console.log(req.body);
  const updatedShipment = await Shipment.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true, useFindAndModify: true }
  );
  console.log(monthly, updatedShipment);
  console.log(req.body.deleteFiles);
  if (!updatedShipment) new AppError('Failed to create shipment', 404);
  if (files && files.length !== 0) {
    await files.forEach(async (file) => {
      const fileName = file;

      const fileCheck = await fileExists(
        path.join(`${__dirname}/../uploads/files`, fileName)
      );
      console.log(fileCheck);
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
    callB(null, `${file.fieldname}-${file.originalname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, files, callB) => {
  console.log(files);
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
  { name: 'adelideAndPerthFreightForwarder', maxCount: 10 },
  { name: 'polarCoolLabels', maxCount: 10 },
  { name: 'polarCoolInvoice', maxCount: 10 },

  { name: 'polarCoolBookingTemplate', maxCount: 10 },
  { name: 'airwayBill', maxCount: 10 },
  { name: 'adelaideAirwayBill', maxCount: 10 },
  { name: 'perthAirwayBill', maxCount: 10 },

  { name: 'packingList', maxCount: 10 },

  { name: 'selesby', maxCount: 10 },
  { name: 'selesbyInvoice', maxCount: 10 },
  { name: 'goatInvoice', maxCount: 10 },

  { name: 'truckItDocs', maxCount: 10 },
  { name: 'polarCool', maxCount: 10 },
  { name: 'goat', maxCount: 10 },
]);
//////////////// Left for end will optimize

exports.completeShitment = catchAsync(async (req, res, next) => {
  let result = {};

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  const keys = Object.keys(req.files);

  keys.forEach((key) => {
    const fieldValue = req.files[key].map((el) => el.filename);
    result[key] = fieldValue;
    result[key] = [...new Set(result[key])];
  });
  await Shipment.findByIdAndUpdate(
    req.body.id,
    {
      ...result,
    },
    { new: true, useFindAndModify: true }
  );

  res.status(200).json({
    names: result,
  });
});

exports.createShipment = catchAsync(async (req, res, next) => {
  console.log(req.body);
  let monthlyData = {
    goodsType: req.body.goodsType,
    adelaidePallets: req.body.adelaidePallets,
    perthPallets: req.body.perthPallets,
    sydneyPallets: req.body.sydneyPallets,
    melbournePallets: req.body.melbournePallets,
    adelaide: {
      createdAt: new Date().getTime(),
      arrivalDate: req.body.dateOfArrivalAdelaide,
    },
    melbourne: {
      createdAt: new Date().getTime(),
      arrivalDate: req.body.dateOfArrivalMelbourne,
    },
    perth: {
      createdAt: new Date().getTime(),
      arrivalDate: req.body.dateOfArrivalPerth,
    },
    brisbane: {
      createdAt: new Date().getTime(),
      arrivalDate: req.body.dateOfArrivalBrisbane,
    },
    sydney: {
      createdAt: new Date().getTime(),
      arrivalDate: req.body.dateOfArrivalSydney,
    },
    perthBoxes: req.body.perthBoxes,
    sydneyBoxes: req.body.sydneyBoxes,
    melbourneBoxes: req.body.melbourneBoxes,
    brisbonBoxes: req.body.brisbonBoxes,
    brisbonPallets: req.body.brisbonPallets,
    boxes: req.body.boxes,
    ribbons: req.body.ribbons,
    extraInputs: { createdAt: new Date().getTime() },
  };
  if (req.body.extraInputs && req.body.extraInputs.length > 0)
    req.body.extraInputs.forEach((el) => {
      monthlyData = {
        ...monthlyData,
        extraInputs: { ...monthlyData.extraInputs, ...el },
      };
    });

  ////
  if (req.body.adelaide && req.body.adelaide.length > 0)
    req.body.adelaide.forEach((el) => {
      monthlyData = {
        ...monthlyData,
        adelaide: { ...monthlyData.adelaide, ...el },
      };
    });
  ///
  if (req.body.brisbane && req.body.brisbane.length > 0)
    req.body.brisbane.forEach((el) => {
      monthlyData = {
        ...monthlyData,
        brisbane: { ...monthlyData.brisbane, ...el },
      };
    });
  if (req.body.sydney && req.body.sydney.length > 0)
    req.body.sydney.forEach((el) => {
      monthlyData = {
        ...monthlyData,
        sydney: { ...monthlyData.sydney, ...el },
      };
    });
  if (req.body.melbourne && req.body.melbourne.length > 0)
    req.body.melbourne.forEach((el) => {
      monthlyData = {
        ...monthlyData,
        melbourne: { ...monthlyData.melbourne, ...el },
      };
    });
  if (req.body.perth && req.body.perth.length > 0)
    req.body.perth.forEach((el) => {
      monthlyData = {
        ...monthlyData,
        perth: { ...monthlyData.perth, ...el },
      };
    });

  const rq = req.body;
  const monthly = await MonthlyShipment.create(monthlyData);
  if (!monthly) new AppError('Monthly was not created', 404);
  const body = { ...rq, monthlyAccount: monthly._id.toString() };

  const shipment = await Shipment.create(body);

  res.status(200).json({
    status: 'success',
    shipment,
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
  const melbourneShipments = [];
  const perthShipments = [];
  const sydneyShipments = [];
  const brisbaneShipments = [];

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
      if (shipments[i].adelaide.value !== '')
        adelaideShipments.push(shipments[i].adelaide);

      if (shipments[i].melbourne.value !== '')
        melbourneShipments.push(shipments[i].melbourne);

      if (shipments[i].perth.value !== '')
        perthShipments.push(shipments[i].perth);

      if (shipments[i].sydney.value !== '')
        sydneyShipments.push(shipments[i].sydney);

      if (shipments[i].brisbane.value !== '')
        brisbaneShipments.push(shipments[i].brisbane);

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

  let totalFlowers = 0;
  const goodsType = {
    flowers: { adelaide: 0, perth: 0, sydney: 0, melbourne: 0 },
  };

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
      company: 'Brisbane',
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
  console.log(adelaideShipments, '/////////////////');
  const tableData = {
    hardGoods: daysThirtyHardGoods,
    flowers: tableDataFlowers,
    adelaideShipments,
    melbourneShipments,
    perthShipments,
    sydneyShipments,
    brisbaneShipments,
    totalFlowers,
  };
  res.status(200).json({
    status: 'success',
    tableData,
  });
});
