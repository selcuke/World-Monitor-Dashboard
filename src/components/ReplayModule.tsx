import React from 'react';
import { History, Play, Pause, SkipBack, SkipForward, Clock, Map as MapIcon, ShieldAlert } from 'lucide-react';

export default function ReplayModule() {
  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-orange-950 border border-orange-900 flex items-center justify-center">
            <History className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h2 className="text-zinc-100 font-bold tracking-tight text-lg">HISTORICAL REPLAYS</h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">4D Reconstruction & Timeline Scrubbing</p>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-mono text-zinc-300">2024-04-13T20:00:00Z</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative">
        {/* Placeholder for 3D Globe Replay */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black"></div>
          
          <div className="text-center z-10 space-y-6">
            <ShieldAlert className="w-16 h-16 text-orange-500/50 mx-auto animate-pulse" />
            <h3 className="text-2xl font-bold text-zinc-300 tracking-widest">OPERATION EPIC FURY</h3>
            <p className="text-zinc-500 font-mono max-w-md mx-auto">
              Interactive 4D reconstruction of the April 13th strikes. Scrub through minute-by-minute OSINT signals, satellite passes, and airspace clearing.
            </p>
            <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-6 py-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
              <span className="text-xs font-mono text-orange-400">SIMULATION READY</span>
            </div>
          </div>

          {/* Mock Map Elements */}
          <div className="absolute top-10 left-10 bg-black/60 backdrop-blur-md border border-zinc-800/50 rounded-lg p-4 w-64">
            <h4 className="text-xs font-mono text-zinc-400 mb-3 border-b border-zinc-800 pb-2">ACTIVE SIGNALS</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li className="flex justify-between text-red-400">
                <span>GPS Jamming</span>
                <span>SEVERE</span>
              </li>
              <li className="flex justify-between text-zinc-300">
                <span>Airspace</span>
                <span>CLEARING</span>
              </li>
              <li className="flex justify-between text-blue-400">
                <span>SAR Satellites</span>
                <span>PASSING</span>
              </li>
              <li className="flex justify-between text-yellow-400">
                <span>Shipping</span>
                <span>SCRAMBLING</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="h-32 bg-zinc-950 border-t border-zinc-900 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-6 max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
                <SkipBack className="w-5 h-5" />
              </button>
              <button className="p-3 bg-orange-600 hover:bg-orange-500 rounded-full transition-colors text-white shadow-lg shadow-orange-900/20">
                <Play className="w-6 h-6 fill-current" />
              </button>
              <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 relative">
              <div className="h-2 bg-zinc-800 rounded-full w-full overflow-hidden">
                <div className="h-full bg-orange-500 w-1/3 relative">
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-2">
                <span>18:00Z</span>
                <span>19:00Z</span>
                <span className="text-orange-400 font-bold">20:00Z</span>
                <span>21:00Z</span>
                <span>22:00Z</span>
                <span>23:00Z</span>
                <span>00:00Z</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
