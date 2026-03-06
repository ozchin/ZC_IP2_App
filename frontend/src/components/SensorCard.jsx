import { TrendingUp, TrendingDown } from 'lucide-react';

export default function SensorCard({
  title,
  value,
  unit,
  icon: Icon,
  iconColor,
  bgColor,
  trend,
  trendValue,
  status,
}) {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`${bgColor} rounded-lg border border-gray-200 p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            <span className="text-gray-600">{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {trend && trendValue && (
          <div className="flex items-center gap-1 text-sm">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-orange-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-blue-500" />
            )}
            <span className="text-gray-600">{trendValue}</span>
          </div>
        )}
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor()}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
