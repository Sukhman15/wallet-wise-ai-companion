import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff, Key, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EncryptionStatus {
  isEncrypted: boolean;
  encryptionType: 'AES-256' | 'RSA' | 'None';
  lastEncryptionDate: string;
}

interface DataAccessLog {
  timestamp: string;
  user: string;
  action: 'read' | 'write' | 'delete';
  dataField: string;
}

export const PrivacyEncryption = () => {
  const [encryptionStatus, setEncryptionStatus] = useState<EncryptionStatus>({
    isEncrypted: true,
    encryptionType: 'AES-256',
    lastEncryptionDate: '2024-01-25T14:30:00Z',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDataMaskingEnabled, setIsDataMaskingEnabled] = useState(true);
  const [dataAccessLogs, setDataAccessLogs] = useState<DataAccessLog[]>([
    { timestamp: '2024-01-26T08:00:00Z', user: 'admin', action: 'read', dataField: 'user_data' },
    { timestamp: '2024-01-26T08:15:00Z', user: 'analyst', action: 'write', dataField: 'transaction_data' },
  ]);

  useEffect(() => {
    // Simulate fetching encryption status from an API
    const fetchEncryptionStatus = async () => {
      // Replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEncryptionStatus({
        isEncrypted: true,
        encryptionType: 'AES-256',
        lastEncryptionDate: '2024-01-25T14:30:00Z',
      });
    };

    fetchEncryptionStatus();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleDataMasking = () => {
    setIsDataMaskingEnabled(!isDataMaskingEnabled);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mb-8 bg-white shadow">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Shield className="h-6 w-6 mr-2 text-gray-500" />
            <CardTitle className="text-lg font-semibold">Data Encryption</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Encryption Status:</p>
                  {encryptionStatus.isEncrypted ? (
                    <Badge variant="success">Encrypted</Badge>
                  ) : (
                    <Badge variant="destructive">Not Encrypted</Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Encryption Type:</p>
                  <p className="text-gray-500">{encryptionStatus.encryptionType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Last Encryption Date:</p>
                  <p className="text-gray-500">{new Date(encryptionStatus.lastEncryptionDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-white shadow">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Lock className="h-6 w-6 mr-2 text-gray-500" />
            <CardTitle className="text-lg font-semibold">Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Password Visibility:</p>
                  <Button variant="outline" size="sm" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Hide Password
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Show Password
                      </>
                    )}
                  </Button>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Data Masking:</p>
                  <Switch id="data-masking" checked={isDataMaskingEnabled} onCheckedChange={toggleDataMasking} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <Database className="h-6 w-6 mr-2 text-gray-500" />
            <CardTitle className="text-lg font-semibold">Data Access Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Data Field
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataAccessLogs.map((log, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.dataField}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
