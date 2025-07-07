
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
      total: 87.45,
      category: 'Groceries',
      items: [
        { name: '2x Organic Bananas', price: 4.99 },
        { name: '1x Almond Milk', price: 5.49 },
        { name: '1x Chicken Breast', price: 12.99 }
      ],
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      id: 2,
      merchant: 'Starbucks',
      date: '2024-01-14',
      total: 12.75,
      category: 'Coffee & Dining',
      items: [
        { name: '1x Caffe Latte', price: 5.25 },
        { name: '1x Blueberry Muffin', price: 3.75 },
        { name: '1x Extra Shot', price: 0.75 }
      ],
      icon: Coffee,
      color: 'text-red-600'
    },
    {
      id: 3,
      merchant: 'Shell Gas Station',
      date: '2024-01-13',
      total: 45.2,
      category: 'Transportation',
      items: [
        { name: '1x Regular Gasoline', price: 45.2 }
      ],
      icon: Car,
      color: 'text-blue-600'
    }
  ];

  const filteredReceipts = selectedCategory === 'All' 
    ? receipts 
    : receipts.filter(receipt => receipt.category.includes(selectedCategory));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipt History</h1>
        <p className="text-gray-600">All your digitized receipts</p>
      </div>

      {/* Category Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-blue-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receipts List */}
      <div className="space-y-4">
        {filteredReceipts.map((receipt) => {
          const Icon = receipt.icon;
          return (
            <Card key={receipt.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-gray-50`}>
                      <Icon className={`h-6 w-6 ${receipt.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{receipt.merchant}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">{receipt.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {receipt.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${receipt.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    {receipt.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
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
  );
};
