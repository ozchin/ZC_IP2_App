import { useState } from 'react';
import { Settings as SettingsIcon, Save, RotateCcw, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage({ db, deviceId }) {
  const [showConfig, setShowConfig] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    apiKey: localStorage.getItem('fb_apiKey') || '',
    appId: localStorage.getItem('fb_appId') || '',
    deviceId: localStorage.getItem('deviceId') || '',
    notificationsEnabled: true,
    emailAlerts: true,
    dataRefreshInterval: 5000,
    theme: 'light',
  });

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('fb_apiKey', settings.apiKey);
    localStorage.setItem('fb_appId', settings.appId);
    localStorage.setItem('deviceId', settings.deviceId);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    localStorage.clear();
    alert('All settings have been reset. Please refresh the page.');
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Configure your plant monitoring system preferences</p>
      </div>

      {/* Firebase Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-blue-600" />
            Firebase Configuration
          </h3>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showConfig ? 'Hide' : 'Edit'}
          </button>
        </div>

        {!showConfig ? (
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="text-gray-600">API Key</p>
              <p className="font-mono text-gray-900 mt-1">
                {settings.apiKey ? settings.apiKey.substring(0, 20) + '...' : 'Not configured'}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="text-gray-600">App ID</p>
              <p className="font-mono text-gray-900 mt-1">
                {settings.appId ? settings.appId.substring(0, 20) + '...' : 'Not configured'}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-200">
              <p className="text-gray-600">Device ID</p>
              <p className="font-mono text-gray-900 mt-1">{settings.deviceId || 'Not configured'}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={settings.apiKey}
                  onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                  placeholder="Your Firebase API Key"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">App ID</label>
              <input
                type="password"
                value={settings.appId}
                onChange={(e) => handleSettingChange('appId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                placeholder="Your Firebase App ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Device ID</label>
              <input
                type="text"
                value={settings.deviceId}
                onChange={(e) => handleSettingChange('deviceId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your device ID (e.g., plant-01)"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </form>
        )}
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Get real-time alerts on your device</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Alerts</p>
              <p className="text-sm text-gray-600">Receive email notifications for critical alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Display Preferences */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Display</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Refresh Interval</label>
            <select
              value={settings.dataRefreshInterval}
              onChange={(e) => handleSettingChange('dataRefreshInterval', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={2000}>2 seconds</option>
              <option value={5000}>5 seconds</option>
              <option value={10000}>10 seconds</option>
              <option value={30000}>30 seconds</option>
              <option value={60000}>1 minute</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">How often to refresh sensor data on the dashboard</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Choose your preferred theme</p>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between p-3 bg-gray-50 rounded border border-gray-200">
            <span className="text-gray-600">App Version</span>
            <span className="font-mono text-gray-900">1.0.0</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded border border-gray-200">
            <span className="text-gray-600">Last Updated</span>
            <span className="font-mono text-gray-900">Today at 2:30 PM</span>
          </div>
          <div className="flex justify-between p-3 bg-gray-50 rounded border border-gray-200">
            <span className="text-gray-600">Storage Used</span>
            <span className="font-mono text-gray-900">2.3 MB</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg border border-red-200 bg-red-50 p-6">
        <h3 className="font-semibold text-red-900 mb-4">Danger Zone</h3>
        <p className="text-sm text-red-800 mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>

        {!showReset ? (
          <button
            onClick={() => setShowReset(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Settings
          </button>
        ) : (
          <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-sm font-medium text-red-900 mb-3">Are you sure you want to reset all settings?</p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Yes, Delete Everything
              </button>
              <button
                onClick={() => setShowReset(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
