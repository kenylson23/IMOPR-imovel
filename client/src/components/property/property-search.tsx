import { useState } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CITIES, PROPERTY_TYPES, PRICE_RANGES } from "@/lib/constants";

export default function PropertySearch() {
  const [, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState({
    city: "",
    type: "",
    priceRange: "",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchParams.city && searchParams.city !== "all") {
      params.append("city", searchParams.city);
    }
    if (searchParams.type && searchParams.type !== "all") {
      params.append("type", searchParams.type);
    }
    if (searchParams.priceRange && searchParams.priceRange !== "all") {
      const range = PRICE_RANGES.find(r => r.label === searchParams.priceRange);
      if (range?.max) {
        params.append("maxPrice", range.max.toString());
      }
    }

    setLocation(`/properties?${params.toString()}`);
  };

  return (
    <Card className="max-w-5xl mx-auto glass-strong">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
            <Select 
              value={searchParams.city} 
              onValueChange={(value) => setSearchParams(prev => ({ ...prev, city: value }))}
              data-testid="search-location"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todas as Cidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Cidades</SelectItem>
                {CITIES.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel</label>
            <Select 
              value={searchParams.type} 
              onValueChange={(value) => setSearchParams(prev => ({ ...prev, type: value }))}
              data-testid="search-type"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos os Tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                {Object.entries(PROPERTY_TYPES).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Preço Máximo</label>
            <Select 
              value={searchParams.priceRange} 
              onValueChange={(value) => setSearchParams(prev => ({ ...prev, priceRange: value }))}
              data-testid="search-price"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sem Limite" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Sem Limite</SelectItem>
                {PRICE_RANGES.map(range => (
                  <SelectItem key={range.label} value={range.label}>{range.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end sm:col-span-2 lg:col-span-1">
            <Button 
              onClick={handleSearch} 
              className="w-full bg-green-500 text-white hover:bg-green-600 btn-responsive touch-target focus-visible-enhanced"
              data-testid="button-search"
            >
              <Search className="h-4 w-4 mr-2" />
              Pesquisar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
