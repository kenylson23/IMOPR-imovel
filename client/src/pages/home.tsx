import { useQuery } from "@tanstack/react-query";
import { Home, MapPin, Building, Users, Award, TrendingUp } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PropertyCard from "@/components/property/property-card";
import PropertySearch from "@/components/property/property-search";
import AgentCard from "@/components/agent/agent-card";
import ContactForm from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Property, Agent } from "@shared/schema";

export default function HomePage() {
  const { data: featuredProperties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  const { data: agents, isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
              Encontre o Seu <span className="text-green-200">Lar Ideal</span> em Angola
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200" data-testid="hero-subtitle">
              Descubra as melhores oportunidades imobiliárias em Luanda, Benguela, Huambo e muito mais
            </p>
            
            <PropertySearch />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-properties">
              <div className="text-4xl font-bold text-green-600">2,500+</div>
              <div className="text-gray-600 mt-2">Imóveis Disponíveis</div>
            </div>
            <div data-testid="stat-agents">
              <div className="text-4xl font-bold text-green-600">150+</div>
              <div className="text-gray-600 mt-2">Agentes Certificados</div>
            </div>
            <div data-testid="stat-satisfaction">
              <div className="text-4xl font-bold text-green-600">98%</div>
              <div className="text-gray-600 mt-2">Clientes Satisfeitos</div>
            </div>
            <div data-testid="stat-experience">
              <div className="text-4xl font-bold text-green-600">5</div>
              <div className="text-gray-600 mt-2">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="featured-title">
              Imóveis em Destaque
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubra nossa seleção cuidadosa dos melhores imóveis disponíveis em Angola
            </p>
          </div>
          
          {propertiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="featured-properties">
              {featuredProperties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button size="lg" className="palanca-green palanca-green-hover text-white" data-testid="button-view-all-properties">
              Ver Todos os Imóveis
            </Button>
          </div>
        </div>
      </section>

      {/* Search by Category */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="category-title">
              Pesquisar por Categoria
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encontre exatamente o que procura navegando por nossas categorias especializadas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group cursor-pointer" data-testid="category-apartments">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop" 
                  alt="Apartamentos em Angola" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Apartamentos</h3>
                  <p className="text-gray-200 mb-4">450+ Propriedades Disponíveis</p>
                  <Button className="palanca-green palanca-green-hover text-white">
                    Explorar
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer" data-testid="category-houses">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop" 
                  alt="Casas em Angola" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Casas</h3>
                  <p className="text-gray-200 mb-4">280+ Propriedades Disponíveis</p>
                  <Button className="palanca-green palanca-green-hover text-white">
                    Explorar
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer" data-testid="category-commercial">
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop" 
                  alt="Imóveis Comerciais em Angola" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Comercial</h3>
                  <p className="text-gray-200 mb-4">120+ Propriedades Disponíveis</p>
                  <Button className="palanca-green palanca-green-hover text-white">
                    Explorar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Agents Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="agents-title">
              Nossos Agentes Especialistas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conheça nossa equipe de profissionais certificados prontos para ajudá-lo a encontrar o imóvel perfeito
            </p>
          </div>
          
          {agentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse p-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="agents-grid">
              {agents?.slice(0, 4).map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4" data-testid="contact-title">
                Pronto para Encontrar Seu Próximo Imóvel?
              </h2>
              <p className="text-xl text-green-100">
                Entre em contacto connosco e deixe-nos ajudá-lo a realizar o seu sonho imobiliário
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
