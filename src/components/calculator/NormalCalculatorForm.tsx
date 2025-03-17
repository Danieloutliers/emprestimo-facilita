
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface NormalCalculatorFormProps {
  setShowReport: (show: boolean) => void;
  setReportData: (data: {
    amount: number;
    months: number;
    interestRate: number;
    monthlyPayment: number;
  }) => void;
}

const NormalCalculatorForm: React.FC<NormalCalculatorFormProps> = ({
  setShowReport,
  setReportData
}) => {
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [recoveryMonths, setRecoveryMonths] = useState<number | null>(null);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

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
    const payment = totalAmount / time;
    
    // Cálculo de quando o principal será recuperado
    const monthsToRecover = Math.ceil(principal / payment);
    
    setResult(totalAmount);
    setMonthlyPayment(payment);
    setRecoveryMonths(monthsToRecover > time ? time : monthsToRecover);
    
    setReportData({
      amount: principal,
      months: time,
      interestRate: parseFloat(interestRate),
      monthlyPayment: payment
    });
    
    toast.success('Cálculo realizado com sucesso!');
  };

  return (
    <div className="space-y-4">
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
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg space-y-2">
          <p className="text-emerald-800 font-medium">
            Valor Total: R$ {result.toFixed(2)}
          </p>
          <p className="text-emerald-600 text-sm">
            Parcela Mensal: R$ {monthlyPayment?.toFixed(2)}
          </p>
          <p className="text-emerald-600 text-sm">
            Recuperação do Principal: {recoveryMonths} {recoveryMonths === 1 ? 'mês' : 'meses'}
          </p>
          <Button 
            variant="outline" 
            className="w-full mt-2 text-emerald-600 border-emerald-600"
            onClick={() => setShowReport(true)}
          >
            Gerar Relatório de Parcelas
          </Button>
        </div>
      )}
    </div>
  );
};

export default NormalCalculatorForm;
