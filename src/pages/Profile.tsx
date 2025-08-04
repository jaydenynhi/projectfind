import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Edit, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter,
  Star,
  Award,
  Users,
  Calendar,
  BookOpen,
  Target,
  TrendingUp
} from 'lucide-react';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userProfile = {
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    bio: 'Passionate full-stack developer and environmental advocate. Building sustainable tech solutions and connecting with like-minded innovators.',
    location: 'San Francisco, CA',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    website: 'alexjohnson.dev',
    github: 'alexjohnson',
    linkedin: 'alexjohnson',
    twitter: '@alexjohnson',
    skills: [
      'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker',
      'Machine Learning', 'UI/UX Design', 'Project Management'
    ],
    interests: [
      'Sustainability', 'Clean Energy', 'Education Technology', 'Mental Health',
      'Local Communities', 'Open Source'
    ],
    stats: {
      projectsJoined: 12,
      projectsCreated: 3,
      connections: 89,
      badges: 7
    },
    achievements: [
      {
        id: '1',
        title: 'Team Builder',
        description: 'Successfully formed 5+ project teams',
        icon: Users,
        color: 'bg-blue-100 text-blue-600'
      },
      {
        id: '2',
        title: 'Top Collaborator',
        description: 'Recognized for outstanding teamwork',
        icon: Star,
        color: 'bg-yellow-100 text-yellow-600'
      },
      {
        id: '3',
        title: 'Innovation Leader',
        description: 'Led breakthrough project initiatives',
        icon: TrendingUp,
        color: 'bg-green-100 text-green-600'
      }
    ],
    recentProjects: [
      {
        id: '1',
        title: 'EcoTech Startup',
        role: 'Frontend Developer',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150'
      },
      {
        id: '2',
        title: 'Student Mental Health App',
        role: 'Project Lead',
        status: 'Completed',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150'
      },
      {
        id: '3',
        title: 'Local Food Network',
        role: 'Backend Developer',
        status: 'Planning',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
              <div className="bg-gradient-to-r from-primary-400 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-24 h-24 rounded-full border-4 border-white/20"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
                <p className="text-primary-100 text-lg">{userProfile.bio}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span className="text-sm">{userProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span className="text-sm">{userProfile.stats.connections} connections</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-lg p-6 text-center border border-gray-200"
                >
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {userProfile.stats.projectsJoined}
                  </div>
                  <div className="text-sm text-gray-600">Projects Joined</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg p-6 text-center border border-gray-200"
                >
                  <div className="text-2xl font-bold text-secondary-600 mb-2">
                    {userProfile.stats.projectsCreated}
                  </div>
                  <div className="text-sm text-gray-600">Projects Created</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-lg p-6 text-center border border-gray-200"
                >
                  <div className="text-2xl font-bold text-accent-600 mb-2">
                    {userProfile.stats.connections}
                  </div>
                  <div className="text-sm text-gray-600">Connections</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg p-6 text-center border border-gray-200"
                >
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {userProfile.stats.badges}
                  </div>
                  <div className="text-sm text-gray-600">Badges Earned</div>
                </motion.div>
              </div>
            </section>

            {/* Recent Projects */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Projects</h2>
              <div className="space-y-4">
                {userProfile.recentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{project.role}</p>
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Active' ? 'bg-green-100 text-green-800' :
                            project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            <Calendar size={12} className="inline mr-1" />
                            Started 2 months ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements & Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userProfile.achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                    >
                      <div className={`w-12 h-12 rounded-full ${achievement.color} flex items-center justify-center mx-auto mb-4`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">{userProfile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">{userProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-700">{userProfile.website}</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Social Links</h4>
                <div className="flex space-x-3">
                  <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Github size={16} />
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Linkedin size={16} />
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Twitter size={16} />
                  </a>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary">
                  Create New Project
                </button>
                <button className="w-full btn-outline">
                  Browse Projects
                </button>
                <button className="w-full btn-outline">
                  View Connections
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 