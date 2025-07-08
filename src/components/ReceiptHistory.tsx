
import { useState } from 'react';
import { Receipt, ShoppingCart, Coffee, Car, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ReceiptHistory = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Groceries', 'Dining', 'Transportation'];
  
  const receipts = [
    {
      id: 1,
      merchant: 'Whole Foods Market',
      date: '2024-01-15',
      total: 7343.95,
      category: 'Groceries',
      items: [
        { name: '2x Organic Bananas', price: 419.15 },
        { name: '1x Almond Milk', price: 461.05 },
        { name: '1x Chicken Breast', price: 1090.85 }
      ],
      icon: ShoppingCart,
      color: 'text-green-600',
      bgGradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      merchant: 'Starbucks',
      date: '2024-01-14',
      total: 1070.75,
      category: 'Coffee & Dining',
      items: [
        { name: '1x Caffe Latte', price: 440.75 },
        { name: '1x Blueberry Muffin', price: 314.75 },
        { name: '1x Extra Shot', price: 62.95 }
      ],
      icon: Coffee,
      color: 'text-red-600',
      bgGradient: 'from-red-500 to-pink-500'
    },
    {
      id: 3,
      merchant: 'Shell Gas Station',
      date: '2024-01-13',
      total: 3795.20,
      category: 'Transportation',
      items: [
        { name: '1x Regular Gasoline', price: 3795.20 }
      ],
      icon: Car,
      color: 'text-blue-600',
      bgGradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const filteredReceipts = selectedCategory === 'All' 
    ? receipts 
    : receipts.filter(receipt => receipt.category.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Receipt History</h1>
          <p className="text-xl text-gray-600">All your digitized receipts with smart categorization</p>
        </div>

        {/* Category Filter with Premium Design */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-700">Filter by Category</span>
              </div>
              <div className="flex space-x-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      transition-all duration-300 rounded-full px-6 py-2
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
          </CardContent>
        </Card>

        {/* Receipts List with Premium Cards */}
        <div className="space-y-6">
          {filteredReceipts.map((receipt) => {
            const Icon = receipt.icon;
            return (
              <Card key={receipt.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${receipt.bgGradient} rounded-3xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{receipt.merchant}</h3>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                            {receipt.date}
                          </span>
                          <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 px-3 py-1">
                            {receipt.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        ₹{receipt.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-sm text-gray-500">{receipt.items.length} items</div>
                    </div>
                  </div>

                  {/* Items with Enhanced Design */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Items Breakdown</h4>
                    <div className="space-y-3">
                      {receipt.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 px-4 bg-white rounded-xl shadow-sm">
                          <span className="text-gray-700 font-medium">{item.name}</span>
                          <span className="font-bold text-gray-900">₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
