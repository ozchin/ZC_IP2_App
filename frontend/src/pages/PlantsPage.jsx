import { Plus, Leaf } from 'lucide-react';

export default function PlantsPage({ db }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Plants</h2>
          <p className="text-gray-600 mt-1">Manage your plants and their care profiles</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Plant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Snake Plant', location: 'Living Room', optimalTemp: '16-24°C', optimalHumidity: '40-50%' },
          { name: 'Peace Lily', location: 'Bedroom', optimalTemp: '16-24°C', optimalHumidity: '50-70%' },
          { name: 'Spider Plant', location: 'Kitchen', optimalTemp: '16-24°C', optimalHumidity: '40-60%' },
        ].map((plant) => (
          <div key={plant.name} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{plant.name}</h3>
                <p className="text-sm text-gray-600">{plant.location}</p>
              </div>
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Optimal Temp</span>
                <span className="font-medium text-gray-900">{plant.optimalTemp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Optimal Humidity</span>
                <span className="font-medium text-gray-900">{plant.optimalHumidity}</span>
              </div>
            </div>

            <button className="w-full mt-4 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              Edit Care Profile
            </button>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-medium text-green-900">💡 Care Tips</h3>
        <ul className="text-sm text-green-700 mt-2 space-y-1">
          <li>• Monitor temperature daily to maintain optimal growth</li>
          <li>• Humidity levels should remain consistent for healthy foliage</li>
          <li>• Adjust watering based on soil moisture readings</li>
          <li>• Set up custom alerts for your plant care requirements</li>
        </ul>
      </div>
    </div>
  );
}
