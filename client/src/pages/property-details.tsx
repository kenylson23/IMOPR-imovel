import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Bed, Bath, Square, Phone, Mail, MessageCircle, Heart } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ContactForm from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Property, Agent } from "@shared/schema";

export default function PropertyDetailsPage() {
  const { id } = useParams();

  const { data: property, isLoading: propertyLoading } = useQuery<Property>({
    queryKey: ["/api/properties", id],
    enabled: !!id,
  });

  const { data: agent, isLoading: agentLoading } = useQuery<Agent>({
    queryKey: ["/api/agents", property?.agentId],
    enabled: !!property?.agentId,
  });

  if (propertyLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Propriedade não encontrada</h1>
          <p className="text-gray-600 mb-8">A propriedade que procura não existe ou foi removida.</p>
          <Link href="/properties">
            <Button className="palanca-green palanca-green-hover text-white">
              Ver Todas as Propriedades
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/properties">
          <Button variant="ghost" className="text-green-600 hover:text-green-700" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar às Propriedades
          </Button>
        </Link>
      </div>

      {/* Property Images */}
      <section className="container mx-auto px-4 mb-8">
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
          <img
            src={property.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=600&fit=crop"}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-green-500 text-white">
              {property.type === "apartment" ? "Apartamento" : 
               property.type === "house" ? "Casa" : 
               property.type === "commercial" ? "Comercial" : "Terreno"}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="icon" className="bg-white/80 hover:bg-white" data-testid="button-favorite">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2" data-testid="property-title">
                      {property.title}
                    </CardTitle>
                    <p className="text-gray-600 flex items-center" data-testid="property-location">
                      <MapPin className="h-4 w-4 mr-1 text-green-500" />
                      {property.location}, {property.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600" data-testid="property-price">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.status === "available" ? "Disponível" : "Vendido"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {property.bedrooms && (
                    <span className="flex items-center" data-testid="property-bedrooms">
                      <Bed className="h-4 w-4 mr-1 text-green-500" />
                      {property.bedrooms} Quartos
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="flex items-center" data-testid="property-bathrooms">
                      <Bath className="h-4 w-4 mr-1 text-green-500" />
                      {property.bathrooms} WCs
                    </span>
                  )}
                  <span className="flex items-center" data-testid="property-area">
                    <Square className="h-4 w-4 mr-1 text-green-500" />
                    {property.area}m²
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Descrição</h3>
                    <p className="text-gray-700 leading-relaxed" data-testid="property-description">
                      {property.description}
                    </p>
                  </div>

                  {property.features && property.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Características</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3" data-testid="property-features">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Endereço</h3>
                    <p className="text-gray-700" data-testid="property-address">
                      {property.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            {agent && !agentLoading && (
              <Card data-testid="agent-card">
                <CardHeader>
                  <CardTitle className="text-lg">Agente Responsável</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <img
                      src={agent.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"}
                      alt={agent.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900" data-testid="agent-name">{agent.name}</h4>
                      <p className="text-sm text-green-600" data-testid="agent-specialty">{agent.specialty}</p>
                      <p className="text-xs text-gray-500">
                        {agent.experience} anos • {agent.salesCount}+ vendas
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full text-sm" data-testid="button-call-agent">
                        <Phone className="h-4 w-4 mr-2" />
                        {agent.phone}
                      </Button>
                      <Button variant="outline" className="w-full text-sm" data-testid="button-email-agent">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button className="w-full palanca-green palanca-green-hover text-white text-sm" data-testid="button-whatsapp-agent">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interessado nesta propriedade?</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm propertyId={property.id} agentId={property.agentId} compact />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
