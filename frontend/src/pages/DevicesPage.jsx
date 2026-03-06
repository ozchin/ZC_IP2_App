import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function DevicesPage({ db }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Devices</h2>
          <p className="text-gray-600 mt-1">Manage your IoT devices</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Device
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Device ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Seen</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-900">plant-01</td>
              <td className="py-3 px-4 text-gray-600">Living Room Plant</td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Active
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600">2 min ago</td>
              <td className="py-3 px-4 text-right">
                <button className="text-blue-600 hover:text-blue-700 mr-3">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900">📌 Tip</h3>
        <p className="text-sm text-blue-700 mt-1">
          Register new devices via the backend API endpoint: <code className="bg-blue-100 px-2 py-1 rounded">POST /api/v1/devices</code>
        </p>
      </div>
    </div>
  );
}
