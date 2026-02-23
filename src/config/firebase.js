const admin = require('firebase-admin');
const logger = require('../utils/logger');
require('dotenv').config();

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  logger.warn('GOOGLE_APPLICATION_CREDENTIALS not set; ensure credentials are available for firebase-admin');
}

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIRESTORE_PROJECT_ID
  });
  logger.info('Firebase initialized');
} catch (err) {
  logger.error('Firebase init error', err);
  throw err;
}

const db = admin.firestore();

module.exports = { admin, db };
hhhhh