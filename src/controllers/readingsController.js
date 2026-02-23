const logger = require('../utils/logger');
const { saveReading, listReadings } = require('../services/firestoreService');

const ingestReading = async (req, res, next) => {
  try {
    const payload = req.validatedBody;
    // optionally enrich payload with device info
    payload.receivedFrom = req.device ? req.device.deviceId : undefined;
    const docRef = await saveReading(payload.deviceId, payload);
    return res.status(201).json({ id: docRef.id, status: 'saved' });
  } catch (err) {
    logger.error('ingestReading error', err);
    next(err);
  }
};

const getReadings = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const { start, end, limit } = req.query;
    const items = await listReadings(deviceId, { start, end, limit: parseInt(limit || '100', 10) });
    return res.json({ deviceId, count: items.length, readings: items });
  } catch (err) {
    next(err);
  }
};

module.exports = { ingestReading, getReadings };