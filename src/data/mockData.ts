export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  images: string[];
  videos?: string[];
  votes: number;
  createdAt: string;
  status: 'active' | 'archived';
  month: string;
  documents?: { name: string; type: string; url: string }[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  joinedAt: string;
  projectsCount: number;
  votesCount: number;
  commentsCount: number;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  replies?: Comment[];
  likes: number;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'EcoGrow - Smart Urban Farming System',
    description: 'A revolutionary IoT-powered vertical farming system that enables anyone to grow fresh produce in urban environments. Using AI-driven nutrient optimization and automated climate control, EcoGrow maximizes yield while minimizing water usage by 90%. The system includes a mobile app for remote monitoring and a marketplace to sell surplus produce to neighbors.',
    shortDescription: 'IoT-powered vertical farming system for urban environments with AI optimization.',
    category: 'Agriculture Tech',
    author: {
      id: 'user1',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Sustainable technology enthusiast and urban farming advocate'
    },
    images: [
      'https://images.pexels.com/photos/1300510/pexels-photo-1300510.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1458736/pexels-photo-1458736.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    votes: 1247,
    createdAt: '2024-01-15',
    status: 'active',
    month: 'January 2024',
    documents: [
      { name: 'Business Plan.pdf', type: 'pdf', url: '#' },
      { name: 'Technical Specifications.docx', type: 'doc', url: '#' }
    ]
  },
  {
    id: '2',
    title: 'MindBridge - Mental Health Support Platform',
    description: 'An AI-powered mental health platform that connects users with personalized support through chatbots, peer communities, and licensed therapists. Features include mood tracking, crisis intervention, and gamified wellness challenges. The platform uses natural language processing to detect early warning signs and provide immediate support.',
    shortDescription: 'AI-powered mental health platform with personalized support and crisis intervention.',
    category: 'Healthcare',
    author: {
      id: 'user2',
      name: 'Dr. Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Clinical psychologist and mental health technology researcher'
    },
    images: [
      'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    votes: 892,
    createdAt: '2024-01-12',
    status: 'active',
    month: 'January 2024'
  },
  {
    id: '3',
    title: 'CleanWave - Ocean Plastic Recycling Bot',
    description: 'Autonomous underwater vehicles designed to collect ocean plastic waste and convert it into useful materials on-site. Each bot uses computer vision to identify and collect plastic debris, then processes it through an onboard recycling system. The collected data helps map pollution patterns and inform cleanup strategies.',
    shortDescription: 'Autonomous underwater bots that collect and recycle ocean plastic waste.',
    category: 'Environmental',
    author: {
      id: 'user3',
      name: 'Emily Johnson',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Marine engineer passionate about ocean conservation'
    },
    images: [
      'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2249291/pexels-photo-2249291.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4440711/pexels-photo-4440711.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    votes: 1056,
    createdAt: '2024-01-10',
    status: 'active',
    month: 'January 2024'
  },
  {
    id: '4',
    title: 'EduVR - Immersive Learning Platform',
    description: 'A virtual reality education platform that transforms traditional learning through immersive experiences. Students can walk through ancient Rome, explore the human circulatory system, or conduct virtual chemistry experiments. The platform includes lesson planning tools for teachers and progress tracking for students.',
    shortDescription: 'VR education platform offering immersive learning experiences across subjects.',
    category: 'Education',
    author: {
      id: 'user4',
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'EdTech innovator and former high school teacher'
    },
    images: [
      'https://images.pexels.com/photos/8566529/pexels-photo-8566529.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7516362/pexels-photo-7516362.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    votes: 743,
    createdAt: '2024-01-08',
    status: 'active',
    month: 'January 2024'
  },
  {
    id: '5',
    title: 'SolarShare - Community Energy Network',
    description: 'A blockchain-based platform that enables households with solar panels to share excess energy with their neighbors. The system automatically routes surplus energy to nearby homes and handles micropayments through smart contracts. Users can track their energy production, consumption, and earnings through a mobile app.',
    shortDescription: 'Blockchain platform for sharing solar energy within local communities.',
    category: 'Clean Energy',
    author: {
      id: 'user5',
      name: 'David Park',
      avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      bio: 'Renewable energy engineer and blockchain developer'
    },
    images: [
      'https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    votes: 634,
    createdAt: '2024-01-05',
    status: 'active',
    month: 'January 2024'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Sustainable technology enthusiast and urban farming advocate with 10+ years in AgTech',
    joinedAt: '2023-06-15',
    projectsCount: 3,
    votesCount: 45,
    commentsCount: 12
  },
  {
    id: 'user2',
    name: 'Dr. Michael Rodriguez',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Clinical psychologist and mental health technology researcher',
    joinedAt: '2023-08-22',
    projectsCount: 2,
    votesCount: 67,
    commentsCount: 28
  }
];

export const mockComments: { [projectId: string]: Comment[] } = {
  '1': [
    {
      id: 'c1',
      author: {
        id: 'user2',
        name: 'Dr. Michael Rodriguez',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      content: 'This is incredibly innovative! The AI optimization aspect could revolutionize urban agriculture. Have you considered partnerships with local grocery stores?',
      createdAt: '2024-01-16',
      likes: 23,
      replies: [
        {
          id: 'c1r1',
          author: {
            id: 'user1',
            name: 'Sarah Chen',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
          },
          content: 'Thank you! Yes, we\'re already in talks with several local chains. The marketplace integration is our next major milestone.',
          createdAt: '2024-01-16',
          likes: 8
        }
      ]
    },
    {
      id: 'c2',
      author: {
        id: 'user3',
        name: 'Emily Johnson',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
      },
      content: 'The water efficiency numbers are impressive. How does the system handle pest management without traditional pesticides?',
      createdAt: '2024-01-17',
      likes: 15
    }
  ]
};

export const getTimeUntilNextMonth = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const diff = nextMonth.getTime() - now.getTime();
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
};