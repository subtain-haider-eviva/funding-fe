import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, MoreVertical, Edit3, Trash2, Eye, 
  CheckCircle, XCircle, Clock, FolderOpen, ArrowLeft,
  Calendar, User, Vote, AlertTriangle, Archive, Star,
  Download, RefreshCw, Grid, List, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockProjects } from '../data/mockData';

const AdminProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock extended project data for admin
  const adminProjects = mockProjects.map(project => ({
    ...project,
    approvalStatus: Math.random() > 0.7 ? 'pending' : 'approved',
    flagged: Math.random() > 0.9,
    lastModified: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    views: Math.floor(Math.random() * 1000) + 100,
    engagement: Math.floor(Math.random() * 50) + 10,
    funding: Math.floor(Math.random() * 50000) + 5000
  }));

  const categories = ['all', 'Agriculture Tech', 'Healthcare', 'Environmental', 'Education', 'Clean Energy'];

  const filteredProjects = adminProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'approved' && project.approvalStatus === 'approved') ||
                         (filterStatus === 'pending' && project.approvalStatus === 'pending') ||
                         (filterStatus === 'flagged' && project.flagged);
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleProjectAction = (projectId: string, action: string) => {
    console.log(`${action} project ${projectId}`);
    setShowActionMenu(null);
  };

  const handleBulkAction = (action: string) => {
    console.log(`${action} projects:`, selectedProjects);
    setSelectedProjects([]);
  };

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/admin" className="p-3 hover:bg-white/50 rounded-xl transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FolderOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                  Project <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Management</span>
                </h1>
                <p className="text-gray-600 text-lg">Manage all platform projects and submissions</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              label: 'Total Projects', 
              value: adminProjects.length, 
              icon: FolderOpen, 
              color: 'from-emerald-500 to-teal-600',
              change: '+12%',
              subtext: 'All submissions'
            },
            { 
              label: 'Approved', 
              value: adminProjects.filter(p => p.approvalStatus === 'approved').length, 
              icon: CheckCircle, 
              color: 'from-green-500 to-emerald-600',
              change: '+8%',
              subtext: 'Live projects'
            },
            { 
              label: 'Pending Review', 
              value: adminProjects.filter(p => p.approvalStatus === 'pending').length, 
              icon: Clock, 
              color: 'from-orange-500 to-red-600',
              change: '+5',
              subtext: 'Awaiting approval'
            },
            { 
              label: 'Total Funding', 
              value: `$${adminProjects.reduce((sum, p) => sum + p.funding, 0).toLocaleString()}`, 
              icon: TrendingUp, 
              color: 'from-purple-500 to-pink-600',
              change: '+25%',
              subtext: 'Distributed'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.subtext}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </motion.button>
            </div>

            {/* Bulk Actions */}
            {selectedProjects.length > 0 && (
              <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-emerald-700 font-medium">{selectedProjects.length} selected</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBulkAction('approve')}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                >
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBulkAction('archive')}
                  className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors"
                >
                  Archive
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Projects Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Project Image */}
                  <div className="relative">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.approvalStatus === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {project.approvalStatus}
                      </span>
                      {project.flagged && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          Flagged
                        </span>
                      )}
                    </div>

                    {/* Selection Checkbox */}
                    <div className="absolute top-3 right-3">
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project.id)}
                        onChange={() => toggleProjectSelection(project.id)}
                        className="w-5 h-5 text-emerald-600 border-2 border-white rounded focus:ring-emerald-500"
                      />
                    </div>

                    {/* Votes */}
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Vote className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-semibold text-gray-800">{project.votes}</span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{project.title}</h3>
                        <span className="px-2 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-xs font-medium">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* Action Menu */}
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowActionMenu(showActionMenu === project.id ? null : project.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </motion.button>
                        
                        {showActionMenu === project.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                          >
                            <div className="py-1">
                              <Link
                                to={`/project/${project.id}`}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Eye className="w-4 h-4" />
                                <span>View Project</span>
                              </Link>
                              <button
                                onClick={() => handleProjectAction(project.id, 'edit')}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit3 className="w-4 h-4" />
                                <span>Edit Project</span>
                              </button>
                              {project.approvalStatus === 'pending' && (
                                <button
                                  onClick={() => handleProjectAction(project.id, 'approve')}
                                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Approve</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleProjectAction(project.id, 'archive')}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-orange-700 hover:bg-orange-50"
                              >
                                <Archive className="w-4 h-4" />
                                <span>Archive</span>
                              </button>
                              <button
                                onClick={() => handleProjectAction(project.id, 'delete')}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.shortDescription}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-emerald-600">{project.views}</div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">{project.engagement}%</div>
                        <div className="text-xs text-gray-500">Engagement</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">${project.funding.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Funding</div>
                      </div>
                    </div>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <img
                          src={project.author.avatar}
                          alt={project.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{project.author.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProjects(filteredProjects.map(p => p.id));
                            } else {
                              setSelectedProjects([]);
                            }
                          }}
                          className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Votes</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Views</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Funding</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProjects.map((project) => (
                      <motion.tr
                        key={project.id}
                        variants={itemVariants}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedProjects.includes(project.id)}
                            onChange={() => toggleProjectSelection(project.id)}
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={project.images[0]}
                              alt={project.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-800 line-clamp-1">{project.title}</div>
                              <div className="text-sm text-gray-500">{project.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                              project.approvalStatus === 'approved' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {project.approvalStatus}
                            </span>
                            {project.flagged && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium w-fit">
                                Flagged
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <Vote className="w-4 h-4 text-emerald-600" />
                            <span className="font-semibold">{project.votes}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {project.views}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">
                          ${project.funding.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowActionMenu(showActionMenu === project.id ? null : project.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-600" />
                            </motion.button>
                            
                            {showActionMenu === project.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                              >
                                <div className="py-1">
                                  <Link
                                    to={`/project/${project.id}`}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>View Project</span>
                                  </Link>
                                  <button
                                    onClick={() => handleProjectAction(project.id, 'edit')}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                    <span>Edit Project</span>
                                  </button>
                                  {project.approvalStatus === 'pending' && (
                                    <button
                                      onClick={() => handleProjectAction(project.id, 'approve')}
                                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      <span>Approve</span>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleProjectAction(project.id, 'archive')}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-orange-700 hover:bg-orange-50"
                                  >
                                    <Archive className="w-4 h-4" />
                                    <span>Archive</span>
                                  </button>
                                  <button
                                    onClick={() => handleProjectAction(project.id, 'delete')}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setFilterCategory('all');
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;