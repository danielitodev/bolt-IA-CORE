import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity, Users, Zap, Shield, X } from 'lucide-react';
import type { DashboardMetric } from '../types';

const metrics: DashboardMetric[] = [
  { 
    label: 'Active Workflows', 
    value: 24, 
    change: 12, 
    trend: 'up',
    details: {
      description: 'Number of automated workflows currently running in the system.',
      breakdown: [
        { label: 'Customer Onboarding', count: 8 },
        { label: 'Document Processing', count: 10 },
        { label: 'Data Sync', count: 6 }
      ]
    }
  },
  { 
    label: 'AI Interactions', 
    value: '2.4k', 
    change: 8, 
    trend: 'up',
    details: {
      description: 'Total AI-powered interactions processed this month.',
      breakdown: [
        { label: 'Customer Support', count: 1200 },
        { label: 'Data Analysis', count: 800 },
        { label: 'Process Automation', count: 400 }
      ]
    }
  },
  { 
    label: 'Security Score', 
    value: '98%', 
    change: -2, 
    trend: 'down',
    details: {
      description: 'Overall security health score based on multiple factors.',
      breakdown: [
        { label: 'Access Control', score: '100%' },
        { label: 'Data Encryption', score: '98%' },
        { label: 'Threat Detection', score: '96%' }
      ]
    }
  },
  { 
    label: 'Active Users', 
    value: 156, 
    change: 0, 
    trend: 'neutral',
    details: {
      description: 'Number of users currently active in the system.',
      breakdown: [
        { label: 'Administrators', count: 12 },
        { label: 'Regular Users', count: 124 },
        { label: 'Guests', count: 20 }
      ]
    }
  },
];

const getTrendIcon = (trend: DashboardMetric['trend']) => {
  switch (trend) {
    case 'up':
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    case 'down':
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    default:
      return <Minus className="w-4 h-4 text-gray-500" />;
  }
};

export default function DashboardMetrics() {
  const [selectedMetric, setSelectedMetric] = useState<DashboardMetric | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div 
            key={metric.label} 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedMetric(metric)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 rounded-lg">
                {metric.label === 'Active Workflows' && <Activity className="w-5 h-5 text-indigo-600" />}
                {metric.label === 'AI Interactions' && <Zap className="w-5 h-5 text-indigo-600" />}
                {metric.label === 'Security Score' && <Shield className="w-5 h-5 text-indigo-600" />}
                {metric.label === 'Active Users' && <Users className="w-5 h-5 text-indigo-600" />}
              </div>
              {getTrendIcon(metric.trend)}
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{metric.label}</h3>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              {metric.change !== 0 && (
                <span className={`ml-2 text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedMetric.label} Details</h2>
              <button 
                onClick={() => setSelectedMetric(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedMetric.details.description}</p>
            <div className="space-y-3">
              {selectedMetric.details.breakdown.map((item) => (
                <div key={item.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-gray-600">{item.count || item.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}