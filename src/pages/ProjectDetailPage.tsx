import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Vote, Heart, Share2, Calendar, User, 
  FileText, Download, MessageCircle, ThumbsUp, Reply,
  ChevronLeft, ChevronRight, Play, ExternalLink, Shield,
  Edit3, Trash2, Eye, Ban
} from 'lucide-react';
import { mockProjects, mockComments } from '../data/mockData';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isAdmin] = useState(true); // Mock admin status - in real app, get from auth context

  const project = mockProjects.find(p => p.id === id);
  const comments = mockComments[id || ''] || [];

  if (!project) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Project not found</h1>
          <Link to="/projects" className="text-indigo-600 hover:text-indigo-700">
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const handleVote = () => {
    setHasVoted(!hasVoted);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      // Mock comment submission
      setNewComment('');
    }
  };

  const handleReply = (commentId: string) => {
    if (replyContent.trim()) {
      // Mock reply submission
      setReplyContent('');
      setReplyingTo(null);
    }
  };

  const votePercentage = Math.min((project.votes / 1500) * 100, 100);

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/projects"
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mb-8"
            >
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={project.images[currentImageIndex]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {project.images.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                        index === currentImageIndex ? 'ring-2 ring-indigo-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium mb-2">
                    {project.category}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    {project.title}
                  </h1>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Heart className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  
                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="flex space-x-2 ml-4 pl-4 border-l border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-5 h-5 text-blue-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-orange-100 hover:bg-orange-200 rounded-full transition-colors"
                        title="Hide Project"
                      >
                        <Eye className="w-5 h-5 text-orange-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <img
                  src={project.author.avatar}
                  alt={project.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{project.author.name}</h3>
                  <p className="text-gray-600 text-sm">{project.author.bio}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Supporting Documents */}
              {project.documents && project.documents.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Supporting Documents</h3>
                  <div className="space-y-2">
                    {project.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-indigo-600" />
                          <span className="font-medium text-gray-800">{doc.name}</span>
                          <span className="text-sm text-gray-500 uppercase">{doc.type}</span>
                        </div>
                        <button className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 font-medium">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <MessageCircle className="w-6 h-6" />
                <span>Comments ({comments.length})</span>
              </h2>

              {/* Add Comment */}
              <div className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts about this project..."
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComment}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Post Comment
                  </motion.button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.slice(0, showAllComments ? comments.length : 3).map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-800">{comment.author.name}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">{comment.likes}</span>
                          </button>
                          <button
                            onClick={() => setReplyingTo(comment.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition-colors"
                          >
                            <Reply className="w-4 h-4" />
                            <span className="text-sm">Reply</span>
                          </button>
                          
                          {/* Admin Comment Controls */}
                          {isAdmin && (
                            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                              <button
                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                title="Edit Comment"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                className="text-orange-500 hover:text-orange-700 transition-colors"
                                title="Hide Comment"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 transition-colors"
                                title="Delete Comment"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div className="mt-4 ml-4 border-l-2 border-indigo-200 pl-4">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                              rows={2}
                            />
                            <div className="flex space-x-2 mt-2">
                              <button
                                onClick={() => handleReply(comment.id)}
                                className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
                              >
                                Reply
                              </button>
                              <button
                                onClick={() => setReplyingTo(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 ml-4 space-y-4 border-l-2 border-gray-100 pl-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-3">
                                <img
                                  src={reply.author.avatar}
                                  alt={reply.author.name}
                                  className="w-8 h-8 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h5 className="font-medium text-gray-800 text-sm">{reply.author.name}</h5>
                                    <span className="text-xs text-gray-500">
                                      {new Date(reply.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 text-sm">{reply.content}</p>
                                  <button className="flex items-center space-x-1 text-gray-400 hover:text-indigo-600 transition-colors mt-1">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span className="text-xs">{reply.likes}</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show More Comments */}
              {comments.length > 3 && !showAllComments && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllComments(true)}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Show all {comments.length} comments
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Vote Section */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Support This Project</h3>
                
                {/* Vote Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Votes</span>
                    <span className="text-2xl font-bold text-indigo-600">{project.votes}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${votePercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {Math.round(votePercentage)}% towards funding goal
                  </p>
                </div>

                {/* Vote Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVote}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    hasVoted
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  <Vote className="w-5 h-5" />
                  <span>{hasVoted ? 'Voted!' : 'Vote for Project'}</span>
                </motion.button>

                {hasVoted && (
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Thank you for your support! You can only vote once per project.
                  </p>
                )}
              </motion.div>

              {/* Project Stats */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Project Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Votes</span>
                    <span className="font-semibold">{project.votes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Comments</span>
                    <span className="font-semibold">{comments.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Submitted</span>
                    <span className="font-semibold">{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium capitalize">
                      {project.status}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Related Projects */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">Related Projects</h3>
                <div className="space-y-4">
                  {mockProjects
                    .filter(p => p.id !== project.id && p.category === project.category)
                    .slice(0, 2)
                    .map((relatedProject) => (
                      <Link
                        key={relatedProject.id}
                        to={`/project/${relatedProject.id}`}
                        className="block group"
                      >
                        <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <img
                            src={relatedProject.images[0]}
                            alt={relatedProject.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                              {relatedProject.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Vote className="w-3 h-3 text-gray-400" />
                              <span className="text-sm text-gray-500">{relatedProject.votes} votes</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
                <Link
                  to="/projects"
                  className="block mt-4 text-center text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  View All Projects →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;