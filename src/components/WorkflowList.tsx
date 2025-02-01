import React, { useState } from 'react';
import { Clock, AlertCircle, CheckCircle, X, Calendar, User, Flag } from 'lucide-react';
import type { WorkflowTask } from '../types';

const workflows: WorkflowTask[] = [
  {
    id: '1',
    title: 'Customer Onboarding Automation',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-25',
    assignee: 'Sarah Chen',
    description: 'Automate the customer onboarding process including document verification, account setup, and welcome email sequence.',
    steps: [
      { name: 'Document Collection', status: 'completed' },
      { name: 'Verification Process', status: 'in-progress' },
      { name: 'Account Setup', status: 'pending' },
      { name: 'Welcome Email', status: 'pending' }
    ]
  },
  {
    id: '2',
    title: 'Invoice Processing Workflow',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-03-23',
    assignee: 'Mike Johnson',
    description: 'Automated invoice processing system including validation, approval workflow, and payment processing.',
    steps: [
      { name: 'Invoice Receipt', status: 'completed' },
      { name: 'Data Extraction', status: 'completed' },
      { name: 'Approval Process', status: 'completed' },
      { name: 'Payment Processing', status: 'completed' }
    ]
  },
  {
    id: '3',
    title: 'HR Document Approval',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-03-26',
    assignee: 'Emma Davis',
    description: 'Streamline HR document approval process for employee onboarding, reviews, and policy updates.',
    steps: [
      { name: 'Document Preparation', status: 'completed' },
      { name: 'Initial Review', status: 'pending' },
      { name: 'Department Approval', status: 'pending' },
      { name: 'Final Sign-off', status: 'pending' }
    ]
  }
];

const getStatusIcon = (status: WorkflowTask['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'in-progress':
      return <AlertCircle className="w-5 h-5 text-blue-500" />;
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
  }
};

export default function WorkflowList() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowTask | null>(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Active Workflows</h2>
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div 
              key={workflow.id} 
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(workflow.status)}
                <div>
                  <h3 className="font-medium">{workflow.title}</h3>
                  <p className="text-sm text-gray-500">Assigned to {workflow.assignee}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm
                  ${workflow.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                  ${workflow.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${workflow.priority === 'low' ? 'bg-green-100 text-green-800' : ''}`}>
                  {workflow.priority}
                </span>
                <span className="text-sm text-gray-500">Due {new Date(workflow.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{selectedWorkflow.title}</h2>
              <button 
                onClick={() => setSelectedWorkflow(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">{selectedWorkflow.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{selectedWorkflow.assignee}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Due {new Date(selectedWorkflow.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flag className="w-5 h-5 text-gray-400" />
                  <span className={`text-sm px-2 py-1 rounded-full
                    ${selectedWorkflow.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                    ${selectedWorkflow.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${selectedWorkflow.priority === 'low' ? 'bg-green-100 text-green-800' : ''}`}>
                    {selectedWorkflow.priority} priority
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Workflow Steps</h3>
                <div className="space-y-2">
                  {selectedWorkflow.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {getStatusIcon(step.status)}
                      <span className="text-sm">{step.name}</span>
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