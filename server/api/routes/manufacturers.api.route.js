const express = require('express');
const controller = require('../controllers/manufacturer.api.controller');

const router = express.Router();

// get
router.get('/', controller.getManufacturers);
router.get('/:id', controller.getManufacturer);

module.exports = router;
