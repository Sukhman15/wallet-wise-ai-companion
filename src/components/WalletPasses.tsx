
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
      description: "You're spending 15% more on coffee this month. Consider brewing at home to save ₹3,943/month.",
      date: '2024-01-15',
      status: 'active',
      color: 'bg-gradient-to-br from-red-50 to-pink-50',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      iconBg: 'from-red-500 to-pink-500',
      category: 'Insight'
    },
    {
      id: 2,
      type: 'Shopping List',
      title: 'Weekly Shopping List',
      description: 'Milk, Bread, Eggs, Cheese, Tomatoes, Onions, Rice, Chicken - Total Budget: ₹2,500',
      date: '2024-01-14',
      status: 'active',
      color: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      icon: ShoppingCart,
      iconColor: 'text-yellow-600',
      iconBg: 'from-yellow-500 to-orange-500',
      category: 'Shopping'
    }
  ]);

  const handleAddToWallet = (passId: number) => {
    console.log(`Adding pass ${passId} to Google Wallet`);
    alert('Pass added to Google Wallet! (This is a demo)');
  };

  const handleCreatePass = () => {
    alert('Create new pass feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Google Wallet Passes</h1>
          <p className="text-xl text-gray-600">Your digital receipts and intelligent insights</p>
        </div>

        {/* Passes List with Premium Design */}
        <div className="space-y-6 mb-8">
          {passes.map((pass) => {
            const Icon = pass.icon;
            return (
              <Card key={pass.id} className={`${pass.color} border-0 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${pass.iconBg} rounded-3xl flex items-center justify-center shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">{pass.title}</h3>
                          <Badge className="bg-white/80 text-gray-700 border-0 px-3 py-1 font-medium">
                            {pass.category}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-6 text-lg leading-relaxed">{pass.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm bg-white/60 px-3 py-1 rounded-full text-gray-600 font-medium">
                              {pass.date}
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                              Active
                            </span>
                          </div>
                          <Button 
                            onClick={() => handleAddToWallet(pass.id)}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg px-6 py-2 rounded-full"
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

        {/* Create Smart Pass Section with Premium Design */}
        <Card className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white border-0 shadow-2xl">
          <CardContent className="p-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Create Smart Pass</h3>
              <p className="text-green-100 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                Generate intelligent shopping lists, personalized budget alerts, and detailed spending insights 
                as beautiful Google Wallet passes with AI recommendations
              </p>
              <Button 
                onClick={handleCreatePass}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg px-8 py-3 text-lg rounded-full"
                size="lg"
              >
                Create New Pass
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
