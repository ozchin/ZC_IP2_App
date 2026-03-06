const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const routes = require('./routes');
const logger = require('./utils/logger');

require('dotenv').config();

const app = express();

// security and parsing
app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false }));

// serve frontend static assets (dashboard, etc.)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// logging
app.use(morgan('combined', {
  stream: { write: (msg) => logger.info(msg.trim()) }
}));

// rate limiting
app.use(rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  max: parseInt(process.env.RATE_LIMIT_MAX || '120', 10)
}));

// routes
app.use('/api/v1', routes);

// error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { message: err.message, stack: err.stack });
  if (!res.headersSent) {
    res.status(err.status || 500).json({ error: err.message || 'internal_server_error' });
  } else {
    next(err);
  }
});

module.exports = app;