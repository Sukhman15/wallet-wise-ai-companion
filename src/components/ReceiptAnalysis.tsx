
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

  // Convert prices to INR
  const convertedReceiptData = {
    ...receiptData,
    total: receiptData.total * 84, // USD to INR conversion
    subtotal: receiptData.subtotal * 84,
    tax: receiptData.tax * 84,
    items: receiptData.items.map((item: any) => ({
      ...item,
      price: item.price * 84
    }))
  };

  const categories = convertedReceiptData.items.reduce((acc: any, item: any) => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Receipt Header with Premium Design */}
        <Card className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white border-0 shadow-2xl">
          <CardHeader className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-4xl font-bold mb-2 text-white">
                  {convertedReceiptData.merchant}
                </CardTitle>
                <CardDescription className="text-2xl text-blue-100">
                  Receipt Analysis Complete ✨
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-white mb-2">
                  ₹{convertedReceiptData.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-lg text-blue-100 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {convertedReceiptData.date}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List with Enhanced Design */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  Items ({convertedReceiptData.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {convertedReceiptData.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-md transition-all duration-300">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 text-lg mb-2">{item.name}</div>
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant="outline" 
                            className={`${categoryColors[item.category] || 'bg-gray-100 text-gray-800'} px-3 py-1 font-medium`}
                          >
                            {item.category}
                          </Badge>
                          <span className="text-sm bg-white px-3 py-1 rounded-full text-gray-600 font-medium">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary & Actions with Premium Cards */}
          <div className="space-y-6">
            {/* Receipt Summary */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Receipt Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-lg">Subtotal:</span>
                  <span className="font-bold text-lg">₹{convertedReceiptData.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600 text-lg">Tax:</span>
                  <span className="font-bold text-lg">₹{convertedReceiptData.tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-2xl font-bold py-2">
                  <span>Total:</span>
                  <span className="text-green-600">₹{convertedReceiptData.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center text-lg text-gray-600 mt-4 bg-gray-50 p-3 rounded-xl">
                  <CreditCard className="w-5 h-5 mr-2" />
                  {convertedReceiptData.paymentMethod}
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(categories).map(([category, data]: [string, any]) => (
                  <div key={category} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant="outline" 
                        className={`${categoryColors[category] || 'bg-gray-100 text-gray-800'} px-3 py-1 font-medium`}
                      >
                        {category}
                      </Badge>
                      <span className="text-sm bg-white px-2 py-1 rounded-full text-gray-600">
                        ({data.items.length})
                      </span>
                    </div>
                    <span className="font-bold text-green-600 text-lg">
                      ₹{data.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gradient-to-br from-yellow-100 to-orange-100 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center text-yellow-800">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700 space-y-3">
                <p className="flex items-start space-x-2 text-base">
                  <span>💚</span>
                  <span>You spent 68% on groceries - excellent for healthy eating!</span>
                </p>
                <p className="flex items-start space-x-2 text-base">
                  <span>💡</span>
                  <span>Consider buying household items in bulk to save ₹840/month</span>
                </p>
                <p className="flex items-start space-x-2 text-base">
                  <span>📊</span>
                  <span>This receipt is 12% above your weekly average</span>
                </p>
              </CardContent>
            </Card>

            {/* Action Button */}
            <Button 
              onClick={onCreatePass} 
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-xl"
              size="lg"
            >
              Create Google Wallet Pass
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
