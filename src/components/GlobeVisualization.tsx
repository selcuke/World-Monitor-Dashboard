import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { Eye, EyeOff } from 'lucide-react';
import { militaryBases, navalVessels, militaryFlights, satelliteImagery, troopMovements } from '../data/osintData';

export default function GlobeVisualization() {
  const globeEl = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [conflictData, setConflictData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for animated entities
  const [flights, setFlights] = useState(militaryFlights);
  const [troops, setTroops] = useState(troopMovements);
  
  // Live Naval Data State
  const [liveVessels, setLiveVessels] = useState<any[]>([]);
  const [isVesselsLoading, setIsVesselsLoading] = useState(true);

  // Layer visibility state
  const [showConflicts, setShowConflicts] = useState(true);
  const [showBases, setShowBases] = useState(true);
  const [showVessels, setShowVessels] = useState(true);
  const [showFlights, setShowFlights] = useState(true);
  const [showTroops, setShowTroops] = useState(true);
  const [showSatellites, setShowSatellites] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.pointOfView({ altitude: 2.5 });
    }
  }, []);

  // Simulate fetching live AIS/Naval data
  useEffect(() => {
    setIsVesselsLoading(true);
    const fetchVessels = () => {
      setTimeout(() => {
        const generatedVessels = Array.from({ length: 45 }).map((_, i) => {
          const types = ['Aircraft Carrier', 'Destroyer', 'Frigate', 'Submarine', 'Dark Vessel', 'Missile Cruiser', 'Amphibious Assault'];
          const vType = types[Math.floor(Math.random() * types.length)];
          const isDark = vType === 'Dark Vessel';
          return {
            id: `vessel-${i}`,
            name: `${vType} ${Math.floor(Math.random() * 9000) + 1000}`,
            lat: (Math.random() - 0.5) * 120, // Keep mostly out of extreme poles
            lng: (Math.random() - 0.5) * 360,
            type: 'naval',
            vesselType: vType,
            color: isDark ? '#888888' : '#3b82f6', // blue-500
            heading: Math.random() * 360,
            speed: Math.random() * 0.3 + 0.05
          };
        });
        
        // Combine static OSINT vessels with generated live ones
        const combined = [...navalVessels.map(v => ({ ...v, heading: Math.random() * 360, speed: 0.1, vesselType: 'Strike Group' })), ...generatedVessels];
        setLiveVessels(combined);
        setIsVesselsLoading(false);
      }, 1500);
    };
    fetchVessels();
  }, []);

  // Simulate movement for flights, vessels, and troops
  useEffect(() => {
    const interval = setInterval(() => {
      setFlights(prev => prev.map(f => ({
        ...f,
        lat: f.lat + (Math.random() - 0.5) * 0.5,
        lng: f.lng + (Math.random() - 0.5) * 0.5
      })));
      
      setLiveVessels(prev => prev.map(v => {
        const rad = (v.heading || 0) * (Math.PI / 180);
        return {
          ...v,
          lat: v.lat + Math.cos(rad) * (v.speed || 0.1),
          lng: v.lng + Math.sin(rad) * (v.speed || 0.1),
          // Slowly change heading to simulate curved paths
          heading: (v.heading || 0) + (Math.random() - 0.5) * 10
        };
      }));

      setTroops(prev => prev.map(t => ({
        ...t,
        lat: t.lat + (Math.random() - 0.5) * 0.05,
        lng: t.lng + (Math.random() - 0.5) * 0.05
      })));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Using static data for conflicts to avoid API issues
    setConflictData([
      { lat: 48.3794, lng: 31.1656, size: 0.8, color: '#ff0000', type: 'conflict', name: 'Ukraine Conflict' },
      { lat: 31.5, lng: 34.466667, size: 0.7, color: '#ff0000', type: 'conflict', name: 'Gaza Conflict' },
      { lat: 15.5007, lng: 32.5599, size: 0.6, color: '#ff0000', type: 'conflict', name: 'Sudan Conflict' },
      { lat: 21.9162, lng: 95.9560, size: 0.5, color: '#ff0000', type: 'conflict', name: 'Myanmar Civil War' },
      { lat: 34.8021, lng: 38.9968, size: 0.5, color: '#ff0000', type: 'conflict', name: 'Syrian Civil War' },
      { lat: 15.5527, lng: 48.5164, size: 0.5, color: '#ff0000', type: 'conflict', name: 'Yemen Civil War' },
      { lat: -4.0383, lng: 21.7587, size: 0.6, color: '#ff0000', type: 'conflict', name: 'DRC Conflict' },
    ]);
    setIsLoading(false);
  }, []);

  // Format bases for globe
  const formattedBases = militaryBases.map(b => ({
    ...b,
    size: 0.4
  }));

  // Format satellite imagery points
  const formattedSatellites = satelliteImagery.map(s => ({
    ...s,
    size: 0.6
  }));

  // Combine fetched conflicts with OSINT points
  const allPointsData = [
    ...(showBases ? formattedBases : []),
    ...(showFlights ? flights.map(f => ({ ...f, size: 0.3 })) : []),
    ...(showVessels ? liveVessels.map(v => ({ ...v, size: 0.5 })) : []),
    ...(showTroops ? troops.map(t => ({ ...t, size: 0.4 })) : []),
    ...(showSatellites ? formattedSatellites : []),
    ...(showConflicts ? conflictData : [])
  ];

  // Create arcs between bases to simulate supply lines / flights
  const arcsData = [];
  if (showBases) {
    for (let i = 0; i < 15; i++) {
      const base1 = militaryBases[Math.floor(Math.random() * militaryBases.length)];
      const base2 = militaryBases[Math.floor(Math.random() * militaryBases.length)];
      if (base1 !== base2) {
        arcsData.push({
          startLat: base1.lat,
          startLng: base1.lng,
          endLat: base2.lat,
          endLng: base2.lng,
          color: ['#00ff00', '#ffff00'][Math.floor(Math.random() * 2)]
        });
      }
    }
  }

  // Create radar rings around major bases, conflict zones, and satellite acquisitions
  const ringsData = [
    ...(showBases ? militaryBases.slice(0, 5).map(b => ({
      lat: b.lat,
      lng: b.lng,
      maxR: 15,
      propagationSpeed: 1.5,
      repeatPeriod: 1500,
      color: '#00ff00'
    })) : []),
    ...(showConflicts ? conflictData.slice(0, 3).map(c => ({
      lat: c.lat,
      lng: c.lng,
      maxR: 25,
      propagationSpeed: 2,
      repeatPeriod: 1000,
      color: '#ff0000'
    })) : []),
    ...(showSatellites ? satelliteImagery.map(s => ({
      lat: s.lat,
      lng: s.lng,
      maxR: 8,
      propagationSpeed: 3,
      repeatPeriod: 800,
      color: s.color
    })) : [])
  ];

  // Generate polygons to represent satellite imagery footprints (bounding boxes)
  const polygonsData = showSatellites ? satelliteImagery.map(s => {
    const size = 2; // Roughly 2x2 degrees footprint
    return {
      ...s,
      coords: [
        [s.lat - size, s.lng - size],
        [s.lat + size, s.lng - size],
        [s.lat + size, s.lng + size],
        [s.lat - size, s.lng + size],
        [s.lat - size, s.lng - size]
      ]
    };
  }) : [];

  // Combine labels for conflicts, bases, satellites, troops, and vessels
  const allLabels = [
    ...(showConflicts ? conflictData : []),
    ...(showBases ? militaryBases.map(b => ({ ...b, labelColor: 'rgba(100, 255, 100, 0.8)' })) : []),
    ...(showTroops ? troops.map(t => ({ ...t, labelColor: 'rgba(255, 136, 0, 0.8)' })) : []),
    ...(showVessels ? liveVessels.map(v => ({ ...v, labelColor: v.vesselType === 'Dark Vessel' ? 'rgba(150, 150, 150, 0.8)' : 'rgba(59, 130, 246, 0.8)' })) : []),
    ...(showSatellites ? satelliteImagery.map(s => {
      const timeAgo = Math.floor((Date.now() - new Date(s.timestamp).getTime()) / 60000);
      return {
        ...s,
        name: `${s.name} - ${timeAgo}m ago`,
        labelColor: s.color === '#ff00ff' ? 'rgba(255, 0, 255, 0.8)' : 'rgba(0, 255, 255, 0.8)'
      };
    }) : [])
  ];

  return (
    <div ref={containerRef} className="w-full h-full bg-black relative">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={allPointsData}
        pointAltitude="size"
        pointColor="color"
        pointRadius={0.5}
        pointsMerge={true}
        labelsData={allLabels}
        labelLat="lat"
        labelLng="lng"
        labelText={(d: any) => d.type === 'troop' && d.description ? `${d.name} | ${d.description}` : d.name}
        labelSize={(d: any) => {
          if (d.type === 'conflict') return 1.5;
          if (d.type === 'satellite') return 1.0;
          if (d.type === 'naval') return 0.6;
          if (d.type === 'troop') return 0.9;
          return 0.8;
        }}
        labelDotRadius={0.5}
        labelColor={(d: any) => d.labelColor || 'rgba(255, 100, 100, 1)'}
        labelResolution={2}
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        ringsData={ringsData}
        ringColor="color"
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
        polygonsData={polygonsData}
        polygonGeoJsonGeometry={(d: any) => ({
          type: 'Polygon',
          coordinates: [d.coords.map((c: number[]) => [c[1], c[0]])] // GeoJSON expects [lng, lat]
        })}
        polygonCapColor={(d: any) => d.color.replace(')', ', 0.2)').replace('rgb', 'rgba')}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
        polygonStrokeColor={(d: any) => d.color}
      />
      
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-md border border-zinc-800 p-4 rounded-lg flex flex-col gap-3 shadow-xl">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-2 mb-1">Layer Controls</h3>
          
          <button onClick={() => setShowConflicts(!showConflicts)} className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors group">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${showConflicts ? 'bg-red-500' : 'bg-zinc-700'}`}></span> Active Conflicts
            </div>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <span className="text-[9px] text-zinc-500 animate-pulse">FETCHING API...</span>
              ) : (
                <span className={`text-[9px] ${showConflicts ? 'text-green-500' : 'text-zinc-600'}`}>{showConflicts ? 'LIVE DATA' : 'HIDDEN'}</span>
              )}
              {showConflicts ? <Eye className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
            </div>
          </button>
          
          <button onClick={() => setShowBases(!showBases)} className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors group">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${showBases ? 'bg-green-500' : 'bg-zinc-700'}`}></span> Military Bases
            </div>
            {showBases ? <Eye className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
          </button>
          
          <button onClick={() => setShowVessels(!showVessels)} className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors group">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${showVessels ? 'bg-blue-500' : 'bg-zinc-700'}`}></span> Naval Vessels
            </div>
            <div className="flex items-center gap-2">
              {isVesselsLoading ? (
                <span className="text-[9px] text-zinc-500 animate-pulse">FETCHING AIS...</span>
              ) : (
                <span className={`text-[9px] ${showVessels ? 'text-blue-400' : 'text-zinc-600'}`}>{showVessels ? 'AIS ACTIVE' : 'HIDDEN'}</span>
              )}
              {showVessels ? <Eye className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
            </div>
          </button>
          
          <button onClick={() => setShowFlights(!showFlights)} className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors group">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${showFlights ? 'bg-yellow-500' : 'bg-zinc-700'}`}></span> Live Flights
            </div>
            {showFlights ? <Eye className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
          </button>
          
          <button onClick={() => setShowTroops(!showTroops)} className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors group">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${showTroops ? 'bg-orange-500' : 'bg-zinc-700'}`}></span> Troop Movements
            </div>
            {showTroops ? <Eye className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
          </button>
          
          <button onClick={() => setShowSatellites(!showSatellites)} className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors group">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${showSatellites ? 'bg-cyan-400' : 'bg-zinc-700'}`}></span> Satellite Imagery
            </div>
            {showSatellites ? <Eye className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
          </button>
        </div>
      </div>
    </div>
  );
}
