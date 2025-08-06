import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const getTypeLabel = (type: string) => {
    const types = {
      apartment: "Apartamento",
      house: "Casa",
      commercial: "Comercial",
      land: "Terreno",
    };
    return types[type as keyof typeof types] || type;
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden" data-testid={`property-card-${property.id}`}>
      <div className="relative">
        <img
          src={property.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"}
          alt={property.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 left-4">
          {property.featured ? (
            <Badge className="bg-green-500 text-white">Em Destaque</Badge>
          ) : (
            <Badge variant="secondary">{getTypeLabel(property.type)}</Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white bg-opacity-80 hover:bg-opacity-100"
            onClick={toggleFavorite}
            data-testid={`button-favorite-${property.id}`}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-green-600" data-testid={`property-price-${property.id}`}>
            {formatPrice(property.price)}
          </span>
          <span className="text-sm text-gray-500">{getTypeLabel(property.type)}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2" data-testid={`property-title-${property.id}`}>
          {property.title}
        </h3>

        <p className="text-gray-600 mb-4 flex items-center" data-testid={`property-location-${property.id}`}>
          <MapPin className="h-4 w-4 text-green-500 mr-1" />
          {property.location}, {property.city}
        </p>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
          {property.bedrooms && (
            <span className="flex items-center" data-testid={`property-bedrooms-${property.id}`}>
              <Bed className="h-4 w-4 text-green-500 mr-1" />
              {property.bedrooms} Quartos
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center" data-testid={`property-bathrooms-${property.id}`}>
              <Bath className="h-4 w-4 text-green-500 mr-1" />
              {property.bathrooms} WCs
            </span>
          )}
          <span className="flex items-center" data-testid={`property-area-${property.id}`}>
            <Square className="h-4 w-4 text-green-500 mr-1" />
            {property.area}m²
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <span className="text-sm text-gray-700">Agente</span>
          </div>
          <Link href={`/property/${property.id}`}>
            <Button className="bg-green-500 text-white hover:bg-green-600" data-testid={`button-view-details-${property.id}`}>
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
