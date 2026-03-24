import { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import TaskCard from "../components/TaskCard";
import { Search, Trophy } from "lucide-react";

//PLANT TYPE RESOLVER 
const EMOJI_MAP = {
  "🌱": "seedling", "🌿": "herb", "🍀": "herb", "🪴": "potted_plant",
  "🌸": "cherry_blossom", "🌺": "hibiscus", "🌻": "sunflower",
  "🌹": "rose", "🥀": "rose", "🌷": "tulip", "🌼": "daisy", "🌾": "rice_plant",
};
const TEXT_PATTERNS = [
  ["cherry","cherry_blossom"],["blossom","cherry_blossom"],["hibiscus","hibiscus"],
  ["sunflower","sunflower"],["rose","rose"],["tulip","tulip"],["daisy","daisy"],
  ["potted","potted_plant"],["rice","rice_plant"],["herb","herb"],
  ["seedling","seedling"],["sprout","seedling"],
];
function getPlantKey(plantType) {
  if (!plantType) return "daisy";
  const raw = String(plantType).trim();
  if (EMOJI_MAP[raw]) return EMOJI_MAP[raw];
  for (const [emoji, key] of Object.entries(EMOJI_MAP)) if (raw.includes(emoji)) return key;
  const lower = raw.toLowerCase().replace(/[_-]/g, " ");
  for (const [pattern, key] of TEXT_PATTERNS) if (lower.includes(pattern)) return key;
  return "daisy";
}

function swayStyle(seed, speed = 3.2) {
  const hash =
    typeof seed === "string"
      ? seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
      : Number(seed);

  return {
    animationDelay: `${((hash * 0.41) % speed).toFixed(2)}s`,
    transformOrigin: "50% 100%",
  };
}

function band(p, lo, hi) { return Math.min(1, Math.max(0, (p - lo) / (hi - lo))); }

const CX = 40; 
const BASE_Y = 138; 
const STEM_TOP = 48; 

//DAISY 
function GrowingDaisy({ progress, seed }) {
  const sway = swayStyle(seed, 3.0);
  const stemT    = band(progress, 0.15, 0.40);
  const leaf1T   = band(progress, 0.35, 0.55);
  const leaf2T   = band(progress, 0.50, 0.65);
  const budT     = band(progress, 0.60, 0.75);
  const petalT   = band(progress, 0.72, 1.00);
  const centerT  = band(progress, 0.80, 1.00);

  const stemH = stemT * (BASE_Y - STEM_TOP);
  const stemY = BASE_Y - stemH;

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      {/* soil mound */}
      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {/* stem */}
      {stemT > 0 && (
        <line x1={CX} y1={BASE_Y} x2={CX} y2={stemY}
          stroke="#4a7c3f" strokeWidth="2.6" strokeLinecap="round"/>
      )}
      {/* leaf 1 */}
      <path d={`M${CX} ${BASE_Y - stemH * 0.55} C${CX-18} ${BASE_Y - stemH*0.65} ${CX-22} ${BASE_Y-stemH*0.8} ${CX-8} ${BASE_Y-stemH*0.85} C${CX-4} ${BASE_Y-stemH*0.72} ${CX} ${BASE_Y-stemH*0.6} ${CX} ${BASE_Y-stemH*0.55}Z`}
        fill="#5a9e4a" opacity={leaf1T * 0.9}
        transform={`scale(1 ${leaf1T}) translate(0 ${(1-leaf1T)*10})`}
        style={{ transformOrigin: `${CX}px ${BASE_Y - stemH*0.55}px` }}
      />
      {/* leaf 2 */}
      <path d={`M${CX} ${BASE_Y - stemH * 0.72} C${CX+18} ${BASE_Y-stemH*0.8} ${CX+22} ${BASE_Y-stemH*0.9} ${CX+8} ${BASE_Y-stemH*0.95} C${CX+4} ${BASE_Y-stemH*0.84} ${CX} ${BASE_Y-stemH*0.75} ${CX} ${BASE_Y-stemH*0.72}Z`}
        fill="#6ab554" opacity={leaf2T * 0.85}
        transform={`scale(1 ${leaf2T}) translate(0 ${(1-leaf2T)*8})`}
        style={{ transformOrigin: `${CX}px ${BASE_Y - stemH*0.72}px` }}
      />
      {/* bud (closed) */}
      {budT > 0 && petalT < 1 && (
        <ellipse cx={CX} cy={STEM_TOP + 6} rx={5 + budT*3} ry={8 + budT*4}
          fill="#fdd835" opacity={budT * 0.8}
        />
      )}
      {/* petals */}
     {Array.from({ length: 10 }).map((_, i) => (
  <ellipse
    key={i}
    cx={CX}
    cy={STEM_TOP}
    rx={petalT < 1 ? petalT * 5 : 5}
    ry={petalT < 1 ? petalT * 11 : 11}
    fill="white"
    opacity={petalT * 0.95}
    transform={`rotate(${i * 36} ${CX} ${STEM_TOP}) translate(0 ${-14 * petalT})`}
  />
))}
      {/* center */}
      <circle cx={CX} cy={STEM_TOP} r={centerT * 8} fill="#fdd835" opacity={centerT}/>
      <circle cx={CX} cy={STEM_TOP} r={centerT * 5.5} fill="#f9a825" opacity={centerT}/>
    </svg>
  );
}

//TULIP 
function GrowingTulip({ progress, seed }) {
  const sway = swayStyle(seed, 2.9);
  const stemT  = band(progress, 0.15, 0.40);
  const leaf1T = band(progress, 0.35, 0.55);
  const leaf2T = band(progress, 0.50, 0.65);
  const budT   = band(progress, 0.60, 0.78);
  const openT  = band(progress, 0.75, 1.00);

  const stemH = stemT * (BASE_Y - STEM_TOP);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {stemT > 0 && <line x1={CX} y1={BASE_Y} x2={CX} y2={BASE_Y - stemH} stroke="#4a7c3f" strokeWidth="2.6" strokeLinecap="round"/>}
      <path d={`M${CX} ${BASE_Y-stemH*0.5} C${CX-20} ${BASE_Y-stemH*0.62} ${CX-24} ${BASE_Y-stemH*0.78} ${CX-6} ${BASE_Y-stemH*0.82}Z`}
        fill="#5a9e4a" opacity={leaf1T*0.9}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.68} C${CX+20} ${BASE_Y-stemH*0.78} ${CX+24} ${BASE_Y-stemH*0.92} ${CX+6} ${BASE_Y-stemH*0.96}Z`}
        fill="#6ab554" opacity={leaf2T*0.85}/>
      {/* closed cup */}
      {budT > 0 && (
        <>
          <path d={`M${CX} ${STEM_TOP+2} C${CX-8-budT*4} ${STEM_TOP+10} ${CX-8-budT*4} ${STEM_TOP+24+budT*6} ${CX} ${STEM_TOP+28+budT*6} C${CX+8+budT*4} ${STEM_TOP+24+budT*6} ${CX+8+budT*4} ${STEM_TOP+10} ${CX} ${STEM_TOP+2}Z`}
            fill="#ce93d8" opacity={budT*0.9}/>
          <path d={`M${CX} ${STEM_TOP+2} C${CX-6-budT*3} ${STEM_TOP+14} ${CX-4} ${STEM_TOP+26+budT*6} ${CX} ${STEM_TOP+28+budT*6}Z`}
            fill="#e1bee7" opacity={budT*0.5}/>
        </>
      )}
      {/* opening — outer petals flare */}
      {openT > 0 && (
        <>
          <path d={`M${CX} ${STEM_TOP+4} C${CX-(12+openT*10)} ${STEM_TOP+12} ${CX-(14+openT*12)} ${STEM_TOP+30} ${CX} ${STEM_TOP+34} C${CX+(14+openT*12)} ${STEM_TOP+30} ${CX+(12+openT*10)} ${STEM_TOP+12} ${CX} ${STEM_TOP+4}Z`}
            fill="#ce93d8" opacity={0.85}/>
          <path d={`M${CX} ${STEM_TOP+4} C${CX-8} ${STEM_TOP+14} ${CX-4} ${STEM_TOP+30} ${CX} ${STEM_TOP+34}Z`}
            fill="#e1bee7" opacity={0.5}/>
          <path d={`M${CX} ${STEM_TOP+4} C${CX+8} ${STEM_TOP+14} ${CX+4} ${STEM_TOP+30} ${CX} ${STEM_TOP+34}Z`}
            fill="#ab47bc" opacity={0.45}/>
          <ellipse cx={CX} cy={STEM_TOP+20} rx={4*openT} ry={8*openT} fill="#f3e5f5" opacity={0.3}/>
        </>
      )}
    </svg>
  );
}

//CHERRY BLOSSOM 
function GrowingCherryBlossom({ progress, seed }) {
  const sway = swayStyle(seed, 3.5);
  const stemT   = band(progress, 0.15, 0.40);
  const leaf1T  = band(progress, 0.35, 0.55);
  const leaf2T  = band(progress, 0.50, 0.65);
  const budT    = band(progress, 0.60, 0.76);
  const petalT  = band(progress, 0.73, 1.00);
  const centerT = band(progress, 0.85, 1.00);
  const stemH   = stemT * (BASE_Y - STEM_TOP);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {stemT > 0 && <line x1={CX} y1={BASE_Y} x2={CX} y2={BASE_Y-stemH} stroke="#4a7c3f" strokeWidth="2.6" strokeLinecap="round"/>}
      <path d={`M${CX} ${BASE_Y-stemH*0.52} C${CX-20} ${BASE_Y-stemH*0.64} ${CX-24} ${BASE_Y-stemH*0.78} ${CX-6} ${BASE_Y-stemH*0.82}Z`}
        fill="#5a9e4a" opacity={leaf1T*0.9}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.7} C${CX+20} ${BASE_Y-stemH*0.8} ${CX+24} ${BASE_Y-stemH*0.93} ${CX+6} ${BASE_Y-stemH*0.96}Z`}
        fill="#6ab554" opacity={leaf2T*0.85}/>
      {budT > 0 && petalT < 0.1 && (
        <ellipse cx={CX} cy={STEM_TOP+4} rx={4+budT*3} ry={6+budT*5} fill="#f48fb1" opacity={budT*0.8}/>
      )}
      {Array.from({length:5}).map((_,i)=>{
        const a = (i*72 - 90) * Math.PI/180;
        const dist = 6 + petalT*14;
        const px = CX + dist*Math.cos(a);
        const py = STEM_TOP + dist*Math.sin(a);
        const rot = (i*72-90);
        return (
          <ellipse key={i} cx={px} cy={py}
            rx={petalT*7} ry={petalT*9}
            fill={i%2===0?"#f48fb1":"#f06292"} opacity={petalT*0.9}
            transform={`rotate(${rot+90} ${px} ${py})`}
          />
        );
      })}
      <circle cx={CX} cy={STEM_TOP} r={centerT*6} fill="#fce4ec" opacity={centerT}/>
      <circle cx={CX} cy={STEM_TOP} r={centerT*3.5} fill="#f48fb1" opacity={centerT}/>
      {centerT > 0.5 && [0,60,120,180,240,300].map((a,i)=>(
        <line key={i} x1={CX} y1={STEM_TOP}
          x2={CX+6*Math.cos(a*Math.PI/180)} y2={STEM_TOP+6*Math.sin(a*Math.PI/180)}
          stroke="#e91e8c" strokeWidth="0.8" opacity={centerT*0.6}/>
      ))}
    </svg>
  );
}

//SUNFLOWER 
function GrowingSunflower({ progress, seed }) {
  const sway = swayStyle(seed, 4.0);
  const stemT   = band(progress, 0.15, 0.40);
  const leaf1T  = band(progress, 0.30, 0.52);
  const leaf2T  = band(progress, 0.48, 0.65);
  const budT    = band(progress, 0.62, 0.78);
  const petalT  = band(progress, 0.75, 1.00);
  const centerT = band(progress, 0.82, 1.00);
  const stemH   = stemT * (BASE_Y - STEM_TOP - 10);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {stemT > 0 && <line x1={CX} y1={BASE_Y} x2={CX} y2={BASE_Y-stemH} stroke="#3d6e32" strokeWidth="3" strokeLinecap="round"/>}
      <path d={`M${CX} ${BASE_Y-stemH*0.48} C${CX-22} ${BASE_Y-stemH*0.6} ${CX-26} ${BASE_Y-stemH*0.76} ${CX-7} ${BASE_Y-stemH*0.8}Z`}
        fill="#4a8040" opacity={leaf1T*0.9}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.66} C${CX+22} ${BASE_Y-stemH*0.76} ${CX+26} ${BASE_Y-stemH*0.9} ${CX+7} ${BASE_Y-stemH*0.94}Z`}
        fill="#5a9e4a" opacity={leaf2T*0.85}/>
      {budT > 0 && petalT < 0.1 && (
        <ellipse cx={CX} cy={STEM_TOP+4} rx={5+budT*4} ry={7+budT*6} fill="#fdd835" opacity={budT*0.75}/>
      )}
      {Array.from({ length: 14 }).map((_, i) => (
  <ellipse
    key={i}
    cx={CX} 
    cy={STEM_TOP}
    rx={petalT < 1 ? petalT * 5.5 : 5.5}
    ry={petalT < 1 ? petalT * 14 : 14}
    fill={i % 2 === 0 ? "#fdd835" : "#f9a825"}
    opacity={petalT * 0.92}
    transform={`rotate(${i * 360 / 14} ${CX} ${STEM_TOP}) translate(0 ${-16 * petalT})`}
  />
))}
      <circle cx={CX} cy={STEM_TOP} r={centerT*12} fill="#3e2005" opacity={centerT}/>
      <circle cx={CX} cy={STEM_TOP} r={centerT*9} fill="#4e2c07" opacity={centerT}/>
      {centerT > 0.4 && [0,40,80,120,160,200,240,280,320].map((a,i)=>(
        <circle key={i}
          cx={CX+5*Math.cos(a*Math.PI/180)} cy={STEM_TOP+5*Math.sin(a*Math.PI/180)}
          r="1.2" fill="#1a0d00" opacity={centerT*0.8}/>
      ))}
    </svg>
  );
}

//HIBISCUS 
function GrowingHibiscus({ progress, seed }) {
  const sway = swayStyle(seed, 3.1);
  const stemT   = band(progress, 0.15, 0.40);
  const leaf1T  = band(progress, 0.35, 0.55);
  const leaf2T  = band(progress, 0.50, 0.65);
  const budT    = band(progress, 0.60, 0.76);
  const petalT  = band(progress, 0.73, 1.00);
  const stamenT = band(progress, 0.86, 1.00);
  const stemH   = stemT * (BASE_Y - STEM_TOP);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {stemT > 0 && <line x1={CX} y1={BASE_Y} x2={CX} y2={BASE_Y-stemH} stroke="#4a7c3f" strokeWidth="2.6" strokeLinecap="round"/>}
      <path d={`M${CX} ${BASE_Y-stemH*0.52} C${CX-20} ${BASE_Y-stemH*0.64} ${CX-24} ${BASE_Y-stemH*0.78} ${CX-6} ${BASE_Y-stemH*0.82}Z`}
        fill="#5a9e4a" opacity={leaf1T*0.9}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.7} C${CX+20} ${BASE_Y-stemH*0.8} ${CX+24} ${BASE_Y-stemH*0.93} ${CX+6} ${BASE_Y-stemH*0.96}Z`}
        fill="#6ab554" opacity={leaf2T*0.85}/>
      {budT > 0 && petalT < 0.1 && (
        <ellipse cx={CX} cy={STEM_TOP+5} rx={5+budT*3} ry={7+budT*5} fill="#e91e8c" opacity={budT*0.75}/>
      )}
      {Array.from({length:5}).map((_,i)=>{
        const a = (i*72-90)*Math.PI/180;
        const dist = 6+petalT*14;
        const px = CX+dist*Math.cos(a);
        const py = STEM_TOP+dist*Math.sin(a);
        const rot = i*72-90;
        return (
          <ellipse key={i} cx={px} cy={py}
            rx={petalT*10} ry={petalT*13}
            fill={i%2===0?"#c2185b":"#e91e8c"} opacity={petalT*0.88}
            transform={`rotate(${rot+90} ${px} ${py})`}
          />
        );
      })}
      {stamenT > 0 && (
        <>
          <line x1={CX} y1={STEM_TOP} x2={CX} y2={STEM_TOP-10-stamenT*4} stroke="#fbc02d" strokeWidth="2.5" strokeLinecap="round"/>
          {[0,45,90,135,180,225,270,315].map((a,i)=>(
            <circle key={i}
              cx={CX+3*Math.cos(a*Math.PI/180)} cy={STEM_TOP-10-stamenT*4+3*Math.sin(a*Math.PI/180)}
              r="1.5" fill="#f9a825" opacity={stamenT}/>
          ))}
        </>
      )}
      <circle cx={CX} cy={STEM_TOP} r={petalT*5} fill="#880e4f" opacity={petalT*0.6}/>
    </svg>
  );
}

//ROSE 
function GrowingRose({ progress, seed }) {
  const sway = swayStyle(seed, 3.3);
  const stemT   = band(progress, 0.15, 0.40);
  const leaf1T  = band(progress, 0.35, 0.55);
  const leaf2T  = band(progress, 0.50, 0.65);
  const budT    = band(progress, 0.62, 0.78);
  const petal1T = band(progress, 0.72, 0.88);
  const petal2T = band(progress, 0.84, 1.00);
  const stemH   = stemT * (BASE_Y - STEM_TOP);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {stemT > 0 && <line x1={CX} y1={BASE_Y} x2={CX} y2={BASE_Y-stemH} stroke="#4a7c3f" strokeWidth="2.6" strokeLinecap="round"/>}
      {/* thorns */}
      {leaf1T > 0.5 && <path d={`M${CX} ${BASE_Y-stemH*0.62} L${CX-8} ${BASE_Y-stemH*0.56} L${CX} ${BASE_Y-stemH*0.6}Z`} fill="#3d6e32"/>}
      {leaf2T > 0.5 && <path d={`M${CX} ${BASE_Y-stemH*0.78} L${CX+8} ${BASE_Y-stemH*0.72} L${CX} ${BASE_Y-stemH*0.76}Z`} fill="#3d6e32"/>}
      <path d={`M${CX} ${BASE_Y-stemH*0.52} C${CX-20} ${BASE_Y-stemH*0.64} ${CX-24} ${BASE_Y-stemH*0.78} ${CX-6} ${BASE_Y-stemH*0.82}Z`}
        fill="#5a9e4a" opacity={leaf1T*0.9}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.7} C${CX+20} ${BASE_Y-stemH*0.8} ${CX+24} ${BASE_Y-stemH*0.93} ${CX+6} ${BASE_Y-stemH*0.96}Z`}
        fill="#6ab554" opacity={leaf2T*0.85}/>
      {/* sepal */}
      {budT > 0 && (
        <path d={`M${CX-6} ${STEM_TOP+14} C${CX-10} ${STEM_TOP+6} ${CX-4} ${STEM_TOP} ${CX} ${STEM_TOP} C${CX+4} ${STEM_TOP} ${CX+10} ${STEM_TOP+6} ${CX+6} ${STEM_TOP+14} C${CX+4} ${STEM_TOP+8} ${CX} ${STEM_TOP+6} ${CX-6} ${STEM_TOP+14}Z`}
          fill="#4a8040" opacity={budT}/>
      )}
      {/* tight bud */}
      {budT > 0 && petal1T < 0.3 && (
        <ellipse cx={CX} cy={STEM_TOP+4} rx={4+budT*3} ry={6+budT*5} fill="#e53935" opacity={budT*0.9}/>
      )}
      {/* outer petals */}
      {petal1T > 0 && (
        <>
          <path d={`M${CX} ${STEM_TOP+8} C${CX-(8+petal1T*12)} ${STEM_TOP+2} ${CX-(10+petal1T*14)} ${STEM_TOP-14} ${CX-(3+petal1T*4)} ${STEM_TOP-20} C${CX} ${STEM_TOP-10} ${CX} ${STEM_TOP} ${CX} ${STEM_TOP+8}Z`}
            fill="#e53935" opacity={0.85}/>
          <path d={`M${CX} ${STEM_TOP+8} C${CX+(8+petal1T*12)} ${STEM_TOP+2} ${CX+(10+petal1T*14)} ${STEM_TOP-14} ${CX+(3+petal1T*4)} ${STEM_TOP-20} C${CX} ${STEM_TOP-10} ${CX} ${STEM_TOP} ${CX} ${STEM_TOP+8}Z`}
            fill="#b71c1c" opacity={0.85}/>
          <path d={`M${CX} ${STEM_TOP+8} C${CX-4} ${STEM_TOP-4} ${CX-4} ${STEM_TOP-18} ${CX} ${STEM_TOP-22} C${CX+4} ${STEM_TOP-18} ${CX+4} ${STEM_TOP-4} ${CX} ${STEM_TOP+8}Z`}
            fill="#ef5350" opacity={0.75}/>
        </>
      )}
      {/* inner petals */}
      {petal2T > 0 && (
        <>
          <path d={`M${CX} ${STEM_TOP+4} C${CX-(6+petal2T*6)} ${STEM_TOP} ${CX-(8+petal2T*8)} ${STEM_TOP-12} ${CX-2} ${STEM_TOP-16} C${CX} ${STEM_TOP-10} ${CX} ${STEM_TOP-2} ${CX} ${STEM_TOP+4}Z`}
            fill="#ff8a80" opacity={0.7}/>
          <path d={`M${CX} ${STEM_TOP+4} C${CX+(6+petal2T*6)} ${STEM_TOP} ${CX+(8+petal2T*8)} ${STEM_TOP-12} ${CX+2} ${STEM_TOP-16} C${CX} ${STEM_TOP-10} ${CX} ${STEM_TOP-2} ${CX} ${STEM_TOP+4}Z`}
            fill="#d32f2f" opacity={0.7}/>
          <ellipse cx={CX} cy={STEM_TOP-8} rx={4+petal2T*2} ry={5+petal2T*3} fill="#e53935" opacity={0.85}/>
          <ellipse cx={CX} cy={STEM_TOP-9} rx={2+petal2T*2} ry={3+petal2T*2} fill="#ff8a80" opacity={0.45}/>
        </>
      )}
    </svg>
  );
}

//SEEDLING 
function GrowingSeedling({ progress, seed }) {
  const sway = swayStyle(seed, 2.8);
  const stemT  = band(progress, 0.15, 0.50);
  const leaf1T = band(progress, 0.40, 0.70);
  const leaf2T = band(progress, 0.62, 0.85);
  const tipT   = band(progress, 0.80, 1.00);
  const stemH  = stemT * (BASE_Y - STEM_TOP - 10);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {stemT > 0 && <line x1={CX} y1={BASE_Y} x2={CX} y2={BASE_Y-stemH} stroke="#5a9e4a" strokeWidth="2.4" strokeLinecap="round"/>}
      <path d={`M${CX} ${BASE_Y-stemH*0.6} C${CX-16} ${BASE_Y-stemH*0.72} ${CX-20} ${BASE_Y-stemH*0.9} ${CX-4} ${BASE_Y-stemH*0.95}Z`}
        fill="#78c850" opacity={leaf1T*0.92}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.6} C${CX+16} ${BASE_Y-stemH*0.72} ${CX+20} ${BASE_Y-stemH*0.9} ${CX+4} ${BASE_Y-stemH*0.95}Z`}
        fill="#5aaa38" opacity={leaf2T*0.88}/>
      <circle cx={CX} cy={BASE_Y-stemH} r={tipT*4} fill="#a0e060" opacity={tipT}/>
    </svg>
  );
}

//HERB 
function GrowingHerb({ progress, seed }) {
  const sway = swayStyle(seed, 2.8);
  const stemT  = band(progress, 0.15, 0.40);
  const b1T    = band(progress, 0.30, 0.52);
  const b2T    = band(progress, 0.47, 0.65);
  const b3T    = band(progress, 0.60, 0.78);
  const b4T    = band(progress, 0.74, 0.90);
  const b5T    = band(progress, 0.86, 1.00);
  const stemH  = stemT * (BASE_Y - STEM_TOP);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {stemT > 0 && <line x1={CX} y1={BASE_Y} x2={CX} y2={BASE_Y-stemH} stroke="#4a8c3a" strokeWidth="2.4" strokeLinecap="round"/>}
      <path d={`M${CX} ${BASE_Y-stemH*0.45} C${CX-18} ${BASE_Y-stemH*0.58} ${CX-22} ${BASE_Y-stemH*0.74} ${CX-5} ${BASE_Y-stemH*0.78}Z`}
        fill="#6abf4a" opacity={b1T*0.9}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.6} C${CX+18} ${BASE_Y-stemH*0.72} ${CX+22} ${BASE_Y-stemH*0.86} ${CX+5} ${BASE_Y-stemH*0.9}Z`}
        fill="#82d45c" opacity={b2T*0.85}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.72} C${CX-18} ${BASE_Y-stemH*0.82} ${CX-20} ${BASE_Y-stemH*0.94} ${CX-4} ${BASE_Y-stemH*0.97}Z`}
        fill="#6abf4a" opacity={b3T*0.85}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.8} C${CX+16} ${BASE_Y-stemH*0.88} ${CX+20} ${BASE_Y-stemH*0.98} ${CX+4} ${BASE_Y-stemH*1.0}Z`}
        fill="#4da838" opacity={b4T*0.8}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.88} C${CX-10} ${BASE_Y-stemH*0.95} ${CX-8} ${STEM_TOP-4} ${CX} ${STEM_TOP-8} C${CX+8} ${STEM_TOP-4} ${CX+10} ${BASE_Y-stemH*0.95} ${CX} ${BASE_Y-stemH*0.88}Z`}
        fill="#5ec840" opacity={b5T*0.8}/>
    </svg>
  );
}

//POTTED PLANT 
function GrowingPottedPlant({ progress, seed }) {
  const sway = swayStyle(seed, 2.6);
  const potT   = band(progress, 0.05, 0.20);
  const stemT  = band(progress, 0.18, 0.42);
  const leaf1T = band(progress, 0.38, 0.58);
  const leaf2T = band(progress, 0.54, 0.72);
  const leaf3T = band(progress, 0.68, 0.84);
  const leaf4T = band(progress, 0.80, 1.00);
  const potY   = BASE_Y - 18;
  const stemH  = stemT * (potY - STEM_TOP - 10);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      {/* pot */}
      {potT > 0 && (
        <>
          <path d={`M${CX-16} ${potY} L${CX-14} ${BASE_Y} L${CX+14} ${BASE_Y} L${CX+16} ${potY}Z`}
            fill="#bf5722" opacity={potT}/>
          <rect x={CX-18} y={potY-5} width="36" height="8" rx="2" fill="#d84315" opacity={potT}/>
          <ellipse cx={CX} cy={potY-1} rx="14" ry="4" fill="#5d4037" opacity={potT*0.85}/>
        </>
      )}
      {stemT > 0 && <line x1={CX} y1={potY-1} x2={CX} y2={potY-1-stemH} stroke="#388e3c" strokeWidth="2.4" strokeLinecap="round"/>}
      <path d={`M${CX} ${potY-1-stemH*0.45} C${CX-20} ${potY-1-stemH*0.58} ${CX-24} ${potY-1-stemH*0.74} ${CX-6} ${potY-1-stemH*0.78}Z`}
        fill="#66bb6a" opacity={leaf1T*0.9}/>
      <path d={`M${CX} ${potY-1-stemH*0.62} C${CX+20} ${potY-1-stemH*0.74} ${CX+24} ${potY-1-stemH*0.88} ${CX+6} ${potY-1-stemH*0.92}Z`}
        fill="#81c784" opacity={leaf2T*0.85}/>
      <path d={`M${CX} ${potY-1-stemH*0.76} C${CX-18} ${potY-1-stemH*0.86} ${CX-22} ${potY-1-stemH*0.97} ${CX-5} ${potY-1-stemH*0.99}Z`}
        fill="#4caf50" opacity={leaf3T*0.82}/>
      <path d={`M${CX} ${potY-1-stemH*0.86} C${CX+4} ${potY-1-stemH*0.9} ${CX+8} ${STEM_TOP-2} ${CX+4} ${STEM_TOP-8} C${CX} ${STEM_TOP-4} ${CX-2} ${STEM_TOP-2} ${CX} ${potY-1-stemH*0.86}Z`}
        fill="#43a047" opacity={leaf4T*0.9}/>
      <path d={`M${CX} ${potY-1-stemH*0.86} C${CX+10} ${potY-1-stemH*0.9} ${CX+16} ${STEM_TOP-2} ${CX+12} ${STEM_TOP-8} C${CX+6} ${STEM_TOP-4} ${CX+2} ${STEM_TOP-2} ${CX} ${potY-1-stemH*0.86}Z`}
        fill="#66bb6a" opacity={leaf4T*0.75}/>
    </svg>
  );
}

//RICE PLANT 
function GrowingRicePlant({ progress, seed }) {
  const sway = swayStyle(seed, 2.5);
  const stemT   = band(progress, 0.15, 0.42);
  const blade1T = band(progress, 0.35, 0.55);
  const blade2T = band(progress, 0.50, 0.68);
  const blade3T = band(progress, 0.64, 0.80);
  const grainT  = band(progress, 0.76, 1.00);
  const stemH   = stemT * (BASE_Y - STEM_TOP - 8);

  return (
<svg
  width="100%"
  height="100%"
  viewBox="0 0 80 140"
  className="flower-sway"
  style={sway}
>      <ellipse cx={CX} cy={BASE_Y} rx="18" ry="6" fill="#8B5E3C" opacity="0.45"/>
      {stemT > 0 && <line x1={CX} y1={BASE_Y} x2={CX} y2={BASE_Y-stemH} stroke="#8d9e3a" strokeWidth="2.4" strokeLinecap="round"/>}
      <path d={`M${CX} ${BASE_Y-stemH*0.42} C${CX-22} ${BASE_Y-stemH*0.55} ${CX-28} ${BASE_Y-stemH*0.72} ${CX-8} ${BASE_Y-stemH*0.76}Z`}
        fill="#aab840" opacity={blade1T*0.9}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.6} C${CX+22} ${BASE_Y-stemH*0.72} ${CX+28} ${BASE_Y-stemH*0.86} ${CX+8} ${BASE_Y-stemH*0.9}Z`}
        fill="#c5cc50" opacity={blade2T*0.85}/>
      <path d={`M${CX} ${BASE_Y-stemH*0.76} C${CX-22} ${BASE_Y-stemH*0.86} ${CX-26} ${BASE_Y-stemH*0.97} ${CX-7} ${BASE_Y-stemH*0.99}Z`}
        fill="#9aad3c" opacity={blade3T*0.82}/>
      {/* drooping grain head */}
      {grainT > 0 && (
        <>
          <path d={`M${CX} ${STEM_TOP} C${CX+4} ${STEM_TOP+8} ${CX+8} ${STEM_TOP+20+grainT*10} ${CX+10} ${STEM_TOP+28+grainT*10}`}
            stroke="#c8b400" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          {[0,1,2,3,4,5,6].slice(0,Math.ceil(grainT*7)).map((i)=>{
            const y = STEM_TOP + 8 + i*5 + grainT*5;
            const sx = CX + 2 + i*0.5;
            const side = i%2===0 ? 1 : -1;
            return (
              <g key={i}>
                <line x1={sx} y1={y} x2={sx+side*6} y2={y+2} stroke="#c8b400" strokeWidth="1" opacity="0.7"/>
                <ellipse cx={sx+side*7} cy={y+2} rx="3.5" ry="2" fill="#ddc816" opacity={grainT}
                  transform={`rotate(${side*20} ${sx+side*7} ${y+2})`}/>
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
}


export function GrowingFlower({ plantType, progress, seed }) {
    const key = getPlantKey(plantType);
  const props = { progress, seed };
  switch (key) {
    case "cherry_blossom": return <GrowingCherryBlossom {...props}/>;
    case "sunflower":      return <GrowingSunflower {...props}/>;
    case "hibiscus":       return <GrowingHibiscus {...props}/>;
    case "rose":           return <GrowingRose {...props}/>;
    case "tulip":          return <GrowingTulip {...props}/>;
    case "daisy":          return <GrowingDaisy {...props}/>;
    case "potted_plant":   return <GrowingPottedPlant {...props}/>;
    case "rice_plant":     return <GrowingRicePlant {...props}/>;
    case "herb":           return <GrowingHerb {...props}/>;
    case "seedling":       return <GrowingSeedling {...props}/>;
    default:               return <GrowingDaisy {...props}/>;
  }
}

function GrassBlade({ x, h = 20, lean = 0 }) {
  return (
    <path
      d={`M${x} 100 C${x+lean} ${100-h*0.55} ${x+lean*1.6} ${100-h*0.85} ${x+lean*2.2} ${100-h}`}
      stroke="#4a8040" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.65"
    />
  );
}


export default function AllTasks({ preview = false }) {
    const { tasks, completeTask, toggleSubtask } = useApp();

  const completedTasks = tasks.filter(t => t.completed);
  const pendingTasks   = tasks.filter(t => !t.completed);

  const plantsByCategory = completedTasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {});

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const cats = new Set(tasks.map(t => t.category));
    return ["all", ...Array.from(cats)];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === "active")    filtered = filtered.filter(t => !t.completed);
    if (filter === "completed") filtered = filtered.filter(t => t.completed);
    if (selectedCategory !== "all") filtered = filtered.filter(t => t.category === selectedCategory);
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "name")   return a.title.localeCompare(b.title);
      if (sortBy === "growth") return b.growthStage - a.growthStage;
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
    return filtered;
  }, [tasks, filter, selectedCategory, searchQuery, sortBy]);

  const allGardenTasks = tasks;

  return (
    <>
      <style>{`
      ::-webkit-scrollbar {
  display: none;
}
        @keyframes sway {
          0%   { transform: rotate(-2.5deg); }
          50%  { transform: rotate(2.5deg); }
          100% { transform: rotate(-2.5deg); }
        }
        .flower-sway { animation: sway 3.2s ease-in-out infinite; display: block; }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        @keyframes seedPulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.08); }
        }
        @keyframes sproutGrow {
          0%, 100% { opacity: 0.7; transform: scaleY(1); }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold">All Tasks</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and track all your growing tasks
            </p>
          </div>

          {/* SEARCH + FILTER */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                <input type="text" placeholder="Search tasks..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-600 outline-none"
                />
              </div>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <option value="date">Due Date</option>
                <option value="name">Name</option>
                <option value="growth">Growth</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredTasks.length} tasks
          </p>

          {/* TASK GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => completeTask(task.id)}
                toggleSubtask={toggleSubtask}
              />
            ))}
          </div>

          <div className="space-y-6 mt-16">

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Garden</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  A beautiful collection of your growing tasks
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-lg">
                <Trophy className="w-5 h-5 text-emerald-600"/>
                <span className="font-semibold text-emerald-900">
                  {completedTasks.length} Bloomed
                </span>
              </div>
            </div>

            {/* GARDEN SCENE */}
            <div
              className="relative rounded-2xl overflow-hidden border border-emerald-100"
              style={{
                minHeight: 340,
                background: "linear-gradient(to bottom, #b3e5fc 0%, #c8f0d8 52%, #8bc34a 100%)",
              }}
            >
              {/* night overlay */}
              <div className="absolute inset-0 hidden dark:block"
                style={{ background: "linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #14532d 100%)" }}/>

              {/* moon */}
              <div className="hidden dark:block absolute top-5 right-8">
                <div className="w-12 h-12 rounded-full bg-gray-200 relative shadow-lg">
                  <div className="absolute left-3 w-12 h-12 rounded-full bg-gray-900"/>
                </div>
              </div>

              {/* sun */}
              <div className="block dark:hidden absolute top-5 right-8 rounded-full"
                style={{ width:52, height:52,
                  background:"radial-gradient(circle at 38% 38%, #fff176, #fdd835)",
                  boxShadow:"0 0 40px 12px #fdd83555" }}/>

              {/* stars */}
              <div className="hidden dark:block absolute inset-0 pointer-events-none">
                {Array.from({length:40}).map((_,i)=>(
                  <div key={i} style={{
                    position:"absolute", top:`${(i*7+13)%60}%`, left:`${(i*17+5)%100}%`,
                    width:2, height:2, background:"white", borderRadius:"50%",
                    animation:`twinkle 2s infinite ${i*0.1}s`
                  }}/>
                ))}
              </div>

              {/* clouds */}
              <div className="block dark:hidden">
                <div className="absolute top-8 left-16 opacity-70">
                  <svg width="90" height="36" viewBox="0 0 90 36">
                    <ellipse cx="45" cy="24" rx="40" ry="14" fill="white"/>
                    <ellipse cx="30" cy="22" rx="22" ry="16" fill="white"/>
                    <ellipse cx="58" cy="20" rx="20" ry="15" fill="white"/>
                  </svg>
                </div>
                <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-45">
                  <svg width="68" height="28" viewBox="0 0 68 28">
                    <ellipse cx="34" cy="18" rx="30" ry="11" fill="white"/>
                    <ellipse cx="22" cy="16" rx="16" ry="12" fill="white"/>
                    <ellipse cx="46" cy="15" rx="15" ry="11" fill="white"/>
                  </svg>
                </div>
              </div>

              {/* hills + grass */}
              <svg viewBox="0 0 800 160" preserveAspectRatio="none"
                className="absolute bottom-0 left-0 w-full" style={{ height:160 }}>
                <path d="M0 110 Q200 50 400 90 Q600 130 800 70 L800 160 L0 160Z" fill="#7cb342" opacity="0.4"/>
                <path d="M0 128 Q150 94 360 112 Q560 130 800 100 L800 160 L0 160Z" fill="#558b2f"/>
                {Array.from({length:44}).map((_,i)=>(
                  <GrassBlade key={i} x={i*19+4} h={12+(i%5)*3} lean={(i%3)-1}/>
                ))}
              </svg>

              {allGardenTasks.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-emerald-700 text-sm font-medium opacity-70">
                    Add tasks to start your garden 🌱
                  </p>
                </div>
              )}

              {/* ── PLANTS ROW ── */}
              <div
 className="absolute bottom-0 left-0 right-0 flex items-end px-3 overflow-x-auto"
  style={{
    paddingBottom: 20,
    gap: "6px",
    scrollbarWidth: "none", // Firefox
  }}
>
                {allGardenTasks.map((task, i) => {
                  
                  const total  = task.subtasks?.length ?? 0;
                  const done   = task.subtasks?.filter(st => st.completed ?? st.done).length ?? 0;
                  const progress = total > 0
                    ? done / total
                    : task.completed ? 1 : 0;

                  return (
<div
  key={task.id}
  className="flex flex-col items-center group shrink-0"
  style={{
    width: "clamp(50px, 12vw, 70px)",
    position: "relative",
  }}                   
                      title={`${task.title} — ${Math.round(progress * 100)}%`}
                    >
                      {/* The growing flower — same component at all stages */}
                      <GrowingFlower
  plantType={task.plantType}
  progress={progress}
  seed={task.id}
/>

                      {/* progress pip row beneath plant */}
                      {total > 0 && (
                        <div className="flex gap-0.5 mt-1 relative z-10">
                          {Array.from({length: total}).map((_,j) => (
                            <div key={j}
                              className="rounded-full"
                              style={{
                                width: 5, height: 5,
                                background: j < done ? "#22c55e" : "rgba(255,255,255,0.5)",
                                border: "1px solid rgba(0,0,0,0.15)",
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* hover tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                        bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200
                        text-xs rounded-lg px-2 py-1 whitespace-nowrap shadow-md
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                        border border-gray-100 dark:border-gray-700 z-20"
                        style={{ backdropFilter:"blur(4px)", fontSize:10 }}>
                        {task.completed ? "✅" : "🌱"} {task.title}
                        {total > 0 && <span className="text-gray-400 ml-1">({done}/{total})</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STATS */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4">Garden Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-emerald-600">{completedTasks.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Plants</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-600">{Object.keys(plantsByCategory).length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-600">
                    {new Set(completedTasks.map(t => t.plantType)).size}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Plant Types</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">{completedTasks.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}