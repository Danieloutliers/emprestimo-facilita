
import React from 'react';
import { format, addMonths } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LoanReportProps {
  amount: number;
  months: number;
  interestRate: number;
  startDate?: Date;
  monthlyPayment: number;
  isVisible: boolean;
  onClose: () => void;
}

const LoanReport: React.FC<LoanReportProps> = ({
  amount,
  months,
  interestRate,
  startDate = new Date(),
  monthlyPayment,
  isVisible,
  onClose
}) => {
  if (!isVisible) return null;

  const createInstallments = () => {
    const installments = [];
    const totalAmount = monthlyPayment * months;
    const latePaymentFee = monthlyPayment * 0.05; // 5% late payment fee

    for (let i = 0; i < months; i++) {
      const dueDate = addMonths(startDate, i);
      installments.push({
        number: i + 1,
        dueDate: format(dueDate, 'dd/MM/yyyy'),
        amount: monthlyPayment.toFixed(2),
        lateFee: latePaymentFee.toFixed(2),
        totalWithLateFee: (monthlyPayment + latePaymentFee).toFixed(2)
      });
    }

    return installments;
  };

  const installments = createInstallments();

  const printReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Não foi possível abrir a janela de impressão. Por favor, verifique as configurações do seu navegador.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Relatório de Empréstimo</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2 { color: #10b981; }
            .summary { margin-bottom: 20px; padding: 10px; background-color: #f0f9f6; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #10b981; color: white; }
            .footer { margin-top: 30px; font-size: 0.8em; color: #666; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>Relatório de Empréstimo</h1>
          <div class="summary">
            <h2>Resumo</h2>
            <p><strong>Valor do Empréstimo:</strong> R$ ${amount.toFixed(2)}</p>
            <p><strong>Taxa de Juros:</strong> ${interestRate}% ao mês</p>
            <p><strong>Prazo:</strong> ${months} meses</p>
            <p><strong>Parcela Mensal:</strong> R$ ${monthlyPayment.toFixed(2)}</p>
            <p><strong>Valor Total:</strong> R$ ${(monthlyPayment * months).toFixed(2)}</p>
          </div>
          
          <h2>Cronograma de Pagamentos</h2>
          <table>
            <thead>
              <tr>
                <th>Parcela</th>
                <th>Data de Vencimento</th>
                <th>Valor (R$)</th>
                <th>Multa por Atraso (5%)</th>
                <th>Total com Multa (R$)</th>
              </tr>
            </thead>
            <tbody>
              ${installments.map(inst => `
                <tr>
                  <td>${inst.number}</td>
                  <td>${inst.dueDate}</td>
                  <td>R$ ${inst.amount}</td>
                  <td>R$ ${inst.lateFee}</td>
                  <td>R$ ${inst.totalWithLateFee}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            <p>Este documento é apenas informativo e não representa um contrato legal.</p>
            <p>Data de emissão: ${format(new Date(), 'dd/MM/yyyy')}</p>
          </div>
          
          <button onclick="window.print()">Imprimir</button>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  return (
    <Card className="p-6 space-y-4 max-w-4xl mx-auto bg-white/90 backdrop-blur-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Relatório de Empréstimo</h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
          <Button onClick={printReport}>Imprimir</Button>
        </div>
      </div>

      <div className="bg-emerald-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">Resumo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p><span className="font-medium">Valor do Empréstimo:</span> R$ {amount.toFixed(2)}</p>
          <p><span className="font-medium">Taxa de Juros:</span> {interestRate}% ao mês</p>
          <p><span className="font-medium">Prazo:</span> {months} meses</p>
          <p><span className="font-medium">Parcela Mensal:</span> R$ {monthlyPayment.toFixed(2)}</p>
          <p><span className="font-medium">Valor Total:</span> R$ {(monthlyPayment * months).toFixed(2)}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="p-2 text-left">Parcela</th>
              <th className="p-2 text-left">Data de Vencimento</th>
              <th className="p-2 text-left">Valor (R$)</th>
              <th className="p-2 text-left">Multa por Atraso (5%)</th>
              <th className="p-2 text-left">Total com Multa (R$)</th>
            </tr>
          </thead>
          <tbody>
            {installments.map((installment, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-2 border-b">{installment.number}</td>
                <td className="p-2 border-b">{installment.dueDate}</td>
                <td className="p-2 border-b">R$ {installment.amount}</td>
                <td className="p-2 border-b">R$ {installment.lateFee}</td>
                <td className="p-2 border-b">R$ {installment.totalWithLateFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <p>Este documento é apenas informativo e não representa um contrato legal.</p>
        <p>Data de emissão: {format(new Date(), 'dd/MM/yyyy')}</p>
      </div>
    </Card>
  );
};

export default LoanReport;
