import React from 'react';
import { Radio, WifiOff, Map, AlertTriangle, Activity } from 'lucide-react';

export default function SignalsModule() {
  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-red-950 border border-red-900 flex items-center justify-center">
            <Radio className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-zinc-100 font-bold tracking-tight text-lg">SIGNALS & GPS JAMMING</h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">Electronic Warfare & Interference</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        
        {/* Map Placeholder */}
        <div className="lg:col-span-2 bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden relative flex flex-col">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-2">
            <Map className="w-4 h-4 text-zinc-400" />
            <span className="text-sm font-mono font-bold text-zinc-200">INTERFERENCE HEATMAP</span>
          </div>
          <div className="flex-1 relative bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Flag_of_NATO.svg/40px-Flag_of_NATO.svg.png')] bg-cover bg-center opacity-20">
            {/* Simulated Heatmap overlays */}
            <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 backdrop-blur-sm border border-red-900/50 rounded-lg p-6 text-center">
                <WifiOff className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-400 tracking-widest mb-2">SEVERE GPS INTERFERENCE</h3>
                <p className="text-zinc-400 font-mono text-sm">Blinding region detected. Airspace clearing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Data */}
        <div className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-3 mb-4">
              <AlertTriangle className="w-4 h-4" /> Active Anomalies
            </h3>
            <ul className="space-y-4">
              <li className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-red-400">Eastern Europe</span>
                  <span className="text-xs font-mono text-zinc-500">10m ago</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Widespread GNSS spoofing affecting commercial aviation. Circle patterns detected.</p>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-orange-400">Middle East</span>
                  <span className="text-xs font-mono text-zinc-500">45m ago</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Localized jamming near major military installations. Correlates with recent drone activity.</p>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-yellow-400">Baltic Sea</span>
                  <span className="text-xs font-mono text-zinc-500">2h ago</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">Intermittent AIS spoofing detected on cargo vessels.</p>
              </li>
            </ul>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-3 mb-4">
              <Activity className="w-4 h-4" /> Signal Identification
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-zinc-950 rounded border border-zinc-800">
                <span className="text-xs font-mono text-zinc-300">STANAG 4285</span>
                <span className="text-[10px] font-mono text-blue-400 px-2 py-0.5 bg-blue-900/20 rounded">MILITARY</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-zinc-950 rounded border border-zinc-800">
                <span className="text-xs font-mono text-zinc-300">Link 11</span>
                <span className="text-[10px] font-mono text-blue-400 px-2 py-0.5 bg-blue-900/20 rounded">NAVAL</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-zinc-950 rounded border border-zinc-800">
                <span className="text-xs font-mono text-zinc-300">Unknown OTH</span>
                <span className="text-[10px] font-mono text-red-400 px-2 py-0.5 bg-red-900/20 rounded">UNIDENTIFIED</span>
              </div>
            </div>
            <a href="https://www.sigidwiki.com/wiki/Signal_Identification_Guide" target="_blank" rel="noopener noreferrer" className="mt-4 block text-center text-xs font-mono text-blue-500 hover:text-blue-400 transition-colors">
              Open Signal ID Guide →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
