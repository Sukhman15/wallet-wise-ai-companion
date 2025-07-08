
import React from 'react';
import { AutoRefillDetector } from './AutoRefillDetector';
import { EmailReceiptLinker } from './EmailReceiptLinker';
import { FinancialHealthReport } from './FinancialHealthReport';
import { PrivacyEncryption } from './PrivacyEncryption';

interface AdvancedFeaturesProps {
  activeFeature: 'refill' | 'email' | 'reports' | 'privacy';
}

export const AdvancedFeatures = ({ activeFeature }: AdvancedFeaturesProps) => {
  const renderFeature = () => {
    switch (activeFeature) {
      case 'refill':
        return <AutoRefillDetector />;
      case 'email':
        return <EmailReceiptLinker />;
      case 'reports':
        return <FinancialHealthReport />;
      case 'privacy':
        return <PrivacyEncryption />;
      default:
        return <AutoRefillDetector />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {renderFeature()}
    </div>
  );
};
