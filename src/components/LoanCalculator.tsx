
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const LoanCalculator = () => {
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(months);

    if (!principal || !rate || !time) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    // Fórmula de juros compostos com prestações mensais
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = monthlyPayment * time;
    setResult(totalAmount);
    toast.success('Cálculo realizado com sucesso!');
  };

  return (
    <Card className="p-6 space-y-4 max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-gray-200">
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
    </Card>
  );
};

export default LoanCalculator;
