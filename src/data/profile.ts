import { ProfileData } from './types';

export const profileData: ProfileData = {
  name: "Jack Gunsten",
  title: "Building the future",
  subtitle: "at Square.",
  tagline: "Combining technical depth with product intuition to build AI-powered experiences that empower economic empowerment.",
  headshot: "/images/headshot.jpg", // Replace with your actual headshot
  linkedinUrl: "https://www.linkedin.com/in/jack-gunsten-94b344182/",
  githubUrl: "https://github.com/jgunsten12",
  email: "jgunsten12@gmail.com",
  stats: [
    { label: "AI Models", value: "LLM & Diffusion" },
    { label: "Stack", value: "Full-Stack Typescript" },
    { label: "Product", value: "Data-Driven Strategy" },
    { label: "Experience", value: "3+ Years Shipping" },
  ],
  about: {
    summary: "AI Product Manager passionate about building intelligent systems that solve real-world problems. I combine deep technical understanding with user-centric design to ship AI products that make a meaningful impact.",
    experience: {
      title: "Experience",
      items: [
        "AI Product Manager at Square - Leading AI initiatives for merchant experiences",
        "Previously built ML-powered features at high-growth startups",
        "Shipped products used by millions of users worldwide",
      ],
    },
    skills: {
      title: "Technical Skills",
      items: [
        "Machine Learning: LLMs, Diffusion Models, Computer Vision, NLP",
        "Development: TypeScript, Python, React, Node.js",
        "Tools: TensorFlow, PyTorch, OpenAI APIs, AWS, GCP",
      ],
    },
    education: {
      title: "Education",
      items: [
        "Bachelor's in Computer Science",
        "Certifications in Machine Learning & AI",
      ],
    },
  },
};
