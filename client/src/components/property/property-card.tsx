import { useState } from "react";
import { Link } from "wouter";
import { MapPin, Bed, Bath, Square, Heart, Eye, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const images = property.images || ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className={`group card-shimmer ${property.featured ? 'premium-hover gradient-border' : 'hover:shadow-2xl hover:shadow-green-500/20'} transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 reveal-up`} data-testid={`property-card-${property.id}`}>
      <div className="relative overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Image navigation dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Premium badges with animation */}
        <div className="absolute top-4 left-4 space-y-2">
          {property.featured ? (
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-lg premium-pulse border-0">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Premium
            </Badge>
          ) : (
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium shadow-lg border-0 card-shimmer">
              {getTypeLabel(property.type)}
            </Badge>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg border-0 hover:scale-110 transition-all duration-200 ripple float-on-hover"
            onClick={toggleFavorite}
            data-testid={`button-favorite-${property.id}`}
          >
            <Heart className={`h-4 w-4 transition-colors duration-200 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
          
          <Link href={`/property/${property.id}`}>
            <Button
              variant="secondary"
              size="icon"
              className="bg-green-500/90 hover:bg-green-600 text-white shadow-lg border-0 hover:scale-110 transition-all duration-200 backdrop-blur-sm ripple"
              data-testid={`button-quick-view-${property.id}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* Hover overlay with additional info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
          <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm mb-2 flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {property.location}, {property.city}
            </p>
            <div className="flex items-center space-x-3 text-xs">
              {property.bedrooms && (
                <span className="flex items-center bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <Bed className="h-3 w-3 mr-1" />
                  {property.bedrooms}
                </span>
              )}
              {property.bathrooms && (
                <span className="flex items-center bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  <Bath className="h-3 w-3 mr-1" />
                  {property.bathrooms}
                </span>
              )}
              <span className="flex items-center bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                <Square className="h-3 w-3 mr-1" />
                {property.area}m²
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 relative">
        {/* Price with stunning effect */}
        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <span className={`text-3xl font-bold ${property.featured ? 'text-gradient-animate' : 'bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent'}`} data-testid={`property-price-${property.id}`}>
              {formatPrice(property.price)}
            </span>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-transparent opacity-50"></div>
          </div>
          {property.featured && (
            <div className="flex items-center text-yellow-600 text-xs font-medium premium-pulse">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Destaque
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors duration-300" data-testid={`property-title-${property.id}`}>
          {property.title}
        </h3>

        <p className="text-gray-600 mb-4 flex items-center group-hover:text-gray-800 transition-colors duration-300" data-testid={`property-location-${property.id}`}>
          <MapPin className="h-4 w-4 text-green-500 mr-2 group-hover:text-green-600 transition-colors duration-300" />
          {property.location}, {property.city}
        </p>

        {/* Enhanced property features */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {property.bedrooms && (
            <div className="flex flex-col items-center p-2 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors duration-300" data-testid={`property-bedrooms-${property.id}`}>
              <Bed className="h-4 w-4 text-green-600 mb-1" />
              <span className="text-xs font-semibold text-gray-700">{property.bedrooms} Quartos</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex flex-col items-center p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300" data-testid={`property-bathrooms-${property.id}`}>
              <Bath className="h-4 w-4 text-blue-600 mb-1" />
              <span className="text-xs font-semibold text-gray-700">{property.bathrooms} WCs</span>
            </div>
          )}
          <div className="flex flex-col items-center p-2 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors duration-300" data-testid={`property-area-${property.id}`}>
            <Square className="h-4 w-4 text-purple-600 mb-1" />
            <span className="text-xs font-semibold text-gray-700">{property.area}m²</span>
          </div>
        </div>

        {/* Enhanced footer with agent info and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <div>
              <span className="text-xs text-gray-500">Agente Imobiliário</span>
              <div className="text-sm font-medium text-gray-700">Disponível</div>
            </div>
          </div>
          <Link href={`/property/${property.id}`}>
            <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-0 font-semibold ripple relative overflow-hidden" data-testid={`button-view-details-${property.id}`}>
              <span className="relative z-10">Ver Mais</span>
            </Button>
          </Link>
        </div>

        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ padding: '1px' }}>
          <div className="w-full h-full bg-white rounded-lg"></div>
        </div>
      </CardContent>
    </Card>
  );
}
