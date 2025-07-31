import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, X, FileText, Image, Video, Plus, CheckCircle, 
  ArrowRight, ArrowLeft, Lightbulb, Target, Camera, 
  FileCheck, Rocket, Users, Award, Play, Info
} from 'lucide-react';

const SubmitProjectPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    shortDescription: '',
    description: '',
    tags: [] as string[],
    images: [] as string[],
    videos: [] as string[],
    documents: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Agriculture Tech',
    'Healthcare',
    'Environmental',
    'Education',
    'Clean Energy',
    'AI & Machine Learning',
    'Blockchain',
    'IoT',
    'Sustainability',
    'Social Impact'
  ];

  const steps = [
    {
      id: 0,
      title: "Project Basics",
      subtitle: "Tell us about your innovative idea",
      icon: Lightbulb,
      color: "from-yellow-400 to-orange-500",
      description: "Start by giving your project a compelling title and selecting the right category. This helps our community discover and understand your innovation."
    },
    {
      id: 1,
      title: "Project Description",
      subtitle: "Explain your vision in detail",
      icon: Target,
      color: "from-blue-400 to-indigo-500",
      description: "Describe your project thoroughly. What problem does it solve? How does it work? What makes it unique? The more detail you provide, the better voters can understand your vision."
    },
    {
      id: 2,
      title: "Visual Content",
      subtitle: "Show your project in action",
      icon: Camera,
      color: "from-purple-400 to-pink-500",
      description: "Upload images and videos that showcase your project. Visual content significantly increases engagement and helps voters understand your concept better."
    },
    {
      id: 3,
      title: "Supporting Materials",
      subtitle: "Add documentation and proof",
      icon: FileCheck,
      color: "from-emerald-400 to-teal-500",
      description: "Upload business plans, technical specifications, or any documents that support your project. This builds credibility and shows you've done your homework."
    },
    {
      id: 4,
      title: "Final Review",
      subtitle: "Review and submit your project",
      icon: Rocket,
      color: "from-indigo-400 to-purple-500",
      description: "Take a final look at your project submission. Once submitted, your project will be live for the community to discover and vote on."
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (type: 'images' | 'videos' | 'documents') => {
    const mockFiles = {
      images: ['uploaded-image-1.jpg', 'uploaded-image-2.jpg'],
      videos: ['uploaded-video-1.mp4'],
      documents: ['business-plan.pdf', 'technical-specs.docx']
    };
    
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...mockFiles[type]]
    }));
  };

  const removeFile = (type: 'images' | 'videos' | 'documents', fileToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(file => file !== fileToRemove)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.title.trim() && formData.category;
      case 1:
        return formData.shortDescription.trim() && formData.description.trim();
      case 2:
        return formData.images.length > 0;
      case 3:
        return true; // Documents are optional
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Your project has been successfully submitted and is now live for voting. 
            The community can now discover and vote for your innovative idea.
          </p>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/projects'}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
            >
              View All Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(0);
                setFormData({
                  title: '',
                  category: '',
                  shortDescription: '',
                  description: '',
                  tags: [],
                  images: [],
                  videos: [],
                  documents: []
                });
              }}
              className="w-full px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-200 rounded-lg font-medium hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
            >
              Submit Another Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4">
            Submit Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Project</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our step-by-step wizard to create a compelling project submission that captures votes and funding.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  index <= currentStep 
                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg` 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 lg:w-24 h-1 mx-2 transition-all duration-300 ${
                    index < currentStep ? 'bg-gradient-to-r from-indigo-400 to-purple-400' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{currentStepData.title}</h2>
            <p className="text-gray-600">{currentStepData.subtitle}</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Instructions & Visual */}
          <motion.div
            key={currentStep}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Step Visual */}
            <div className="relative">
              <div className={`aspect-video bg-gradient-to-br ${currentStepData.color} rounded-3xl p-8 flex items-center justify-center opacity-10`}>
                <currentStepData.icon className="w-32 h-32 text-white" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <currentStepData.icon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{currentStepData.title}</h3>
                    <p className="text-gray-600 text-sm">{currentStepData.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips & Guidelines */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Pro Tips for This Step</h4>
                  <div className="text-blue-700 text-sm space-y-2">
                    {currentStep === 0 && (
                      <ul className="space-y-1">
                        <li>• Choose a clear, memorable title that explains what you do</li>
                        <li>• Select the most relevant category for better discoverability</li>
                        <li>• Keep your title under 60 characters for best impact</li>
                      </ul>
                    )}
                    {currentStep === 1 && (
                      <ul className="space-y-1">
                        <li>• Start with the problem you're solving</li>
                        <li>• Explain your solution and what makes it unique</li>
                        <li>• Include your target audience and expected impact</li>
                        <li>• Use clear, jargon-free language</li>
                      </ul>
                    )}
                    {currentStep === 2 && (
                      <ul className="space-y-1">
                        <li>• Upload high-quality images showing your project</li>
                        <li>• Include before/after shots if applicable</li>
                        <li>• Videos significantly increase engagement</li>
                        <li>• Show your project in action, not just concepts</li>
                      </ul>
                    )}
                    {currentStep === 3 && (
                      <ul className="space-y-1">
                        <li>• Business plans show you're serious and prepared</li>
                        <li>• Technical specs help voters understand feasibility</li>
                        <li>• Financial projections build confidence</li>
                        <li>• Patents or IP documentation add credibility</li>
                      </ul>
                    )}
                    {currentStep === 4 && (
                      <ul className="space-y-1">
                        <li>• Double-check all information for accuracy</li>
                        <li>• Ensure images and videos are properly uploaded</li>
                        <li>• Your project will be live immediately after submission</li>
                        <li>• You can update minor details after submission</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex items-start space-x-3">
                <Award className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-emerald-800 mb-2">Success Story</h4>
                  <p className="text-emerald-700 text-sm">
                    "EcoGrow received $45,000 in funding after a compelling submission with detailed technical specs and demonstration videos. The key was showing real prototypes in action."
                  </p>
                  <p className="text-emerald-600 text-xs mt-2 font-medium">- Sarah Chen, EcoGrow Founder</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            key={`form-${currentStep}`}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <AnimatePresence mode="wait">
              {/* Step 0: Project Basics */}
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., EcoGrow - Smart Urban Farming System"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.title.length}/60 characters recommended</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select the best category for your project</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (Optional)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-indigo-500 hover:text-indigo-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="Add tags like 'AI', 'sustainability', 'mobile app'"
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <motion.button
                        type="button"
                        onClick={addTag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Description */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                      placeholder="A brief, compelling summary of your project (max 150 characters)"
                      maxLength={150}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">{formData.shortDescription.length}/150 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Provide a comprehensive description of your project:

• What problem does it solve?
• How does your solution work?
• Who is your target audience?
• What makes it innovative?
• What impact do you expect?

Be specific and passionate about your vision!"
                      rows={12}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                    <p className="text-sm text-gray-500 mt-1">{formData.description.length} characters</p>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Visual Content */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Images * (At least 1 required)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors bg-gradient-to-br from-gray-50 to-indigo-50">
                      <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Project Images</h3>
                      <p className="text-gray-600 mb-4">Show your project, prototypes, team, or concept visuals</p>
                      <p className="text-sm text-gray-500 mb-4">Supported: PNG, JPG, GIF • Max 10MB each</p>
                      <motion.button
                        type="button"
                        onClick={() => handleFileUpload('images')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Choose Images
                      </motion.button>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium text-gray-700">Uploaded Images:</h4>
                        {formData.images.map((image, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Image className="w-5 h-5 text-green-600" />
                              <span className="text-sm text-gray-700">{image}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile('images', image)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Videos (Optional but Recommended)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors bg-gradient-to-br from-purple-50 to-pink-50">
                      <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Demo Videos</h3>
                      <p className="text-gray-600 mb-4">Show your project in action, explain features, or pitch your idea</p>
                      <p className="text-sm text-gray-500 mb-4">Supported: MP4, MOV, AVI • Max 100MB each</p>
                      <motion.button
                        type="button"
                        onClick={() => handleFileUpload('videos')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Choose Videos
                      </motion.button>
                    </div>
                    {formData.videos.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium text-gray-700">Uploaded Videos:</h4>
                        {formData.videos.map((video, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Play className="w-5 h-5 text-purple-600" />
                              <span className="text-sm text-gray-700">{video}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile('videos', video)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Supporting Documents */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supporting Documents (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors bg-gradient-to-br from-emerald-50 to-teal-50">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Supporting Documents</h3>
                      <p className="text-gray-600 mb-4">Business plans, technical specs, financial projections, patents, etc.</p>
                      <p className="text-sm text-gray-500 mb-4">Supported: PDF, DOC, DOCX, XLS, XLSX • Max 25MB each</p>
                      <motion.button
                        type="button"
                        onClick={() => handleFileUpload('documents')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Choose Documents
                      </motion.button>
                    </div>
                    {formData.documents.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="font-medium text-gray-700">Uploaded Documents:</h4>
                        {formData.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-emerald-600" />
                              <span className="text-sm text-gray-700">{doc}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile('documents', doc)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <Info className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">Document Tips</h4>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          <li>• Business plans show market research and financial viability</li>
                          <li>• Technical specifications demonstrate feasibility</li>
                          <li>• Financial projections build investor confidence</li>
                          <li>• Patents or IP documentation prove uniqueness</li>
                          <li>• Team bios highlight relevant experience</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Project Summary</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700">Title:</h4>
                        <p className="text-gray-600">{formData.title || 'Not provided'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">Category:</h4>
                        <p className="text-gray-600">{formData.category || 'Not selected'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">Short Description:</h4>
                        <p className="text-gray-600">{formData.shortDescription || 'Not provided'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">Tags:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.tags.length > 0 ? formData.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                              {tag}
                            </span>
                          )) : <span className="text-gray-500 text-sm">No tags added</span>}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-2xl font-bold text-indigo-600">{formData.images.length}</div>
                          <div className="text-sm text-gray-600">Images</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-2xl font-bold text-purple-600">{formData.videos.length}</div>
                          <div className="text-sm text-gray-600">Videos</div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-2xl font-bold text-emerald-600">{formData.documents.length}</div>
                          <div className="text-sm text-gray-600">Documents</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                        I agree that my project information will be publicly visible and accept the{' '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg'
                      } text-white`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting Project...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Rocket className="w-5 h-5" />
                          <span>Launch My Project</span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 0}
                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </motion.button>

              {currentStep < steps.length - 1 ? (
                <motion.button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  whileHover={{ scale: !canProceed() ? 1 : 1.05 }}
                  whileTap={{ scale: !canProceed() ? 1 : 0.95 }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    canProceed()
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <div className="text-sm text-gray-500">
                  Ready to submit? Check the agreement above.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SubmitProjectPage;