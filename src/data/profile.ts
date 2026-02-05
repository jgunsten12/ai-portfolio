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
    summary: "Problem solver passionate about building intelligent systems that solve real-world problems. I combine deep technical understanding with user-centric design to ship AI products that make a meaningful impact.",
    experience: {
      title: "Experience",
      items: [
        "Head of RevOps at Thrive - Fast paced startup building AI-powered tools for 0-1 problems",
        "Account Manager at Square - Deep understanding of seller problems, and where to drive impact",
        "Volunteer at Boy Scouts of America - Deployed member CRM, and multiple custom AI-powered BI tools",
      ],
    },
    skills: {
      title: "Technical Skills",
      items: [
        "Data Pipelines: ETL, Data Warehouse, BI",
        "Development: Cursor, v0, Python, Typescript, SQL",
        "Tools: LLM's, PostgreSQL Databse, no-code & low-code tools",
      ],
    },
    education: {
      title: "Education",
      items: [
        "Bachelor's in Organizational Communications",
        "Business Minor",
      ],
    },
  },
};
