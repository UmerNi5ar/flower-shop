"use strict";

var express = require('express');

var shipmentController = require('../controllers/shipmentController'); // const authController = require('../controllers/authController');
/////


var router = express.Router();
router.get('/fetchShipments', shipmentController.getShipments);
router.get('/fetchMonthlyShipments', shipmentController.getMonthlyShipments); // router.use(authController.restrictTo('admin'));

router.post('/postImage', shipmentController.imageUpload, shipmentController.completeShitment);
router.patch('/updateShipment', shipmentController.deleteImages, shipmentController.updateShipment);
router["delete"]('/deleteShipment', shipmentController.deleteShipment);
router.post('/createShipment', shipmentController.createShipment);
module.exports = router;