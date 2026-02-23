const express = require('express');
const router = express.Router();
const { registerOrUpdate, getDevice } = require('../controllers/devicesController');

// register or update device metadata (should be protected in production)
router.post('/', registerOrUpdate);
router.get('/:deviceId', getDevice);

module.exports = router;