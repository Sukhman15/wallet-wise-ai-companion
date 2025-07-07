
import { useState } from 'react';
import { Wallet, Download, Share2, Calendar, MapPin, Receipt, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

interface WalletPassPreviewProps {
  receiptData: any;
}

export const WalletPassPreview = ({ receiptData }: WalletPassPreviewProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Convert prices to INR
  const convertedReceiptData = {
    ...receiptData,
    total: receiptData.total * 84,
    subtotal: receiptData.subtotal * 84,
    tax: receiptData.tax * 84,
    items: receiptData.items.map((item: any) => ({
      ...item,
      price: item.price * 84
    }))
  };

  const handleAddToWallet = async () => {
    setIsGenerating(true);
    
    // Simulate API call to Google Wallet
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    toast({
      title: "Pass Added to Google Wallet! 🎉",
      description: "Your receipt has been saved and is ready to use.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Receipt from ${convertedReceiptData.merchant}`,
        text: `Spent ₹${convertedReceiptData.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })} at ${convertedReceiptData.merchant}`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "Share Link Copied 📋",
        description: "Receipt sharing link copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Pass Preview with Google's Premium Design */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            {/* Google Wallet Pass Design */}
            <Card className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white shadow-2xl transform hover:scale-105 transition-transform border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold opacity-90">Digital Receipt</span>
                  </div>
                  <Wallet className="w-7 h-7 opacity-80" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-5">
                {/* Merchant Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-2">{convertedReceiptData.merchant}</h3>
                  <div className="flex items-center space-x-2 text-sm opacity-90">
                    <Calendar className="w-4 h-4" />
                    <span>{convertedReceiptData.date}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-center py-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <div className="text-4xl font-bold mb-1">
                    ₹{convertedReceiptData.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm opacity-75">{convertedReceiptData.items.length} items purchased</div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 text-xs bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="text-center">
                    <div className="font-bold text-sm">Groceries</div>
                    <div className="opacity-75">
                      ₹{(convertedReceiptData.items
                        .filter((item: any) => item.category === 'Groceries')
                        .reduce((sum: number, item: any) => sum + item.price, 0))
                        .toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm">Household</div>
                    <div className="opacity-75">
                      ₹{(convertedReceiptData.items
                        .filter((item: any) => item.category === 'Household')
                        .reduce((sum: number, item: any) => sum + item.price, 0))
                        .toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm">Personal</div>
                    <div className="opacity-75">
                      ₹{(convertedReceiptData.items
                        .filter((item: any) => item.category === 'Personal Care')
                        .reduce((sum: number, item: any) => sum + item.price, 0))
                        .toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>

                {/* Barcode Simulation */}
                <div className="bg-white rounded-xl p-3 text-center">
                  <div className="text-black text-sm font-mono font-bold">|||| ||| |||| ||| ||||</div>
                  <div className="text-black text-xs mt-1 font-semibold">PWK{convertedReceiptData.date.replace(/-/g, '')}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pass Details with Premium Design */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              Google Wallet Pass Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-lg mb-4">Pass Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Merchant:</span>
                    <span className="font-bold text-gray-900">{convertedReceiptData.merchant}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Date:</span>
                    <span className="font-bold text-gray-900">{convertedReceiptData.date}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Total Amount:</span>
                    <span className="font-bold text-green-600 text-lg">
                      ₹{convertedReceiptData.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Items Count:</span>
                    <span className="font-bold text-gray-900">{convertedReceiptData.items.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-lg mb-4">Pass Features</h4>
                <div className="space-y-3">
                  <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 px-4 py-2 text-sm">
                    🗂️ Digital Receipt Storage
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 text-sm">
                    📊 Expense Tracking
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 text-sm">
                    🤖 AI-Powered Insights  
                  </Badge>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-4 py-2 text-sm">
                    🏷️ Smart Categorization
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Detailed Items */}
            <div>
              <h4 className="font-bold text-gray-900 text-lg mb-4">Items Breakdown</h4>
              <div className="max-h-48 overflow-y-auto space-y-2 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-2xl">
                {convertedReceiptData.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2 px-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900">{item.name}</span>
                      <span className="text-gray-500 ml-2 text-sm">(x{item.quantity})</span>
                    </div>
                    <span className="text-green-600 font-bold">
                      ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons with Premium Design */}
        <div className="flex space-x-6">
          <Button 
            onClick={handleAddToWallet}
            disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-xl border-0"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Adding to Wallet...
              </>
            ) : (
              <>
                <Wallet className="w-6 h-6 mr-3" />
                Add to Google Wallet
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleShare} 
            size="lg"
            className="bg-white/80 backdrop-blur-sm border-2 border-blue-200 hover:bg-blue-50 text-blue-600 font-semibold"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>

        {/* Success Message */}
        <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 text-xl mb-2">Ready for Google Wallet 🎉</h4>
                <p className="text-green-700 text-lg">
                  Your receipt has been processed with AI analysis and is ready to be added to your Google Wallet 
                  for seamless expense tracking and smart financial insights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
