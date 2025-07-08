
import React, { useState, useEffect } from 'react';
import { Mail, Link, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface EmailReceipt {
  id: string;
  subject: string;
  sender: string;
  date: string;
  amount?: string;
  merchant?: string;
  isLinked: boolean;
}

export const EmailReceiptLinker = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailReceipts, setEmailReceipts] = useState<EmailReceipt[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Mock email receipts data
  const mockEmailReceipts: EmailReceipt[] = [
    {
      id: '1',
      subject: 'Your Amazon.in order has been shipped',
      sender: 'auto-confirm@amazon.in',
      date: '2024-01-26',
      amount: '₹2,499',
      merchant: 'Amazon',
      isLinked: false
    },
    {
      id: '2',
      subject: 'Swiggy Order Confirmation',
      sender: 'noreply@swiggy.in',
      date: '2024-01-25',
      amount: '₹485',
      merchant: 'Swiggy',
      isLinked: true
    },
    {
      id: '3',
      subject: 'Payment Successful - Uber',
      sender: 'receipts@uber.com',
      date: '2024-01-24',
      amount: '₹320',
      merchant: 'Uber',
      isLinked: false
    },
    {
      id: '4',
      subject: 'Big Basket Order Receipt',
      sender: 'care@bigbasket.com',
      date: '2024-01-23',
      amount: '₹1,250',
      merchant: 'Big Basket',
      isLinked: false
    }
  ];

  useEffect(() => {
    // Simulate checking Gmail connection status
    const checkConnection = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock connection status - in real app, check OAuth status
      setIsConnected(false);
    };
    
    checkConnection();
  }, []);

  const handleConnectGmail = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Gmail OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful connection
      setIsConnected(true);
      setEmailReceipts(mockEmailReceipts);
      setSyncStatus('success');
    } catch (error) {
      setSyncStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSyncEmails = async () => {
    setSyncStatus('syncing');
    
    try {
      // Simulate email sync
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock finding new receipts
      const newReceipts = [...mockEmailReceipts];
      setEmailReceipts(newReceipts);
      setSyncStatus('success');
    } catch (error) {
      setSyncStatus('error');
    }
  };

  const handleLinkReceipt = async (receiptId: string) => {
    setEmailReceipts(prev => prev.map(receipt => 
      receipt.id === receiptId 
        ? { ...receipt, isLinked: true }
        : receipt
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'syncing': return 'text-blue-600';
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'syncing': return <Loader className="w-4 h-4 animate-spin" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Mail className="w-6 h-6 mr-2 text-blue-600" />
            Email Receipt Linker
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="text-center py-8">
              <Mail className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connect Your Gmail Account
              </h3>
              <p className="text-gray-600 mb-6">
                Automatically find and link receipt emails from your inbox to track expenses seamlessly.
              </p>
              <Button 
                onClick={handleConnectGmail}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4 mr-2" />
                    Connect Gmail
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                We only access receipt emails and never read personal messages
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Sync Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={getStatusColor(syncStatus)}>
                    {getStatusIcon(syncStatus)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Gmail Connected</p>
                    <p className="text-sm text-gray-600">
                      {syncStatus === 'syncing' && 'Syncing receipt emails...'}
                      {syncStatus === 'success' && `Found ${emailReceipts.length} receipt emails`}
                      {syncStatus === 'error' && 'Error syncing emails'}
                      {syncStatus === 'idle' && 'Ready to sync'}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleSyncEmails}
                  disabled={syncStatus === 'syncing'}
                  variant="outline"
                  size="sm"
                >
                  {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
                </Button>
              </div>

              {/* Receipt List */}
              {emailReceipts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Found Receipt Emails</h3>
                  {emailReceipts.map((receipt) => (
                    <div key={receipt.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-medium text-gray-900">{receipt.subject}</p>
                            {receipt.isLinked ? (
                              <Badge variant="secondary" className="text-green-700 bg-green-100">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Linked
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Unlinked
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{receipt.sender}</span>
                            <span>{receipt.date}</span>
                            {receipt.amount && <span className="font-medium">{receipt.amount}</span>}
                            {receipt.merchant && (
                              <Badge variant="outline" className="text-xs">
                                {receipt.merchant}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {!receipt.isLinked && (
                          <Button 
                            onClick={() => handleLinkReceipt(receipt.id)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Link className="w-4 h-4 mr-1" />
                            Link
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {syncStatus === 'success' && emailReceipts.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No receipt emails found in the last 30 days. Try adjusting your search criteria.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
