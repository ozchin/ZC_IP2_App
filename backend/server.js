require("dotenv").config();

const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');

const port = parseInt(process.env.PORT || '3000', 10);

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

// graceful shutdown
const shutdown = (signal) => {
  logger.info('Shutdown signal received', { signal });
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
  setTimeout(() => {
    logger.error('Force exit');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);


