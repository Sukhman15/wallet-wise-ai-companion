
import { useState, useEffect } from 'react';
import { Alert, AlertTriangle, ShoppingCart, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RefillItem {
  name: string;
  lastPurchase: string;
  averageDays: number;
  daysUntilRefill: number;
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
}

export const AutoRefillDetector = () => {
  const [refillItems, setRefillItems] = useState<RefillItem[]>([]);

  useEffect(() => {
    // Simulate AI analysis of purchase patterns
    const mockRefillData: RefillItem[] = [
      {
        name: 'Milk',
        lastPurchase: '2024-01-10',
        averageDays: 3,
        daysUntilRefill: 1,
        priority: 'high',
        estimatedCost: 429
      },
      {
        name: 'Bread',
        lastPurchase: '2024-01-12',
        averageDays: 5,
        daysUntilRefill: 2,
        priority: 'high',
        estimatedCost: 299
      },
      {
        name: 'Laundry Detergent',
        lastPurchase: '2024-01-01',
        averageDays: 30,
        daysUntilRefill: 15,
        priority: 'medium',
        estimatedCost: 899
      },
      {
        name: 'Toothpaste',
        lastPurchase: '2024-01-05',
        averageDays: 45,
        daysUntilRefill: 35,
        priority: 'low',
        estimatedCost: 349
      }
    ];
    setRefillItems(mockRefillData);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <ShoppingCart className="w-4 h-4" />;
      default: return <ShoppingCart className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mr-4">
            <Alert className="w-6 h-6 text-white" />
          </div>
          Smart Refill Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {refillItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${getPriorityColor(item.priority)} rounded-2xl flex items-center justify-center`}>
                {getPriorityIcon(item.priority)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                <div className="flex items-center space-x-3 mt-1">
                  <Badge className={getPriorityColor(item.priority)} variant="outline">
                    {item.priority} priority
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {item.daysUntilRefill} days left
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ₹{item.estimatedCost.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-gray-500">
                avg {item.averageDays} days
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
