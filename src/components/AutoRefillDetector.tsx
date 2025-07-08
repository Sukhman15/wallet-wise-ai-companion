import React, { useState, useEffect } from 'react';
import { ShoppingCart, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RefillActivity {
  store: string;
  date: string;
  items: number;
  amount: number;
}

interface AutoRefillDetectorProps {
  recentActivity?: RefillActivity[];
}

export const AutoRefillDetector = ({ recentActivity = [] }: AutoRefillDetectorProps) => {
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    // Simulate checking for auto-refills based on recent activity
    if (recentActivity.length > 3) {
      setShowRecommendations(true);
    }
  }, [recentActivity]);

  const recommendations = [
    {
      title: 'Grocery Refills',
      description: 'Automate your monthly grocery shopping.',
      store: 'Whole Foods',
      frequency: 'Monthly',
      items: 12,
      amount: 120.50,
    },
    {
      title: 'Coffee Subscription',
      description: 'Never run out of your favorite coffee.',
      store: 'Starbucks',
      frequency: 'Weekly',
      items: 1,
      amount: 25.00,
    },
  ];

  return (
    <div className="p-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">Auto-Refill Detector</CardTitle>
        </CardHeader>
        <CardContent>
          {showRecommendations ? (
            <div className="space-y-4">
              <Alert>
                <ShoppingCart className="h-4 w-4" />
                <AlertDescription>
                  Based on your recent activity, we found potential auto-refill opportunities.
                </AlertDescription>
              </Alert>
              {recommendations.map((recommendation, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-md shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">{recommendation.title}</h3>
                  <p className="text-gray-600">{recommendation.description}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Badge variant="secondary">{recommendation.store}</Badge>
                    <Badge variant="outline">{recommendation.frequency}</Badge>
                  </div>
                  <div className="mt-2">
                    <Button size="sm">Setup Auto-Refill</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Alert>
              <Calendar className="h-4 w-4" />
              <AlertDescription>
                No auto-refill recommendations found based on your recent activity.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
