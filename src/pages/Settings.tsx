
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">
        Configure your app preferences and account settings
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" className="bg-secondary/50" defaultValue="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" className="bg-secondary/50" defaultValue="john@example.com" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" className="bg-secondary/50" defaultValue="Full Stack Developer" />
                </div>
                
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle dark mode on or off
                    </p>
                  </div>
                  <Switch id="darkMode" defaultChecked />
                </div>
                
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="theme" className="bg-secondary/50">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="teal">Teal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifs">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about tasks and deadlines
                    </p>
                  </div>
                  <Switch id="emailNotifs" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="taskReminders">Task Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders for upcoming task deadlines
                    </p>
                  </div>
                  <Switch id="taskReminders" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full">Export Projects</Button>
                <Button variant="outline" className="w-full">Import Projects</Button>
                <Button variant="destructive" className="w-full">Clear All Data</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-muted-foreground">Version:</span> 1.0.0
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Created by:</span> ProjectPilot Team
                </p>
                <div className="pt-2">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
