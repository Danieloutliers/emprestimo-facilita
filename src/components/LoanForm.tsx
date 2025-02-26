
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export interface LoanData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  amount: number;
  months: number;
  interestRate: number;
}

interface LoanFormProps {
  onSubmit: (data: LoanData) => void;
}

const LoanForm = ({ onSubmit }: LoanFormProps) => {
  const [formData, setFormData] = useState<LoanData>({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    amount: 0,
    months: 0,
    interestRate: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.cpf || !formData.email || !formData.amount) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    onSubmit(formData);
    toast.success('Empréstimo cadastrado com sucesso!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6 space-y-4 max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-gray-200">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(00) 00000-0000"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Valor do Empréstimo</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Digite o valor"
            className="w-full"
          />
        </div>

        <Button 
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
        >
          Cadastrar Empréstimo
        </Button>
      </Card>
    </form>
  );
};

export default LoanForm;
