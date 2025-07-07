
import { useState } from 'react';
import { ShoppingCart, Calendar, CreditCard, Tag, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ReceiptAnalysisProps {
  receiptData: any;
  onCreatePass: () => void;
}

export const ReceiptAnalysis = ({ receiptData, onCreatePass }: ReceiptAnalysisProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = receiptData.items.reduce((acc: any, item: any) => {
    if (!acc[item.category]) {
      acc[item.category] = { items: [], total: 0 };
    }
    acc[item.category].items.push(item);
    acc[item.category].total += item.price;
    return acc;
  }, {});

  const categoryColors: { [key: string]: string } = {
    'Groceries': 'bg-green-100 text-green-800 border-green-200',
    'Household': 'bg-blue-100 text-blue-800 border-blue-200',
    'Personal Care': 'bg-purple-100 text-purple-800 border-purple-200',
  };

  return (
    <div className="space-y-6">
      {/* Receipt Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {receiptData.merchant}
              </CardTitle>
              <CardDescription className="text-lg mt-1">
                Receipt Analysis Complete
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                ${receiptData.total.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {receiptData.date}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                Items ({receiptData.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {receiptData.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={categoryColors[item.category] || 'bg-gray-100 text-gray-800'}
                        >
                          {item.category}
                        </Badge>
                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary & Actions */}
        <div className="space-y-4">
          {/* Receipt Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Receipt Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${receiptData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">${receiptData.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-600">${receiptData.total.toFixed(2)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <CreditCard className="w-4 h-4 mr-1" />
                {receiptData.paymentMethod}
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Tag className="w-5 h-5 mr-2 text-purple-600" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(categories).map(([category, data]: [string, any]) => (
                <div key={category} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={categoryColors[category] || 'bg-gray-100 text-gray-800'}
                    >
                      {category}
                    </Badge>
                    <span className="text-sm text-gray-600">({data.items.length})</span>
                  </div>
                  <span className="font-medium text-green-600">
                    ${data.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-yellow-800">
                <TrendingUp className="w-5 h-5 mr-2" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-yellow-700 space-y-2">
              <p>• You spent 68% on groceries - great for healthy eating!</p>
              <p>• Consider buying household items in bulk to save money</p>
              <p>• This receipt is 12% above your weekly average</p>
            </CardContent>
          </Card>

          {/* Action Button */}
          <Button 
            onClick={onCreatePass} 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
            size="lg"
          >
            Create Google Wallet Pass
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
