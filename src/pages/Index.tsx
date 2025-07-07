
import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { HomeDashboard } from '@/components/HomeDashboard';
import { ReceiptUpload } from '@/components/ReceiptUpload';
import { ReceiptAnalysis } from '@/components/ReceiptAnalysis';
import { WalletPassPreview } from '@/components/WalletPassPreview';
import { AIChatbot } from '@/components/AIChatbot';
import { WalletPasses } from '@/components/WalletPasses';
import { ReceiptHistory } from '@/components/ReceiptHistory';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentStep, setCurrentStep] = useState<'upload' | 'analysis' | 'pass'>('upload');
  const [receiptData, setReceiptData] = useState(null);
  const [scannedReceipts, setScannedReceipts] = useState<any[]>([]);

  const handleReceiptAnalyzed = (data: any) => {
    setReceiptData(data);
    setCurrentStep('analysis');
    // Add to scanned receipts for dashboard
    setScannedReceipts(prev => [data, ...prev]);
  };

  const handleCreatePass = () => {
    setCurrentStep('pass');
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomeDashboard onPageChange={setCurrentPage} recentReceipts={scannedReceipts} />;
      
      case 'capture':
        return (
          <div className="p-6">
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
          </div>
        );
      
      case 'chat':
        return <AIChatbot />;
      
      case 'wallet':
        return <WalletPasses />;
      
      case 'history':
        return <ReceiptHistory />;
      
      default:
        return <HomeDashboard onPageChange={setCurrentPage} recentReceipts={scannedReceipts} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPageContent()}
    </Layout>
  );
};

export default Index;
