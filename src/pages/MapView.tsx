import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, ChevronLeft, ChevronRight, Users, Clock } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { Link } from 'react-router-dom';

const MapView: React.FC = () => {
  const { filteredProjects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Mock map coordinates (in a real app, you'd use react-map-gl)
  const mapCenter = { lat: 37.7749, lng: -122.4194 };

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    const index = filteredProjects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      setCurrentProjectIndex(index);
    }
  };

  const nextProject = () => {
    if (currentProjectIndex < filteredProjects.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
      setSelectedProject(filteredProjects[currentProjectIndex + 1].id);
    }
  };

  const prevProject = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
      setSelectedProject(filteredProjects[currentProjectIndex - 1].id);
    }
  };

  return (
    <div className="h-screen flex">
      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Project Pins */}
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
            style={{
              left: `${50 + (project.location.lng - mapCenter.lng) * 1000}%`,
              top: `${50 - (project.location.lat - mapCenter.lat) * 1000}%`,
            }}
            onClick={() => handleProjectSelect(project.id)}
          >
            <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-200 ${
              selectedProject === project.id
                ? 'bg-primary-500 scale-110'
                : 'bg-white hover:bg-primary-50'
            }`}>
              <MapPin 
                size={16} 
                className={selectedProject === project.id ? 'text-white' : 'text-primary-500'} 
              />
            </div>
            
            {/* Project Label */}
            {selectedProject === project.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-3 py-2 whitespace-nowrap"
              >
                <div className="text-sm font-medium text-gray-900">{project.title}</div>
                <div className="text-xs text-gray-500">{project.location.address}</div>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 left-4 space-y-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Map Info */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Project Map</h3>
          <p className="text-sm text-gray-600">
            {filteredProjects.length} projects in your area
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Click on pins to view project details
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-white border-l border-gray-200 overflow-hidden"
            ref={sidebarRef}
          >
            <div className="h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Projects Near You
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredProjects.length} projects found
                </p>
              </div>

              {/* Project List */}
              <div className="flex-1 overflow-y-auto">
                {filteredProjects.length === 0 ? (
                  <div className="p-8 text-center">
                    <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No projects nearby
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your location or filters
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 p-4">
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        layout
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          selectedProject === project.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => handleProjectSelect(project.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">
                              {project.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                              {project.summary}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <MapPin size={12} />
                                <span>{project.location.address}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users size={12} />
                                <span>{project.roles.length} roles</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Project Details */}
              {selectedProject && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="border-t border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Project Details</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={prevProject}
                        disabled={currentProjectIndex === 0}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextProject}
                        disabled={currentProjectIndex === filteredProjects.length - 1}
                        className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {(() => {
                    const project = filteredProjects[currentProjectIndex];
                    if (!project) return null;
                    
                    return (
                      <div>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-medium text-gray-900 mb-2">
                          {project.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {project.summary}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock size={14} />
                            <span>{project.timeline.status}</span>
                          </div>
                          <Link
                            to={`/project/${project.id}`}
                            className="btn-primary text-sm px-4 py-2"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView; 