import { useState, useEffect } from "react";
import { Calculator, DollarSign, Calendar, Percent, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface FinancingResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  downPayment: number;
  loanAmount: number;
}

export default function FinancingCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(50000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [result, setResult] = useState<FinancingResult | null>(null);

  const calculateFinancing = () => {
    const downPayment = (propertyValue * downPaymentPercent) / 100;
    const loanAmount = propertyValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = loanAmount / numberOfPayments;
      setResult({
        monthlyPayment,
        totalPayment: monthlyPayment * numberOfPayments + downPayment,
        totalInterest: 0,
        downPayment,
        loanAmount,
      });
      return;
    }

    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments + downPayment;
    const totalInterest = totalPayment - propertyValue;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      downPayment,
      loanAmount,
    });
  };

  useEffect(() => {
    calculateFinancing();
  }, [propertyValue, downPaymentPercent, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getAffordabilityColor = (monthlyPayment: number) => {
    const monthlyIncome = 2000000; // Assuming average income
    const ratio = (monthlyPayment / monthlyIncome) * 100;
    
    if (ratio <= 30) return "text-green-600";
    if (ratio <= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200/50">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center space-x-2 text-blue-800">
          <Calculator className="w-6 h-6" />
          <span>Calculadora de Financiamento</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="property-value" className="text-sm font-semibold text-gray-700">
                Valor do Imóvel
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="property-value"
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="pl-10 bg-white border-2 border-blue-200/50 focus:border-blue-400"
                  data-testid="input-property-value"
                />
              </div>
              <p className="text-xs text-gray-500">
                {formatCurrency(propertyValue)}
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">
                Entrada: {downPaymentPercent}%
              </Label>
              <Slider
                value={[downPaymentPercent]}
                onValueChange={(value) => setDownPaymentPercent(value[0])}
                max={50}
                min={5}
                step={5}
                className="w-full"
                data-testid="slider-down-payment"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>5%</span>
                <span className="font-semibold text-blue-600">
                  {formatCurrency((propertyValue * downPaymentPercent) / 100)}
                </span>
                <span>50%</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700">
                Taxa de Juros: {interestRate}% ao ano
              </Label>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                max={25}
                min={5}
                step={0.5}
                className="w-full"
                data-testid="slider-interest-rate"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>5%</span>
                <span>25%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loan-term" className="text-sm font-semibold text-gray-700">
                Prazo do Financiamento
              </Label>
              <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                <SelectTrigger className="bg-white border-2 border-blue-200/50 focus:border-blue-400" data-testid="select-loan-term">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 anos</SelectItem>
                  <SelectItem value="20">20 anos</SelectItem>
                  <SelectItem value="25">25 anos</SelectItem>
                  <SelectItem value="30">30 anos</SelectItem>
                  <SelectItem value="35">35 anos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Resultado do Financiamento</h3>
              
              {/* Monthly Payment - Main Result */}
              <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm opacity-90">Prestação Mensal</p>
                    <p className={`text-3xl font-bold ${getAffordabilityColor(result.monthlyPayment)}`}>
                      {formatCurrency(result.monthlyPayment)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Other Results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Entrada</span>
                  </div>
                  <p className="text-lg font-bold text-green-600" data-testid="result-down-payment">
                    {formatCurrency(result.downPayment)}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-gray-200/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Valor Financiado</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600" data-testid="result-loan-amount">
                    {formatCurrency(result.loanAmount)}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-gray-200/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Percent className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-600">Total de Juros</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600" data-testid="result-total-interest">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-gray-200/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-600">Total a Pagar</span>
                  </div>
                  <p className="text-lg font-bold text-purple-600" data-testid="result-total-payment">
                    {formatCurrency(result.totalPayment)}
                  </p>
                </div>
              </div>

              {/* Affordability Indicator */}
              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-gray-200/50">
                <h4 className="font-semibold text-gray-800 mb-2">Indicador de Acessibilidade</h4>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      (result.monthlyPayment / 2000000) * 100 <= 30 
                        ? 'bg-green-500' 
                        : (result.monthlyPayment / 2000000) * 100 <= 40 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((result.monthlyPayment / 2000000) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {((result.monthlyPayment / 2000000) * 100).toFixed(1)}% da renda estimada
                </p>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                data-testid="button-apply-financing"
              >
                Solicitar Pré-aprovação
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}