const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

exports.getMe = (req, res, next) => {
  // req.params.id = req.user.id;
  // next();
  res.status(200).json({
    user: req.user,
  });
};

// 3) Update user document

exports.createAdmin = catchAsync(async (req, res, next) => {
  console.log(req.params.email);
  if (!req.params.email)
    return next(
      new AppError('No Email was provided. Kindly provide a valid email.', 400)
    );

  const resp = await User.findOneAndUpdate(
    { email: req.params.email },
    { role: 'admin' },
    { new: true }
  );
  if (!resp)
    return next(
      new AppError(
        `User does not exist. Kindly create a user with this email(${req.params.email}) before trying again!`,
        400
      )
    );

  res.status(204).json({
    status: 'success',
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
