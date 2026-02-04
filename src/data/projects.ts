import { Project } from './types';

export const projects: Project[] = [
  {
    id: "1",
    title: "Computer Vision Quality Control",
    description: "Automated visual inspection system for manufacturing lines using CNNs to detect defects in real-time. Deployed on edge devices for low-latency processing.",
    images: ["/images/projects/cv-quality.jpg"],
    tags: ["Computer Vision", "Edge AI", "Manufacturing"],
    link: "https://example.com/project1",
    featured: true,
  },
  {
    id: "2",
    title: "Predictive Market Analysis",
    description: "Machine learning model predicting stock market trends using sentiment analysis from financial news and social media data. Achieved 65% accuracy in trend direction prediction.",
    images: ["/images/projects/market-analysis.jpg"],
    tags: ["Machine Learning", "Finance", "Python"],
    link: "https://example.com/project2",
    featured: true,
  },
  {
    id: "3",
    title: "AI Customer Support Agent",
    description: "An intelligent chatbot powered by OpenAI GPT-4 that handles customer inquiries, processes refunds, and schedules appointments. Reduced support ticket volume by 40%.",
    images: ["/images/projects/support-agent.jpg"],
    tags: ["NLP", "GPT-4", "Customer Service"],
    link: "https://example.com/project3",
    featured: true,
  },
];

// Helper function to add a new project
export function createProject(project: Omit<Project, 'id'>): Project {
  return {
    ...project,
    id: Date.now().toString(),
  };
}
