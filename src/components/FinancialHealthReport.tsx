
import React, { useState, useEffect } from 'react';
import { FileText, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Brain } from 'lucide-react';
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

interface FinancialReport {
  month: string;
  overallScore: number;
  totalSpent: number;
  totalSaved: number;
  insights: FinancialInsight[];
  aiSummary: string;
  recommendations: string[];
}

export const FinancialHealthReport = () => {
  const [currentReport, setCurrentReport] = useState<FinancialReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportHistory, setReportHistory] = useState<FinancialReport[]>([]);

  // Mock financial data
  const mockReport: FinancialReport = {
    month: 'January 2024',
    overallScore: 78,
    totalSpent: 89450,
    totalSaved: 15670,
    insights: [
      {
        category: 'Dining Out',
        trend: 'up',
        percentage: 34,
        recommendation: 'Consider meal planning to reduce restaurant expenses',
        priority: 'high'
      },
      {
        category: 'Transportation',
        trend: 'down',
        percentage: 12,
        recommendation: 'Great job reducing commute costs with metro usage',
        priority: 'low'
      },
      {
        category: 'Groceries',
        trend: 'stable',
        percentage: 3,
        recommendation: 'Consistent spending pattern, consider bulk buying for discounts',
        priority: 'medium'
      },
      {
        category: 'Subscriptions',
        trend: 'up',
        percentage: 28,
        recommendation: 'Review and cancel unused streaming services',
        priority: 'high'
      }
    ],
    aiSummary: "Your financial health shows positive momentum with a score of 78/100. While you've successfully reduced transportation costs by using public transport more frequently, dining expenses have increased significantly. Your savings rate of 14.9% is above average for your income bracket. The AI recommends focusing on meal planning and subscription management to optimize your budget further.",
    recommendations: [
      "Set a weekly dining budget of ₹2,500 to control restaurant expenses",
      "Audit all subscription services and cancel those unused for 30+ days",
      "Consider carpooling or bike-sharing to further reduce transport costs",
      "Increase emergency fund target to 6 months of expenses",
      "Explore high-yield savings accounts for better interest rates"
    ]
  };

  useEffect(() => {
    // Simulate loading existing reports
    const loadReports = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReportHistory([mockReport]);
      setCurrentReport(mockReport);
    };
    
    loadReports();
  }, []);

  const generateNewReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI report generation
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Generate new mock report
      const newReport: FinancialReport = {
        ...mockReport,
        month: 'February 2024',
        overallScore: 82,
        totalSpent: 83200,
        totalSaved: 18900,
      };
      
      setCurrentReport(newReport);
      setReportHistory(prev => [newReport, ...prev]);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!currentReport) {
    return (
      <div className="p-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Loading your financial health report...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Health Report</h1>
          <p className="text-gray-600">AI-generated insights for {currentReport.month}</p>
        </div>
        <Button 
          onClick={generateNewReport}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isGenerating ? (
            <>
              <Brain className="w-4 h-4 mr-2 animate-pulse" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Generate New Report
            </>
          )}
        </Button>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Overall Financial Health</h2>
              <div className="flex items-center space-x-4">
                <div className={`text-4xl font-bold ${getScoreColor(currentReport.overallScore)}`}>
                  {currentReport.overallScore}/100
                </div>
                <div className="flex-1">
                  <Progress value={currentReport.overallScore} className="w-full" />
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{currentReport.totalSpent.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-green-600">
                Saved: ₹{currentReport.totalSaved.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            AI Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{currentReport.aiSummary}</p>
        </CardContent>
      </Card>

      {/* Spending Insights */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Spending Category Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentReport.insights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-gray-900">{insight.category}</h3>
                    {getTrendIcon(insight.trend)}
                    <span className={`font-medium ${
                      insight.trend === 'up' ? 'text-red-600' : 
                      insight.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {insight.percentage > 0 ? '+' : ''}{insight.percentage}%
                    </span>
                  </div>
                  <Badge className={getPriorityColor(insight.priority)}>
                    {insight.priority.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm">{insight.recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentReport.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <p className="text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report History */}
      {reportHistory.length > 1 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Previous Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reportHistory.slice(1).map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{report.month}</p>
                    <p className="text-sm text-gray-600">Score: {report.overallScore}/100</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Report
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
