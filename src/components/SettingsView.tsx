import React, { useState } from 'react';
import {
  Satellite,
  Sliders,
  Layers,
  HardDrive,
  User,
  CheckCircle2,
  Bell,
  Globe2,
  Compass,
  Sparkles,
} from 'lucide-react';

interface SettingsViewProps {
  onBackToHome: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBackToHome }) => {
  // Constellation & Imagery
  const [constellation, setConstellation] = useState('sentinel2');
  const [cloudCoverMax, setCloudCoverMax] = useState('10');
  const [spectralIndex, setSpectralIndex] = useState('ndvi');

  // Units & Display
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [coordFormat, setCoordFormat] = useState('wgs84');

  // Notifications & Cache
  const [notifySatellitePass, setNotifySatellitePass] = useState(true);
  const [notifyAnomalies, setNotifyAnomalies] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  return (
    <main className="flex-1 px-3 sm:px-8 py-6 max-w-4xl w-full mx-auto space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Platform Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure default satellite sensors, spectral indices, telemetry preferences, and display units.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-semibold shadow-md transition-all cursor-pointer self-start sm:self-auto flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Save Preferences</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>All preferences saved successfully to your workstation profile.</span>
        </div>
      )}

      {/* SECTION 1: Satellite Imagery & Sensors */}
      <div className="rounded-[24px] glass-panel border border-white/90 p-5 sm:p-6 shadow-sm space-y-4 bg-white/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <Satellite className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Satellite Sensor & Resolution</h2>
            <p className="text-xs text-slate-500">Choose preferred orbital constellations for automated query generation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Default Constellation</label>
            <select
              value={constellation}
              onChange={(e) => setConstellation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="sentinel2">Copernicus Sentinel-2 MSI (10m Resolution)</option>
              <option value="landsat">USGS Landsat 8/9 OLI-2 (15m/30m Resolution)</option>
              <option value="planet">PlanetScope SuperDove (3m Rapid Revisit)</option>
              <option value="modis">NASA MODIS Terra/Aqua (250m Daily)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Max Allowed Cloud Cover</label>
            <select
              value={cloudCoverMax}
              onChange={(e) => setCloudCoverMax(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="5">&lt; 5% (Ultra-clear skies only)</option>
              <option value="10">&lt; 10% (Optimal for spectral analytics)</option>
              <option value="20">&lt; 20% (Broader historical coverage)</option>
              <option value="50">&lt; 50% (Atmospheric correction enabled)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 2: Spectral Analytics & Indices */}
      <div className="rounded-[24px] glass-panel border border-white/90 p-5 sm:p-6 shadow-sm space-y-4 bg-white/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Spectral Analytics & Segmentation</h2>
            <p className="text-xs text-slate-500">Configure biometric indices calculated during bi-temporal change detection.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Default Spectral Index</label>
            <select
              value={spectralIndex}
              onChange={(e) => setSpectralIndex(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="ndvi">NDVI — Normalized Difference Vegetation Index</option>
              <option value="ndwi">NDWI — Normalized Difference Water Index</option>
              <option value="ndbi">NDBI — Normalized Difference Built-Up Index</option>
              <option value="evi">EVI — Enhanced Vegetation Index (Canopy)</option>
              <option value="truecolor">RGB — Natural True Color Composite</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Change Threshold Confidence</label>
            <select
              defaultValue="75"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="90">High Precision (&gt; 90% confidence)</option>
              <option value="75">Balanced Sensitivity (&gt; 75% confidence)</option>
              <option value="60">Exploratory / High Recall (&gt; 60% confidence)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 3: Measurement Units & Coordinates */}
      <div className="rounded-[24px] glass-panel border border-white/90 p-5 sm:p-6 shadow-sm space-y-4 bg-white/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Units & Spatial Coordinate System</h2>
            <p className="text-xs text-slate-500">Define metrics formatting for area calculations and spatial pins.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Measurement Standard</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Metric (km², Hectares)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  unitSystem === 'imperial'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Imperial (Sq Mi, Acres)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">Coordinate Projection</label>
            <select
              value={coordFormat}
              onChange={(e) => setCoordFormat(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="wgs84">Decimal Degrees (EPSG:4326 - WGS 84)</option>
              <option value="mgrs">Military Grid Reference System (MGRS)</option>
              <option value="utm">Universal Transverse Mercator (UTM)</option>
              <option value="dms">Degrees Minutes Seconds (DMS)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 4: Cache & Telemetry */}
      <div className="rounded-[24px] glass-panel border border-white/90 p-5 sm:p-6 shadow-sm space-y-4 bg-white/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <HardDrive className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Data Storage & Cached Tiles</h2>
            <p className="text-xs text-slate-500">Manage offline tile storage and satellite band caches.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div>
            <p className="text-xs font-semibold text-slate-900">Local Telemetry Cache: 14.8 MB</p>
            <p className="text-[11px] text-slate-500 mt-0.5">High-resolution bi-temporal tiles and evidence masks stored locally.</p>
          </div>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            {cacheCleared ? 'Cache Cleared!' : 'Purge Cache'}
          </button>
        </div>
      </div>

      {/* Return to Dashboard */}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={onBackToHome}
          className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
        >
          ← Return to Dashboard
        </button>
        <span className="text-[11px] font-mono text-slate-400">SatQuery Engine v2.4.0-prod</span>
      </div>
    </main>
  );
};
