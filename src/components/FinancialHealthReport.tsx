
import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Target, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface FinancialInsight {
  category: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

interface BudgetGoal {
  category: string;
  budgeted: number;
  spent: number;
  percentage: number;
  status: 'good' | 'warning' | 'exceeded';
}

export const FinancialHealthReport = () => {
  const [healthScore, setHealthScore] = useState(0);
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate AI report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockInsights: FinancialInsight[] = [
      {
        category: 'Groceries',
        trend: 'up',
        percentage: 15,
        recommendation: 'Consider bulk buying for 12% savings on essentials',
        priority: 'medium'
      },
      {
        category: 'Dining Out',
        trend: 'up',
        percentage: 35,
        recommendation: 'Dining expenses increased significantly. Set weekly limits.',
        priority: 'high'
      },
      {
        category: 'Transportation',
        trend: 'down',
        percentage: 8,
        recommendation: 'Great job reducing fuel costs with carpooling!',
        priority: 'low'
      }
    ];

    const mockBudgetGoals: BudgetGoal[] = [
      {
        category: 'Groceries',
        budgeted: 15000,
        spent: 12500,
        percentage: 83,
        status: 'good'
      },
      {
        category: 'Entertainment',
        budgeted: 5000,
        spent: 4800,
        percentage: 96,
        status: 'warning'
      },
      {
        category: 'Dining',
        budgeted: 8000,
        spent: 9200,
        percentage: 115,
        status: 'exceeded'
      }
    ];

    setHealthScore(78);
    setInsights(mockInsights);
    setBudgetGoals(mockBudgetGoals);
    setIsGenerating(false);
  };

  useEffect(() => {
    generateReport();
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-600" />;
      default: return <DollarSign className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBudgetStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'exceeded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Health Score */}
      <Card className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white">
            Financial Health Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl font-bold mb-2">{healthScore}/100</div>
              <p className="text-blue-100 text-lg">
                {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Improvement'}
              </p>
            </div>
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <PieChart className="w-12 h-12 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            AI Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  {getTrendIcon(insight.trend)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">{insight.category}</h4>
                    <Badge className={`${insight.trend === 'up' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {insight.trend === 'up' ? '↑' : '↓'} {insight.percentage}%
                    </Badge>
                  </div>
                  <p className="text-gray-700">{insight.recommendation}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Budget Goals */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            Budget Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {budgetGoals.map((goal, index) => (
            <div key={index} className="p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 text-lg">{goal.category}</h4>
                <Badge className={getBudgetStatusColor(goal.status)}>
                  {goal.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  ₹{goal.spent.toLocaleString('en-IN')} / ₹{goal.budgeted.toLocaleString('en-IN')}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {goal.percentage}%
                </span>
              </div>
              <Progress 
                value={Math.min(goal.percentage, 100)} 
                className="w-full h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button 
        onClick={generateReport}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        size="lg"
      >
        {isGenerating ? 'Generating AI Report...' : 'Generate New Report'}
      </Button>
    </div>
  );
};
