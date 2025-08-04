import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MessageCircle, 
  Calendar,
  ArrowLeft,
  XCircle
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import toast from 'react-hot-toast';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProjectById, applyToProject } = useProjects();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const project = getProjectById(id!);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
    setShowApplicationModal(true);
  };

  const submitApplication = () => {
    if (selectedRole) {
      applyToProject(project.id, selectedRole);
      toast.success(`Application submitted for ${selectedRole}!`);
      setShowApplicationModal(false);
      setSelectedRole(null);
    }
  };

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
    <div className="min-h-screen bg-primary-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>

      {/* Banner Image */}
      <div className="relative h-96 bg-gradient-to-br from-primary-400 to-secondary-500">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Project Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.timeline.status)}`}>
                {project.timeline.status.charAt(0).toUpperCase() + project.timeline.status.slice(1)}
              </span>
              {project.isRemote && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Remote
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Summary */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
              <p className="text-gray-700 leading-relaxed">
                {project.summary}
              </p>
            </section>

            {/* Roles Needed */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Roles Needed</h2>
              <div className="space-y-4">
                {project.roles.map((role, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {role.title}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {role.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {role.isOpen ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Open
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            Filled
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Apply Button */}
                    {role.isOpen && (
                      <button
                        onClick={() => handleApply(role.title)}
                        className="btn-primary"
                      >
                        Apply for this role
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Timeline</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Clock size={24} className="text-primary-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Project Timeline</h3>
                    <p className="text-gray-600">
                      Started {new Date(project.timeline.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    <span className="text-gray-700">Project planning phase</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      project.timeline.status === 'active' || project.timeline.status === 'completed'
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`} />
                    <span className="text-gray-700">Active development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      project.timeline.status === 'completed'
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`} />
                    <span className="text-gray-700">Project completion</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Founder Profile */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Founder</h3>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={project.founder.avatar}
                  alt={project.founder.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{project.founder.name}</h4>
                  <p className="text-sm text-gray-600">{project.founder.bio}</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full btn-outline flex items-center justify-center space-x-2">
                  <MessageCircle size={16} />
                  <span>Message Founder</span>
                </button>
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Calendar size={16} />
                  <span>Schedule Call</span>
                </button>
              </div>
            </section>

            {/* Project Stats */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">{project.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-semibold text-gray-900">{project.applications}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Open Roles</span>
                  <span className="font-semibold text-gray-900">
                    {project.roles.filter(r => r.isOpen).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold text-gray-900">{project.location.address}</span>
                </div>
              </div>
            </section>

            {/* Tags */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Apply for {selectedRole}
            </h3>
            <p className="text-gray-600 mb-6">
              You're about to apply for the {selectedRole} position at {project.title}. 
              The founder will be notified of your interest.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitApplication}
                className="flex-1 btn-primary"
              >
                Submit Application
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail; 