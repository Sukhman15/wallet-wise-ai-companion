
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export const TechStackFlowchart = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setSelectedLayer(null);
  };

  const layers = [
    {
      id: 'frontend',
      title: 'Frontend Layer',
      color: '#3B82F6',
      items: ['React 18.3.1', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'React Router']
    },
    {
      id: 'state',
      title: 'State Management',
      color: '#10B981',
      items: ['TanStack Query', 'React Hook Form', 'Zod Validation']
    },
    {
      id: 'ai',
      title: 'AI/ML Services',
      color: '#F59E0B',
      items: ['Google Cloud Vision', 'Natural Language API', 'Vertex AI', 'Document AI']
    },
    {
      id: 'backend',
      title: 'Backend Services',
      color: '#8B5CF6',
      items: ['Google Cloud Functions', 'Firestore', 'Cloud Storage', 'Pub/Sub']
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      color: '#EF4444',
      items: ['Zero-Knowledge Encryption', 'Cloud KMS', 'IAM', 'End-to-End Encryption']
    },
    {
      id: 'integration',
      title: 'Integration Layer',
      color: '#06B6D4',
      items: ['Gmail API', 'Google Wallet API', 'Firebase Auth', 'BigQuery']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Technology Stack Flowchart</h1>
          <p className="text-gray-600">Interactive visualization of Project Raseed's complete technology architecture</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex gap-2">
          <Button onClick={handleZoomIn} variant="outline" size="sm">
            <ZoomIn className="w-4 h-4 mr-1" />
            Zoom In
          </Button>
          <Button onClick={handleZoomOut} variant="outline" size="sm">
            <ZoomOut className="w-4 h-4 mr-1" />
            Zoom Out
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>

        {/* Flowchart */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-auto" style={{ height: '800px' }}>
              <svg
                width="1200"
                height="1000"
                viewBox="0 0 1200 1000"
                className="transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              >
                {/* Background Grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* User Layer */}
                <g transform="translate(500, 50)">
                  <rect width="200" height="60" rx="10" fill="#1F2937" />
                  <text x="100" y="35" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                    User Interface
                  </text>
                  <text x="100" y="50" textAnchor="middle" fill="#D1D5DB" fontSize="10">
                    Mobile & Web Apps
                  </text>
                </g>

                {/* Frontend Layer */}
                <g transform="translate(400, 150)">
                  <rect 
                    width="400" 
                    height="100" 
                    rx="10" 
                    fill={selectedLayer === 'frontend' ? '#1E40AF' : '#3B82F6'} 
                    onClick={() => setSelectedLayer(selectedLayer === 'frontend' ? null : 'frontend')}
                    className="cursor-pointer"
                  />
                  <text x="200" y="25" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    Frontend Layer
                  </text>
                  <text x="200" y="45" textAnchor="middle" fill="#DBEAFE" fontSize="12">
                    React • TypeScript • Vite • Tailwind CSS
                  </text>
                  <text x="200" y="60" textAnchor="middle" fill="#DBEAFE" fontSize="12">
                    shadcn/ui • React Router • Recharts
                  </text>
                  <text x="200" y="80" textAnchor="middle" fill="#DBEAFE" fontSize="10">
                    Click to highlight connections
                  </text>
                </g>

                {/* State Management */}
                <g transform="translate(100, 300)">
                  <rect 
                    width="250" 
                    height="80" 
                    rx="10" 
                    fill={selectedLayer === 'state' ? '#047857' : '#10B981'}
                    onClick={() => setSelectedLayer(selectedLayer === 'state' ? null : 'state')}
                    className="cursor-pointer"
                  />
                  <text x="125" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                    State Management
                  </text>
                  <text x="125" y="45" textAnchor="middle" fill="#D1FAE5" fontSize="11">
                    TanStack Query • React Hook Form
                  </text>
                  <text x="125" y="60" textAnchor="middle" fill="#D1FAE5" fontSize="11">
                    Zod Validation
                  </text>
                </g>

                {/* AI/ML Services */}
                <g transform="translate(850, 300)">
                  <rect 
                    width="250" 
                    height="80" 
                    rx="10" 
                    fill={selectedLayer === 'ai' ? '#D97706' : '#F59E0B'}
                    onClick={() => setSelectedLayer(selectedLayer === 'ai' ? null : 'ai')}
                    className="cursor-pointer"
                  />
                  <text x="125" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                    AI/ML Services
                  </text>
                  <text x="125" y="45" textAnchor="middle" fill="#FEF3C7" fontSize="11">
                    Google Cloud Vision • NLP API
                  </text>
                  <text x="125" y="60" textAnchor="middle" fill="#FEF3C7" fontSize="11">
                    Vertex AI • Document AI
                  </text>
                </g>

                {/* Backend Services */}
                <g transform="translate(400, 450)">
                  <rect 
                    width="400" 
                    height="100" 
                    rx="10" 
                    fill={selectedLayer === 'backend' ? '#6D28D9' : '#8B5CF6'}
                    onClick={() => setSelectedLayer(selectedLayer === 'backend' ? null : 'backend')}
                    className="cursor-pointer"
                  />
                  <text x="200" y="25" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    Backend Services (Google Cloud)
                  </text>
                  <text x="200" y="45" textAnchor="middle" fill="#E9D5FF" fontSize="12">
                    Cloud Functions • Firestore • Cloud Storage
                  </text>
                  <text x="200" y="60" textAnchor="middle" fill="#E9D5FF" fontSize="12">
                    Pub/Sub • BigQuery • Kubernetes Engine
                  </text>
                  <text x="200" y="80" textAnchor="middle" fill="#E9D5FF" fontSize="10">
                    Serverless Architecture
                  </text>
                </g>

                {/* Security Layer */}
                <g transform="translate(100, 600)">
                  <rect 
                    width="250" 
                    height="80" 
                    rx="10" 
                    fill={selectedLayer === 'security' ? '#DC2626' : '#EF4444'}
                    onClick={() => setSelectedLayer(selectedLayer === 'security' ? null : 'security')}
                    className="cursor-pointer"
                  />
                  <text x="125" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                    Security & Privacy
                  </text>
                  <text x="125" y="45" textAnchor="middle" fill="#FECACA" fontSize="11">
                    Zero-Knowledge Encryption
                  </text>
                  <text x="125" y="60" textAnchor="middle" fill="#FECACA" fontSize="11">
                    Cloud KMS • IAM
                  </text>
                </g>

                {/* Integration Layer */}
                <g transform="translate(850, 600)">
                  <rect 
                    width="250" 
                    height="80" 
                    rx="10" 
                    fill={selectedLayer === 'integration' ? '#0891B2' : '#06B6D4'}
                    onClick={() => setSelectedLayer(selectedLayer === 'integration' ? null : 'integration')}
                    className="cursor-pointer"
                  />
                  <text x="125" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                    Integration Layer
                  </text>
                  <text x="125" y="45" textAnchor="middle" fill="#CFFAFE" fontSize="11">
                    Gmail API • Google Wallet API
                  </text>
                  <text x="125" y="60" textAnchor="middle" fill="#CFFAFE" fontSize="11">
                    Firebase Auth • External APIs
                  </text>
                </g>

                {/* Data Storage */}
                <g transform="translate(400, 750)">
                  <rect width="400" height="80" rx="10" fill="#374151" />
                  <text x="200" y="25" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    Data Storage & Analytics
                  </text>
                  <text x="200" y="45" textAnchor="middle" fill="#D1D5DB" fontSize="12">
                    Cloud Firestore • Cloud Storage • BigQuery
                  </text>
                  <text x="200" y="65" textAnchor="middle" fill="#D1D5DB" fontSize="12">
                    Real-time Sync • Analytics • Data Warehousing
                  </text>
                </g>

                {/* Connection Lines */}
                {/* User to Frontend */}
                <line x1="600" y1="110" x2="600" y2="150" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Frontend to State Management */}
                <line x1="450" y1="250" x2="275" y2="300" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Frontend to AI Services */}
                <line x1="750" y1="250" x2="925" y2="300" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Frontend to Backend */}
                <line x1="600" y1="250" x2="600" y2="450" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Backend to Security */}
                <line x1="450" y1="550" x2="275" y2="600" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Backend to Integration */}
                <line x1="750" y1="550" x2="925" y2="600" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                
                {/* Backend to Data Storage */}
                <line x1="600" y1="550" x2="600" y2="750" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Arrow marker definition */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
                  </marker>
                </defs>

                {/* Data Flow Indicators */}
                <g transform="translate(50, 50)">
                  <rect width="120" height="60" rx="5" fill="#F3F4F6" stroke="#D1D5DB" />
                  <text x="60" y="20" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="bold">
                    Data Flow
                  </text>
                  <line x1="20" y1="35" x2="100" y2="35" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <text x="60" y="55" textAnchor="middle" fill="#6B7280" fontSize="10">
                    Request/Response
                  </text>
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Layer Details */}
        {selectedLayer && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded" 
                  style={{ backgroundColor: layers.find(l => l.id === selectedLayer)?.color }}
                />
                {layers.find(l => l.id === selectedLayer)?.title} Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {layers.find(l => l.id === selectedLayer)?.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 px-3 py-2 rounded text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legend */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Technology Stack Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {layers.map((layer) => (
                <div key={layer.id} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="text-sm font-medium">{layer.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
