const express = require('express');
const router = express.Router();
const readings = require('./readings');
const devices = require('./devices');
const config = require('./config');

router.use('/readings', readings);
router.use('/devices', devices);
router.use('/config', config);

router.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

module.exports = router;
