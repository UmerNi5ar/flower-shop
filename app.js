const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const errorController = require('./controllers/errorController');
const shipmentRouter = require('./routes/shipmentRouter');

const app = express();

const AppError = require('./utils/AppError');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.options('*', cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(cookiesMiddleware());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/bloomex', shipmentRouter);

app.use(errorController);
app.use(express.static(path.join(__dirname, 'uploads')));
console.log(process.env.NODE_ENV);
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
