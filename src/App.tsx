import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import GlobeVisualization from './components/GlobeVisualization';
import LiveFeed from './components/LiveFeed';
import GeopoliticsPanel from './components/GeopoliticsPanel';
import OsintDirectory from './components/OsintDirectory';
import MarketsModule from './components/MarketsModule';
import AgentModule from './components/AgentModule';
import ReplayModule from './components/ReplayModule';
import SignalsModule from './components/SignalsModule';
import WebcamsModule from './components/WebcamsModule';
import CyberModule from './components/CyberModule';

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const getCategoryFilter = (moduleId: string) => {
    switch (moduleId) {
      case 'osint-air': return "Air Traffic & Aviation";
      case 'osint-sea': return "Maritime & Shipping";
      case 'osint-space': return "Space & Orbital Tracking";
      case 'osint-ground': return "Ground & Land Tracking";
      case 'osint-maps': return "Main OSINT Map Sites";
      case 'osint-satellite': return "Satellite & Data Sources";
      case 'osint-data': return "OSINT Data Sources";
      case 'osint-tools': return "Other Map & OSINT Tools";
      case 'osint-resources': return "Additional Tools & Resources";
      default: return undefined;
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-zinc-100 overflow-hidden font-sans selection:bg-zinc-800">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <div className="flex-1 flex flex-col relative bg-zinc-950">
        {activeModule === 'dashboard' && (
          <>
            <div className="flex-1 flex relative">
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
              <GeopoliticsPanel />
            </div>
            <LiveFeed />
          </>
        )}

        {activeModule.startsWith('osint') && (
          <OsintDirectory categoryFilter={getCategoryFilter(activeModule)} />
        )}

        {activeModule === 'feed' && (
          <div className="flex-1 flex flex-col h-full">
             <div className="p-6 border-b border-zinc-900 bg-zinc-950">
               <h2 className="text-xl font-bold text-zinc-100">Live Intelligence Feed</h2>
               <p className="text-sm text-zinc-500 mt-1">Real-time global events and alerts</p>
             </div>
             <div className="flex-1 overflow-hidden">
               <LiveFeed fullHeight />
             </div>
          </div>
        )}

        {activeModule === 'analysis' && (
          <div className="flex-1 flex flex-col h-full bg-zinc-950">
             <div className="flex-1 flex justify-center overflow-hidden">
               <div className="w-full h-full border-none overflow-hidden">
                 <GeopoliticsPanel fullWidth />
               </div>
             </div>
          </div>
        )}

        {activeModule === 'cyber' && <CyberModule />}
        {activeModule === 'markets' && <MarketsModule />}
        {activeModule === 'webcams' && <WebcamsModule />}
        {activeModule === 'agent' && <AgentModule />}
        {activeModule === 'replay' && <ReplayModule />}
        {activeModule === 'signals' && <SignalsModule />}
      </div>
    </div>
  );
}
