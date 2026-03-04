import React, { useState, useEffect } from 'react';
import { Newspaper, FileText, BarChart3, TrendingDown, TrendingUp, Minus, AlertCircle } from 'lucide-react';

const mockNews = [
  { id: 1, headline: 'UN Security Council convenes emergency session on Baltic Sea anomaly', source: 'Reuters', time: '10m ago', impact: 'high' },
  { id: 2, headline: 'New bilateral trade agreement signed between India and Japan', source: 'Bloomberg', time: '1h ago', impact: 'medium' },
  { id: 3, headline: 'Protests escalate in capital over recent economic reforms', source: 'Al Jazeera', time: '2h ago', impact: 'high' },
  { id: 4, headline: 'OPEC+ announces unexpected production cuts starting next month', source: 'Financial Times', time: '3h ago', impact: 'critical' },
  { id: 5, headline: 'Tech export restrictions expanded to include advanced AI chips', source: 'WSJ', time: '5h ago', impact: 'medium' },
];

const mockTreaties = [
  { id: 1, name: 'START III Framework', status: 'In Negotiation', parties: 'US, RU', risk: 'high' },
  { id: 2, name: 'AUKUS Submarine Pact', status: 'Active', parties: 'US, UK, AU', risk: 'low' },
  { id: 3, name: 'CPTPP Expansion', status: 'Ratifying', parties: 'Multiple', risk: 'low' },
  { id: 4, name: 'Paris Agreement Targets', status: 'Under Review', parties: 'Global', risk: 'medium' },
];

const mockStabilityMetrics = [
  { region: 'Eastern Europe', score: 32, trend: 'down', status: 'Volatile' },
  { region: 'Middle East', score: 28, trend: 'down', status: 'Critical' },
  { region: 'Indo-Pacific', score: 65, trend: 'stable', status: 'Moderate' },
  { region: 'South America', score: 54, trend: 'up', status: 'Improving' },
  { region: 'Sub-Saharan Africa', score: 41, trend: 'down', status: 'Unstable' },
];

export default function GeopoliticsPanel({ fullWidth = false }: { fullWidth?: boolean }) {
  const [activeTab, setActiveTab] = useState<'news' | 'treaties' | 'metrics'>('news');
  const [newsData, setNewsData] = useState<any[]>(mockNews);
  const [isLoadingNews, setIsLoadingNews] = useState(false);

  useEffect(() => {
    // Using static mock data for news to avoid API issues
    setNewsData(mockNews);
    setIsLoadingNews(false);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      default: return <Minus className="w-3 h-3 text-zinc-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    if (score >= 30) return 'text-orange-500';
    return 'text-red-500';
  };

  if (fullWidth) {
    return (
      <div className="w-full h-full bg-zinc-950 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-zinc-900 flex items-center gap-3 bg-zinc-900/30">
          <div className="w-10 h-10 rounded bg-blue-950 border border-blue-900 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-zinc-100 font-bold tracking-tight text-lg">STRATEGIC ANALYSIS</h2>
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">Global Geopolitics Overview</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {/* News Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Newspaper className="w-4 h-4" /> Global News
            </h3>
            <div className="space-y-4">
              {newsData.map((news) => (
                <div key={news.id} className="group cursor-pointer bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${getImpactColor(news.impact)}`}>
                      {news.impact} IMPACT
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono">{news.time}</span>
                  </div>
                  <h3 className="text-sm text-zinc-200 group-hover:text-blue-400 transition-colors leading-snug mb-2">
                    {news.headline}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase">{news.source}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Treaties Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
              <FileText className="w-4 h-4" /> Active Treaties
            </h3>
            <div className="space-y-3">
              {mockTreaties.map((treaty) => (
                <div key={treaty.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-zinc-200">{treaty.name}</h3>
                    <span className={`w-2 h-2 rounded-full ${
                      treaty.status === 'Active' ? 'bg-green-500' : 
                      treaty.status === 'In Negotiation' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">STATUS</span>
                      <span className="text-zinc-300">{treaty.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">PARTIES</span>
                      <span className="text-zinc-300">{treaty.parties}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">RISK</span>
                      <span className={`${treaty.risk === 'high' ? 'text-red-400' : treaty.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                        {treaty.risk.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Metrics Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
              <BarChart3 className="w-4 h-4" /> Stability Index
            </h3>
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6 text-center mb-6">
              <div className="text-xs font-mono text-zinc-500 mb-2">GLOBAL STABILITY INDEX</div>
              <div className="text-5xl font-light text-orange-500 mb-2">42.8</div>
              <div className="text-xs font-mono text-red-400 flex items-center justify-center gap-1">
                <TrendingDown className="w-4 h-4" /> -1.2 pts this month
              </div>
            </div>
            <div className="space-y-4">
              {mockStabilityMetrics.map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between group bg-zinc-900/20 p-3 rounded-lg border border-zinc-800/50">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-300">{metric.region}</span>
                    <span className="text-xs font-mono text-zinc-500">{metric.status}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-mono font-bold ${getScoreColor(metric.score)}`}>
                      {metric.score}
                    </span>
                    <div className="w-4 flex justify-end">
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 h-full bg-zinc-950 border-l border-zinc-900 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-zinc-900 flex items-center gap-3 bg-zinc-900/30">
        <div className="w-8 h-8 rounded bg-blue-950 border border-blue-900 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-zinc-100 font-bold tracking-tight text-sm">GEOPOLITICS</h2>
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Strategic Analysis</p>
        </div>
      </div>

      <div className="flex border-b border-zinc-900">
        <button
          onClick={() => setActiveTab('news')}
          className={`flex-1 py-3 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'news' ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
          }`}
        >
          <Newspaper className="w-3.5 h-3.5" />
          NEWS
        </button>
        <button
          onClick={() => setActiveTab('treaties')}
          className={`flex-1 py-3 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'treaties' ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          TREATIES
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex-1 py-3 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'metrics' ? 'text-blue-400 border-b-2 border-blue-500 bg-blue-500/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          INDEX
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent p-4">
        {activeTab === 'news' && (
          <div className="space-y-4">
            {isLoadingNews ? (
              <div className="text-center text-zinc-500 text-xs font-mono py-4 animate-pulse">FETCHING LIVE DATA...</div>
            ) : (
              newsData.map((news) => (
                <a key={news.id} href={news.url} target="_blank" rel="noopener noreferrer" className="block group cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${getImpactColor(news.impact)}`}>
                      {news.impact} IMPACT
                    </span>
                    <span className="text-[10px] text-zinc-600 font-mono">{news.time}</span>
                  </div>
                  <h3 className="text-sm text-zinc-200 group-hover:text-blue-400 transition-colors leading-snug mb-1">
                    {news.headline}
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase">{news.source}</p>
                  <div className="h-px w-full bg-zinc-900 mt-3 group-last:hidden"></div>
                </a>
              ))
            )}
          </div>
        )}

        {activeTab === 'treaties' && (
          <div className="space-y-3">
            {mockTreaties.map((treaty) => (
              <div key={treaty.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-zinc-200">{treaty.name}</h3>
                  <span className={`w-2 h-2 rounded-full ${
                    treaty.status === 'Active' ? 'bg-green-500' : 
                    treaty.status === 'In Negotiation' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-500">STATUS</span>
                    <span className="text-zinc-300">{treaty.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-500">PARTIES</span>
                    <span className="text-zinc-300">{treaty.parties}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-zinc-500">RISK OF COLLAPSE</span>
                    <span className={`${treaty.risk === 'high' ? 'text-red-400' : treaty.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {treaty.risk.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-4">
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4 text-center mb-6">
              <div className="text-[10px] font-mono text-zinc-500 mb-1">GLOBAL STABILITY INDEX</div>
              <div className="text-4xl font-light text-orange-500 mb-1">42.8</div>
              <div className="text-[10px] font-mono text-red-400 flex items-center justify-center gap-1">
                <TrendingDown className="w-3 h-3" /> -1.2 pts this month
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2">Regional Breakdown</h3>
              {mockStabilityMetrics.map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-300">{metric.region}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{metric.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-mono font-bold ${getScoreColor(metric.score)}`}>
                      {metric.score}
                    </span>
                    <div className="w-4 flex justify-end">
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
