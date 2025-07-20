
import React from 'react';
import LoanCalculator from '@/components/LoanCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-800">Calculadora de Empréstimos</h1>
          <p className="text-gray-600">Calcule empréstimos de forma simples e rápida</p>
        </div>

        <LoanCalculator />
      </div>
    </div>
  );
};

export default Index;
