
import { useState, useEffect } from 'react';
import { Shield, Lock, Key, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

interface EncryptionStatus {
  receipts: boolean;
  personalData: boolean;
  financialData: boolean;
  backups: boolean;
}

export const PrivacyEncryption = () => {
  const [encryptionEnabled, setEncryptionEnabled] = useState(false);
  const [encryptionStatus, setEncryptionStatus] = useState<EncryptionStatus>({
    receipts: false,
    personalData: false,
    financialData: false,
    backups: false
  });
  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false);

  const generateEncryptionKeys = async () => {
    setIsGeneratingKeys(true);
    
    // Simulate key generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setEncryptionEnabled(true);
    setEncryptionStatus({
      receipts: true,
      personalData: true,
      financialData: true,
      backups: true
    });
    setIsGeneratingKeys(false);

    toast({
      title: "Encryption Activated",
      description: "Your data is now protected with zero-knowledge encryption",
    });
  };

  const toggleEncryption = async (category: keyof EncryptionStatus) => {
    setEncryptionStatus(prev => ({
      ...prev,
      [category]: !prev[category]
    }));

    toast({
      title: `${category} encryption ${encryptionStatus[category] ? 'disabled' : 'enabled'}`,
      description: "Encryption settings updated successfully",
    });
  };

  const encryptionFeatures = [
    {
      title: 'Receipt Images',
      description: 'End-to-end encryption for all receipt photos',
      key: 'receipts' as keyof EncryptionStatus,
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Personal Data',
      description: 'Encrypt names, addresses, and contact information',
      key: 'personalData' as keyof EncryptionStatus,
      icon: <Lock className="w-5 h-5" />
    },
    {
      title: 'Financial Data',
      description: 'Protect transaction amounts and payment methods',
      key: 'financialData' as keyof EncryptionStatus,
      icon: <Key className="w-5 h-5" />
    },
    {
      title: 'Cloud Backups',
      description: 'Encrypt data before uploading to cloud storage',
      key: 'backups' as keyof EncryptionStatus,
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Security Card */}
      <Card className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white flex items-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            Zero-Knowledge Privacy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-lg mb-4">
                Your financial data is encrypted locally before being stored or transmitted. 
                Not even we can access your information.
              </p>
              <div className="flex items-center space-x-3">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                  AES-256 Encryption
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                  Client-Side Keys
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encryption Controls */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Encryption Settings</CardTitle>
            {!encryptionEnabled ? (
              <Button 
                onClick={generateEncryptionKeys}
                disabled={isGeneratingKeys}
                className="bg-gradient-to-r from-green-600 to-teal-600"
              >
                {isGeneratingKeys ? 'Generating Keys...' : 'Enable Encryption'}
              </Button>
            ) : (
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Protected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {encryptionFeatures.map((feature, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${encryptionStatus[feature.key] ? 'bg-gradient-to-br from-green-500 to-teal-500' : 'bg-gray-300'} rounded-2xl flex items-center justify-center transition-all duration-300`}>
                  {React.cloneElement(feature.icon, { 
                    className: `w-5 h-5 ${encryptionStatus[feature.key] ? 'text-white' : 'text-gray-600'}` 
                  })}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
              <Switch
                checked={encryptionStatus[feature.key]}
                onCheckedChange={() => toggleEncryption(feature.key)}
                disabled={!encryptionEnabled}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card className="bg-yellow-50 border-yellow-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center text-yellow-800">
            <AlertTriangle className="w-6 h-6 mr-3" />
            Security Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-yellow-700">
          <p className="flex items-start space-x-2">
            <span>🔐</span>
            <span>Your encryption keys are stored locally on your device only</span>
          </p>
          <p className="flex items-start space-x-2">
            <span>🚫</span>
            <span>We cannot recover your data if you lose your encryption keys</span>
          </p>
          <p className="flex items-start space-x-2">
            <span>💾</span>
            <span>Backup your keys safely in multiple secure locations</span>
          </p>
          <p className="flex items-start space-x-2">
            <span>🔄</span>
            <span>Keys rotate automatically every 90 days for enhanced security</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
