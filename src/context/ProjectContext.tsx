
import React, { createContext, useContext, useState } from 'react';
import { Project, Task, ProjectStatus } from '@/types';
import { sampleProjects } from '@/data/sampleProjects';

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  addTask: (projectId: string, task: Omit<Task, 'id'>) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  getProjectById: (projectId: string) => Project | undefined;
  filterProjects: (status?: ProjectStatus) => Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };

    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, ...updates, updatedAt: new Date().toISOString() } 
          : project
      )
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const addTask = (projectId: string, task: Omit<Task, 'id'>) => {
    setProjects(prev => 
      prev.map(project => {
        if (project.id === projectId) {
          const newTask: Task = {
            ...task,
            id: Date.now().toString(),
          };
          return { 
            ...project, 
            tasks: [...project.tasks, newTask],
            updatedAt: new Date().toISOString()
          };
        }
        return project;
      })
    );
  };

  const updateTask = (projectId: string, taskId: string, updates: Partial<Task>) => {
    setProjects(prev => 
      prev.map(project => {
        if (project.id === projectId) {
          const updatedTasks = project.tasks.map(task => 
            task.id === taskId ? { ...task, ...updates } : task
          );
          return { 
            ...project, 
            tasks: updatedTasks,
            updatedAt: new Date().toISOString()
          };
        }
        return project;
      })
    );
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(prev => 
      prev.map(project => {
        if (project.id === projectId) {
          return { 
            ...project, 
            tasks: project.tasks.filter(task => task.id !== taskId),
            updatedAt: new Date().toISOString()
          };
        }
        return project;
      })
    );
  };

  const getProjectById = (projectId: string) => {
    return projects.find(project => project.id === projectId);
  };

  const filterProjects = (status?: ProjectStatus) => {
    if (!status) return projects;
    return projects.filter(project => project.status === status);
  };

  return (
    <ProjectContext.Provider 
      value={{ 
        projects, 
        addProject, 
        updateProject, 
        deleteProject, 
        addTask, 
        updateTask, 
        deleteTask, 
        getProjectById,
        filterProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
