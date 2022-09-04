const express = require('express');

const shipmentController = require('../controllers/shipmentController');

/////

const router = express.Router();
router.post(
  '/postImage',

  shipmentController.imageUpload,
  shipmentController.completeShitment
);

router.post('/createShipment', shipmentController.createShipment);

router.patch(
  '/updateShipment',
  shipmentController.deleteImages,
  shipmentController.updateShipment
);

router.get('/fetchShipments', shipmentController.getShipments);
router.get('/fetchMonthlyShipments', shipmentController.getMonthlyShipments);

router.delete('/deleteShipment', shipmentController.deleteShipment);

module.exports = router;
