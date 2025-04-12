
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useProjects } from '@/context/ProjectContext';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';

const Planner = () => {
  const { projects } = useProjects();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  
  // This would be handled in the real app with a dedicated context or API
  const [events, setEvents] = useState<Array<{
    id: string;
    title: string;
    date: Date;
    projectId: string;
  }>>([
    {
      id: '1',
      title: 'Complete homepage design',
      date: new Date(),
      projectId: '1',
    },
    {
      id: '2',
      title: 'Backend API development',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      projectId: '2',
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    projectId: '',
  });
  
  const handlePreviousMonth = () => {
    setMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };
  
  const handleNextMonth = () => {
    setMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };
  
  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.title || !newEvent.projectId) return;
    
    const newEventObj = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      projectId: newEvent.projectId,
    };
    
    setEvents(prev => [...prev, newEventObj]);
    setNewEvent({ title: '', projectId: '' });
  };
  
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      new Date(event.date).toDateString() === new Date(date).toDateString()
    );
  };
  
  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };
  
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];
  
  // Create a function to render event dots on calendar
  const renderEventIndicator = (day: Date) => {
    const dayEvents = getEventsForDate(day);
    
    if (dayEvents.length === 0) return null;
    
    return (
      <div className="flex justify-center mt-1">
        {dayEvents.slice(0, 3).map((_, i) => (
          <div 
            key={i} 
            className="h-1.5 w-1.5 rounded-full bg-primary mx-0.5" 
          />
        ))}
        {dayEvents.length > 3 && (
          <div className="h-1.5 w-1.5 rounded-full bg-primary mx-0.5" />
        )}
      </div>
    );
  };
  
  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Planner</h1>
          <p className="text-muted-foreground">
            Schedule tasks and manage deadlines for your projects
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-24 text-center flex items-center justify-center">
            {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={month}
                onMonthChange={setMonth}
                className="rounded-md"
                components={{
                  DayContent: ({ day }) => (
                    <div className="flex flex-col items-center justify-center">
                      <div>{day.day}</div>
                      {renderEventIndicator(day.date)}
                    </div>
                  ),
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <h3 className="font-medium">
                  {selectedDate 
                    ? selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'Select a date'
                  }
                </h3>
              </div>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {selectedDateEvents.map(event => {
                    const project = getProjectById(event.projectId);
                    return (
                      <div key={event.id} className="p-3 bg-secondary/50 rounded-md">
                        <div className="font-medium">{event.title}</div>
                        {project && (
                          <div className="flex items-center mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs status-${project.status} mr-2`}
                            >
                              {project.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {project.title}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  {selectedDate 
                    ? 'No events scheduled for this day' 
                    : 'Select a date to view events'
                  }
                </div>
              )}
              
              {selectedDate && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Add New Event</h4>
                  <div className="space-y-3">
                    <Input 
                      placeholder="Event title"
                      value={newEvent.title}
                      onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-secondary/50"
                    />
                    
                    <Select 
                      value={newEvent.projectId}
                      onValueChange={value => setNewEvent(prev => ({ ...prev, projectId: value }))}
                    >
                      <SelectTrigger className="bg-secondary/50">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleAddEvent}
                      disabled={!newEvent.title || !newEvent.projectId}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Planner;
