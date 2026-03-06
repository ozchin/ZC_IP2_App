const express = require('express');
const router = express.Router();

router.get('/firebase', (req, res) => {
  const apiKey = process.env.FIREBASE_WEB_API_KEY || '';
  const appId = process.env.FIREBASE_WEB_APP_ID || '';
  const projectId = process.env.FIREBASE_WEB_PROJECT_ID || 'zc-plant';
  const authDomain = process.env.FIREBASE_WEB_AUTH_DOMAIN || `${projectId}.firebaseapp.com`;
  const storageBucket = process.env.FIREBASE_WEB_STORAGE_BUCKET || `${projectId}.appspot.com`;

  if (!apiKey || !appId) {
    return res.status(500).json({ error: 'firebase_web_config_missing' });
  }

  res.json({
    apiKey,
    appId,
    projectId,
    authDomain,
    storageBucket,
  });
});

module.exports = router;
