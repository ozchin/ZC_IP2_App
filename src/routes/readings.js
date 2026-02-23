const express = require('express');
const router = express.Router();
const validateApiKey = require('../middleware/validateApiKey');
const validatePayload = require('../middleware/validatePayload');
const { ingestReading, getReadings } = require('../controllers/readingsController');

// devices send POST here with x-api-key header
router.post('/', validatePayload, validateApiKey, ingestReading);

// dashboard or other services read historical data
router.get('/:deviceId', getReadings);

module.exports = router;