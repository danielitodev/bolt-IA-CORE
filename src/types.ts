export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  details: {
    description: string;
    breakdown: Array<{
      label: string;
      count?: number;
      score?: string;
    }>;
  };
}

export interface WorkflowTask {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: string;
  description: string;
  steps: Array<{
    name: string;
    status: 'pending' | 'in-progress' | 'completed';
  }>;
}

export interface InsightCard {
  title: string;
  description: string;
  category: 'marketing' | 'hr' | 'operations';
  impact: 'positive' | 'negative' | 'neutral';
  value?: string;
  details: {
    metrics: Array<{
      label: string;
      value: string;
      trend: 'up' | 'down' | 'neutral';
    }>;
    recommendations: string[];
  };
}

export interface UserSettings {
  profile: {
    fullName: string;
    email: string;
    jobTitle: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  account: {
    twoFactorEnabled: boolean;
    profileVisibility: 'Public' | 'Private' | 'Team Only';
    activityStatus: boolean;
  };
  preferences: {
    theme: 'Light' | 'Dark' | 'System';
    compactMode: boolean;
    language: string;
    timeZone: string;
  };
}