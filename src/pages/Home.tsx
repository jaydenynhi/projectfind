import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, List, Filter, MapPin, Users, Clock, Star, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectCard';
import FilterPanel from '../components/FilterPanel';

const Home: React.FC = () => {
  const { filteredProjects, viewMode, setViewMode } = useProjects();
  const [showFilters, setShowFilters] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-400 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Next
              <span className="block text-accent-300">Passion Project</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Connect with students and young professionals who share your interests. 
              Discover exciting projects, build your network, and make an impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowStats(true)}
                className="btn-secondary text-lg px-8 py-3 flex items-center space-x-2"
              >
                <Sparkles size={20} />
                <span>Start Exploring</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
              >
                Create Project
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatePresence>
        {showStats && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-12 bg-white"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
                <p className="text-gray-600">Discover what we've achieved together</p>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <div className="text-3xl font-bold text-primary-500">500+</div>
              <div className="text-gray-600">Active Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <div className="text-3xl font-bold text-secondary-500">2,000+</div>
              <div className="text-gray-600">Students Connected</div>
            </motion.div>
                          <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <div className="text-3xl font-bold text-accent-500">150+</div>
                <div className="text-gray-600">Cities Worldwide</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <div className="text-3xl font-bold text-yellow-500">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProjects(true)}
                className="btn-primary text-lg px-8 py-3 flex items-center space-x-2 mx-auto"
              >
                <span>View Projects</span>
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
        )}
      </AnimatePresence>

      {/* Projects Section */}
      <AnimatePresence>
        {showProjects && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-12"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with filters and view toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Discover Projects
              </h2>
              <p className="text-gray-600">
                {filteredProjects.length} projects found
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List size={18} />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                    viewMode === 'map'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Map size={18} />
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <FilterPanel />
            </motion.div>
          )}

          {/* Projects Grid */}
          {viewMode === 'list' ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          ) : (
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <Map size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Map view coming soon!</p>
                <Link to="/map" className="text-primary-600 hover:underline">
                  Go to full map view
                </Link>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search criteria
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="btn-primary"
              >
                Adjust Filters
              </button>
            </div>
          )}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFeatured(true)}
              className="btn-secondary text-lg px-8 py-3 flex items-center space-x-2 mx-auto"
            >
              <span>View Featured Projects</span>
              <Sparkles size={20} />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
      )}
      </AnimatePresence>

      {/* Featured Section */}
      <AnimatePresence>
        {showFeatured && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-16 bg-white"
          >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured This Week
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hand-picked projects that are making waves in their communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Home; 