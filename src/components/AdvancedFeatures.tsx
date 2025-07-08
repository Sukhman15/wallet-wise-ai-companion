
import React, { useState } from 'react';
import { Mail, FileText, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmailReceiptLinker } from './EmailReceiptLinker';
import { FinancialHealthReport } from './FinancialHealthReport';
import { PrivacyEncryption } from './PrivacyEncryption';

interface AdvancedFeaturesProps {
  activeFeature: 'email' | 'reports' | 'privacy';
  onFeatureChange: (feature: 'email' | 'reports' | 'privacy') => void;
}

export const AdvancedFeatures = ({ activeFeature, onFeatureChange }: AdvancedFeaturesProps) => {
  const features = [
    {
      id: 'email' as const,
      name: 'Gmail Receipt Linking',
      description: 'Automatically find and link receipt emails from Gmail',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'reports' as const,
      name: 'AI Financial Health Reports',
      description: 'Get comprehensive financial insights and AI recommendations',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'privacy' as const,
      name: 'Zero-Knowledge Encryption',
      description: 'Advanced privacy and data protection features',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'email':
        return <EmailReceiptLinker />;
      case 'reports':
        return <FinancialHealthReport />;
      case 'privacy':
        return <PrivacyEncryption />;
      default:
        return <EmailReceiptLinker />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Features</h1>
            <p className="text-gray-600">Powerful tools to enhance your receipt management experience</p>
          </div>

          {/* Feature Selection */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;
              return (
                <Card 
                  key={feature.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isActive ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => onFeatureChange(feature.id)}
                >
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                    {isActive && (
                      <div className="mt-4 flex items-center text-blue-600">
                        <Zap className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Active</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature Content */}
          <div className="bg-white rounded-lg shadow-sm border">
            {renderFeatureContent()}
          </div>
        </div>
      </div>
    </div>
  );
};
