
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, ExternalLink, Github, Plus, Trash2, X } from 'lucide-react';
import { projectTags } from '@/data/sampleProjects';
import { ProjectStatus, Task } from '@/types';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById, updateProject, addTask, updateTask, deleteTask } = useProjects();
  
  const project = getProjectById(projectId || '');
  
  const [newTask, setNewTask] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  
  if (!project) {
    return (
      <div className="container py-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/dashboard">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handleStatusChange = (status: string) => {
    updateProject(project.id, { status: status as ProjectStatus });
  };
  
  const handleFieldChange = (field: string, value: string) => {
    updateProject(project.id, { [field]: value });
  };
  
  const handleTaskAdd = () => {
    if (newTask.trim()) {
      addTask(project.id, {
        title: newTask.trim(),
        completed: false,
      });
      setNewTask('');
    }
  };
  
  const handleTaskCheck = (taskId: string, completed: boolean) => {
    updateTask(project.id, taskId, { completed });
  };
  
  const handleAddTag = () => {
    if (newTag && !project.tags.includes(newTag)) {
      updateProject(project.id, {
        tags: [...project.tags, newTag]
      });
      setNewTag('');
      setShowTagInput(false);
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    updateProject(project.id, {
      tags: project.tags.filter(t => t !== tag)
    });
  };
  
  const statusOptions: ProjectStatus[] = ['active', 'planned', 'completed', 'onhold', 'archived'];
  const statusLabels: Record<ProjectStatus, string> = {
    active: 'Active',
    planned: 'Planned',
    completed: 'Completed',
    onhold: 'On Hold',
    archived: 'Archived'
  };
  
  const completedTasks = project.tasks.filter(task => task.completed).length;
  const progress = project.tasks.length ? (completedTasks / project.tasks.length) * 100 : 0;
  
  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <div className="flex gap-2">
          <Link to={`/planner?project=${project.id}`}>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
          </Link>
          <Select defaultValue={project.status} onValueChange={handleStatusChange}>
            <SelectTrigger className={`w-32 status-${project.status} border-none`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(status => (
                <SelectItem key={status} value={status}>
                  {statusLabels[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 glass-card">
          <CardContent className="pt-6">
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">Project Title</label>
              <Input 
                value={project.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="bg-secondary/50"
                onBlur={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea 
                value={project.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="bg-secondary/50 min-h-24"
                onBlur={(e) => handleFieldChange('description', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block flex items-center gap-1">
                  <Github className="h-4 w-4" /> GitHub URL
                </label>
                <Input 
                  value={project.githubUrl || ''}
                  onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                  className="bg-secondary/50"
                  placeholder="https://github.com/username/repo"
                  onBlur={(e) => handleFieldChange('githubUrl', e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" /> Deployment URL
                </label>
                <Input 
                  value={project.deploymentUrl || ''}
                  onChange={(e) => handleFieldChange('deploymentUrl', e.target.value)}
                  className="bg-secondary/50"
                  placeholder="https://yourproject.com"
                  onBlur={(e) => handleFieldChange('deploymentUrl', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Technologies</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button 
                      className="ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                
                {!showTagInput && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-6 text-xs"
                    onClick={() => setShowTagInput(true)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Tag
                  </Button>
                )}
              </div>
              
              {showTagInput && (
                <div className="flex gap-2">
                  <Select value={newTag} onValueChange={setNewTag}>
                    <SelectTrigger className="bg-secondary/50">
                      <SelectValue placeholder="Select or type..." />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTags
                        .filter(tag => !project.tags.includes(tag))
                        .map(tag => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddTag}>Add</Button>
                  <Button variant="outline" onClick={() => setShowTagInput(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Project Progress</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{completedTasks} of {project.tasks.length} tasks</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Created</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Last Updated</span>
                <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="border-t border-border/50 mt-4 pt-4">
              <h3 className="font-medium mb-2">Quick Links</h3>
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition mb-2"
                >
                  <Github className="h-4 w-4 mr-2" /> View on GitHub
                </a>
              )}
              {project.deploymentUrl && (
                <a 
                  href={project.deploymentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-primary transition"
                >
                  <ExternalLink className="h-4 w-4 mr-2" /> View Deployment
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="tasks" className="mt-8">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="mt-4">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Task Checklist</h3>
                <span className="text-sm text-muted-foreground">
                  {completedTasks}/{project.tasks.length} completed
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                {project.tasks.map(task => (
                  <div key={task.id} className="flex items-start gap-2 p-2 rounded hover:bg-secondary/50">
                    <Checkbox 
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={(checked) => handleTaskCheck(task.id, checked as boolean)}
                    />
                    <label 
                      htmlFor={`task-${task.id}`}
                      className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {task.title}
                    </label>
                    <button 
                      className="text-muted-foreground hover:text-destructive transition"
                      onClick={() => deleteTask(project.id, task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {project.tasks.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No tasks added yet. Add your first task below.
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a new task..." 
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTaskAdd()}
                  className="bg-secondary/50"
                />
                <Button onClick={handleTaskAdd}>Add</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-4">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Project Notes</h3>
              <Textarea 
                placeholder="Add notes about your project here..."
                className="min-h-40 bg-secondary/50"
              />
              <div className="text-right mt-4">
                <Button>Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
