
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import { CalendarEvent } from '@/types';

// Mock data for calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Project Alpha Deadline',
    date: '2023-06-15',
    projectId: 'proj-1',
  },
  {
    id: '2',
    title: 'Beta Testing',
    date: '2023-06-20',
    projectId: 'proj-2',
  },
  {
    id: '3',
    title: 'Client Meeting',
    date: '2023-06-10',
    projectId: 'proj-3',
  },
];

const Planner = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  // Filter events for the selected date
  const selectedDateEvents = selectedDate 
    ? mockEvents.filter(event => event.date === format(selectedDate, 'yyyy-MM-dd')) 
    : [];

  // Function to check if a date has events
  const dateHasEvents = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return mockEvents.some(event => event.date === formattedDate);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Planner</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Calendar</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium">
                {format(currentDate, 'MMMM yyyy')}
              </div>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentDate}
              className="rounded-md border"
              modifiers={{
                hasEvent: (date) => dateHasEvents(date)
              }}
              modifiersStyles={{
                hasEvent: { 
                  position: 'relative',
                  '::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '1px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)'
                  }
                }
              }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select a date'}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length} events scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="events">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
              </TabsList>
              <TabsContent value="events" className="space-y-4 mt-4">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map(event => (
                    <div key={event.id} className="p-3 border rounded-md">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">Project: {event.projectId}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No events scheduled for this day
                  </div>
                )}
              </TabsContent>
              <TabsContent value="tasks" className="mt-4">
                <div className="text-center py-6 text-muted-foreground">
                  No tasks scheduled for this day
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Planner;
