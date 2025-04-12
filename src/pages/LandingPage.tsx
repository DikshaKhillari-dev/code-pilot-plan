
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Github, LayoutDashboard, Calendar, TagIcon } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="container flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-sm font-semibold text-primary-foreground">PP</span>
            <span className="font-semibold text-xl">ProjectPilot</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <Link to="/dashboard">
              <Button variant="outline">Get Started</Button>
            </Link>
          </nav>
          <Link to="/dashboard" className="md:hidden">
            <Button size="sm" variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
              Ship your indie projects faster
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              A simple, powerful project management tool built specifically for solo developers and indie hackers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </Button>
              </a>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden border border-border/40 glass-card">
            <img 
              src="https://placehold.co/1200x600/1a1a1a/FFFFFF?text=ProjectPilot+Dashboard" 
              alt="ProjectPilot Dashboard" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Features built for indie developers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Dashboard</h3>
              <p className="text-muted-foreground">
                Get a bird's eye view of all your projects. Track status, progress, and important details at a glance.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-muted-foreground">
                Create task checklists for each project. Add, edit, and mark tasks as complete to track progress.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Planning</h3>
              <p className="text-muted-foreground">
                Plan your projects with an integrated calendar. Set deadlines and visualize your timeline.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <TagIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tech Stack Tagging</h3>
              <p className="text-muted-foreground">
                Tag projects with technologies used. Easily filter and find projects by tech stack.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  <path d="M9 10.5a1.5 1.5 0 0 1 3 0v6a1.5 1.5 0 0 1-3 0v-6Z" />
                  <path d="M9 10.5V6a1 1 0 0 1 2 0" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto-save</h3>
              <p className="text-muted-foreground">
                All your changes are automatically saved. No need to worry about losing your work.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z" />
                  <path d="M4 10h16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-muted-foreground">
                Access your projects from any device. The app is fully responsive and works on mobile, tablet, and desktop.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to organize your projects?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start tracking your projects today and never lose track of your progress again.
            </p>
            <Link to="/dashboard">
              <Button size="lg">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 border-t border-border/40">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="h-6 w-6 bg-primary rounded-md flex items-center justify-center text-xs font-semibold text-primary-foreground">PP</span>
              <span className="font-medium">ProjectPilot</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ProjectPilot. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
