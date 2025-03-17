
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface InverseCalculatorFormProps {
  setShowReport: (show: boolean) => void;
  setReportData: (data: {
    amount: number;
    months: number;
    interestRate: number;
    monthlyPayment: number;
  }) => void;
}

const InverseCalculatorForm: React.FC<InverseCalculatorFormProps> = ({
  setShowReport,
  setReportData
}) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [monthlyPaymentInput, setMonthlyPaymentInput] = useState('');
  const [loanInterestRate, setLoanInterestRate] = useState('');
  const [calculatedMonths, setCalculatedMonths] = useState<number | null>(null);
  const [inverseRecoveryMonths, setInverseRecoveryMonths] = useState<number | null>(null);
  const [inverseMonthlyPayment, setInverseMonthlyPayment] = useState<number | null>(null);

  const calculateMonths = () => {
    const principal = parseFloat(loanAmount);
    const payment = parseFloat(monthlyPaymentInput);
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
    
    // Cálculo de quando o principal será recuperado
    const monthsToRecover = Math.ceil(principal / payment);
    
    setCalculatedMonths(roundedTime);
    setInverseMonthlyPayment(payment);
    setInverseRecoveryMonths(monthsToRecover > roundedTime ? roundedTime : monthsToRecover);
    
    setReportData({
      amount: principal,
      months: roundedTime,
      interestRate: parseFloat(loanInterestRate),
      monthlyPayment: payment
    });
    
    toast.success('Cálculo realizado com sucesso!');
  };

  return (
    <div className="space-y-4">
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
          value={monthlyPaymentInput}
          onChange={(e) => setMonthlyPaymentInput(e.target.value)}
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
        <div className="mt-4 p-4 bg-emerald-50 rounded-lg space-y-2">
          <p className="text-emerald-800 font-medium">
            Prazo Necessário: {calculatedMonths} {calculatedMonths === 1 ? 'mês' : 'meses'}
          </p>
          <p className="text-emerald-600 text-sm">
            Valor Total: R$ {(inverseMonthlyPayment! * calculatedMonths).toFixed(2)}
          </p>
          <p className="text-emerald-600 text-sm">
            Recuperação do Principal: {inverseRecoveryMonths} {inverseRecoveryMonths === 1 ? 'mês' : 'meses'}
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

export default InverseCalculatorForm;
