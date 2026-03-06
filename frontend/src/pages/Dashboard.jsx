import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Sprout as SproutIcon, Wind } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import SensorCard from '../components/SensorCard';
import PlantStatus from '../components/PlantStatus';

function generateMockData() {
  const now = new Date();
  const data = [];

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      temperature: 22 + Math.random() * 6,
      humidity: 55 + Math.random() * 15,
      soilMoisture: 45 + Math.random() * 20,
    });
  }

  return data;
}

export default function Dashboard({ db, deviceId }) {
  const [chartData, setChartData] = useState(generateMockData());
  const [currentData, setCurrentData] = useState({
    temperature: 24.5,
    humidity: 62,
    soilMoisture: 58,
    mistMaker: true,
  });
  const [timeRange, setTimeRange] = useState('2h');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData({
        temperature: 22 + Math.random() * 6,
        humidity: 55 + Math.random() * 15,
        soilMoisture: 45 + Math.random() * 20,
        mistMaker: Math.random() > 0.3,
      });

      setChartData((prev) => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          temperature: 22 + Math.random() * 6,
          humidity: 55 + Math.random() * 15,
          soilMoisture: 45 + Math.random() * 20,
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Real-time monitoring of your indoor plants</p>
      </div>

      {/* System Status Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div>
            <p className="font-medium text-green-900">All Systems Operating Normally</p>
            <p className="text-sm text-green-700">Last updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-green-700">
            <span className="font-medium">5</span> Active Devices
          </div>
          <div className="text-green-700">
            <span className="font-medium">12</span> Plants Monitored
          </div>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SensorCard
          title="Temperature"
          value={currentData.temperature.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          iconColor="text-orange-500"
          bgColor="bg-orange-50"
          trend={currentData.temperature > 24 ? 'up' : 'down'}
          trendValue="0.5°C"
          status={currentData.temperature >= 20 && currentData.temperature <= 26 ? 'normal' : 'warning'}
        />

        <SensorCard
          title="Humidity"
          value={currentData.humidity.toFixed(1)}
          unit="%"
          icon={Droplets}
          iconColor="text-blue-500"
          bgColor="bg-blue-50"
          trend={currentData.humidity > 60 ? 'up' : 'down'}
          trendValue="2.3%"
          status={currentData.humidity >= 50 && currentData.humidity <= 70 ? 'normal' : 'warning'}
        />

        <SensorCard
          title="Soil Moisture"
          value={currentData.soilMoisture.toFixed(1)}
          unit="%"
          icon={SproutIcon}
          iconColor="text-green-500"
          bgColor="bg-green-50"
          trend={currentData.soilMoisture > 55 ? 'up' : 'down'}
          trendValue="1.8%"
          status={currentData.soilMoisture >= 40 && currentData.soilMoisture <= 70 ? 'normal' : 'critical'}
        />

        <SensorCard
          title="Mist Maker"
          value={currentData.mistMaker ? 'Active' : 'Inactive'}
          unit=""
          icon={Wind}
          iconColor="text-purple-500"
          bgColor="bg-purple-50"
          status={currentData.mistMaker ? 'active' : 'inactive'}
        />
      </div>

      {/* Charts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900">Sensor Data Trends</h3>
            <p className="text-sm text-gray-600 mt-1">Last 2 hours of sensor readings</p>
          </div>
          <div className="flex gap-2">
            {['2h', '6h', '24h'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  timeRange === range
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#f97316"
              strokeWidth={2}
              name="Temperature (°C)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Humidity (%)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="soilMoisture"
              stroke="#22c55e"
              strokeWidth={2}
              name="Soil Moisture (%)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Plant Status Grid */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Plant Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlantStatus
            name="Snake Plant"
            deviceId="ESP-001"
            status="healthy"
            temperature={24.2}
            humidity={61}
            soilMoisture={58}
            lastUpdate="2 min ago"
          />
          <PlantStatus
            name="Peace Lily"
            deviceId="ESP-002"
            status="warning"
            temperature={26.8}
            humidity={48}
            soilMoisture={35}
            lastUpdate="1 min ago"
          />
          <PlantStatus
            name="Spider Plant"
            deviceId="ESP-003"
            status="healthy"
            temperature={23.5}
            humidity={65}
            soilMoisture={62}
            lastUpdate="3 min ago"
          />
        </div>
      </div>
    </div>
  );
}
