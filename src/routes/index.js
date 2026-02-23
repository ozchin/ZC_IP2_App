const express = require('express');
const router = express.Router();
const readings = require('./readings');
const devices = require('./devices');

router.use('/readings', readings);
router.use('/devices', devices);

router.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

module.exports = router;