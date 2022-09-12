const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const errorController = require('./controllers/errorController');
const shipmentRouter = require('./routes/shipmentRouter');
const userRouter = require('./routes/userRouter');

const app = express();

const AppError = require('./utils/AppError');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.options('*', cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(cookiesMiddleware());
app.use(morgan('dev'));
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use('/api/v1/bloomex', shipmentRouter);
app.use('/api/v1/bloomex', userRouter);
// console.log(process.env.NODE_ENV);
app.use(errorController);
app.use(express.static(path.join(__dirname, 'uploads')));
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  // eslint-disable-next-line global-require
  app.use(express.static(path.join(__dirname, 'uploads')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
