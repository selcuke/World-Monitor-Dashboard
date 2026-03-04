import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Plane, Ship, Shield, Zap } from 'lucide-react';

const mockEvents = [
  { id: 1, type: 'flight', message: 'Unidentified military aircraft detected over Baltic Sea', time: 'Just now', severity: 'medium', icon: Plane, coords: '55.7°N 19.3°E' },
  { id: 2, type: 'naval', message: 'Dark vessel movement near South China Sea', time: '2m ago', severity: 'high', icon: Ship, coords: '15.2°N 115.0°E' },
  { id: 3, type: 'conflict', message: 'Artillery fire reported in Eastern Ukraine', time: '5m ago', severity: 'critical', icon: AlertTriangle, coords: '48.5°N 37.9°E' },
  { id: 4, type: 'base', message: 'Increased activity at US Base in Middle East', time: '12m ago', severity: 'low', icon: Shield, coords: '25.2°N 51.5°E' },
  { id: 5, type: 'flight', message: 'Reconnaissance drone active over Black Sea', time: '15m ago', severity: 'medium', icon: Plane, coords: '43.1°N 34.2°E' },
  { id: 6, type: 'naval', message: 'Carrier strike group repositioning', time: '22m ago', severity: 'high', icon: Ship, coords: '35.1°N 140.2°E' },
  { id: 7, type: 'infra', message: 'Undersea cable anomaly detected', time: '1h ago', severity: 'critical', icon: Zap, coords: '51.2°N 2.5°E' },
];

export default function LiveFeed() {
  const [events, setEvents] = useState(mockEvents);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prev => {
        const newEvents = [...prev];
        const last = newEvents.pop();
        if (last) newEvents.unshift({ ...last, time: 'Just now', id: Date.now() });
        return newEvents;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <div className="h-64 border-t border-zinc-900 bg-zinc-950 flex flex-col">
      <div className="px-4 py-2 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/50">
        <h3 className="text-xs font-mono font-semibold text-zinc-300 flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-500" />
          LIVE INTELLIGENCE FEED
        </h3>
        <div className="flex gap-2">
          <span className="text-[10px] font-mono text-green-500 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            STREAMING
          </span>
          <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 cursor-pointer hover:bg-zinc-800">FILTER</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {events.map((event) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="flex items-center gap-4 p-2.5 rounded hover:bg-zinc-900/80 transition-colors group cursor-pointer border border-transparent hover:border-zinc-800">
              <div className={`p-1.5 rounded border ${getSeverityColor(event.severity)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-xs text-zinc-200 truncate font-mono">{event.message}</p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                    {event.coords}
                  </span>
                  <span className={`text-[9px] font-mono uppercase px-1.5 rounded ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-zinc-600 font-mono whitespace-nowrap">
                {event.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
