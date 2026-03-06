# 🌱 IoT-Based Indoor Mini Plant Monitoring System

React + Vite dashboard and a Node.js/Express backend that stores sensor readings in Firebase Firestore. ESP8266/NodeMCU devices post readings to the backend; the dashboard visualizes live and historical data.

## Overview

- Devices send temperature, humidity, soil moisture, and mist state to the backend.
- Backend validates payloads and writes to Firestore.
- The React dashboard reads from Firestore and shows status, analytics, and alerts.

## Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore enabled
- A Firebase service account JSON (for the backend)

## Setup

1) Install backend deps (root folder):

```bash
cd C:\Users\ozchi\Desktop\ZC_IP2_App
npm install
```

2) Configure environment:

- Copy env.example to .env and edit values.
- Ensure these keys are set:
  - PORT=3000
  - FIRESTORE_PROJECT_ID=<your-project-id>
  - GOOGLE_APPLICATION_CREDENTIALS=<absolute\or\relative\path\to\serviceAccount.json>
  - RATE_LIMIT_WINDOW_MS=60000
  - RATE_LIMIT_MAX=120

Generate a random device API key if needed:

```powershell
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

3) Install frontend deps:

```bash
cd frontend
npm install
```

## Run

- Backend (terminal 1, from project root):

```bash
node backend/server.js
```

Verify:

```bash
curl http://localhost:3000/api/v1/health
```

- Frontend (terminal 2):

```bash
cd frontend
npm run dev
```

Open the shown local URL. The dashboard auto-loads Firebase config from the backend; set your deviceId in localStorage if needed (defaults to plant-01).

## Testing the System

### 1. Register a Device

Create a JSON file with device metadata:

```json
{
  "deviceId": "plant-01",
  "name": "Living Room Plant",
  "location": "Window",
  "ownerUserId": "user-123",
  "apiKey": "your-device-api-key"
}
```

Send to backend:

```bash
curl -X POST http://localhost:3000/api/v1/devices \
  -H "Content-Type: application/json" \
  -d @device.json
```

### 2. Send a Test Reading

Simulate an IoT device posting sensor data:

```json
{
  "deviceId": "plant-01",
  "temperature": 24.5,
  "humidity": 65.2,
  "soilMoisture": 512,
  "mistMaker": false
}
```

```bash
curl -X POST http://localhost:3000/api/v1/readings \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-device-api-key" \
  -d @reading.json
```

Expected response: `{"id":"firestore-doc-id","status":"saved"}`

### 3. Verify in Firebase Console

- Open Firestore Database.
- Navigate to `devices` collection → `plant-01` document.
- You should see `latestReading` field and a `readings` sub-collection with your test data.

### 4. View on Dashboard

Refresh the dashboard page. You should see:
- Temperature, humidity, soil moisture values updating in real-time.
- Mist maker status (ON/OFF).
- Last update timestamp.

---

## API Endpoints

### Readings

**POST** `/api/v1/readings` — Ingest sensor data

Headers:
```
Content-Type: application/json
x-api-key: <device-api-key>
```

Body:
```json
{
  "deviceId": "plant-01",
  "temperature": 24.5,
  "humidity": 65.2,
  "soilMoisture": 512,
  "mistMaker": false,
  "timestamp": "2026-03-06T12:34:56Z"  // optional; ISO 8601
}
```

Response: `201 Created`
```json
{"id": "doc-id", "status": "saved"}
```

**GET** `/api/v1/readings/{deviceId}?limit=10&start=...&end=...` — Retrieve historical readings

Response: `200 OK`
```json
{
  "deviceId": "plant-01",
  "count": 5,
  "readings": [
    {
      "id": "doc-id",
      "temperature": 24.5,
      "humidity": 65.2,
      "soilMoisture": 512,
      "mistMaker": false,
      "timestamp": "2026-03-06T12:34:56Z",
      "serverReceivedAt": "2026-03-06T12:34:57Z"
    }
  ]
}
```

### Devices

**POST** `/api/v1/devices` — Register or update device metadata

Body:
```json
{
  "deviceId": "plant-01",
  "name": "Living Room Plant",
  "location": "Window",
  "ownerUserId": "user-123",
  "apiKey": "your-device-key"
}
```

Response: `200 OK`
```json
{"deviceId": "plant-01", "status": "saved"}
```

**GET** `/api/v1/devices/{deviceId}` — Get device metadata

Response: `200 OK`
```json
{
  "device": {
    "deviceId": "plant-01",
    "name": "Living Room Plant",
    "latestReading": {
      "temperature": 24.5,
      "humidity": 65.2,
      "soilMoisture": 512,
      "mistMaker": false,
      "timestamp": "2026-03-06T12:34:56Z"
    }
  }
}
```

### Health Check

**GET** `/api/v1/health` — System status

Response: `200 OK`
```json
{"status": "ok", "ts": "2026-03-06T12:34:56Z"}
```

## Firebase Configuration

### Firestore Rules (Development)

Allow public reads for quick testing:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /devices/{deviceId} {
      allow read: if true;
    }
    match /devices/{deviceId}/readings/{reading} {
      allow read: if true;
    }
  }
}
```

### Firestore Rules (Production)

Restrict reads to authenticated users and device owners; writes only from the backend.

## Project Structure

```
.
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── firebase.js
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── utils/
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       └── pages/
├── env.example
├── package.json
└── README.md
```

3. Deploy:
   ```bash
   git push heroku main
   ```

### Google Cloud Run

1. Create a Dockerfile.
2. Build and push image to Container Registry.
3. Deploy with:
   ```bash
   gcloud run deploy zc-plant-backend --image gcr.io/...
   ```
4. Use **Workload Identity** for Firebase authentication (no key file needed).

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check `FIRESTORE_PROJECT_ID` in `.env` and ensure `serviceAccountKey.json` exists and is valid JSON. |
| 401 Unauthorized | Verify `x-api-key` header matches the device's `apiKey` stored in Firestore. |
| 422 Invalid payload | Check reading JSON has all required fields (`temperature`, `humidity`, `soilMoisture`, `mistMaker`). |
| Dashboard shows "Device not found" | Register the device first via `POST /api/v1/devices`. |
| Dashboard doesn't update | Verify Firestore rules allow reads (`allow read: if true` for dev). Check browser console for CORS errors. |
| Port 3000 already in use | Kill the process: `Get-NetTCPConnection -LocalPort 3000 \| Stop-Process -Id {OwningProcess}` |
| `firebase-admin` init fails | Ensure `GOOGLE_APPLICATION_CREDENTIALS` points to valid service account JSON. |

---

```bash
# View live logs
npm start  # logs are printed to console via winston
```

