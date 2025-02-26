
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { LoanData } from './LoanForm';

interface LoanListProps {
  loans: LoanData[];
  onExport: () => void;
}

const LoanList = ({ loans, onExport }: LoanListProps) => {
  return (
    <Card className="p-4 overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Empréstimos Cadastrados</h2>
        <Button
          onClick={onExport}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Prazo (meses)</TableHead>
              <TableHead>Taxa de Juros</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>{loan.name}</TableCell>
                <TableCell>{loan.cpf}</TableCell>
                <TableCell>{loan.email}</TableCell>
                <TableCell>R$ {loan.amount}</TableCell>
                <TableCell>{loan.months}</TableCell>
                <TableCell>{loan.interestRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default LoanList;
