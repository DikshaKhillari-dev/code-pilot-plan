
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusClass = `status-${project.status}`;
  
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.completed).length;
  
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="h-full glass-card hover-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg line-clamp-1">{project.title}</h3>
            <span className={`status-badge ${statusClass}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary"
              style={{ width: `${totalTasks ? (completedTasks / totalTasks) * 100 : 0}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {completedTasks}/{totalTasks} tasks completed
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="text-xs text-muted-foreground">
            Updated {new Date(project.updatedAt).toLocaleDateString()}
          </div>
          <div className="flex space-x-2">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
            {project.deploymentUrl && (
              <a 
                href={project.deploymentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
