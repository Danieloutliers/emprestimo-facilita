
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoanCalculator = () => {
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  
  // Novos estados para o cálculo inverso
  const [loanAmount, setLoanAmount] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [loanInterestRate, setLoanInterestRate] = useState('');
  const [calculatedMonths, setCalculatedMonths] = useState<number | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(months);

    if (!principal || !rate || !time) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Cálculo de juros simples: Principal + (Principal * Taxa * Tempo)
    const totalInterest = principal * rate * time;
    const totalAmount = principal + totalInterest;
    setResult(totalAmount);
    toast.success('Cálculo realizado com sucesso!');
  };

  const calculateMonths = () => {
    const principal = parseFloat(loanAmount);
    const payment = parseFloat(monthlyPayment);
    const rate = parseFloat(loanInterestRate) / 100;

    if (!principal || !payment || !rate) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Para juros simples, podemos derivar o tempo da fórmula:
    // payment = (principal + principal * rate * time) / time
    // Resolvendo para time:
    // time = principal / (payment - principal * rate)
    
    const denominator = payment - (principal * rate);
    
    if (denominator <= 0) {
      toast.error('O valor da parcela é muito baixo para cobrir os juros mensais');
      return;
    }
    
    const time = principal / denominator;
    
    // Arredonda para cima para garantir que todas as parcelas sejam pagas
    const roundedTime = Math.ceil(time);
    setCalculatedMonths(roundedTime);
    toast.success('Cálculo realizado com sucesso!');
  };

  return (
    <Card className="p-6 space-y-4 max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-gray-200">
      <Tabs defaultValue="normal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="normal">Calcular Valor</TabsTrigger>
          <TabsTrigger value="reverse">Calcular Prazo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="normal" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor do Empréstimo (R$)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ex: 5000"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="months">Período (meses)</Label>
            <Input
              id="months"
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="Ex: 12"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">Taxa de Juros (% ao mês)</Label>
            <Input
              id="interest"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Ex: 1.5"
              className="w-full"
            />
          </div>

          <Button 
            onClick={calculateLoan}
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            Calcular
          </Button>

          {result && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
              <p className="text-emerald-800 font-medium">
                Valor Total: R$ {result.toFixed(2)}
              </p>
              <p className="text-emerald-600 text-sm">
                Parcela Mensal: R$ {(result / parseFloat(months)).toFixed(2)}
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reverse" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount">Valor do Empréstimo (R$)</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Ex: 5000"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyPayment">Valor da Parcela (R$)</Label>
            <Input
              id="monthlyPayment"
              type="number"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              placeholder="Ex: 500"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanInterest">Taxa de Juros (% ao mês)</Label>
            <Input
              id="loanInterest"
              type="number"
              value={loanInterestRate}
              onChange={(e) => setLoanInterestRate(e.target.value)}
              placeholder="Ex: 1.5"
              className="w-full"
            />
          </div>

          <Button 
            onClick={calculateMonths}
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
          >
            Calcular Prazo
          </Button>

          {calculatedMonths !== null && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
              <p className="text-emerald-800 font-medium">
                Prazo Necessário: {calculatedMonths} {calculatedMonths === 1 ? 'mês' : 'meses'}
              </p>
              <p className="text-emerald-600 text-sm">
                Valor Total: R$ {(parseFloat(monthlyPayment) * calculatedMonths).toFixed(2)}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default LoanCalculator;
