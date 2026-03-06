import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const temperatureData = [
  { date: 'Mon', avg: 23, min: 20, max: 26 },
  { date: 'Tue', avg: 24, min: 21, max: 27 },
  { date: 'Wed', avg: 22, min: 19, max: 25 },
  { date: 'Thu', avg: 25, min: 22, max: 28 },
  { date: 'Fri', avg: 23, min: 20, max: 26 },
  { date: 'Sat', avg: 24, min: 21, max: 27 },
  { date: 'Sun', avg: 23, min: 20, max: 26 },
];

const humidityData = [
  { date: 'Mon', humidity: 65 },
  { date: 'Tue', humidity: 60 },
  { date: 'Wed', humidity: 68 },
  { date: 'Thu', humidity: 62 },
  { date: 'Fri', humidity: 65 },
  { date: 'Sat', humidity: 63 },
  { date: 'Sun', humidity: 66 },
];

const deviceStatusData = [
  { name: 'Active', value: 5, fill: '#10b981' },
  { name: 'Idle', value: 2, fill: '#f59e0b' },
  { name: 'Offline', value: 1, fill: '#ef4444' },
];

export default function AnalyticsPage({ db, deviceId }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
        <p className="text-gray-600 mt-1">Historical data and insights for {deviceId}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Avg Temperature</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">23.4°C</p>
          <p className="text-xs text-gray-500 mt-1">↑ 0.5% from last week</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Avg Humidity</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">64.3%</p>
          <p className="text-xs text-gray-500 mt-1">→ No change</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Uptime</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">99.8%</p>
          <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Readings</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,248</p>
          <p className="text-xs text-gray-500 mt-1">This week</p>
        </div>
      </div>

      {/* Temperature Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Temperature Weekly Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="min" fill="#3b82f6" name="Min (°C)" />
            <Bar dataKey="avg" fill="#f97316" name="Avg (°C)" />
            <Bar dataKey="max" fill="#ef4444" name="Max (°C)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Humidity Weekly Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity (%)" dot={{ fill: '#3b82f6' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Device Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Device Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">✓ All readings within optimal range</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-700">⚠ One device currently idle</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">ℹ 99.8% system uptime this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
