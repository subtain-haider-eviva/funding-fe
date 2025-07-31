import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Eye, Vote, ChevronDown, ChevronUp, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArchivePage = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Mock archive data
  const archiveData = [
    {
      month: 'December 2023',
      totalProjects: 47,
      totalVotes: 15420,
      winners: [
        {
          id: 'arch1',
          title: 'AquaPure - Water Purification System',
          description: 'Solar-powered water purification for remote communities',
          category: 'Environmental',
          votes: 1856,
          funding: 45000,
          author: {
            name: 'Maria Santos',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'arch2',
          title: 'EduBot - AI Learning Assistant',
          description: 'Personalized AI tutor for underserved students',
          category: 'Education',
          votes: 1643,
          funding: 38000,
          author: {
            name: 'James Liu',
            avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          image: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'arch3',
          title: 'GreenTransport - Electric Bus Network',
          description: 'Sustainable public transportation solution',
          category: 'Clean Energy',
          votes: 1521,
          funding: 75000,
          author: {
            name: 'Ahmed Hassan',
            avatar: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      month: 'November 2023',
      totalProjects: 52,
      totalVotes: 16890,
      winners: [
        {
          id: 'arch4',
          title: 'MediTrack - Health Monitoring IoT',
          description: 'Wearable health monitoring for elderly care',
          category: 'Healthcare',
          votes: 1978,
          funding: 42000,
          author: {
            name: 'Dr. Lisa Park',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          image: 'https://images.pexels.com/photos/4099237/pexels-photo-4099237.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'arch5',
          title: 'FoodRescue - Waste Reduction Platform',
          description: 'AI-powered food waste reduction for restaurants',
          category: 'Sustainability',
          votes: 1834,
          funding: 35000,
          author: {
            name: 'Carlos Rodriguez',
            avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      month: 'October 2023',
      totalProjects: 41,
      totalVotes: 13250,
      winners: [
        {
          id: 'arch6',
          title: 'CryptoFarm - Blockchain Agriculture',
          description: 'Transparent supply chain for organic farming',
          category: 'Blockchain',
          votes: 1456,
          funding: 50000,
          author: {
            name: 'Elena Volkov',
            avatar: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          image: 'https://images.pexels.com/photos/1458736/pexels-photo-1458736.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    }
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
    hidden: { y: 30, opacity: 0 },
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
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Archive className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800">
              Project <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Archive</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore past winners and discover the innovations that have already received funding. 
            These projects represent the best of community-driven innovation.
          </p>
        </motion.div>

        {/* Archive Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">24</div>
            <div className="text-gray-600">Total Winners</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Vote className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">45,560</div>
            <div className="text-gray-600">Total Votes Cast</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">3</div>
            <div className="text-gray-600">Months Active</div>
          </div>
        </motion.div>

        {/* Archive List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {archiveData.map((monthData, index) => (
            <motion.div
              key={monthData.month}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Month Header */}
              <button
                onClick={() => setSelectedMonth(selectedMonth === monthData.month ? null : monthData.month)}
                className="w-full px-8 py-6 bg-gradient-to-r from-gray-50 to-indigo-50 hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                    <h2 className="text-2xl font-bold text-gray-800">{monthData.month}</h2>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{monthData.winners.length} winners</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Vote className="w-4 h-4" />
                      <span>{monthData.totalVotes.toLocaleString()} votes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{monthData.totalProjects} projects</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: selectedMonth === monthData.month ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-gray-600" />
                </motion.div>
              </button>

              {/* Winners List */}
              {selectedMonth === monthData.month && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 pb-8"
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                    {monthData.winners.map((project, projectIndex) => (
                      <motion.div
                        key={project.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: projectIndex * 0.1, duration: 0.4 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-gradient-to-br from-white to-indigo-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {/* Winner Badge */}
                        <div className="relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                            <Trophy className="w-4 h-4" />
                            <span>Winner</span>
                          </div>
                          <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-sm font-semibold text-indigo-600">
                            #{projectIndex + 1}
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-xs font-medium">
                              {project.category}
                            </span>
                            <div className="flex items-center space-x-1 text-indigo-600 font-semibold text-sm">
                              <Vote className="w-4 h-4" />
                              <span>{project.votes.toLocaleString()}</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                          {/* Author & Funding */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <img
                                src={project.author.avatar}
                                alt={project.author.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm text-gray-600">{project.author.name}</span>
                            </div>
                            <div className="text-sm font-semibold text-green-600">
                              ${project.funding.toLocaleString()} funded
                            </div>
                          </div>

                          {/* View Project Button */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View Project</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Month Summary */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3">{monthData.month} Summary</h4>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-bold text-indigo-600">{monthData.totalProjects}</div>
                        <div className="text-sm text-gray-600">Total Submissions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{monthData.totalVotes.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Community Votes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          ${monthData.winners.reduce((sum, w) => sum + w.funding, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Funding</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 py-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl text-white"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join the Next Success Story</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Every month brings new opportunities. Submit your project and become part of our growing archive of funded innovations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/submit">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300"
              >
                Submit Your Project
              </motion.button>
            </Link>
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                View Current Projects
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArchivePage;