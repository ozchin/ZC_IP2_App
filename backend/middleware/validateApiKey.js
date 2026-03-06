const logger = require('../utils/logger');
const { getDeviceDoc } = require('../services/firestoreService');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: parseInt(process.env.CACHE_TTL_SECONDS || '300', 10) });
const DEFAULT_KEY = process.env.API_DEFAULT_KEY || 'default_insecure_key';

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.header('x-api-key');
    const deviceId = req.body.deviceId || req.params.deviceId || req.query.deviceId;
    if (!deviceId) {
      return res.status(400).json({ error: 'deviceId required for authentication' });
    }
    // cached device check to reduce Firestore reads
    const cacheKey = `device_${deviceId}`;
    let device = cache.get(cacheKey);

    if (!device) {
      const { exists, data } = await getDeviceDoc(deviceId);
      if (!exists) {
        return res.status(404).json({ error: 'device not registered' });
      }
      device = data;
      cache.set(cacheKey, device);
    }

    const expected = device.apiKey || DEFAULT_KEY;
    if (!apiKey || apiKey !== expected) {
      logger.warn('Invalid API key attempt', { deviceId });
      return res.status(401).json({ error: 'invalid api key' });
    }

    req.device = device;
    next();
  } catch (err) {
    next(err);
  }
};