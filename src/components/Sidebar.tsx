import React from 'react';
import { Globe, Database, Activity, ShieldAlert, Map, Satellite, Terminal, Layers } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export default function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const mainModules = [
    { id: 'dashboard', name: 'Global Dashboard', icon: Globe },
    { id: 'feed', name: 'Live Intelligence', icon: Activity },
    { id: 'analysis', name: 'Strategic Analysis', icon: ShieldAlert },
  ];

  const sourceModules = [
    { id: 'osint-all', name: 'All Sources Directory', icon: Database },
    { id: 'osint-maps', name: 'Main OSINT Maps', icon: Map },
    { id: 'osint-satellite', name: 'Satellite & Data', icon: Satellite },
    { id: 'osint-tools', name: 'Map & OSINT Tools', icon: Terminal },
    { id: 'osint-resources', name: 'Additional Resources', icon: Layers },
  ];

  return (
    <div className="w-64 h-full bg-zinc-950 border-r border-zinc-900 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-zinc-900 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-red-950 border border-red-900 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h1 className="text-zinc-100 font-bold tracking-tight text-sm">WORLD MONITOR</h1>
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Global Intelligence</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6 px-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-mono text-zinc-500 px-2 mb-1 uppercase tracking-wider">Core Modules</div>
          {mainModules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-zinc-900 text-zinc-100 border border-zinc-800' 
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                {mod.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-mono text-zinc-500 px-2 mb-1 uppercase tracking-wider">Intelligence Sources</div>
          {sourceModules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-zinc-900 text-zinc-100 border border-zinc-800' 
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                {mod.name}
              </button>
            );
          })}
        </div>

      </div>
      
      <div className="p-4 border-t border-zinc-900 bg-zinc-950">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM ONLINE
          </span>
          <span>v2.5.1</span>
        </div>
      </div>
    </div>
  );
}
