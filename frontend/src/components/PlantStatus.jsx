import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

export default function PlantStatus({
  name,
  deviceId,
  status,
  temperature,
  humidity,
  soilMoisture,
  lastUpdate,
}) {
  const getStatusIcon = () => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <CheckCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`${getStatusColor()} rounded-lg border p-4`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-xs text-gray-600">{deviceId}</p>
        </div>
        {getStatusIcon()}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Temperature</span>
          <span className="font-medium text-gray-900">{temperature.toFixed(1)}°C</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Humidity</span>
          <span className="font-medium text-gray-900">{humidity}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Soil Moisture</span>
          <span className="font-medium text-gray-900">{soilMoisture}%</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-600">
        Last update: {lastUpdate}
      </div>
    </div>
  );
}
