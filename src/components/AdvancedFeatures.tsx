
import { AutoRefillDetector } from './AutoRefillDetector';
import { EmailReceiptLinker } from './EmailReceiptLinker';
import { FinancialHealthReport } from './FinancialHealthReport';
import { PrivacyEncryption } from './PrivacyEncryption';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const AdvancedFeatures = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Advanced Features</h1>
          <p className="text-xl text-gray-600">AI-powered financial intelligence with complete privacy</p>
        </div>

        <Tabs defaultValue="refill" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-2">
            <TabsTrigger value="refill" className="rounded-xl">Smart Refill</TabsTrigger>
            <TabsTrigger value="email" className="rounded-xl">Email Sync</TabsTrigger>
            <TabsTrigger value="reports" className="rounded-xl">AI Reports</TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-xl">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="refill" className="space-y-6">
            <AutoRefillDetector />
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <EmailReceiptLinker />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <FinancialHealthReport />
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <PrivacyEncryption />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
