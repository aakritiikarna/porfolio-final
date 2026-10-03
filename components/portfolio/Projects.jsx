import { TrainFront, Boxes, HeartHandshake, Code2, Trophy, Clapperboard } from 'lucide-react'

import SectionHead from './SectionHead'
import ProjectCard from './ProjectCard'
import { Stagger } from './Reveal'

const icon = 'h-5 w-5'
const GH = 'https://github.com/aakritiikarna'

// Train Delay, Inventory, Movie Recommender: details from the resume.
// Donation & Charity, Code Craft, Goals: not on the resume; one-line summaries come from the repo
// descriptions/READMEs. Add a `demo` URL to any project to show a Live Demo button.
const PROJECTS = [
  {
    title: 'Train Delay Prediction API System',
    time: 'Dec 2025 – Apr 2026',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT Authentication'],
    points: [
      'Built 12+ REST API endpoints to manage train and delay-related data.',
      'Designed the MongoDB schema for train schedules and delay records.',
      'Secured API access with JWT authentication and bcrypt password hashing.',
      'Pushed real-time delay notifications and live status updates with Socket.io.',
    ],
    icon: <TrainFront className={icon} />,
    github: `${GH}/train-delay-prediction`,
  },
  {
    title: 'Inventory Management System',
    time: '2026',
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT Authentication'],
    points: [
      'Full-stack inventory dashboard with a React 19, Vite and Tailwind CSS frontend and a Node.js/Express backend.',
      'REST CRUD APIs on MongoDB for adding, updating and tracking stock.',
      'JWT authentication and bcrypt password hashing to protect accounts and API routes.',
      'Recharts dashboards visualizing stock trends and key inventory metrics.',
    ],
    icon: <Boxes className={icon} />,
    github: `${GH}/inventory-management-system`,
  },
  {
    title: 'Donation & Charity',
    stack: ['Angular', 'Node.js', 'Express.js', 'MySQL', 'Socket.IO'],
    points: ['Full-stack platform connecting donors and NGOs to make giving simple and transparent.'],
    icon: <HeartHandshake className={icon} />,
    github: `${GH}/-Donation-charity`,
  },
  {
    title: 'Code Craft',
    stack: ['Next.js 15', 'Convex', 'Clerk'],
    points: ['Online code editor built with Next.js, with multi-language support.'],
    icon: <Code2 className={icon} />,
    github: `${GH}/code-craft`,
  },
  {
    title: 'Goals Football Academy',
    stack: ['Next.js'],
    points: [
      'Responsive website for Goals Football Academy, covering programs, coaches, facilities and player development pathways.',
    ],
    icon: <Trophy className={icon} />,
    github: `${GH}/goals-nextjs`,
  },
  {
    title: 'Movie Recommender System',
    time: '2026',
    stack: ['Python', 'Scikit-learn / Surprise', 'MongoDB', 'Django'],
    points: [
      'User-based collaborative filtering on the MovieLens dataset using the Surprise library.',
      'Predicts ratings for unseen movies from user-user similarity and generates top-N recommendations.',
      'Django web interface to view ratings and browse personalized recommendations.',
    ],
    icon: <Clapperboard className={icon} />,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead kicker="Things I've Built" title="Projects" subtitle="Selected work, with source on GitHub." />
        <Stagger className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </Stagger>
      </div>
    </section>
  )
}
