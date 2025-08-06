import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AngolaMap from "@/components/map/angola-map";
import FinancingCalculator from "@/components/calculator/financing-calculator";
import PropertyComparator from "@/components/compare/property-comparator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calculator, GitCompare, Sparkles } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="page-title">
              Ferramentas Exclusivas
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore nossas ferramentas inovadoras para facilitar sua busca pelo imóvel perfeito
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 space-y-16">
          
          {/* Interactive Map */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
                <h2 className="text-3xl font-bold text-gray-800">Mapa Interativo de Angola</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore as regiões de Angola e descubra propriedades disponíveis em cada província. 
                Clique nas províncias para ver estatísticas detalhadas do mercado imobiliário local.
              </p>
            </div>
            <AngolaMap />
          </div>

          {/* Financing Calculator */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-800">Calculadora de Financiamento</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Calcule suas prestações mensais, entrada necessária e total de juros. 
                Nossa calculadora visual ajuda você a planejar seu investimento imobiliário.
              </p>
            </div>
            <FinancingCalculator />
          </div>

          {/* Property Comparator */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <GitCompare className="w-8 h-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-800">Comparador de Propriedades</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Compare até 3 propriedades lado a lado. Análise detalhada de características, 
                preços e score de qualidade para ajudar na sua decisão.
              </p>
            </div>
            <PropertyComparator />
          </div>

          {/* Additional Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-800">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold">360°</span>
                  </div>
                  <span>Tour Virtual</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Visite propriedades remotamente com nossa tecnologia de tour virtual 360°. 
                  Experimente cada ambiente como se estivesse presente.
                </p>
                <div className="mt-4 p-3 bg-orange-100 rounded-lg text-center">
                  <span className="text-orange-700 text-sm font-medium">Em Breve</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-teal-800">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-teal-600 font-bold">AI</span>
                  </div>
                  <span>Recomendações IA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Inteligência artificial que aprende suas preferências e sugere 
                  propriedades personalizadas baseadas no seu perfil.
                </p>
                <div className="mt-4 p-3 bg-teal-100 rounded-lg text-center">
                  <span className="text-teal-700 text-sm font-medium">Em Desenvolvimento</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-indigo-800">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">AR</span>
                  </div>
                  <span>Realidade Aumentada</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Visualize móveis e decorações em propriedades vazias usando 
                  realidade aumentada no seu dispositivo móvel.
                </p>
                <div className="mt-4 p-3 bg-indigo-100 rounded-lg text-center">
                  <span className="text-indigo-700 text-sm font-medium">Próxima Versão</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}