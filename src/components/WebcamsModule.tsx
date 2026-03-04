import React, { useState, useEffect } from 'react';
import { Camera, Maximize2 } from 'lucide-react';

const webcams = [
  { id: 1, location: 'Kyiv City Center', region: 'Eastern Europe', status: 'LIVE', coords: '50.4501° N, 30.5234° E', seed: 'kiev-street' },
  { id: 2, location: 'Strait of Hormuz', region: 'Middle East', status: 'LIVE', coords: '26.5667° N, 56.2500° E', seed: 'ocean-ship' },
  { id: 3, location: 'Taiwan Strait', region: 'East Asia', status: 'LIVE', coords: '24.8066° N, 119.9142° E', seed: 'taiwan-coast' },
  { id: 4, location: 'Suez Canal', region: 'North Africa', status: 'LIVE', coords: '30.5852° N, 32.2654° E', seed: 'canal-shipping' },
  { id: 5, location: 'US-Mexico Border', region: 'North America', status: 'LIVE', coords: '31.3322° N, 109.5500° W', seed: 'border-fence' },
  { id: 6, location: 'Red Sea Port', region: 'Middle East', status: 'LIVE', coords: '21.4858° N, 39.1925° E', seed: 'port-crane' },
];

export default function WebcamsModule() {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toISOString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      <div className="p-6 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <Camera className="w-6 h-6 text-zinc-400" />
          </div>
          <div>
            <h2 className="text-zinc-100 font-bold tracking-tight text-lg">PUBLIC WEBCAMS</h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">Global CCTV & Traffic Monitoring</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {webcams.map(cam => (
            <div key={cam.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col group">
              <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-200">{cam.location}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{cam.coords}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-mono text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    {cam.status}
                  </span>
                </div>
              </div>
              <div className="relative aspect-video bg-black overflow-hidden">
                {/* Simulated CCTV feed using grayscale picsum with a specific seed */}
                <img
                  src={`https://picsum.photos/seed/${cam.seed}/600/400?grayscale`}
                  alt={cam.location}
                  className="w-full h-full object-cover opacity-60 contrast-125 mix-blend-luminosity group-hover:opacity-80 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMikiLz4KPC9zdmc+')] opacity-50 pointer-events-none"></div>
                
                {/* OSD (On Screen Display) */}
                <div className="absolute top-2 left-2 text-[10px] font-mono text-white/80 drop-shadow-md">
                  CAM-{cam.id.toString().padStart(3, '0')} // {cam.region.toUpperCase()}
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/80 drop-shadow-md">
                  {time}
                </div>
                
                <button className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 rounded text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
