
import { useState } from 'react';
import { CreditCard, AlertTriangle, ShoppingCart, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const WalletPasses = () => {
  const [passes] = useState([
    {
      id: 1,
      type: 'Spending Alert',
      title: 'Coffee Spending Alert',
      description: "You're spending 15% more on coffee this month. Consider brewing at home to save $47/month.",
      date: '2024-01-15',
      status: 'active',
      color: 'bg-red-50 border-red-200',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      category: 'Insight'
    },
    {
      id: 2,
      type: 'Shopping List',
      title: 'Weekly Shopping List',
      description: 'Milk, Bread, Eggs, Cheese, Tomatoes, Onions, Rice, Chicken',
      date: '2024-01-14',
      status: 'active',
      color: 'bg-yellow-50 border-yellow-200',
      icon: ShoppingCart,
      iconColor: 'text-yellow-600',
      category: 'Shopping'
    }
  ]);

  const handleAddToWallet = (passId: number) => {
    // Simulate adding to Google Wallet
    console.log(`Adding pass ${passId} to Google Wallet`);
    alert('Pass added to Google Wallet! (This is a demo)');
  };

  const handleCreatePass = () => {
    alert('Create new pass feature coming soon!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Google Wallet Passes</h1>
        <p className="text-gray-600">Your digital receipts and insights</p>
      </div>

      {/* Passes List */}
      <div className="space-y-4 mb-6">
        {passes.map((pass) => {
          const Icon = pass.icon;
          return (
            <Card key={pass.id} className={`${pass.color} hover:shadow-md transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full bg-white`}>
                      <Icon className={`h-6 w-6 ${pass.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{pass.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {pass.category}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{pass.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{pass.date}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handleAddToWallet(pass.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Add to Wallet →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create Smart Pass Section */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <Plus className="w-12 h-12 mx-auto mb-4 text-green-100" />
            <h3 className="text-xl font-bold mb-2">Create Smart Pass</h3>
            <p className="text-green-100 mb-6">
              Generate shopping lists, budget alerts, and spending insights as Google Wallet passes
            </p>
            <Button 
              onClick={handleCreatePass}
              className="bg-white text-green-600 hover:bg-green-50"
            >
              Create Pass
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
