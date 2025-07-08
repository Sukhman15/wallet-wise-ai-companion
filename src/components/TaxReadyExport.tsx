
import React, { useState } from 'react';
import { FileText, Download, Calculator, CheckCircle, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TaxReceiptItem {
  id: number;
  merchant: string;
  date: string;
  amount: number;
  category: string;
  taxDeductible: boolean;
  deductionType: 'Business' | 'Medical' | 'Education' | 'Charity' | 'Other' | null;
}

export const TaxReadyExport = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showExportOptions, setShowExportOptions] = useState(false);

  const sampleReceipts: TaxReceiptItem[] = [
    {
      id: 1,
      merchant: 'Medical Center Clinic',
      date: '2024-01-15',
      amount: 12500.00,
      category: 'Healthcare',
      taxDeductible: true,
      deductionType: 'Medical'
    },
    {
      id: 2,
      merchant: 'Office Supplies Store',
      date: '2024-01-14',
      amount: 4250.75,
      category: 'Business Supplies',
      taxDeductible: true,
      deductionType: 'Business'
    },
    {
      id: 3,
      merchant: 'University Bookstore',
      date: '2024-01-13',
      amount: 8900.50,
      category: 'Education',
      taxDeductible: true,
      deductionType: 'Education'
    },
    {
      id: 4,
      merchant: 'Grocery Store',
      date: '2024-01-12',
      amount: 3200.25,
      category: 'Food',
      taxDeductible: false,
      deductionType: null
    },
    {
      id: 5,
      merchant: 'Red Cross Donation',
      date: '2024-01-11',
      amount: 5000.00,
      category: 'Charity',
      taxDeductible: true,
      deductionType: 'Charity'
    }
  ];

  const categories = ['All', 'Tax Deductible', 'Business', 'Medical', 'Education', 'Charity'];
  
  const filteredReceipts = sampleReceipts.filter(receipt => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Tax Deductible') return receipt.taxDeductible;
    return receipt.deductionType === selectedCategory;
  });

  const totalDeductible = sampleReceipts
    .filter(r => r.taxDeductible)
    .reduce((sum, r) => sum + r.amount, 0);

  const handleExportCSV = () => {
    const csvData = filteredReceipts.map(receipt => ({
      Date: receipt.date,
      Merchant: receipt.merchant,
      Amount: receipt.amount,
      Category: receipt.category,
      'Tax Deductible': receipt.taxDeductible ? 'Yes' : 'No',
      'Deduction Type': receipt.deductionType || 'N/A'
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax-receipts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    // Simulate PDF generation
    alert('PDF export feature would generate a formatted tax report with all deductible receipts and categories.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Tax-Ready Export</h1>
          <p className="text-xl text-gray-600">Categorize and export your receipts for tax filing</p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
              <Calculator className="w-6 h-6 mr-3 text-green-600" />
              Tax Deduction Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                <div className="text-3xl font-bold text-green-700">
                  ₹{totalDeductible.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-green-600 font-medium">Total Deductible</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <div className="text-3xl font-bold text-blue-700">
                  {sampleReceipts.filter(r => r.deductionType === 'Business').length}
                </div>
                <div className="text-sm text-blue-600 font-medium">Business Expenses</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl">
                <div className="text-3xl font-bold text-red-700">
                  {sampleReceipts.filter(r => r.deductionType === 'Medical').length}
                </div>
                <div className="text-sm text-red-600 font-medium">Medical Expenses</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                <div className="text-3xl font-bold text-purple-700">
                  {sampleReceipts.filter(r => r.taxDeductible).length}
                </div>
                <div className="text-sm text-purple-600 font-medium">Total Deductible Items</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter and Export Actions */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">Filter by Category</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        transition-all duration-300 rounded-full px-4 py-2
                        ${selectedCategory === category 
                          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg" 
                          : "hover:bg-blue-50 border-blue-200"
                        }
                      `}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  onClick={handleExportCSV}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  onClick={handleExportPDF}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipts List */}
        <div className="space-y-4">
          {filteredReceipts.map((receipt) => (
            <Card key={receipt.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      receipt.taxDeductible 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-br from-gray-400 to-gray-500'
                    }`}>
                      {receipt.taxDeductible ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <FileText className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{receipt.merchant}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-gray-600">{receipt.date}</span>
                        <Badge 
                          className={`${
                            receipt.taxDeductible 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          {receipt.category}
                        </Badge>
                        {receipt.deductionType && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {receipt.deductionType}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{receipt.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    {receipt.taxDeductible && (
                      <div className="text-sm text-green-600 font-medium">Tax Deductible</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReceipts.length === 0 && (
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              No receipts found for the selected category filter.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
