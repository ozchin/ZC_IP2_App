const Joi = require('joi');

const readingSchema = Joi.object({
  deviceId: Joi.string().required(),
  timestamp: Joi.date().iso().optional(),
  temperature: Joi.number().min(-40).max(125).required(),
  humidity: Joi.number().min(0).max(100).required(),
  soilMoisture: Joi.number().min(0).max(1023).required(),
  mistMaker: Joi.boolean().required()
}).required();

module.exports = (req, res, next) => {
  const { error } = readingSchema.validate(req.body, { convert: true, stripUnknown: true });
  if (error) {
    return res.status(422).json({ error: 'Invalid payload', details: error.details.map(d => d.message) });
  }
  // normalized payload
  req.validatedBody = error ? null : readingSchema.validate(req.body, { convert: true, stripUnknown: true }).value;
  next();
};