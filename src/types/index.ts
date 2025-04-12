
export type ProjectStatus = 'active' | 'planned' | 'completed' | 'onhold' | 'archived';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tasks: Task[];
  tags: string[];
  githubUrl?: string;
  deploymentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  projectId: string;
  taskId?: string;
}
