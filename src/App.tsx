import React from 'react';
import Sidebar from './components/Sidebar';
import GlobeVisualization from './components/GlobeVisualization';
import LiveFeed from './components/LiveFeed';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-black text-zinc-100 overflow-hidden font-sans selection:bg-zinc-800">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 relative">
          <GlobeVisualization />
          
          {/* Top Bar Overlay */}
          <div className="absolute top-0 left-0 right-0 p-4 pointer-events-none flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-md border border-zinc-800/50 rounded-lg p-3 pointer-events-auto">
              <div className="text-xs font-mono text-zinc-400 mb-1">GLOBAL THREAT LEVEL</div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-orange-500 leading-none">ELEVATED</span>
                <span className="text-xs text-zinc-500 font-mono mb-0.5">DEFCON 3</span>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md border border-zinc-800/50 rounded-lg p-3 pointer-events-auto flex gap-6">
              <div>
                <div className="text-[10px] font-mono text-zinc-500 mb-1">ACTIVE BASES</div>
                <div className="text-lg font-mono text-zinc-200">224</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-500 mb-1">DARK VESSELS</div>
                <div className="text-lg font-mono text-zinc-200">18</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-500 mb-1">MIL FLIGHTS</div>
                <div className="text-lg font-mono text-zinc-200">1,402</div>
              </div>
              <div className="border-l border-zinc-800 pl-6">
                <div className="text-[10px] font-mono text-zinc-500 mb-1">PREDICTION MARKETS</div>
                <div className="text-xs font-mono text-zinc-300 flex flex-col gap-1">
                  <div className="flex justify-between gap-4">
                    <span>CEASEFIRE IN 2026</span>
                    <span className="text-green-400">32%</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span>NEW NATO MEMBER</span>
                    <span className="text-red-400">14%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LiveFeed />
      </div>
    </div>
  );
}
