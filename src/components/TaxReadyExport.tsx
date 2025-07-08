
import { useState } from 'react';
import { FileText, Download, Check, Filter, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const TaxReadyExport = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv');

  const categories = ['All', 'Business', 'Medical', 'Charitable', 'Educational'];
  
  const receipts = [
    {
      id: 1,
      merchant: 'Whole Foods Market',
      date: '2024-01-15',
      total: 7343.95,
      category: 'Business',
      taxDeductible: true,
      deductionType: 'Business Meal',
      items: ['Organic Bananas', 'Almond Milk', 'Chicken Breast']
    },
    {
      id: 2,
      merchant: 'Apollo Hospital',
      date: '2024-01-14',
      total: 15000.00,
      category: 'Medical',
      taxDeductible: true,
      deductionType: 'Medical Expense',
      items: ['Medical Consultation', 'Lab Tests']
    },
    {
      id: 3,
      merchant: 'Shell Gas Station',
      date: '2024-01-13',
      total: 3795.20,
      category: 'Business',
      taxDeductible: true,
      deductionType: 'Business Travel',
      items: ['Regular Gasoline']
    },
    {
      id: 4,
      merchant: 'Red Cross',
      date: '2024-01-12',
      total: 5000.00,
      category: 'Charitable',
      taxDeductible: true,
      deductionType: 'Charitable Donation',
      items: ['Donation']
    }
  ];

  const filteredReceipts = selectedCategory === 'All' 
    ? receipts 
    : receipts.filter(receipt => receipt.category === selectedCategory);

  const totalDeductible = filteredReceipts.reduce((sum, receipt) => sum + receipt.total, 0);

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV();
    } else {
      exportToPDF();
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Merchant', 'Amount', 'Category', 'Deduction Type', 'Items'];
    const csvContent = [
      headers.join(','),
      ...filteredReceipts.map(receipt => [
        receipt.date,
        receipt.merchant,
        receipt.total.toFixed(2),
        receipt.category,
        receipt.deductionType,
        receipt.items.join('; ')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax-deductible-receipts-${new Date().getFullYear()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // In a real implementation, you would use a PDF library like jsPDF
    const pdfContent = `
TAX DEDUCTIBLE RECEIPTS - ${new Date().getFullYear()}

Total Deductible Amount: ₹${totalDeductible.toLocaleString('en-IN', { minimumFractionDigits: 2 })}

${filteredReceipts.map(receipt => `
Date: ${receipt.date}
Merchant: ${receipt.merchant}
Amount: ₹${receipt.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
Category: ${receipt.category}
Deduction Type: ${receipt.deductionType}
Items: ${receipt.items.join(', ')}
---
`).join('\n')}
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax-deductible-receipts-${new Date().getFullYear()}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Tax-Ready Export</h1>
          <p className="text-xl text-gray-600">Export categorized receipts for tax filing</p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Total Tax Deductible</h3>
                <p className="text-4xl font-bold text-green-600">
                  ₹{totalDeductible.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-gray-600 mt-2">{filteredReceipts.length} receipts selected</p>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Controls */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <Filter className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-700">Filter</span>
                </div>
                <div className="flex space-x-2">
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

              {/* Export Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant={exportFormat === 'csv' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExportFormat('csv')}
                    className="rounded-full"
                  >
                    CSV
                  </Button>
                  <Button
                    variant={exportFormat === 'pdf' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setExportFormat('pdf')}
                    className="rounded-full"
                  >
                    PDF
                  </Button>
                </div>
                <Button
                  onClick={handleExport}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Export {exportFormat.toUpperCase()}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipts List */}
        <div className="space-y-6">
          {filteredReceipts.map((receipt) => (
            <Card key={receipt.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{receipt.merchant}</h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {receipt.date}
                        </span>
                        <Badge className={`
                          ${receipt.category === 'Business' ? 'bg-blue-100 text-blue-700' : ''}
                          ${receipt.category === 'Medical' ? 'bg-red-100 text-red-700' : ''}
                          ${receipt.category === 'Charitable' ? 'bg-purple-100 text-purple-700' : ''}
                          ${receipt.category === 'Educational' ? 'bg-yellow-100 text-yellow-700' : ''}
                          border-0
                        `}>
                          {receipt.category}
                        </Badge>
                        <Badge className="bg-green-100 text-green-700 border-0">
                          {receipt.deductionType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{receipt.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Tax Deductible</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Items</h4>
                  <p className="text-gray-600">{receipt.items.join(', ')}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
