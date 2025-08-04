import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Star, ExternalLink } from 'lucide-react';
import { Project } from '../context/ProjectContext';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden card-hover"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.timeline.status)}`}>
            {project.timeline.status.charAt(0).toUpperCase() + project.timeline.status.slice(1)}
          </span>
        </div>

        {/* Remote Badge */}
        {project.isRemote && (
          <div className="absolute top-4 left-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              Remote
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {project.summary}
          </p>
        </div>

        {/* Location and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>{project.location.address}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{project.roles.length} roles</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Star size={16} className="text-yellow-400 fill-current" />
            <span>{project.views}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Founder Info */}
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <img
            src={project.founder.avatar}
            alt={project.founder.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {project.founder.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {project.founder.bio}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            to={`/project/${project.id}`}
            className="flex-1 btn-primary text-center flex items-center justify-center space-x-2"
          >
            <span>View Details</span>
            <ExternalLink size={16} />
          </Link>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Star size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 