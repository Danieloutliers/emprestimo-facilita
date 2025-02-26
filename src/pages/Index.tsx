
import React, { useState } from 'react';
import LoanCalculator from '@/components/LoanCalculator';
import LoanForm from '@/components/LoanForm';
import LoanList from '@/components/LoanList';
import LoginScreen from '@/components/LoginScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LoanData } from '@/components/LoanForm';
import { toast } from 'sonner';

const Index = () => {
  const [loans, setLoans] = useState<LoanData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoanSubmit = (data: LoanData) => {
    setLoans([...loans, data]);
  };

  const exportToCSV = () => {
    const headers = ['Nome,CPF,Email,Telefone,Valor,Prazo,Taxa de Juros\n'];
    const csvContent = loans.map(loan => 
      `${loan.name},${loan.cpf},${loan.email},${loan.phone},${loan.amount},${loan.months},${loan.interestRate}`
    ).join('\n');

    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'emprestimos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Arquivo exportado com sucesso!');
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">Sistema de Empréstimos</h1>
          <p className="text-gray-600">Calcule, cadastre e gerencie empréstimos de forma simples</p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">Calculadora</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
            <TabsTrigger value="list">Listar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="mt-6">
            <LoanCalculator />
          </TabsContent>
          
          <TabsContent value="register" className="mt-6">
            <LoanForm onSubmit={handleLoanSubmit} />
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            <LoanList loans={loans} onExport={exportToCSV} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
