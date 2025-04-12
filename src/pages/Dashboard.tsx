
import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectContext';
import ProjectCard from '@/components/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ProjectStatus } from '@/types';

const Dashboard = () => {
  const { projects } = useProjects();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  
  const filteredProjects = statusFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === statusFilter);
  
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const plannedProjects = projects.filter(p => p.status === 'planned').length;
  
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track all your development projects
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-4 rounded-lg">
          <div className="text-lg font-medium">Active Projects</div>
          <div className="text-3xl font-bold mt-1">{activeProjects}</div>
          <div className="h-1 w-full bg-green-500/30 mt-2 rounded-full">
            <div 
              className="h-full bg-green-500" 
              style={{ width: `${(activeProjects / projects.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg">
          <div className="text-lg font-medium">Planned Projects</div>
          <div className="text-3xl font-bold mt-1">{plannedProjects}</div>
          <div className="h-1 w-full bg-blue-500/30 mt-2 rounded-full">
            <div 
              className="h-full bg-blue-500" 
              style={{ width: `${(plannedProjects / projects.length) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="glass-card p-4 rounded-lg">
          <div className="text-lg font-medium">Completed Projects</div>
          <div className="text-3xl font-bold mt-1">{completedProjects}</div>
          <div className="h-1 w-full bg-purple-500/30 mt-2 rounded-full">
            <div 
              className="h-full bg-purple-500" 
              style={{ width: `${(completedProjects / projects.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'all')}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Projects</h2>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="planned">Planned</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="onhold">On Hold</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No projects found. Create your first project to get started.</p>
                <Button className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No active projects found.</p>
                <Button className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="planned" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No planned projects found.</p>
                <Button className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No completed projects found.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="onhold" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No on-hold projects found.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="archived" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No archived projects found.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
