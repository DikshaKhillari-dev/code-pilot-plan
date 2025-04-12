
import { Project, ProjectStatus } from '../types';

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Personal Portfolio Website',
    description: 'A modern portfolio website showcasing my projects and skills with a clean, minimalist design.',
    status: 'active',
    tasks: [
      { id: '1-1', title: 'Design homepage layout', completed: true },
      { id: '1-2', title: 'Create responsive navigation', completed: true },
      { id: '1-3', title: 'Implement project showcase section', completed: false },
      { id: '1-4', title: 'Add contact form with validation', completed: false },
      { id: '1-5', title: 'Deploy to production', completed: false },
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/username/portfolio',
    deploymentUrl: 'https://portfolio.example.com',
    createdAt: '2023-11-05T14:48:00.000Z',
    updatedAt: '2023-12-15T09:30:00.000Z',
  },
  {
    id: '2',
    title: 'E-commerce Dashboard',
    description: 'Admin dashboard for an e-commerce platform with sales analytics, inventory management, and customer data.',
    status: 'planned',
    tasks: [
      { id: '2-1', title: 'Define dashboard requirements', completed: true },
      { id: '2-2', title: 'Create wireframes', completed: true },
      { id: '2-3', title: 'Build authentication system', completed: false },
      { id: '2-4', title: 'Implement analytics charts', completed: false },
      { id: '2-5', title: 'Set up inventory management', completed: false },
    ],
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Chart.js', 'PostgreSQL'],
    createdAt: '2023-12-01T10:00:00.000Z',
    updatedAt: '2023-12-10T16:45:00.000Z',
  },
  {
    id: '3',
    title: 'Recipe Sharing App',
    description: 'Mobile-first web app for sharing and discovering recipes with social features and meal planning tools.',
    status: 'completed',
    tasks: [
      { id: '3-1', title: 'Design user interface', completed: true },
      { id: '3-2', title: 'Implement user authentication', completed: true },
      { id: '3-3', title: 'Build recipe upload functionality', completed: true },
      { id: '3-4', title: 'Create search and filtering system', completed: true },
      { id: '3-5', title: 'Add social sharing features', completed: true },
    ],
    tags: ['React Native', 'Firebase', 'Expo', 'Redux'],
    githubUrl: 'https://github.com/username/recipe-app',
    deploymentUrl: 'https://recipe-app.example.com',
    createdAt: '2023-09-12T08:30:00.000Z',
    updatedAt: '2023-11-20T14:15:00.000Z',
  },
  {
    id: '4',
    title: 'AI Content Generator',
    description: 'Web application that uses AI to generate blog posts, social media content, and marketing copy from simple prompts.',
    status: 'onhold',
    tasks: [
      { id: '4-1', title: 'Research AI content generation APIs', completed: true },
      { id: '4-2', title: 'Design application interface', completed: true },
      { id: '4-3', title: 'Build prompt engineering system', completed: false },
      { id: '4-4', title: 'Implement content generation and editing', completed: false },
      { id: '4-5', title: 'Add export and publishing features', completed: false },
    ],
    tags: ['OpenAI API', 'React', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/username/ai-content-gen',
    createdAt: '2023-10-05T11:20:00.000Z',
    updatedAt: '2023-11-15T13:50:00.000Z',
  },
  {
    id: '5',
    title: 'Fitness Tracker',
    description: 'Mobile app for tracking workouts, nutrition, and fitness progress with visualization of statistics and goal setting.',
    status: 'archived',
    tasks: [
      { id: '5-1', title: 'Define app features and user flow', completed: true },
      { id: '5-2', title: 'Create initial mockups', completed: true },
      { id: '5-3', title: 'Build workout tracking module', completed: false },
      { id: '5-4', title: 'Implement nutrition tracking', completed: false },
      { id: '5-5', title: 'Add progress visualization', completed: false },
    ],
    tags: ['Flutter', 'Dart', 'Firebase', 'SQLite'],
    createdAt: '2023-08-01T09:15:00.000Z',
    updatedAt: '2023-09-10T16:20:00.000Z',
  }
];

export const projectTags = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 
  'MongoDB', 'PostgreSQL', 'Firebase', 'Supabase', 'Tailwind CSS', 
  'Chakra UI', 'Framer Motion', 'Redux', 'Zustand', 'React Query',
  'GraphQL', 'REST API', 'Prisma', 'Docker', 'AWS', 'Vercel', 'Netlify',
  'Testing', 'CI/CD', 'Flutter', 'React Native', 'Vue.js', 'Svelte',
  'Python', 'Django', 'Laravel', 'Ruby on Rails', 'Go', 'Rust'
];
