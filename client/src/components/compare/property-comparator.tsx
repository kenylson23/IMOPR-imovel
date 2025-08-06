import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, X, GitCompare, MapPin, Bed, Bath, Square, DollarSign, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Property } from "@shared/schema";

interface ComparisonProperty extends Property {
  score?: number;
}

export default function PropertyComparator() {
  const [selectedProperties, setSelectedProperties] = useState<ComparisonProperty[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: properties } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const addProperty = (propertyId: string) => {
    if (selectedProperties.length >= 3) return;
    
    const property = properties?.find(p => p.id === propertyId);
    if (property && !selectedProperties.find(p => p.id === propertyId)) {
      setSelectedProperties([...selectedProperties, { ...property, score: calculateScore(property) }]);
      setShowAddModal(false);
    }
  };

  const removeProperty = (propertyId: string) => {
    setSelectedProperties(selectedProperties.filter(p => p.id !== propertyId));
  };

  const calculateScore = (property: Property): number => {
    let score = 0;
    
    // Price score (lower is better, max 25 points)
    const priceValue = parseFloat(property.price);
    if (priceValue < 30000000) score += 25;
    else if (priceValue < 60000000) score += 20;
    else if (priceValue < 100000000) score += 15;
    else score += 10;

    // Area score (max 20 points)
    if (property.area > 150) score += 20;
    else if (property.area > 100) score += 15;
    else if (property.area > 80) score += 10;
    else score += 5;

    // Bedrooms score (max 15 points)
    if (property.bedrooms) {
      if (property.bedrooms >= 4) score += 15;
      else if (property.bedrooms >= 3) score += 12;
      else if (property.bedrooms >= 2) score += 8;
      else score += 5;
    }

    // Location score (max 20 points)
    if (property.city === "Luanda") score += 20;
    else if (property.city === "Benguela") score += 15;
    else score += 10;

    // Features score (max 20 points)
    const featuresCount = property.features?.length || 0;
    score += Math.min(featuresCount * 3, 20);

    return Math.min(score, 100);
  };

  const formatCurrency = (price: string) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getBestValue = (values: (string | number | null)[], isPrice = false) => {
    if (isPrice) {
      const prices = values.map(v => parseFloat(v as string)).filter(v => !isNaN(v));
      return Math.min(...prices);
    }
    
    const numbers = values.map(v => typeof v === 'number' ? v : parseFloat(v as string)).filter(v => !isNaN(v));
    return Math.max(...numbers);
  };

  const isBestValue = (value: string | number | null, values: (string | number | null)[], isPrice = false) => {
    if (value === null) return false;
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    const bestValue = getBestValue(values, isPrice);
    return numValue === bestValue;
  };

  return (
    <Card className="w-full bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200/50">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center space-x-2 text-purple-800">
          <GitCompare className="w-6 h-6" />
          <span>Comparador de Propriedades</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedProperties.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Comece a Comparar
            </h3>
            <p className="text-gray-600 mb-6">
              Selecione até 3 propriedades para comparar características e preços
            </p>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white"
              data-testid="button-add-first-property"
            >
              Adicionar Primeira Propriedade
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Add Property Button */}
            {selectedProperties.length < 3 && (
              <div className="flex justify-center">
                <Button 
                  onClick={() => setShowAddModal(true)}
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                  data-testid="button-add-property"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Propriedade ({selectedProperties.length}/3)
                </Button>
              </div>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-w-full">
                {/* Feature Names Column */}
                <div className="space-y-4">
                  <div className="h-48 flex items-end pb-4">
                    <h4 className="text-sm font-semibold text-gray-600">Características</h4>
                  </div>
                  
                  <div className="space-y-3">
                    {["Imagem", "Preço", "Localização", "Área", "Quartos", "Casas de Banho", "Score Geral", "Características"].map((feature) => (
                      <div key={feature} className="h-16 flex items-center">
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Columns */}
                {selectedProperties.map((property) => (
                  <div key={property.id} className="space-y-4">
                    {/* Property Header */}
                    <Card className="bg-white border-2 border-purple-200/50">
                      <CardContent className="p-4">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 h-6 w-6 text-gray-400 hover:text-red-500"
                            onClick={() => removeProperty(property.id)}
                            data-testid={`button-remove-${property.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <img
                            src={property.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=200&fit=crop"}
                            alt={property.title}
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 pr-6">
                            {property.title}
                          </h3>
                          {property.featured && (
                            <Badge className="mt-1 bg-yellow-100 text-yellow-800 text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Property Details */}
                    <div className="space-y-3">
                      {/* Image Row */}
                      <div className="h-16 flex items-center">
                        <img
                          src={property.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=60&fit=crop"}
                          alt={property.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </div>

                      {/* Price Row */}
                      <div className="h-16 flex items-center">
                        <div className={`p-2 rounded text-sm font-bold ${
                          isBestValue(property.price, selectedProperties.map(p => p.price), true) 
                            ? 'bg-green-100 text-green-800' 
                            : 'text-gray-700'
                        }`}>
                          {formatCurrency(property.price)}
                        </div>
                      </div>

                      {/* Location Row */}
                      <div className="h-16 flex items-center">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.location}, {property.city}
                        </div>
                      </div>

                      {/* Area Row */}
                      <div className="h-16 flex items-center">
                        <div className={`p-2 rounded text-sm font-medium ${
                          isBestValue(property.area, selectedProperties.map(p => p.area)) 
                            ? 'bg-green-100 text-green-800' 
                            : 'text-gray-700'
                        }`}>
                          <Square className="w-3 h-3 inline mr-1" />
                          {property.area}m²
                        </div>
                      </div>

                      {/* Bedrooms Row */}
                      <div className="h-16 flex items-center">
                        <div className={`p-2 rounded text-sm font-medium ${
                          isBestValue(property.bedrooms, selectedProperties.map(p => p.bedrooms)) 
                            ? 'bg-green-100 text-green-800' 
                            : 'text-gray-700'
                        }`}>
                          <Bed className="w-3 h-3 inline mr-1" />
                          {property.bedrooms || 'N/A'}
                        </div>
                      </div>

                      {/* Bathrooms Row */}
                      <div className="h-16 flex items-center">
                        <div className={`p-2 rounded text-sm font-medium ${
                          isBestValue(property.bathrooms, selectedProperties.map(p => p.bathrooms)) 
                            ? 'bg-green-100 text-green-800' 
                            : 'text-gray-700'
                        }`}>
                          <Bath className="w-3 h-3 inline mr-1" />
                          {property.bathrooms || 'N/A'}
                        </div>
                      </div>

                      {/* Score Row */}
                      <div className="h-16 flex items-center">
                        <div className={`p-2 rounded-full text-sm font-bold ${getScoreColor(property.score || 0)}`}>
                          {property.score}/100
                        </div>
                      </div>

                      {/* Features Row */}
                      <div className="h-16 flex items-start">
                        <div className="text-xs text-gray-600">
                          {property.features?.slice(0, 3).join(", ")}
                          {(property.features?.length || 0) > 3 && "..."}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Property Modal */}
        {showAddModal && properties && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md m-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Adicionar Propriedade</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddModal(false)}
                    data-testid="button-close-modal"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select onValueChange={addProperty}>
                    <SelectTrigger data-testid="select-property">
                      <SelectValue placeholder="Selecionar propriedade..." />
                    </SelectTrigger>
                    <SelectContent>
                      {properties
                        .filter(p => !selectedProperties.find(sp => sp.id === p.id))
                        .map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.title} - {formatCurrency(property.price)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}