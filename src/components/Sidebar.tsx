import React from 'react';
import { osintLinks } from '../data/links';
import { ExternalLink, Globe, Map, Satellite, ShieldAlert, Radio, Activity, Terminal } from 'lucide-react';

export default function Sidebar() {
  const getIcon = (category: string) => {
    if (category.includes('OSINT')) return <Map className="w-4 h-4 text-blue-400" />;
    if (category.includes('Satellite')) return <Satellite className="w-4 h-4 text-green-400" />;
    if (category.includes('Tools')) return <Terminal className="w-4 h-4 text-purple-400" />;
    return <Globe className="w-4 h-4 text-zinc-400" />;
  };

  return (
    <div className="w-80 h-full bg-zinc-950 border-r border-zinc-900 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-zinc-900 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-red-950 border border-red-900 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h1 className="text-zinc-100 font-bold tracking-tight text-sm">WORLD MONITOR</h1>
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Global Intelligence</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="p-4 space-y-6">
          {osintLinks.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                {getIcon(section.category)}
                {section.category}
              </h2>
              <ul className="space-y-1">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2 rounded-md hover:bg-zinc-900 transition-colors"
                    >
                      <span className="text-xs text-zinc-300 group-hover:text-zinc-100 truncate pr-4">
                        {link.name}
                      </span>
                      <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-zinc-900 bg-zinc-950">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM ONLINE
          </span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
}
