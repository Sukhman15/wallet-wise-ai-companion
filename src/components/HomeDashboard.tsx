
import { TrendingUp, DollarSign, Receipt, CreditCard, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HomeDashboardProps {
  onPageChange: (page: string) => void;
}

export const HomeDashboard = ({ onPageChange }: HomeDashboardProps) => {
  const stats = [
    {
      title: 'This Month',
      value: '$1,247',
      description: '+12% from last month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Savings',
      value: '$347',
      description: 'Potential monthly',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Receipts',
      value: '3',
      description: 'This month',
      icon: Receipt,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Passes',
      value: '2',
      description: 'Active',
      icon: CreditCard,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const recentActivity = [
    { name: 'Whole Foods Market', date: '2024-01-15', amount: '$87.45', category: 'Groceries' },
    { name: 'Starbucks', date: '2024-01-14', amount: '$12.75', category: 'Coffee & Dining' },
    { name: 'Shell Gas Station', date: '2024-01-13', amount: '$45.2', category: 'Transportation' }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 rounded-2xl p-8 text-white mb-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Project Raseed</h1>
          <p className="text-xl mb-6 text-blue-50">AI-Powered Receipt Manager</p>
          <p className="text-blue-100 mb-6">
            Digitize receipts, analyze spending, and get intelligent financial insights directly in your Google Wallet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => onPageChange('capture')}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Camera className="w-4 h-4 mr-2" />
              Capture Receipt
            </Button>
            <Button 
              onClick={() => onPageChange('chat')}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-500">{activity.date} • {activity.category}</p>
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-900">{activity.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
