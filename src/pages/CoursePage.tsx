import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Download, CheckCircle, Star, Clock, Users, 
  BookOpen, Video, FileText, Award, ArrowRight, Lock
} from 'lucide-react';

const CoursePage = () => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);

  const courseData = {
    title: "Complete Guide to Innovation & Project Development",
    subtitle: "From Idea to Funded Reality",
    price: 19,
    originalPrice: 49,
    rating: 4.9,
    reviews: 1247,
    students: 8934,
    duration: "4.5 hours",
    lessons: 32,
    description: "Master the art of turning innovative ideas into successful, fundable projects. This comprehensive course covers everything from ideation and validation to presentation and funding acquisition.",
    instructor: {
      name: "Dr. Sarah Mitchell",
      title: "Innovation Strategist & Serial Entrepreneur",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      bio: "15+ years helping startups secure $50M+ in funding"
    },
    features: [
      "Lifetime access to all course materials",
      "32 video lessons with practical examples",
      "Downloadable templates and worksheets",
      "Private community access",
      "Certificate of completion",
      "30-day money-back guarantee"
    ],
    modules: [
      {
        title: "Foundation of Innovation",
        lessons: 8,
        duration: "1.2 hours",
        preview: true
      },
      {
        title: "Market Research & Validation",
        lessons: 6,
        duration: "45 minutes",
        preview: false
      },
      {
        title: "Building Your MVP",
        lessons: 7,
        duration: "1.1 hours",
        preview: false
      },
      {
        title: "Presentation & Pitching",
        lessons: 6,
        duration: "50 minutes",
        preview: false
      },
      {
        title: "Funding Strategies",
        lessons: 5,
        duration: "40 minutes",
        preview: false
      }
    ],
    previewVideos: [
      {
        title: "Welcome to the Course",
        duration: "3:24",
        thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        title: "What Makes Ideas Fundable?",
        duration: "8:15",
        thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        title: "Common Mistakes to Avoid",
        duration: "6:42",
        thumbnail: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ]
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    // Mock purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsPurchased(true);
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
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left Side - Course Info */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              <span>Bestseller Course</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {courseData.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{courseData.subtitle}</p>
            <p className="text-gray-700 mb-6 leading-relaxed">{courseData.description}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">{courseData.rating}</span>
                <span className="text-gray-500">({courseData.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{courseData.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{courseData.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>{courseData.lessons} lessons</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl mb-8">
              <img
                src={courseData.instructor.avatar}
                alt={courseData.instructor.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{courseData.instructor.name}</h3>
                <p className="text-sm text-gray-600">{courseData.instructor.title}</p>
                <p className="text-sm text-gray-500">{courseData.instructor.bio}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Video Preview */}
          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl relative overflow-hidden mb-6">
                <img
                  src={courseData.previewVideos[activeVideo].thumbnail}
                  alt="Course preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-6 h-6 text-indigo-600 ml-1" />
                  </motion.button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {courseData.previewVideos[activeVideo].duration}
                </div>
              </div>

              {/* Preview Video Tabs */}
              <div className="space-y-2 mb-6">
                {courseData.previewVideos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveVideo(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeVideo === index
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Play className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="font-medium">{video.title}</div>
                        <div className="text-sm opacity-70">{video.duration}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <span className="text-3xl font-bold text-gray-800">${courseData.price}</span>
                  <span className="text-lg text-gray-500 line-through">${courseData.originalPrice}</span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                    61% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-600">Limited time offer</p>
              </div>

              {/* Purchase Button */}
              {!isPurchased ? (
                <motion.button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg text-white'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Purchase Course</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </motion.button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Course Purchased!</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Course</span>
                  </motion.button>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-3">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </motion.div>

        {/* Course Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* What You'll Learn */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {courseData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Course Curriculum */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {courseData.modules.map((module, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                      {!isPurchased && !module.preview && (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4" />
                        <span>{module.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{module.duration}</span>
                      </div>
                      {module.preview && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          Preview Available
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Download Instructions */}
              {isPurchased && (
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <Download className="w-5 h-5 text-emerald-600" />
                    <span>Download Instructions</span>
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start space-x-2">
                      <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                      <span>Click the "Download Course" button above</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                      <span>Extract the ZIP file to your preferred location</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                      <span>Open the "Start Here.html" file in your browser</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                      <span>Follow the course navigation to access all materials</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Course Includes */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">This Course Includes</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">{courseData.duration} on-demand video</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">15 downloadable resources</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-700">Access to private community</span>
                  </div>
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• No prior experience required</li>
                  <li>• Computer with internet access</li>
                  <li>• Willingness to learn and apply concepts</li>
                  <li>• Notebook for taking notes (recommended)</li>
                </ul>
              </motion.div>

              {/* Money Back Guarantee */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">30-Day Money-Back Guarantee</h3>
                <p className="text-sm text-gray-600">
                  Not satisfied? Get a full refund within 30 days, no questions asked.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;