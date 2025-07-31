import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FolderOpen, Calendar, Settings, BarChart3, 
  TrendingUp, Eye, AlertTriangle, CheckCircle, Clock,
  Shield, Activity, DollarSign, Award, Play, Pause, Square,
  ArrowUp, ArrowDown, Zap, Target, Globe, UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [currentRoundStatus, setCurrentRoundStatus] = useState<'active' | 'paused' | 'stopped'>('active');
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 34 });

  // Mock admin stats
  const stats = {
    totalUsers: 15420,
    activeProjects: 47,
    pendingApprovals: 12,
    totalFunding: 284500,
    monthlyVotes: 8934,
    flaggedContent: 3,
    newUsersToday: 23,
    projectsSubmittedToday: 5,
    votesToday: 156,
    revenue: 12450
  };

  const recentActivity = [
    { 
      type: 'project_submitted', 
      content: 'New project "AI Health Monitor" submitted by John Doe', 
      time: '2 minutes ago',
      priority: 'high',
      action: 'Review Required'
    },
    { 
      type: 'user_registered', 
      content: 'New user Sarah Johnson registered', 
      time: '15 minutes ago',
      priority: 'normal',
      action: 'Auto-approved'
    },
    { 
      type: 'project_flagged', 
      content: 'Project "CryptoFarm" flagged for review', 
      time: '1 hour ago',
      priority: 'urgent',
      action: 'Immediate Review'
    },
    { 
      type: 'funding_distributed', 
      content: 'Funding of $45,000 distributed to EcoGrow project', 
      time: '2 hours ago',
      priority: 'normal',
      action: 'Completed'
    },
    { 
      type: 'comment_reported', 
      content: 'Comment reported on MindBridge project', 
      time: '3 hours ago',
      priority: 'medium',
      action: 'Under Review'
    }
  ];

  const handleRoundControl = (action: 'start' | 'pause' | 'stop') => {
    if (action === 'start') setCurrentRoundStatus('active');
    if (action === 'pause') setCurrentRoundStatus('paused');
    if (action === 'stop') setCurrentRoundStatus('stopped');
  };

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

  const getStatusConfig = () => {
    switch (currentRoundStatus) {
      case 'active':
        return {
          color: 'from-emerald-500 to-green-600',
          bgColor: 'from-emerald-50 to-green-50',
          textColor: 'text-emerald-700',
          borderColor: 'border-emerald-200',
          icon: Play,
          label: 'Active Round',
          description: 'Projects are being submitted and voted on',
          pulse: true
        };
      case 'paused':
        return {
          color: 'from-amber-500 to-orange-600',
          bgColor: 'from-amber-50 to-orange-50',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          icon: Pause,
          label: 'Round Paused',
          description: 'Voting temporarily suspended',
          pulse: false
        };
      case 'stopped':
        return {
          color: 'from-red-500 to-pink-600',
          bgColor: 'from-red-50 to-pink-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          icon: Square,
          label: 'Round Stopped',
          description: 'No active voting round',
          pulse: false
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

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
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                    Admin <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Control Center</span>
                  </h1>
                  <p className="text-gray-600 text-lg">Manage your platform with precision and control</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Round Status - Redesigned */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`bg-gradient-to-r ${statusConfig.bgColor} border-2 ${statusConfig.borderColor} rounded-3xl p-8 mb-8 shadow-lg`}
        >
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Status Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`relative w-16 h-16 bg-gradient-to-r ${statusConfig.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <StatusIcon className="w-8 h-8 text-white" />
                  {statusConfig.pulse && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl animate-pulse opacity-30"></div>
                  )}
                </div>
                <div>
                  <h2 className={`text-3xl font-bold ${statusConfig.textColor}`}>{statusConfig.label}</h2>
                  <p className="text-gray-600 text-lg">{statusConfig.description}</p>
                </div>
              </div>

              {currentRoundStatus === 'active' && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${statusConfig.textColor}`}>{timeLeft.days}</div>
                    <div className="text-sm text-gray-600">Days Left</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${statusConfig.textColor}`}>{timeLeft.hours}</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${statusConfig.textColor}`}>{timeLeft.minutes}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4 text-center">Round Controls</h3>
                <div className="grid grid-cols-3 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRoundControl('start')}
                    className={`p-3 rounded-xl font-medium transition-all duration-300 flex flex-col items-center space-y-1 ${
                      currentRoundStatus === 'active' 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    <Play className="w-5 h-5" />
                    <span className="text-xs">Start</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRoundControl('pause')}
                    className={`p-3 rounded-xl font-medium transition-all duration-300 flex flex-col items-center space-y-1 ${
                      currentRoundStatus === 'paused' 
                        ? 'bg-amber-500 text-white shadow-lg' 
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    <Pause className="w-5 h-5" />
                    <span className="text-xs">Pause</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRoundControl('stop')}
                    className={`p-3 rounded-xl font-medium transition-all duration-300 flex flex-col items-center space-y-1 ${
                      currentRoundStatus === 'stopped' 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    <Square className="w-5 h-5" />
                    <span className="text-xs">Stop</span>
                  </motion.button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">Current: January 2024 Round</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {[
            { 
              icon: Users, 
              label: 'Total Users', 
              value: stats.totalUsers.toLocaleString(), 
              color: 'from-blue-500 to-indigo-600', 
              change: '+12%',
              changeType: 'up',
              subValue: `+${stats.newUsersToday} today`
            },
            { 
              icon: FolderOpen, 
              label: 'Active Projects', 
              value: stats.activeProjects, 
              color: 'from-emerald-500 to-teal-600', 
              change: '+8%',
              changeType: 'up',
              subValue: `+${stats.projectsSubmittedToday} today`
            },
            { 
              icon: Clock, 
              label: 'Pending Approvals', 
              value: stats.pendingApprovals, 
              color: 'from-orange-500 to-red-600', 
              change: '+3',
              changeType: 'up',
              subValue: 'Needs attention'
            },
            { 
              icon: DollarSign, 
              label: 'Total Funding', 
              value: `$${stats.totalFunding.toLocaleString()}`, 
              color: 'from-green-500 to-emerald-600', 
              change: '+15%',
              changeType: 'up',
              subValue: 'This month'
            },
            { 
              icon: TrendingUp, 
              label: 'Monthly Votes', 
              value: stats.monthlyVotes.toLocaleString(), 
              color: 'from-purple-500 to-pink-600', 
              change: '+22%',
              changeType: 'up',
              subValue: `+${stats.votesToday} today`
            },
            { 
              icon: AlertTriangle, 
              label: 'Flagged Content', 
              value: stats.flaggedContent, 
              color: 'from-red-500 to-pink-600', 
              change: '-2',
              changeType: 'down',
              subValue: 'Resolved quickly'
            },
            { 
              icon: Globe, 
              label: 'Platform Revenue', 
              value: `$${stats.revenue.toLocaleString()}`, 
              color: 'from-indigo-500 to-purple-600', 
              change: '+18%',
              changeType: 'up',
              subValue: 'Course sales'
            },
            { 
              icon: UserCheck, 
              label: 'Active Today', 
              value: '1,234', 
              color: 'from-cyan-500 to-blue-600', 
              change: '+5%',
              changeType: 'up',
              subValue: 'Online users'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.changeType === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs">{stat.subValue}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Quick Actions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { 
                    icon: Users, 
                    label: 'Manage Users', 
                    description: 'View, edit, suspend users', 
                    link: '/admin/users', 
                    color: 'from-blue-500 to-indigo-600',
                    urgent: stats.newUsersToday > 20
                  },
                  { 
                    icon: FolderOpen, 
                    label: 'Manage Projects', 
                    description: 'Review, approve, edit projects', 
                    link: '/admin/projects', 
                    color: 'from-emerald-500 to-teal-600',
                    urgent: stats.projectsSubmittedToday > 3
                  },
                  { 
                    icon: CheckCircle, 
                    label: 'Project Approvals', 
                    description: 'Review pending submissions', 
                    link: '/admin/approvals', 
                    color: 'from-orange-500 to-red-600',
                    urgent: stats.pendingApprovals > 10
                  },
                  { 
                    icon: BarChart3, 
                    label: 'Analytics', 
                    description: 'View platform statistics', 
                    link: '/admin/analytics', 
                    color: 'from-purple-500 to-pink-600',
                    urgent: false
                  },
                  { 
                    icon: Settings, 
                    label: 'Platform Settings', 
                    description: 'Configure system settings', 
                    link: '/admin/settings', 
                    color: 'from-gray-500 to-slate-600',
                    urgent: false
                  },
                  { 
                    icon: Award, 
                    label: 'Funding Management', 
                    description: 'Manage funding distribution', 
                    link: '/admin/funding', 
                    color: 'from-green-500 to-emerald-600',
                    urgent: false
                  }
                ].map((action, index) => (
                  <Link key={index} to={action.link}>
                    <motion.div
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-indigo-300 bg-gradient-to-br from-white to-gray-50"
                    >
                      {action.urgent && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">{action.label}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                          {action.urgent && (
                            <span className="inline-block mt-1 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                              Needs Attention
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enhanced Recent Activity */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8 sticky top-28"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-800">Live Activity</h2>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'project_submitted' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'user_registered' ? 'bg-green-100 text-green-600' :
                      activity.type === 'project_flagged' ? 'bg-red-100 text-red-600' :
                      activity.type === 'funding_distributed' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {activity.type === 'project_submitted' && <FolderOpen className="w-5 h-5" />}
                      {activity.type === 'user_registered' && <Users className="w-5 h-5" />}
                      {activity.type === 'project_flagged' && <AlertTriangle className="w-5 h-5" />}
                      {activity.type === 'funding_distributed' && <DollarSign className="w-5 h-5" />}
                      {activity.type === 'comment_reported' && <Eye className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 mb-1">{activity.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activity.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                          activity.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {activity.action}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/admin/activity" className="block mt-6 text-center text-indigo-600 hover:text-indigo-700 font-medium">
                View All Activity →
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;