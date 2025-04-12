
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Sidebar, SidebarNav, SidebarNavLink } from '@/components/ui/sidebar';
import { LayoutDashboard, FolderKanban, CalendarDays, Settings, PlusCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar>
        <div className="flex h-14 items-center px-4 border-b">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <span className="h-7 w-7 bg-primary rounded-md flex items-center justify-center text-sm text-primary-foreground">PP</span>
            <span>ProjectPilot</span>
          </Link>
        </div>
        <SidebarNav>
          <SidebarNavLink to="/dashboard" icon={LayoutDashboard}>
            Dashboard
          </SidebarNavLink>
          <SidebarNavLink to="/projects" icon={FolderKanban}>
            Projects
          </SidebarNavLink>
          <SidebarNavLink to="/planner" icon={CalendarDays}>
            Planner
          </SidebarNavLink>
          <SidebarNavLink to="/settings" icon={Settings}>
            Settings
          </SidebarNavLink>
        </SidebarNav>
        <div className="mt-auto p-4 border-t">
          <Button className="w-full mb-2" variant="default">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
          <Button className="w-full" variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </Sidebar>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
