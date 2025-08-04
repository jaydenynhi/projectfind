import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  image: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  isRemote: boolean;
  tags: string[];
  roles: {
    title: string;
    description: string;
    skills: string[];
    isOpen: boolean;
  }[];
  founder: {
    name: string;
    avatar: string;
    bio: string;
  };
  timeline: {
    startDate: string;
    endDate?: string;
    status: 'planning' | 'active' | 'completed';
  };
  createdAt: string;
  views: number;
  applications: number;
}

interface ProjectContextType {
  projects: Project[];
  filteredProjects: Project[];
  viewMode: 'list' | 'map';
  filters: {
    location: string;
    tags: string[];
    remote: boolean;
    timeline: string;
  };
  setViewMode: (mode: 'list' | 'map') => void;
  setFilters: (filters: any) => void;
  getProjectById: (id: string) => Project | undefined;
  applyToProject: (projectId: string, roleTitle: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'EcoTech Startup',
      description: 'Building sustainable technology solutions for urban environments',
      summary: 'We\'re developing smart city solutions that reduce carbon footprint and improve quality of life.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
      location: {
        lat: 37.7749,
        lng: -122.4194,
        address: 'San Francisco, CA'
      },
      isRemote: true,
      tags: ['Tech', 'Environment', 'Sustainability', 'Smart Cities'],
      roles: [
        {
          title: 'Frontend Developer',
          description: 'Build beautiful, responsive user interfaces',
          skills: ['React', 'TypeScript', 'Tailwind CSS'],
          isOpen: true
        },
        {
          title: 'Data Scientist',
          description: 'Analyze environmental data and build ML models',
          skills: ['Python', 'TensorFlow', 'Data Analysis'],
          isOpen: true
        }
      ],
      founder: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        bio: 'Environmental engineer with 5+ years in sustainable tech'
      },
      timeline: {
        startDate: '2024-01-15',
        status: 'active'
      },
      createdAt: '2024-01-10',
      views: 1247,
      applications: 23
    },
    {
      id: '2',
      title: 'Student Mental Health App',
      description: 'Creating a supportive community for student mental wellness',
      summary: 'Mobile app connecting students with peer support, resources, and professional help.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: 'New York, NY'
      },
      isRemote: false,
      tags: ['Health', 'Education', 'Mobile App', 'Community'],
      roles: [
        {
          title: 'Mobile Developer',
          description: 'Develop iOS and Android app features',
          skills: ['React Native', 'JavaScript', 'Firebase'],
          isOpen: true
        },
        {
          title: 'UX Designer',
          description: 'Design intuitive and accessible user experiences',
          skills: ['Figma', 'User Research', 'Prototyping'],
          isOpen: true
        }
      ],
      founder: {
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        bio: 'Psychology major passionate about mental health advocacy'
      },
      timeline: {
        startDate: '2024-02-01',
        status: 'planning'
      },
      createdAt: '2024-01-25',
      views: 892,
      applications: 15
    },
    {
      id: '3',
      title: 'Local Food Delivery Network',
      description: 'Connecting local farmers with consumers through sustainable delivery',
      summary: 'Platform that reduces food waste and supports local agriculture.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800',
      location: {
        lat: 34.0522,
        lng: -118.2437,
        address: 'Los Angeles, CA'
      },
      isRemote: true,
      tags: ['Food', 'Sustainability', 'Local Business', 'Logistics'],
      roles: [
        {
          title: 'Backend Developer',
          description: 'Build scalable API and database systems',
          skills: ['Node.js', 'PostgreSQL', 'AWS'],
          isOpen: true
        },
        {
          title: 'Business Development',
          description: 'Partner with local farms and restaurants',
          skills: ['Sales', 'Partnerships', 'Market Research'],
          isOpen: true
        }
      ],
      founder: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        bio: 'Former restaurant owner turned food tech entrepreneur'
      },
      timeline: {
        startDate: '2024-01-20',
        status: 'active'
      },
      createdAt: '2024-01-15',
      views: 567,
      applications: 8
    }
  ]);

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    location: '',
    tags: [],
    remote: false,
    timeline: ''
  });

  const filteredProjects = projects.filter(project => {
    if (filters.location && !project.location.address.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.tags.length > 0 && !filters.tags.some(tag => project.tags.includes(tag))) {
      return false;
    }
    if (filters.remote && !project.isRemote) {
      return false;
    }
    if (filters.timeline && project.timeline.status !== filters.timeline) {
      return false;
    }
    return true;
  });

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const applyToProject = (projectId: string, roleTitle: string) => {
    // In a real app, this would make an API call
    console.log(`Applied to ${roleTitle} at project ${projectId}`);
  };

  const value = {
    projects,
    filteredProjects,
    viewMode,
    filters,
    setViewMode,
    setFilters,
    getProjectById,
    applyToProject
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}; 