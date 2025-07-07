
import { useState, useRef } from 'react';
import { Camera, Upload, Image, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface ReceiptUploadProps {
  onReceiptAnalyzed: (data: any) => void;
}

export const ReceiptUpload = ({ onReceiptAnalyzed }: ReceiptUploadProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateAIAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock receipt analysis data
    const mockAnalysis = {
      merchant: "Target Store #1234",
      date: "2024-01-15",
      total: 87.43,
      tax: 7.12,
      subtotal: 80.31,
      items: [
        { name: "Organic Bananas", quantity: 2, price: 3.98, category: "Groceries" },
        { name: "Whole Milk 1 Gallon", quantity: 1, price: 4.29, category: "Groceries" },
        { name: "Bread - Whole Wheat", quantity: 1, price: 2.99, category: "Groceries" },
        { name: "Chicken Breast 2lb", quantity: 1, price: 12.99, category: "Groceries" },
        { name: "Laundry Detergent", quantity: 1, price: 8.99, category: "Household" },
        { name: "Toothpaste", quantity: 2, price: 6.98, category: "Personal Care" },
        { name: "Paper Towels", quantity: 1, price: 5.49, category: "Household" },
        { name: "Orange Juice", quantity: 1, price: 3.99, category: "Groceries" },
        { name: "Yogurt Cups 6pk", quantity: 1, price: 4.99, category: "Groceries" },
        { name: "Pasta Sauce", quantity: 2, price: 5.98, category: "Groceries" },
      ],
      paymentMethod: "Credit Card ending in 4567",
      receiptImage: uploadedImage
    };

    setIsAnalyzing(false);
    onReceiptAnalyzed(mockAnalysis);
    
    toast({
      title: "Receipt Analyzed Successfully!",
      description: `Found ${mockAnalysis.items.length} items from ${mockAnalysis.merchant}`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        simulateAIAnalysis(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        simulateAIAnalysis(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Upload Your Receipt
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Take a photo or upload an image of your receipt for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <h3 className="text-lg font-medium text-gray-900">Analyzing Receipt...</h3>
              <p className="text-sm text-gray-600 text-center max-w-md">
                Our AI is extracting items, prices, and details from your receipt. 
                This may take a few moments.
              </p>
              {uploadedImage && (
                <div className="mt-4">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded receipt" 
                    className="max-w-xs max-h-32 object-contain rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drag and drop your receipt here
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    or click to browse files
                  </p>
                  <Button variant="outline" className="mx-auto">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500">
                  Supports: JPG, PNG, HEIC, WebP
                </div>
              </div>
            </div>
          )}
          
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Features Preview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Loader2 className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-medium text-blue-900 mb-1">AI-Powered Analysis</h4>
            <p className="text-sm text-blue-700">Extract items, prices, and categories automatically</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium text-green-900 mb-1">Smart Categorization</h4>
            <p className="text-sm text-green-700">Organize expenses by category for better tracking</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Upload className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-medium text-purple-900 mb-1">Google Wallet Integration</h4>
            <p className="text-sm text-purple-700">Save receipts directly to your wallet</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
