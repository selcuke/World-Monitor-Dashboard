import React, { useState } from 'react';
import { osintLinks } from '../data/links';
import { ExternalLink, Map, Satellite, Terminal, Globe, Search } from 'lucide-react';

export default function OsintDirectory({ categoryFilter }: { categoryFilter?: string }) {
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (category: string) => {
    if (category.includes('OSINT')) return <Map className="w-5 h-5 text-blue-400" />;
    if (category.includes('Satellite')) return <Satellite className="w-5 h-5 text-green-400" />;
    if (category.includes('Tools')) return <Terminal className="w-5 h-5 text-purple-400" />;
    return <Globe className="w-5 h-5 text-zinc-400" />;
  };

  let baseLinks = osintLinks;
  if (categoryFilter) {
    baseLinks = baseLinks.filter(section => section.category === categoryFilter);
  }

  const filteredLinks = baseLinks.map(section => ({
    ...section,
    links: section.links.filter(link => 
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      link.url.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.links.length > 0);

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      <div className="p-6 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">OSINT Directory</h2>
          <p className="text-sm text-zinc-500 mt-1">Curated list of open-source intelligence tools and maps</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search tools..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full md:w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {filteredLinks.map((section, idx) => (
            <div key={idx} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-zinc-800/50 bg-zinc-900/50 flex items-center gap-3">
                <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800">
                  {getIcon(section.category)}
                </div>
                <h3 className="text-sm font-bold text-zinc-200 tracking-wide">{section.category}</h3>
                <span className="ml-auto text-xs font-mono text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                  {section.links.length} ITEMS
                </span>
              </div>
              <div className="p-2 flex-1">
                <ul className="space-y-1">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-700/50"
                      >
                        <div className="flex flex-col gap-1 min-w-0 pr-4">
                          <span className="text-sm font-medium text-zinc-300 group-hover:text-blue-400 transition-colors truncate">
                            {link.name}
                          </span>
                          <span className="text-xs font-mono text-zinc-600 truncate">
                            {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all flex-shrink-0">
                          <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-blue-400" />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          
          {filteredLinks.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-zinc-500">
              <Search className="w-12 h-12 mb-4 text-zinc-700" />
              <p className="text-lg font-medium text-zinc-400">No tools found</p>
              <p className="text-sm mt-1">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
