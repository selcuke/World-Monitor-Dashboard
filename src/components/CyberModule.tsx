import React, { useState } from 'react';
import { ShieldAlert, Clock, Server, AlertTriangle, Activity, Database, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockGraphData = [
  { time: '00:00', events: 120 },
  { time: '04:00', events: 300 },
  { time: '08:00', events: 250 },
  { time: '12:00', events: 450 },
  { time: '16:00', events: 380 },
  { time: '20:00', events: 600 },
  { time: '24:00', events: 400 },
];

const mockMispData = [
  { id: 'MISP-2026-041', threat: 'APT29 Infrastructure', type: 'Network Activity', severity: 'Critical', source: 'Shodan', time: '10m ago' },
  { id: 'MISP-2026-042', threat: 'Ransomware C2 Server', type: 'Malware', severity: 'High', source: 'AlienVault', time: '45m ago' },
  { id: 'MISP-2026-043', threat: 'Exposed ICS Device', type: 'Vulnerability', severity: 'Critical', source: 'Shodan', time: '1h ago' },
  { id: 'MISP-2026-044', threat: 'Mass Scanning Activity', type: 'Reconnaissance', severity: 'Medium', source: 'GreyNoise', time: '2h ago' },
  { id: 'MISP-2026-045', threat: 'Zero-day Exploitation', type: 'Exploit', severity: 'Critical', source: 'CrowdStrike', time: '3h ago' },
];

const shodanNodes = [
  { top: '30%', left: '20%', label: 'US-East' },
  { top: '40%', left: '25%', label: 'US-West' },
  { top: '25%', left: '50%', label: 'EU-Central' },
  { top: '35%', left: '55%', label: 'EU-East' },
  { top: '45%', left: '75%', label: 'AP-North' },
  { top: '60%', left: '80%', label: 'AP-South' },
  { top: '70%', left: '30%', label: 'SA-East' },
  { top: '50%', left: '60%', label: 'ME-Central' },
];

export default function CyberModule() {
  const [timeframe, setTimeframe] = useState<'1h' | '24h' | '7d'>('24h');

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      {/* Header & Timeline Filter */}
      <div className="p-6 border-b border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-red-950 border border-red-900 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-zinc-100 font-bold tracking-tight text-lg">CYBER THREATS</h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">Shodan & MISP Correlation</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          <Clock className="w-4 h-4 text-zinc-500 ml-2" />
          <div className="flex gap-1 ml-2">
            <button 
              onClick={() => setTimeframe('1h')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${timeframe === '1h' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              1H
            </button>
            <button 
              onClick={() => setTimeframe('24h')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${timeframe === '24h' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              24H
            </button>
            <button 
              onClick={() => setTimeframe('7d')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${timeframe === '7d' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              7D
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        
        {/* Middle: Interactive World Map */}
        <div className="w-full h-[40vh] min-h-[300px] bg-zinc-900/30 border border-zinc-800 rounded-xl relative overflow-hidden flex flex-col">
          <div className="p-3 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-red-400" />
              <span className="text-sm font-mono font-bold text-zinc-200">SHODAN EXPOSED DEVICES</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Critical</span>
              <span className="flex items-center gap-1 ml-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span> High</span>
            </div>
          </div>
          
          <div className="flex-1 relative bg-[#0a0a0a]">
            {/* Simple SVG World Map Background */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
              <path fill="#ffffff" d="M150,100 Q180,80 250,90 T350,150 T400,100 T450,120 T500,80 T550,100 T600,60 T650,90 T700,150 T750,120 T800,160 T850,130 T900,180 T950,200 L950,500 L50,500 Z" />
              <path fill="#ffffff" d="M200,200 Q250,180 300,250 T350,300 T400,280 T450,350 T500,320 T550,400 T600,380 T650,450 T700,420 T750,480 T800,450 T850,490 L200,490 Z" />
            </svg>
            
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-50"></div>

            {/* Shodan Nodes */}
            {shodanNodes.map((node, i) => (
              <div 
                key={i} 
                className="absolute group cursor-pointer"
                style={{ top: node.top, left: node.left }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-8 h-8 bg-red-500/20 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] relative z-10"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-zinc-200 text-[10px] font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                    {node.label}: {Math.floor(Math.random() * 5000) + 1000} exposed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Table + Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[300px]">
          
          {/* MISP Correlation Table */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider">MISP Correlation Events</h3>
            </div>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-900/80 text-xs font-mono text-zinc-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 font-medium">Event ID</th>
                    <th className="px-4 py-3 font-medium">Threat</th>
                    <th className="px-4 py-3 font-medium">Severity</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {mockMispData.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-blue-400">{row.id}</td>
                      <td className="px-4 py-3 text-zinc-300">{row.threat}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded border ${
                          row.severity === 'Critical' ? 'text-red-400 bg-red-400/10 border-red-400/20' :
                          row.severity === 'High' ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' :
                          'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                        }`}>
                          {row.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-500">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Threat Volume Graph */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-mono font-bold text-zinc-200 uppercase tracking-wider">Threat Volume Over Time</h3>
            </div>
            <div className="flex-1 p-4 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockGraphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                    fontFamily="monospace"
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                    fontFamily="monospace"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.5rem' }}
                    itemStyle={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '12px' }}
                    labelStyle={{ color: '#a1a1aa', fontFamily: 'monospace', fontSize: '10px', marginBottom: '4px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="events" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorEvents)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
