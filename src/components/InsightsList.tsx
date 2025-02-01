import React, { useState } from 'react';
import { TrendingUp, Users, BarChart, X, ArrowRight } from 'lucide-react';
import type { InsightCard } from '../types';

const insights: InsightCard[] = [
  {
    title: 'Marketing Campaign Performance',
    description: 'Email campaign conversion rate increased by 25%',
    category: 'marketing',
    impact: 'positive',
    value: '+25%',
    details: {
      metrics: [
        { label: 'Open Rate', value: '45%', trend: 'up' },
        { label: 'Click Rate', value: '12%', trend: 'up' },
        { label: 'Conversion Rate', value: '8%', trend: 'up' }
      ],
      recommendations: [
        'Optimize email subject lines for better open rates',
        'Segment audience based on engagement levels',
        'A/B test call-to-action buttons'
      ]
    }
  },
  {
    title: 'Employee Satisfaction',
    description: 'Team engagement scores show positive trend',
    category: 'hr',
    impact: 'positive',
    value: '92%',
    details: {
      metrics: [
        { label: 'Overall Satisfaction', value: '92%', trend: 'up' },
        { label: 'Work-Life Balance', value: '88%', trend: 'up' },
        { label: 'Career Growth', value: '85%', trend: 'neutral' }
      ],
      recommendations: [
        'Implement regular feedback sessions',
        'Enhance professional development programs',
        'Review and adjust work-life balance policies'
      ]
    }
  },
  {
    title: 'Resource Utilization',
    description: 'Server capacity optimization needed',
    category: 'operations',
    impact: 'negative',
    value: '78%',
    details: {
      metrics: [
        { label: 'CPU Usage', value: '78%', trend: 'down' },
        { label: 'Memory Usage', value: '85%', trend: 'neutral' },
        { label: 'Storage Usage', value: '92%', trend: 'up' }
      ],
      recommendations: [
        'Implement auto-scaling policies',
        'Optimize database queries',
        'Archive unused data'
      ]
    }
  }
];

const getCategoryIcon = (category: InsightCard['category']) => {
  switch (category) {
    case 'marketing':
      return <TrendingUp className="w-5 h-5" />;
    case 'hr':
      return <Users className="w-5 h-5" />;
    case 'operations':
      return <BarChart className="w-5 h-5" />;
  }
};

export default function InsightsList() {
  const [selectedInsight, setSelectedInsight] = useState<InsightCard | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">AI-Powered Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <div 
              key={insight.title} 
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedInsight(insight)}
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className={`p-2 rounded-lg
                  ${insight.category === 'marketing' ? 'bg-purple-50 text-purple-600' : ''}
                  ${insight.category === 'hr' ? 'bg-blue-50 text-blue-600' : ''}
                  ${insight.category === 'operations' ? 'bg-orange-50 text-orange-600' : ''}`}>
                  {getCategoryIcon(insight.category)}
                </div>
                <span className="text-sm font-medium capitalize">{insight.category}</span>
              </div>
              <h3 className="font-medium mb-2">{insight.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
              {insight.value && (
                <span className={`text-sm font-medium px-2 py-1 rounded
                  ${insight.impact === 'positive' ? 'bg-green-100 text-green-800' : ''}
                  ${insight.impact === 'negative' ? 'bg-red-100 text-red-800' : ''}
                  ${insight.impact === 'neutral' ? 'bg-gray-100 text-gray-800' : ''}`}>
                  {insight.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg
                  ${selectedInsight.category === 'marketing' ? 'bg-purple-50 text-purple-600' : ''}
                  ${selectedInsight.category === 'hr' ? 'bg-blue-50 text-blue-600' : ''}
                  ${selectedInsight.category === 'operations' ? 'bg-orange-50 text-orange-600' : ''}`}>
                  {getCategoryIcon(selectedInsight.category)}
                </div>
                <h2 className="text-xl font-semibold">{selectedInsight.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedInsight(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Key Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedInsight.details.metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{metric.label}</span>
                        <span className={`text-sm font-medium
                          ${metric.trend === 'up' ? 'text-green-600' : ''}
                          ${metric.trend === 'down' ? 'text-red-600' : ''}
                          ${metric.trend === 'neutral' ? 'text-gray-600' : ''}`}>
                          {metric.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">AI Recommendations</h3>
                <div className="space-y-2">
                  {selectedInsight.details.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <ArrowRight className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <span className="text-sm text-gray-600">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}