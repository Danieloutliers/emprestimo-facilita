
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoanReport from './LoanReport';
import NormalCalculatorForm from './calculator/NormalCalculatorForm';
import InverseCalculatorForm from './calculator/InverseCalculatorForm';

interface ReportData {
  amount: number;
  months: number;
  interestRate: number;
  monthlyPayment: number;
}

const LoanCalculator = () => {
  const [startDate] = useState<Date>(new Date());
  const [showReport, setShowReport] = useState(false);
  const [showInverseReport, setShowInverseReport] = useState(false);
  const [normalReportData, setNormalReportData] = useState<ReportData | null>(null);
  const [inverseReportData, setInverseReportData] = useState<ReportData | null>(null);
  const [activeTab, setActiveTab] = useState("normal");

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-4 max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-gray-200">
        <Tabs 
          defaultValue="normal" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="normal">Calcular Valor</TabsTrigger>
            <TabsTrigger value="reverse">Calcular Prazo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="normal" className="space-y-4 mt-4">
            <NormalCalculatorForm 
              setShowReport={setShowReport}
              setReportData={(data) => setNormalReportData(data)}
            />
          </TabsContent>
          
          <TabsContent value="reverse" className="space-y-4 mt-4">
            <InverseCalculatorForm 
              setShowReport={setShowInverseReport}
              setReportData={(data) => setInverseReportData(data)}
            />
          </TabsContent>
        </Tabs>
      </Card>

      {showReport && normalReportData && activeTab === "normal" && (
        <LoanReport
          amount={normalReportData.amount}
          months={normalReportData.months}
          interestRate={normalReportData.interestRate}
          startDate={startDate}
          monthlyPayment={normalReportData.monthlyPayment}
          isVisible={showReport}
          onClose={() => setShowReport(false)}
        />
      )}

      {showInverseReport && inverseReportData && activeTab === "reverse" && (
        <LoanReport
          amount={inverseReportData.amount}
          months={inverseReportData.months}
          interestRate={inverseReportData.interestRate}
          startDate={startDate}
          monthlyPayment={inverseReportData.monthlyPayment}
          isVisible={showInverseReport}
          onClose={() => setShowInverseReport(false)}
        />
      )}
    </div>
  );
};

export default LoanCalculator;
