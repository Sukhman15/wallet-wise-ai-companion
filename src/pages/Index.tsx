
import { useState } from 'react';
import { Camera, Upload, FileText, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReceiptUpload } from '@/components/ReceiptUpload';
import { ReceiptAnalysis } from '@/components/ReceiptAnalysis';
import { WalletPassPreview } from '@/components/WalletPassPreview';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'analysis' | 'pass'>('upload');
  const [receiptData, setReceiptData] = useState(null);

  const handleReceiptAnalyzed = (data: any) => {
    setReceiptData(data);
    setCurrentStep('analysis');
  };

  const handleCreatePass = () => {
    setCurrentStep('pass');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Project Raseed</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>AI-Powered Receipt Manager</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${currentStep === 'upload' ? 'text-blue-600' : currentStep === 'analysis' || currentStep === 'pass' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'upload' ? 'bg-blue-100 border-2 border-blue-600' : currentStep === 'analysis' || currentStep === 'pass' ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                <Upload className="w-4 h-4" />
              </div>
              <span className="font-medium">Upload</span>
            </div>
            
            <div className={`w-16 h-0.5 ${currentStep === 'analysis' || currentStep === 'pass' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center space-x-2 ${currentStep === 'analysis' ? 'text-blue-600' : currentStep === 'pass' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'analysis' ? 'bg-blue-100 border-2 border-blue-600' : currentStep === 'pass' ? 'bg-green-100 border-2 border-green-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                <Zap className="w-4 h-4" />
              </div>
              <span className="font-medium">Analysis</span>
            </div>
            
            <div className={`w-16 h-0.5 ${currentStep === 'pass' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center space-x-2 ${currentStep === 'pass' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'pass' ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-medium">Wallet Pass</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'upload' && (
          <ReceiptUpload onReceiptAnalyzed={handleReceiptAnalyzed} />
        )}
        
        {currentStep === 'analysis' && receiptData && (
          <ReceiptAnalysis 
            receiptData={receiptData} 
            onCreatePass={handleCreatePass}
          />
        )}
        
        {currentStep === 'pass' && receiptData && (
          <WalletPassPreview receiptData={receiptData} />
        )}
      </main>
    </div>
  );
};

export default Index;
