import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Calendar, MessageCircle, Vote, Trophy, 
  Settings, Edit3, MapPin, Link as LinkIcon, 
  Github, Twitter, Linkedin, Mail, Award, Shield,
  Ban, Trash2, Eye
} from 'lucide-react';
import { mockUsers, mockProjects } from '../data/mockData';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'votes' | 'comments' | 'activity'>('projects');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin] = useState(true); // Mock admin status - in real app, get from auth context
  
  // Mock current user data
  const currentUser = {
    ...mockUsers[0],
    location: 'San Francisco, CA',
    website: 'https://sarahchen.dev',
    social: {
      github: 'sarahchen',
      twitter: 'sarahc_tech',
      linkedin: 'sarahchen-tech'
    },
    achievements: [
      { name: 'First Project', icon: Trophy, color: 'from-yellow-400 to-orange-500' },
      { name: 'Top Voter', icon: Vote, color: 'from-blue-400 to-indigo-500' },
      { name: 'Community Champion', icon: Award, color: 'from-purple-400 to-pink-500' }
    ],
    totalVotesReceived: 1247,
    totalFunding: 25000
  };

  const userProjects = mockProjects.filter(p => p.author.id === currentUser.id);
  
  const mockVotedProjects = mockProjects.slice(0, 3);
  const mockComments = [
    {
      id: '1',
      projectTitle: 'EcoGrow - Smart Urban Farming System',
      content: 'This is incredibly innovative! The AI optimization aspect could revolutionize urban agriculture.',
      date: '2024-01-16',
      likes: 23
    },
    {
      id: '2',
      projectTitle: 'CleanWave - Ocean Plastic Recycling Bot',
      content: 'Great work on the environmental impact analysis. Have you considered partnerships with marine research institutions?',
      date: '2024-01-14',
      likes: 15
    }
  ];

  const mockActivity = [
    { type: 'vote', content: 'Voted for "MindBridge - Mental Health Support Platform"', date: '2024-01-18' },
    { type: 'comment', content: 'Commented on "EcoGrow - Smart Urban Farming System"', date: '2024-01-16' },
    { type: 'project', content: 'Updated project "EcoGrow - Smart Urban Farming System"', date: '2024-01-15' },
    { type: 'vote', content: 'Voted for "CleanWave - Ocean Plastic Recycling Bot"', date: '2024-01-12' }
  ];

  const tabs = [
    { id: 'projects', label: 'My Projects', count: userProjects.length },
    { id: 'votes', label: 'My Votes', count: mockVotedProjects.length },
    { id: 'comments', label: 'My Comments', count: mockComments.length },
    { id: 'activity', label: 'Activity', count: mockActivity.length }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl overflow-hidden mb-8"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>
          
          <div className="relative p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-end space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-2xl"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <Edit3 className="w-5 h-5 text-indigo-600" />
                </motion.button>
              </div>

              {/* Info */}
              <div className="flex-1 text-center lg:text-left text-white">
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">{currentUser.name}</h1>
                <p className="text-xl opacity-90 mb-4">{currentUser.bio}</p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm opacity-80 mb-6">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{currentUser.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(currentUser.joinedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LinkIcon className="w-4 h-4" />
                    <a href={currentUser.website} className="hover:underline">{currentUser.website}</a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={`https://github.com/${currentUser.social.github}`}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={`https://twitter.com/${currentUser.social.twitter}`}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={`https://linkedin.com/in/${currentUser.social.linkedin}`}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </motion.button>
                
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="flex space-x-2 ml-4 pl-4 border-l border-white/30">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 bg-orange-500/20 backdrop-blur-sm border border-orange-300/30 text-white rounded-xl font-semibold hover:bg-orange-500/30 transition-all duration-300 flex items-center space-x-2"
                      title="Suspend User"
                    >
                      <Ban className="w-4 h-4" />
                      <span>Suspend</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-3 bg-red-500/20 backdrop-blur-sm border border-red-300/30 text-white rounded-xl font-semibold hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-2"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Stats Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-28 space-y-6"
            >
              {/* Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Profile Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Projects</span>
                    <span className="font-semibold text-2xl text-indigo-600">{currentUser.projectsCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Votes Cast</span>
                    <span className="font-semibold text-2xl text-purple-600">{currentUser.votesCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Votes Received</span>
                    <span className="font-semibold text-2xl text-pink-600">{currentUser.totalVotesReceived}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Comments</span>
                    <span className="font-semibold text-2xl text-orange-600">{currentUser.commentsCount}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Funding</span>
                      <span className="font-semibold text-2xl text-green-600">${currentUser.totalFunding.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Achievements</h3>
                <div className="space-y-3">
                  {currentUser.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center`}>
                        <achievement.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg mb-8"
            >
              <div className="flex flex-wrap border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-4 font-medium transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* My Projects Tab */}
                {activeTab === 'projects' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {userProjects.length > 0 ? (
                      userProjects.map((project) => (
                        <motion.div
                          key={project.id}
                          variants={itemVariants}
                          className="flex flex-col md:flex-row gap-6 p-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full md:w-48 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.status === 'active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-2">{project.shortDescription}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Vote className="w-4 h-4" />
                                  <span>{project.votes} votes</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <Link
                                to={`/project/${project.id}`}
                                className="text-indigo-600 hover:text-indigo-700 font-medium"
                              >
                                View Details →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects yet</h3>
                        <p className="text-gray-500 mb-6">Share your innovative ideas with the community</p>
                        <Link to="/submit">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                          >
                            Submit Your First Project
                          </motion.button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* My Votes Tab */}
                {activeTab === 'votes' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {mockVotedProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.shortDescription}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-indigo-600">
                            <Vote className="w-4 h-4" />
                            <span className="font-semibold">{project.votes}</span>
                          </div>
                          <Link
                            to={`/project/${project.id}`}
                            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                          >
                            View →
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* My Comments Tab */}
                {activeTab === 'comments' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    {mockComments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        variants={itemVariants}
                        className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-gray-800">{comment.projectTitle}</h4>
                          <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{comment.likes} likes</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4"
                  >
                    {mockActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'vote' ? 'bg-purple-100 text-purple-600' :
                          activity.type === 'comment' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'project' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {activity.type === 'vote' && <Vote className="w-5 h-5" />}
                          {activity.type === 'comment' && <MessageCircle className="w-5 h-5" />}
                          {activity.type === 'project' && <Trophy className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">{activity.content}</p>
                          <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;