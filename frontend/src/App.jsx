import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  LayoutDashboard,
  Monitor,
  Sprout,
  TrendingUp,
  AlertCircle,
  Settings,
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import DevicesPage from './pages/DevicesPage';
import PlantsPage from './pages/PlantsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AlertsPage from './pages/AlertsPage';
import SettingsPage from './pages/SettingsPage';

export const FirebaseContext = React.createContext({});

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deviceId] = useState(localStorage.getItem('deviceId') || 'plant-01');
  const [db, setDb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch('/api/v1/config/firebase');
        if (!res.ok) throw new Error('config_fetch_failed');
        const cfg = await res.json();
        const app = initializeApp(cfg);
        setDb(getFirestore(app));
      } catch (e) {
        const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
        const appId = import.meta.env.VITE_FIREBASE_APP_ID;
        const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'zc-plant.firebaseapp.com';
        const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'zc-plant';
        const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'zc-plant.appspot.com';
        if (apiKey && appId) {
          const app = initializeApp({ apiKey, appId, authDomain, projectId, storageBucket });
          setDb(getFirestore(app));
        } else {
          console.error('Firebase init failed: missing config');
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'devices', label: 'Devices', icon: Monitor },
    { id: 'plants', label: 'Plants', icon: Sprout },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard db={db} deviceId={deviceId} />;
      case 'devices':
        return <DevicesPage db={db} />;
      case 'plants':
        return <PlantsPage db={db} />;
      case 'analytics':
        return <AnalyticsPage db={db} deviceId={deviceId} />;
      case 'alerts':
        return <AlertsPage db={db} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard db={db} deviceId={deviceId} />;
    }
  };

  if (loading && !db) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Initializing dashboard...
      </div>
    );
  }

  return (
    <FirebaseContext.Provider value={{ db }}>
      <div className="min-h-screen bg-gray-50 flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
          <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
            <Sprout className="w-6 h-6 text-green-600" />
            <span className="font-semibold text-gray-900">Plant Monitoring</span>
          </div>
          <nav className="p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium mb-1 transition-colors ${
                    active ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-green-700' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4 flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <div className="text-sm text-gray-500">
                Device: <span className="font-medium text-gray-900">{deviceId}</span>
              </div>
            </div>
          </header>
          <main className="px-6 py-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
