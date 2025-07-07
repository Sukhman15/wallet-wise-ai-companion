
import { useState } from 'react';
import { Wallet, Download, Share2, Calendar, MapPin, Receipt, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface WalletPassPreviewProps {
  receiptData: any;
}

export const WalletPassPreview = ({ receiptData }: WalletPassPreviewProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddToWallet = async () => {
    setIsGenerating(true);
    
    // Simulate API call to Google Wallet
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    toast({
      title: "Pass Added to Google Wallet!",
      description: "Your receipt has been saved and is ready to use.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Receipt from ${receiptData.merchant}`,
        text: `Spent $${receiptData.total.toFixed(2)} at ${receiptData.merchant}`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "Share Link Copied",
        description: "Receipt sharing link copied to clipboard",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Pass Preview */}
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          {/* Google Wallet Pass Design */}
          <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white shadow-2xl transform hover:scale-105 transition-transform">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium opacity-90">Receipt</span>
                </div>
                <Wallet className="w-6 h-6 opacity-80" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Merchant Info */}
              <div>
                <h3 className="text-xl font-bold">{receiptData.merchant}</h3>
                <div className="flex items-center space-x-2 text-sm opacity-90 mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{receiptData.date}</span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center py-2">
                <div className="text-3xl font-bold">${receiptData.total.toFixed(2)}</div>
                <div className="text-sm opacity-75">{receiptData.items.length} items</div>
              </div>

              {/* Quick Stats */}
              <div className="flex justify-between text-xs bg-white/10 rounded-lg p-2">
                <div className="text-center">
                  <div className="font-semibold">Groceries</div>
                  <div className="opacity-75">
                    ${receiptData.items
                      .filter((item: any) => item.category === 'Groceries')
                      .reduce((sum: number, item: any) => sum + item.price, 0)
                      .toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Household</div>
                  <div className="opacity-75">
                    ${receiptData.items
                      .filter((item: any) => item.category === 'Household')
                      .reduce((sum: number, item: any) => sum + item.price, 0)
                      .toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Personal</div>
                  <div className="opacity-75">
                    ${receiptData.items
                      .filter((item: any) => item.category === 'Personal Care')
                      .reduce((sum: number, item: any) => sum + item.price, 0)
                      .toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Barcode Simulation */}
              <div className="bg-white rounded p-2 text-center">
                <div className="text-black text-xs font-mono">|||| ||| |||| ||| ||||</div>
                <div className="text-black text-xs mt-1">PWK{receiptData.date.replace(/-/g, '')}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pass Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
            Google Wallet Pass Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pass Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Merchant:</span>
                  <span className="font-medium">{receiptData.merchant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{receiptData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium text-green-600">${receiptData.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Count:</span>
                  <span className="font-medium">{receiptData.items.length}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pass Features</h4>
              <div className="space-y-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Digital Receipt Storage
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Expense Tracking
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  AI-Powered Insights  
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Category Analysis
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detailed Items (Collapsible in real pass) */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Items Breakdown</h4>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {receiptData.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm py-1 px-2 hover:bg-gray-50 rounded">
                  <div className="flex-1">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">(x{item.quantity})</span>
                  </div>
                  <span className="text-green-600 font-medium">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button 
          onClick={handleAddToWallet}
          disabled={isGenerating}
          className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding to Wallet...
            </>
          ) : (
            <>
              <Wallet className="w-5 h-5 mr-2" />
              Add to Google Wallet
            </>
          )}
        </Button>
        
        <Button variant="outline" onClick={handleShare} size="lg">
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
      </div>

      {/* Success Message */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Receipt className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-green-900">Ready for Google Wallet</h4>
              <p className="text-sm text-green-700">
                Your receipt has been processed and is ready to be added to your Google Wallet for easy access and expense tracking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
