import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, Users, Trophy, Award, Calendar, 
  FileText, Vote, DollarSign, CheckCircle, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const steps = [
    {
      icon: Lightbulb,
      title: "Submit Your Project",
      description: "Create a detailed project submission with images, videos, documentation, and a comprehensive description of your innovative idea.",
      details: [
        "Fill out comprehensive project details",
        "Upload supporting media and documents",
        "Choose relevant category and tags",
        "Submit for community review"
      ],
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Users,
      title: "Community Discovery",
      description: "Your project becomes visible to our global community of innovators, investors, and technology enthusiasts who review and engage.",
      details: [
        "Project appears in public listings",
        "Community members can browse and filter",
        "Engagement through comments and discussions",
        "Build awareness and support"
      ],
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Vote,
      title: "Voting Period",
      description: "Throughout the month, community members cast their votes for projects they believe deserve funding. Each user gets one vote per project.",
      details: [
        "One vote per user per project",
        "Voting runs throughout the month",
        "Real-time vote tracking and progress",
        "Community discussion and feedback"
      ],
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Trophy,
      title: "Monthly Selection",
      description: "At month's end, the projects with the most votes are selected for funding consideration by our review panel.",
      details: [
        "Top voted projects are reviewed",
        "Final selection by expert panel",
        "Multiple projects can be selected",
        "Winners announced publicly"
      ],
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: Award,
      title: "Funding & Support",
      description: "Selected projects receive funding and ongoing support to help bring their innovative ideas to life and create real-world impact.",
      details: [
        "Direct funding provided to winners",
        "Ongoing mentorship and support",
        "Access to additional resources",
        "Progress tracking and updates"
      ],
      color: "from-green-400 to-emerald-500"
    }
  ];

  const faqs = [
    {
      question: "How much funding do projects receive?",
      answer: "Funding amounts vary based on project scope and requirements. Selected projects typically receive between $5,000 and $50,000, with additional support available for exceptional projects."
    },
    {
      question: "Can I submit multiple projects?",
      answer: "Yes! You can submit multiple projects, but each submission is evaluated independently. We encourage focusing on quality over quantity."
    },
    {
      question: "What happens to projects that don't get selected?",
      answer: "Unselected projects remain in our archive and can continue to receive votes and comments. You can also resubmit improved versions in future rounds."
    },
    {
      question: "How do you prevent vote manipulation?",
      answer: "We use advanced fraud detection systems and require account verification. Each user can only vote once per project, and suspicious activity is automatically flagged."
    },
    {
      question: "Can I update my project after submission?",
      answer: "Minor updates like fixing typos are allowed, but major changes require resubmission. This ensures fairness for all projects in the voting period."
    },
    {
      question: "What types of projects are eligible?",
      answer: "We welcome innovative projects across all categories - from technology and healthcare to sustainability and social impact. Projects should demonstrate clear innovation and potential for positive impact."
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              How <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">VoteForge</span> Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A transparent, community-driven platform that turns innovative ideas into funded reality. 
              Here's how we make it happen, step by step.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Monthly Rounds</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Community Voting</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>Real Funding</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className={`inline-flex w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl items-center justify-center mb-6`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                    <span className="text-4xl font-bold text-gray-300">0{index + 1}</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{step.title}</h2>
                  </div>
                  <p className="text-xl text-gray-600 mb-6 max-w-2xl">{step.description}</p>
                  <ul className="space-y-2 text-gray-700">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center justify-center lg:justify-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1 max-w-lg relative">
                  <div className={`aspect-square bg-gradient-to-br ${step.color} rounded-3xl p-8 flex items-center justify-center opacity-10`}>
                    <step.icon className="w-32 h-32 text-white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <step.icon className="w-24 h-24 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Monthly <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Timeline</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each funding round follows a structured timeline to ensure fairness and transparency
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                period: "Days 1-7",
                title: "Submission Period",
                description: "New projects can be submitted and existing ones can be updated",
                icon: FileText,
                color: "from-blue-400 to-indigo-500"
              },
              {
                period: "Days 8-25",
                title: "Voting Period",
                description: "Community votes for their favorite projects",
                icon: Vote,
                color: "from-purple-400 to-pink-500"
              },
              {
                period: "Days 26-28",
                title: "Review Period",
                description: "Expert panel reviews top voted projects",
                icon: Users,
                color: "from-orange-400 to-red-500"
              },
              {
                period: "Days 29-31",
                title: "Announcement",
                description: "Winners announced and funding distributed",
                icon: Trophy,
                color: "from-green-400 to-emerald-500"
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${phase.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <phase.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-medium text-indigo-600 mb-2">{phase.period}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our platform and process
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of innovators who are turning their ideas into reality. 
              Submit your project today or start voting for the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/submit">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>Submit Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                >
                  <Vote className="w-5 h-5" />
                  <span>Start Voting</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;