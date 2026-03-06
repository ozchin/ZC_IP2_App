const logger = require('../utils/logger');
const { createOrUpdateDevice, getDeviceDoc } = require('../services/firestoreService');
const Joi = require('joi');

const deviceSchema = Joi.object({
  deviceId: Joi.string().required(),
  name: Joi.string().optional(),
  location: Joi.string().optional(),
  ownerUserId: Joi.string().optional(),
  apiKey: Joi.string().optional()
});

const registerOrUpdate = async (req, res, next) => {
  try {
    const { error, value } = deviceSchema.validate(req.body, { stripUnknown: true });
    if (error) return res.status(422).json({ error: error.message });
    const ref = await createOrUpdateDevice(value.deviceId, value);
    return res.status(200).json({ deviceId: value.deviceId, status: 'saved' });
  } catch (err) {
    logger.error('registerOrUpdate device error', err);
    next(err);
  }
};

const getDevice = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const { exists, data } = await getDeviceDoc(deviceId);
    if (!exists) return res.status(404).json({ error: 'not found' });
    return res.json({ device: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerOrUpdate, getDevice };