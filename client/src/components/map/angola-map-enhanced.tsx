import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProvinceData {
  name: string;
  properties: number;
  avgPrice: string;
  growth: string;
  capital: string;
  area: string;
}

const provinceData: Record<string, ProvinceData> = {
  luanda: {
    name: "Luanda",
    capital: "Luanda",
    properties: 2840,
    avgPrice: "95M AOA",
    growth: "+12%",
    area: "2.418 km²"
  },
  benguela: {
    name: "Benguela", 
    capital: "Benguela",
    properties: 680,
    avgPrice: "45M AOA",
    growth: "+8%",
    area: "31.788 km²"
  },
  huambo: {
    name: "Huambo",
    capital: "Huambo",
    properties: 520,
    avgPrice: "38M AOA", 
    growth: "+15%",
    area: "34.270 km²"
  },
  huila: {
    name: "Huíla",
    capital: "Lubango",
    properties: 340,
    avgPrice: "42M AOA",
    growth: "+6%",
    area: "79.023 km²"
  },
  cabinda: {
    name: "Cabinda",
    capital: "Cabinda",
    properties: 180,
    avgPrice: "65M AOA",
    growth: "+18%",
    area: "7.283 km²"
  },
  zaire: {
    name: "Zaire",
    capital: "M'banza-Kongo",
    properties: 95,
    avgPrice: "32M AOA",
    growth: "+4%",
    area: "40.130 km²"
  },
  uige: {
    name: "Uíge",
    capital: "Uíge",
    properties: 145,
    avgPrice: "28M AOA",
    growth: "+7%",
    area: "58.698 km²"
  },
  malanje: {
    name: "Malanje",
    capital: "Malanje",
    properties: 210,
    avgPrice: "35M AOA",
    growth: "+9%",
    area: "97.602 km²"
  },
  bieBie: {
    name: "Bié",
    capital: "Kuito",
    properties: 125,
    avgPrice: "30M AOA",
    growth: "+5%",
    area: "70.314 km²"
  },
  moxico: {
    name: "Moxico",
    capital: "Luena",
    properties: 85,
    avgPrice: "25M AOA",
    growth: "+3%",
    area: "223.023 km²"
  }
};

export default function AngolaMapEnhanced() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const getProvinceColor = (province: string) => {
    if (selectedProvince === province) return "#dc2626";
    if (hoveredProvince === province) return "#16a34a";
    return "#059669";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Map - Larger and More Detailed */}
      <div className="lg:col-span-2 relative">
        <div className="glass-strong rounded-3xl p-6 hover-lift">
          <svg
            viewBox="0 0 700 600"
            className="w-full h-auto"
            style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}
          >
            {/* Ocean */}
            <rect width="700" height="600" fill="url(#oceanGradient)" />
            
            {/* Gradients and Patterns */}
            <defs>
              <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#84cc16" />
                <stop offset="50%" stopColor="#65a30d" />
                <stop offset="100%" stopColor="#4d7c0f" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="shadow">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.3"/>
              </filter>
            </defs>

            {/* Angola Main Territory - More Realistic Shape */}
            <path
              d="M140 140 L200 130 L280 135 L360 145 L440 160 L500 180 L540 220 L560 280 L550 350 L530 420 L490 470 L430 500 L360 520 L290 525 L220 520 L160 500 L120 470 L100 430 L90 380 L95 320 L105 260 L120 200 L135 160 Z"
              fill="url(#landGradient)"
              stroke="#166534"
              strokeWidth="3"
              filter="url(#shadow)"
              className="drop-shadow-lg"
            />

            {/* Cabinda (separated province) - More accurate position */}
            <path
              d="M150 60 L220 55 L235 85 L225 110 L180 115 L140 95 Z"
              fill="url(#landGradient)"
              stroke="#166534"
              strokeWidth="3"
              filter="url(#shadow)"
            />

            {/* Province Borders - More detailed */}
            <g stroke="#047857" strokeWidth="2" fill="none" opacity="0.7">
              {/* North-South divisions */}
              <path d="M200 130 L220 400" />
              <path d="M280 135 L310 480" />
              <path d="M360 145 L390 450" />
              <path d="M440 160 L460 420" />
              
              {/* East-West divisions */}
              <path d="M200 200 L500 230" />
              <path d="M180 280 L520 320" />
              <path d="M160 360 L480 400" />
            </g>

            {/* Cities with Enhanced Design and Real Positions */}
            
            {/* Luanda - Capital, largest city */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('luanda')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'luanda' ? null : 'luanda')}
            >
              <circle
                cx="450"
                cy="220"
                r="20"
                fill={getProvinceColor('luanda')}
                stroke="#ffffff"
                strokeWidth="4"
                filter="url(#glow)"
              />
              <circle
                cx="450"
                cy="220"
                r="12"
                fill="#ffffff"
                opacity="0.9"
              />
              <circle
                cx="450"
                cy="220"
                r="6"
                fill={getProvinceColor('luanda')}
              />
              <text x="475" y="225" className="typography-body font-bold fill-gray-800 drop-shadow">Luanda</text>
            </g>
            
            {/* Benguela */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('benguela')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'benguela' ? null : 'benguela')}
            >
              <circle
                cx="380"
                cy="320"
                r="14"
                fill={getProvinceColor('benguela')}
                stroke="#ffffff"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <circle
                cx="380"
                cy="320"
                r="7"
                fill="#ffffff"
                opacity="0.8"
              />
              <text x="400" y="325" className="text-sm font-semibold fill-gray-800 drop-shadow">Benguela</text>
            </g>
            
            {/* Huambo */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('huambo')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'huambo' ? null : 'huambo')}
            >
              <circle
                cx="340"
                cy="280"
                r="12"
                fill={getProvinceColor('huambo')}
                stroke="#ffffff"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <circle
                cx="340"
                cy="280"
                r="6"
                fill="#ffffff"
                opacity="0.8"
              />
              <text x="360" y="285" className="text-sm font-semibold fill-gray-800 drop-shadow">Huambo</text>
            </g>
            
            {/* Huíla (Lubango) */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('huila')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'huila' ? null : 'huila')}
            >
              <circle
                cx="310"
                cy="400"
                r="12"
                fill={getProvinceColor('huila')}
                stroke="#ffffff"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <circle
                cx="310"
                cy="400"
                r="6"
                fill="#ffffff"
                opacity="0.8"
              />
              <text x="330" y="405" className="text-sm font-semibold fill-gray-800 drop-shadow">Huíla</text>
            </g>

            {/* Cabinda */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('cabinda')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'cabinda' ? null : 'cabinda')}
            >
              <circle
                cx="190"
                cy="85"
                r="10"
                fill={getProvinceColor('cabinda')}
                stroke="#ffffff"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <circle
                cx="190"
                cy="85"
                r="5"
                fill="#ffffff"
                opacity="0.8"
              />
              <text x="210" y="90" className="text-sm font-semibold fill-gray-800 drop-shadow">Cabinda</text>
            </g>

            {/* Malanje */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('malanje')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'malanje' ? null : 'malanje')}
            >
              <circle
                cx="400"
                cy="200"
                r="10"
                fill={getProvinceColor('malanje')}
                stroke="#ffffff"
                strokeWidth="3"
                filter="url(#glow)"
              />
              <circle
                cx="400"
                cy="200"
                r="5"
                fill="#ffffff"
                opacity="0.8"
              />
              <text x="420" y="205" className="text-sm font-semibold fill-gray-800 drop-shadow">Malanje</text>
            </g>

            {/* Uíge */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('uige')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'uige' ? null : 'uige')}
            >
              <circle
                cx="280"
                cy="160"
                r="9"
                fill={getProvinceColor('uige')}
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#glow)"
              />
              <circle
                cx="280"
                cy="160"
                r="4"
                fill="#ffffff"
                opacity="0.8"
              />
              <text x="295" y="165" className="text-xs font-semibold fill-gray-800 drop-shadow">Uíge</text>
            </g>

            {/* Bié */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('bieBie')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'bieBie' ? null : 'bieBie')}
            >
              <circle
                cx="360"
                cy="350"
                r="9"
                fill={getProvinceColor('bieBie')}
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#glow)"
              />
              <circle
                cx="360"
                cy="350"
                r="4"
                fill="#ffffff"
                opacity="0.8"
              />
              <text x="375" y="355" className="text-xs font-semibold fill-gray-800 drop-shadow">Bié</text>
            </g>

            {/* Moxico */}
            <g
              className="cursor-pointer transition-all duration-300 transform hover:scale-110"
              onMouseEnter={() => setHoveredProvince('moxico')}
              onMouseLeave={() => setHoveredProvince(null)}
              onClick={() => setSelectedProvince(selectedProvince === 'moxico' ? null : 'moxico')}
            >
              <circle
                cx="480"
                cy="350"
                r="8"
                fill={getProvinceColor('moxico')}
                stroke="#ffffff"
                strokeWidth="2"
                filter="url(#glow)"
              />
              <circle
                cx="480"
                cy="350"
                r="4"
                fill="#ffffff"
                opacity="0.8"
              />
              <text x="495" y="355" className="text-xs font-semibold fill-gray-800 drop-shadow">Moxico</text>
            </g>

            {/* Compass Rose */}
            <g transform="translate(600, 80)">
              <circle cx="0" cy="0" r="25" fill="rgba(255,255,255,0.9)" stroke="#059669" strokeWidth="2" />
              <path d="M0,-20 L5,-5 L0,0 L-5,-5 Z" fill="#dc2626" />
              <text x="0" y="-30" textAnchor="middle" className="text-xs font-bold fill-gray-700">N</text>
            </g>

            {/* Legend */}
            <g transform="translate(30, 500)">
              <rect x="0" y="0" width="200" height="80" fill="rgba(255,255,255,0.95)" stroke="#059669" strokeWidth="2" rx="12" filter="url(#shadow)" />
              <text x="100" y="20" textAnchor="middle" className="text-sm font-bold fill-gray-800">Legenda</text>
              
              <circle cx="20" cy="35" r="8" fill="#059669" />
              <text x="35" y="40" className="text-xs fill-gray-700">Província (clique para detalhes)</text>
              
              <circle cx="20" cy="55" r="8" fill="#dc2626" />
              <text x="35" y="60" className="text-xs fill-gray-700">Província Selecionada</text>
              
              <circle cx="20" cy="75" r="8" fill="#16a34a" />
              <text x="35" y="80" className="text-xs fill-gray-700">Destacada (hover)</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Province Info - Enhanced */}
      <div className="space-y-6">
        <Card className="glass-strong rounded-3xl hover-lift">
          <CardHeader>
            <CardTitle className="typography-subheading text-green-800">Mercado Imobiliário em Angola</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="typography-body text-green-700">
              Explore o mercado imobiliário nas principais províncias de Angola. 
              Clique em cada província no mapa para ver estatísticas detalhadas.
            </p>
          </CardContent>
        </Card>

        {selectedProvince && provinceData[selectedProvince] && (
          <Card className="glass-strong rounded-3xl hover-lift border-emerald-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="typography-subheading text-emerald-800">
                  {provinceData[selectedProvince].name}
                </CardTitle>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {provinceData[selectedProvince].growth}
                </Badge>
              </div>
              <p className="typography-body text-emerald-600">
                Capital: {provinceData[selectedProvince].capital}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="glass rounded-2xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Propriedades Disponíveis</p>
                  <p className="typography-heading text-emerald-700">
                    {provinceData[selectedProvince].properties.toLocaleString()}
                  </p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Preço Médio</p>
                  <p className="typography-heading text-emerald-700">
                    {provinceData[selectedProvince].avgPrice}
                  </p>
                </div>
                <div className="glass rounded-2xl p-4">
                  <p className="text-sm text-gray-600 mb-1">Área Total</p>
                  <p className="typography-body font-semibold text-gray-700">
                    {provinceData[selectedProvince].area}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!selectedProvince && (
          <Card className="glass-strong rounded-3xl hover-lift">
            <CardHeader>
              <CardTitle className="typography-subheading text-gray-800">Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total de Propriedades</span>
                <span className="typography-body font-bold text-green-600">5,225</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Províncias Ativas</span>
                <span className="typography-body font-bold text-green-600">10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Crescimento Médio</span>
                <span className="typography-body font-bold text-green-600">+8.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Maior Mercado</span>
                <span className="typography-body font-bold text-green-600">Luanda</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}