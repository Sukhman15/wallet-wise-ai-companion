
import { useState } from 'react';
import { Mail, Link, Download, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface EmailReceipt {
  id: string;
  sender: string;
  subject: string;
  date: string;
  amount: number;
  attachments: number;
  processed: boolean;
}

export const EmailReceiptLinker = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailReceipts, setEmailReceipts] = useState<EmailReceipt[]>([]);

  const mockEmailReceipts: EmailReceipt[] = [
    {
      id: '1',
      sender: 'noreply@amazon.in',
      subject: 'Your Amazon.in order receipt',
      date: '2024-01-14',
      amount: 2499,
      attachments: 1,
      processed: false
    },
    {
      id: '2',
      sender: 'receipts@swiggy.in',
      subject: 'Order confirmation - Swiggy',
      date: '2024-01-13',
      amount: 485,
      attachments: 1,
      processed: true
    },
    {
      id: '3',
      sender: 'noreply@flipkart.com',
      subject: 'Invoice for your Flipkart order',
      date: '2024-01-12',
      amount: 1299,
      attachments: 1,
      processed: false
    }
  ];

  const handleGmailConnect = async () => {
    setIsLoading(true);
    // Simulate Gmail API connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsConnected(true);
    setEmailReceipts(mockEmailReceipts);
    setIsLoading(false);
    
    toast({
      title: "Gmail Connected Successfully!",
      description: `Found ${mockEmailReceipts.length} receipt emails`,
    });
  };

  const processEmailReceipt = async (receiptId: string) => {
    setEmailReceipts(prev => 
      prev.map(receipt => 
        receipt.id === receiptId 
          ? { ...receipt, processed: true }
          : receipt
      )
    );
    
    toast({
      title: "Receipt Processed",
      description: "Email receipt has been added to your history",
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          Email Receipt Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Connect Gmail Account
            </h3>
            <p className="text-gray-600 mb-6">
              Automatically scan your emails for receipts and invoices
            </p>
            <Button 
              onClick={handleGmailConnect}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Link className="w-5 h-5 mr-2" />
                  Connect Gmail
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900">
                Found Receipt Emails ({emailReceipts.length})
              </h4>
              <Badge className="bg-green-100 text-green-800">
                Connected
              </Badge>
            </div>
            
            {emailReceipts.map((receipt) => (
              <div key={receipt.id} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">{receipt.subject}</h5>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-600">{receipt.sender}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{receipt.date}</span>
                      {receipt.processed && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Processed
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      ₹{receipt.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {receipt.attachments} attachment
                    </div>
                  </div>
                  {!receipt.processed && (
                    <Button
                      size="sm"
                      onClick={() => processEmailReceipt(receipt.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Process
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
