import { TrendingUp, DollarSign, Receipt, CreditCard, Camera, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HomeDashboardProps {
  onPageChange: (page: string) => void;
  recentReceipts?: any[];
}

export const HomeDashboard = ({ onPageChange, recentReceipts = [] }: HomeDashboardProps) => {
  const defaultActivity = [
    { name: 'Whole Foods Market', date: '2024-01-15', amount: '₹7,343.95', category: 'Groceries' },
    { name: 'Starbucks', date: '2024-01-14', amount: '₹1,070.75', category: 'Coffee & Dining' },
    { name: 'Shell Gas Station', date: '2024-01-13', amount: '₹3,795.20', category: 'Transportation' }
  ];

  // Combine new receipts with default activity
  const recentActivity = [
    ...recentReceipts.map(receipt => ({
      name: receipt.merchant,
      date: receipt.date,
      amount: `₹${receipt.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      category: receipt.items?.[0]?.category || 'General'
    })),
    ...defaultActivity
  ].slice(0, 5); // Keep only latest 5

  const stats = [
    {
      title: 'This Month',
      value: '₹1,04,725',
      description: '+12% from last month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500'
    },
    {
      title: 'Savings',
      value: '₹29,157',
      description: 'Potential monthly',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500'
    },
    {
      title: 'Receipts',
      value: (3 + recentReceipts.length).toString(),
      description: 'This month',
      icon: Receipt,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      iconBg: 'bg-yellow-500'
    },
    {
      title: 'Protected',
      value: '100%',
      description: 'Encrypted data',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Hero Section with Google's Premium Design */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white mb-8 overflow-hidden shadow-2xl">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full transform -translate-x-24 translate-y-24"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold">₹</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1">Project Raseed</h1>
                <p className="text-xl text-blue-100">AI-Powered Receipt Manager with Advanced Privacy</p>
              </div>
            </div>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Smart refill detection, Gmail integration, AI financial reports, and zero-knowledge encryption for complete financial privacy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => onPageChange('capture')}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
                size="lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                Capture Receipt
              </Button>
              <Button 
                onClick={() => onPageChange('chat')}
                variant="outline" 
                className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-300"
                size="lg"
              >
                AI Assistant
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid with Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className={`${stat.bgColor} border-0 hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.description}</p>
                    </div>
                    <div className={`${stat.iconBg} p-3 rounded-2xl shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity with Google's Card Design */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600">Your latest transactions and receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Receipt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{activity.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{activity.date}</span>
                        <span>•</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {activity.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{activity.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
