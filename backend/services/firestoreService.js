const { db } = require('../config/firebase');
const logger = require('../utils/logger');

const getDeviceDoc = async (deviceId) => {
  const docRef = db.collection('devices').doc(deviceId);
  const doc = await docRef.get();
  return { ref: docRef, exists: doc.exists, data: doc.exists ? doc.data() : null };
};

const createOrUpdateDevice = async (deviceId, metadata = {}) => {
  const docRef = db.collection('devices').doc(deviceId);
  await docRef.set({ deviceId, ...metadata }, { merge: true });
  logger.info('Device metadata saved', { deviceId });
  return docRef;
};

const saveReading = async (deviceId, reading) => {
  // store under devices/{deviceId}/readings for easy realtime listeners and history
  const colRef = db.collection('devices').doc(deviceId).collection('readings');
  // ensure timestamp is Firestore Timestamp (or fallback to server timestamp)
  const payload = {
    ...reading,
    timestamp: reading.timestamp ? new Date(reading.timestamp) : new Date(),
    serverReceivedAt: new Date()
  };
  const docRef = await colRef.add(payload);
  logger.debug('Reading saved', { deviceId, id: docRef.id });
  // Also, update a latest_reading document for quick dashboard access
  await db.collection('devices').doc(deviceId).set({ latestReading: payload }, { merge: true });
  return docRef;
};

const listReadings = async (deviceId, { start, end, limit = 100 } = {}) => {
  let q = db.collection('devices').doc(deviceId).collection('readings').orderBy('timestamp', 'desc');
  if (start) q = q.where('timestamp', '>=', new Date(start));
  if (end) q = q.where('timestamp', '<=', new Date(end));
  q = q.limit(limit);
  const snap = await q.get();
  const items = [];
  snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));
  return items;
};

module.exports = { getDeviceDoc, createOrUpdateDevice, saveReading, listReadings };