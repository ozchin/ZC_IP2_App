import { useState } from 'react';
import { AlertTriangle, Check, Edit2, X, Plus } from 'lucide-react';

const alertHistory = [
  { id: 1, type: 'Temperature', severity: 'warning', message: 'Temperature above 28°C', timestamp: '2 hours ago', device: 'plant-01' },
  { id: 2, type: 'Humidity', severity: 'info', message: 'Humidity below 50%', timestamp: '5 hours ago', device: 'plant-02' },
  { id: 3, type: 'Soil Moisture', severity: 'critical', message: 'Soil moisture critically low', timestamp: '1 day ago', device: 'plant-03' },
  { id: 4, type: 'Device', severity: 'warning', message: 'Device offline', timestamp: '2 days ago', device: 'plant-01' },
  { id: 5, type: 'Temperature', severity: 'info', message: 'Temperature within optimal range', timestamp: '3 days ago', device: 'plant-02' },
];

const alertThresholds = [
  { id: 1, metric: 'Temperature', minValue: 18, maxValue: 28, unit: '°C', enabled: true },
  { id: 2, metric: 'Humidity', minValue: 50, maxValue: 80, unit: '%', enabled: true },
  { id: 3, metric: 'Soil Moisture', minValue: 30, maxValue: 80, unit: '%', enabled: true },
  { id: 4, metric: 'Mist Maker', minValue: 0, maxValue: 1, unit: 'state', enabled: false },
];

export default function AlertsPage({ db, deviceId }) {
  const [showThresholdForm, setShowThresholdForm] = useState(false);
  const [thresholds, setThresholds] = useState(alertThresholds);
  const [formData, setFormData] = useState({ metric: '', minValue: '', maxValue: '' });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleAddThreshold = (e) => {
    e.preventDefault();
    if (formData.metric && formData.minValue && formData.maxValue) {
      const newThreshold = {
        id: Math.max(...thresholds.map(t => t.id)) + 1,
        metric: formData.metric,
        minValue: parseFloat(formData.minValue),
        maxValue: parseFloat(formData.maxValue),
        unit: '°C',
        enabled: true,
      };
      setThresholds([...thresholds, newThreshold]);
      setFormData({ metric: '', minValue: '', maxValue: '' });
      setShowThresholdForm(false);
    }
  };

  const toggleThreshold = (id) => {
    setThresholds(thresholds.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  };

  const deleteThreshold = (id) => {
    setThresholds(thresholds.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Alerts & Thresholds</h2>
        <p className="text-gray-600 mt-1">Manage alerts and set alert thresholds for {deviceId}</p>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          Active Alerts
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-yellow-900">Temperature Above Threshold</p>
                <p className="text-sm text-yellow-700 mt-1">Device: plant-01 | Temperature: 28.5°C (threshold: 28°C)</p>
                <p className="text-xs text-yellow-600 mt-2">Started 2 hours ago</p>
              </div>
              <button className="text-yellow-600 hover:text-yellow-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-red-900">Soil Moisture Critical</p>
                <p className="text-sm text-red-700 mt-1">Device: plant-03 | Soil Moisture: 15% (threshold: 30%)</p>
                <p className="text-xs text-red-600 mt-2">Started 1 day ago</p>
              </div>
              <button className="text-red-600 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Alert Thresholds</h3>
          <button
            onClick={() => setShowThresholdForm(!showThresholdForm)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Threshold
          </button>
        </div>

        {showThresholdForm && (
          <form onSubmit={handleAddThreshold} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Metric (e.g., Temperature)"
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Min Value"
                value={formData.minValue}
                onChange={(e) => setFormData({ ...formData, minValue: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max Value"
                value={formData.maxValue}
                onChange={(e) => setFormData({ ...formData, maxValue: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowThresholdForm(false)}
                  className="flex-1 px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Metric</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Min - Max</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {thresholds.map((threshold) => (
                <tr key={threshold.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{threshold.metric}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {threshold.minValue} - {threshold.maxValue} {threshold.unit}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${threshold.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {threshold.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => toggleThreshold(threshold.id)}
                      className="text-blue-600 hover:text-blue-700 p-1"
                      title={threshold.enabled ? 'Disable' : 'Enable'}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 p-1" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteThreshold(threshold.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                      title="Delete"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Alert History</h3>
        <div className="space-y-3">
          {alertHistory.map((alert) => (
            <div key={alert.id} className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{alert.type}</p>
                  <p className="text-sm mt-1">{alert.message}</p>
                  <p className="text-xs mt-2">Device: {alert.device}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">{alert.timestamp}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
                    alert.severity === 'critical' ? 'bg-red-200' :
                    alert.severity === 'warning' ? 'bg-yellow-200' :
                    'bg-blue-200'
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
