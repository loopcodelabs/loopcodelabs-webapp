export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string; // lucide icon name
  tag: string;
  gradient: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  stats?: { label: string; value: string };
  link: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

