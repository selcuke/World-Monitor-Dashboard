import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertCircle } from 'lucide-react';

const mockMarkets = [
  { symbol: 'CL=F', name: 'Crude Oil WTI', price: '78.45', change: '+1.2%', trend: 'up' },
  { symbol: 'BZ=F', name: 'Brent Crude', price: '82.10', change: '+0.9%', trend: 'up' },
  { symbol: 'GC=F', name: 'Gold', price: '2,045.30', change: '+0.4%', trend: 'up' },
  { symbol: 'SI=F', name: 'Silver', price: '22.80', change: '-0.2%', trend: 'down' },
  { symbol: 'NG=F', name: 'Natural Gas', price: '1.85', change: '-2.1%', trend: 'down' },
  { symbol: 'HG=F', name: 'Copper', price: '3.82', change: '+0.1%', trend: 'up' },
  { symbol: 'ZC=F', name: 'Corn', price: '420.50', change: '-1.5%', trend: 'down' },
  { symbol: 'ZW=F', name: 'Wheat', price: '580.25', change: '+2.3%', trend: 'up' },
];

const mockIndices = [
  { symbol: '^GSPC', name: 'S&P 500', price: '5,088.80', change: '+0.03%', trend: 'up' },
  { symbol: '^DJI', name: 'Dow Jones', price: '39,131.53', change: '+0.16%', trend: 'up' },
  { symbol: '^IXIC', name: 'NASDAQ', price: '15,996.82', change: '-0.28%', trend: 'down' },
  { symbol: '^FTSE', name: 'FTSE 100', price: '7,706.28', change: '+0.28%', trend: 'up' },
  { symbol: '^N225', name: 'Nikkei 225', price: '39,098.68', change: '+2.19%', trend: 'up' },
];

export default function MarketsModule() {
  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      <div className="p-6 border-b border-zinc-900 flex items-center gap-3 bg-zinc-900/30">
        <div className="w-10 h-10 rounded bg-emerald-950 border border-emerald-900 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-zinc-100 font-bold tracking-tight text-lg">MARKETS & RESOURCES</h2>
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">Global Commodities & Indices</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        
        {/* Commodities */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
            <DollarSign className="w-4 h-4" /> Strategic Commodities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockMarkets.map((market) => (
              <div key={market.symbol} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-zinc-200">{market.name}</span>
                  <span className="text-xs font-mono text-zinc-500">{market.symbol}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-mono text-zinc-100">{market.price}</span>
                  <span className={`text-sm font-mono flex items-center gap-1 ${market.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {market.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {market.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indices & Alerts */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Activity className="w-4 h-4" /> Global Indices
            </h3>
            <div className="space-y-3">
              {mockIndices.map((index) => (
                <div key={index.symbol} className="flex items-center justify-between bg-zinc-900/30 p-3 rounded-lg border border-zinc-800/50">
                  <div className="flex flex-col">
                    <span className="text-sm text-zinc-200">{index.name}</span>
                    <span className="text-xs font-mono text-zinc-500">{index.symbol}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-zinc-300">{index.price}</span>
                    <span className={`text-sm font-mono w-16 text-right ${index.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {index.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
              <AlertCircle className="w-4 h-4" /> Market Intelligence Alerts
            </h3>
            <div className="bg-red-950/20 border border-red-900/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-red-400 mb-1">Wheat Futures Spike</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Wheat futures (ZW=F) surged 2.3% in the last hour following reports of disrupted shipping lanes in the Black Sea. This correlates with the recent naval activity detected in the region.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-950/20 border border-blue-900/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-blue-400 mb-1">Energy Sector Volatility</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Crude Oil WTI showing increased volatility. Correlates strongly with the elevated threat level (DEFCON 3) and increased military flights in the Middle East.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
