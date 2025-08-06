import { useQuery } from "@tanstack/react-query";
import { Home, MapPin, Building, Users, Award, TrendingUp, Calculator, GitCompare, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
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
  useScrollReveal();

  const { data: featuredProperties, isLoading: propertiesLoading, error } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
    staleTime: 0, // Force refresh to see if there's a cache issue
    gcTime: 0, // Prevent caching
  });

  // Debug logs
  console.log("Featured Properties Debug:", {
    loading: propertiesLoading,
    error: error,
    data: featuredProperties,
    dataLength: featuredProperties?.length
  });

  const { data: agents, isLoading: agentsLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents"],
  });



  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Modern Layout */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        {/* Floating glassmorphism elements - Responsive */}
        <div className="hidden md:block absolute top-20 right-20 w-32 h-32 glass morphing-blob opacity-20"></div>
        <div className="hidden sm:block absolute bottom-32 left-4 md:left-16 w-16 md:w-24 h-16 md:h-24 glass-strong morphing-blob opacity-15"></div>
        <div className="hidden md:block absolute top-1/2 left-20 w-16 h-16 glass-dark morphing-blob opacity-25"></div>
        
        <div className="relative container-fluid py-12 md:py-20">
          <div className="max-w-6xl mx-auto text-center scroll-reveal px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent leading-tight" data-testid="hero-title">
              Encontre o Seu <br className="hidden sm:block" />
              <span className="text-green-300">Lar Ideal</span> <br className="hidden sm:block" />
              em Angola
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 md:mb-12 max-w-3xl mx-auto px-2" data-testid="hero-subtitle">
              Descubra as melhores oportunidades imobiliárias em Luanda, Benguela, Huambo e muito mais
            </p>
            
            <div className="max-w-4xl mx-auto px-4">
              <PropertySearch />
            </div>
          </div>
        </div>

        {/* Modern scroll indicator - Hidden on mobile */}
        <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center glass-dark backdrop-blur-sm">
            <div className="w-1 h-3 bg-gradient-to-b from-green-400 to-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Glassmorphism */}
      <section className="relative py-12 md:py-20 bg-gradient-to-r from-slate-50 to-gray-100 overflow-hidden">
        {/* Background elements */}
        <div className="hidden md:block absolute top-10 left-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute bottom-10 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"></div>
        
        <div className="container-fluid relative px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="glass-strong rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift group" data-testid="stat-properties">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors">2,500+</div>
              <div className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Imóveis Disponíveis</div>
            </div>
            <div className="glass-strong rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift group" data-testid="stat-agents">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors">150+</div>
              <div className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Agentes Certificados</div>
            </div>
            <div className="glass-strong rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift group" data-testid="stat-satisfaction">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors">98%</div>
              <div className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Clientes Satisfeitos</div>
            </div>
            <div className="glass-strong rounded-xl md:rounded-2xl p-4 md:p-6 hover-lift group" data-testid="stat-experience">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 group-hover:text-green-700 transition-colors">5</div>
              <div className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section - Asymmetric Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white via-gray-50 to-slate-100">
        <div className="container-fluid px-4">
          <div className="text-center mb-10 md:mb-16 scroll-reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6" data-testid="featured-title">
              Imóveis em Destaque
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Descubra nossa seleção cuidadosa dos melhores imóveis disponíveis em Angola
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 scroll-reveal" data-testid="featured-properties">
            {propertiesLoading ? (
              // Loading skeletons
              [1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse hover-lift">
                  <div className="h-48 md:h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg"></div>
                  <CardContent className="p-4 md:p-6">
                    <div className="h-3 md:h-4 bg-gray-200 rounded mb-3 md:mb-4"></div>
                    <div className="h-4 md:h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 md:h-4 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))
            ) : featuredProperties && featuredProperties.length > 0 ? (
              // Actual properties
              featuredProperties.map((property, index) => (
                <div key={property.id} className={`${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''} card-mobile`}>
                  <PropertyCard property={property} />
                </div>
              ))
            ) : (
              // No properties message
              <div className="col-span-full text-center py-12">
                <p className="typography-body text-gray-500">Nenhum imóvel em destaque disponível no momento.</p>
              </div>
            )}
          </div>
          
          <div className="text-center mt-16 scroll-reveal">
            <Link href="/properties">
              <Button size="lg" className="palanca-green palanca-green-hover text-white typography-body hover-lift px-8 py-4" data-testid="button-view-all-properties">
                Ver Todos os Imóveis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search by Category - Modern Layout */}
      <section className="p-fluid-lg bg-gradient-to-r from-white to-gray-50">
        <div className="container-fluid">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="typography-display text-gray-900 mb-6" data-testid="category-title">
              Pesquisar por Categoria
            </h2>
            <p className="typography-body-large text-gray-600 max-w-3xl mx-auto">
              Encontre exatamente o que procura navegando por nossas categorias especializadas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-md scroll-reveal">
            <div className="relative group cursor-pointer hover-lift" data-testid="category-apartments">
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop" 
                  alt="Apartamentos em Angola" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 glass-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="typography-heading mb-3">Apartamentos</h3>
                  <p className="typography-body text-gray-200 mb-6">450+ Propriedades Disponíveis</p>
                  <Button className="palanca-green palanca-green-hover text-white hover-lift">
                    Explorar
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer hover-lift" data-testid="category-houses">
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop" 
                  alt="Casas em Angola" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 glass-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="typography-heading mb-3">Casas</h3>
                  <p className="typography-body text-gray-200 mb-6">280+ Propriedades Disponíveis</p>
                  <Button className="palanca-green palanca-green-hover text-white hover-lift">
                    Explorar
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative group cursor-pointer hover-lift" data-testid="category-commercial">
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop" 
                  alt="Imóveis Comerciais em Angola" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 glass-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="typography-heading mb-3">Comercial</h3>
                  <p className="typography-body text-gray-200 mb-6">120+ Propriedades Disponíveis</p>
                  <Button className="palanca-green palanca-green-hover text-white hover-lift">
                    Explorar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Tools Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-4" data-testid="tools-title">
              Ferramentas Exclusivas
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experiências únicas que facilitam sua busca pelo imóvel perfeito
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mapa Interativo</h3>
              <p className="text-white/80 mb-6">
                Explore Angola province por province com estatísticas detalhadas do mercado imobiliário
              </p>
              <Link href="/tools">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                  Explorar Mapa
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Calculadora Visual</h3>
              <p className="text-white/80 mb-6">
                Calcule financiamentos com interface visual intuitiva e indicadores de acessibilidade
              </p>
              <Link href="/tools">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                  Calcular Agora
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <GitCompare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Comparador Premium</h3>
              <p className="text-white/80 mb-6">
                Compare propriedades lado a lado com scores automáticos e análise detalhada
              </p>
              <Link href="/tools">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                  Comparar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Agents Section - Modern Layout */}
      <section className="p-fluid-lg bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-48 h-48 bg-green-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl"></div>
        
        <div className="container-fluid relative">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="typography-display text-gray-900 mb-6" data-testid="agents-title">
              Nossos Agentes Especialistas
            </h2>
            <p className="typography-body-large text-gray-600 max-w-3xl mx-auto">
              Conheça nossa equipe de profissionais certificados prontos para ajudá-lo a encontrar o imóvel perfeito
            </p>
          </div>
          
          {agentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fluid-md">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse glass-strong p-fluid-sm text-center hover-lift">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fluid-md scroll-reveal" data-testid="agents-grid">
              {agents?.slice(0, 4).map((agent) => (
                <div key={agent.id} className="hover-lift">
                  <AgentCard agent={agent} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section - Modern Glassmorphism */}
      <section className="p-fluid-xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 morphing-blob opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 morphing-blob opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        
        <div className="container-fluid relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="typography-display mb-6" data-testid="contact-title">
                Pronto para Encontrar Seu Próximo Imóvel?
              </h2>
              <p className="typography-body-large text-green-100 max-w-3xl mx-auto">
                Entre em contacto connosco e deixe-nos ajudá-lo a realizar o seu sonho imobiliário
              </p>
            </div>
            
            <div className="glass-strong rounded-3xl p-fluid-lg scroll-reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
