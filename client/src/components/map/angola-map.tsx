import { useState } from "react";
import { MapPin, Home, Building, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Province {
  id: string;
  name: string;
  x: number;
  y: number;
  properties: number;
  avgPrice: string;
}

interface AngolaMapProps {
  onProvinceSelect?: (province: Province) => void;
}

export default function AngolaMap({ onProvinceSelect }: AngolaMapProps) {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<Province | null>(null);

  const provinces: Province[] = [
    { id: "luanda", name: "Luanda", x: 45, y: 35, properties: 1250, avgPrice: "75,000,000" },
    { id: "benguela", name: "Benguela", x: 30, y: 45, properties: 420, avgPrice: "45,000,000" },
    { id: "huambo", name: "Huambo", x: 35, y: 40, properties: 320, avgPrice: "38,000,000" },
    { id: "lubango", name: "Lubango", x: 28, y: 55, properties: 180, avgPrice: "32,000,000" },
    { id: "malanje", name: "Malanje", x: 50, y: 25, properties: 150, avgPrice: "28,000,000" },
    { id: "cabinda", name: "Cabinda", x: 20, y: 15, properties: 95, avgPrice: "52,000,000" },
    { id: "namibe", name: "Namibe", x: 25, y: 60, properties: 85, avgPrice: "35,000,000" },
    { id: "soyo", name: "Soyo", x: 25, y: 20, properties: 75, avgPrice: "40,000,000" },
  ];

  const handleProvinceClick = (province: Province) => {
    setSelectedProvince(province);
    onProvinceSelect?.(province);
  };

  const getProvinceColor = (properties: number) => {
    if (properties > 1000) return "#10b981"; // Verde intenso
    if (properties > 500) return "#34d399"; // Verde médio
    if (properties > 200) return "#6ee7b7"; // Verde claro
    return "#a7f3d0"; // Verde muito claro
  };

  return (
    <Card className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-green-800">
          <MapPin className="w-5 h-5" />
          <span>Mapa Interativo de Angola</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* SVG Map of Angola */}
          <svg
            width="100%"
            height="400"
            viewBox="0 0 100 80"
            className="border-2 border-green-300/30 rounded-lg bg-gradient-to-br from-green-100 to-blue-100"
          >
            {/* Angola outline (simplified) */}
            <path
              d="M15,25 L25,15 L30,10 L35,12 L40,15 L45,20 L55,18 L65,25 L70,35 L65,45 L60,55 L55,65 L45,70 L35,68 L25,65 L20,55 L15,45 L12,35 Z"
              fill="rgba(16, 185, 129, 0.1)"
              stroke="#10b981"
              strokeWidth="0.5"
              className="drop-shadow-sm"
            />
            
            {/* Cabinda (separate) */}
            <circle
              cx="20"
              cy="15"
              r="3"
              fill="rgba(16, 185, 129, 0.1)"
              stroke="#10b981"
              strokeWidth="0.3"
            />

            {/* Province markers */}
            {provinces.map((province) => (
              <g key={province.id}>
                {/* Province circle */}
                <circle
                  cx={province.x}
                  cy={province.y}
                  r={Math.sqrt(province.properties / 50) + 2}
                  fill={getProvinceColor(province.properties)}
                  stroke="white"
                  strokeWidth="0.5"
                  className="cursor-pointer transition-all duration-300 hover:stroke-green-600 hover:stroke-2 drop-shadow-lg"
                  onClick={() => handleProvinceClick(province)}
                  onMouseEnter={() => setHoveredProvince(province)}
                  onMouseLeave={() => setHoveredProvince(null)}
                />
                
                {/* Province label */}
                <text
                  x={province.x}
                  y={province.y + Math.sqrt(province.properties / 50) + 4}
                  textAnchor="middle"
                  className="text-xs fill-green-800 font-semibold pointer-events-none"
                >
                  {province.name}
                </text>
                
                {/* Property count */}
                <text
                  x={province.x}
                  y={province.y + 1}
                  textAnchor="middle"
                  className="text-xs fill-white font-bold pointer-events-none"
                >
                  {province.properties}
                </text>
              </g>
            ))}

            {/* Hover tooltip */}
            {hoveredProvince && (
              <g>
                <rect
                  x={hoveredProvince.x + 5}
                  y={hoveredProvince.y - 8}
                  width="20"
                  height="12"
                  fill="rgba(0, 0, 0, 0.8)"
                  rx="2"
                  className="pointer-events-none"
                />
                <text
                  x={hoveredProvince.x + 15}
                  y={hoveredProvince.y - 2}
                  textAnchor="middle"
                  className="text-xs fill-white font-medium pointer-events-none"
                >
                  {hoveredProvince.avgPrice} AOA
                </text>
              </g>
            )}
          </svg>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-gray-600">1000+ propriedades</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-400"></div>
              <span className="text-gray-600">500-1000 propriedades</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-300"></div>
              <span className="text-gray-600">200-500 propriedades</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-200"></div>
              <span className="text-gray-600">Menos de 200</span>
            </div>
          </div>

          {/* Selected province info */}
          {selectedProvince && (
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-200 shadow-lg">
              <h3 className="font-bold text-lg text-green-800 mb-2">{selectedProvince.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Propriedades disponíveis:</span>
                  <p className="font-semibold text-green-600">{selectedProvince.properties}</p>
                </div>
                <div>
                  <span className="text-gray-600">Preço médio:</span>
                  <p className="font-semibold text-green-600">{selectedProvince.avgPrice} AOA</p>
                </div>
              </div>
              <Button 
                className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white"
                data-testid={`button-explore-${selectedProvince.id}`}
              >
                Explorar {selectedProvince.name}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}