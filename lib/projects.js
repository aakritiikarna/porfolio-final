// All portfolio projects in one place.
//
// ---- HOW TO CHANGE A PROJECT IMAGE ----------------------------------------------------------
// Every project has its own `image.src`. To replace one image, overwrite that single file in
// public/images/projects/ (keep the same filename) or point `src` at a new filename.
// Changing one project's image never affects another project.
//
// Recommended image: 1200 x 900 px (4:3) PNG/JPG/WebP. Other sizes are cropped to 4:3, never stretched.
// `position` chooses which part stays visible when cropping, e.g. 'top', 'center', '50% 30%'.
//
// If a file is missing, the card shows a neutral placeholder and logs a console warning
// naming the project and the path that needs an image.
// ----------------------------------------------------------------------------------------------

const GH = 'https://github.com/aakritiikarna'
const IMG = '/images/projects'

export const PROJECTS = [
  {
    id: 'train-delay-prediction',
    title: 'Train Delay Prediction System API',
    period: 'Dec 2025 – Apr 2026',
    summary: 'REST API with 12+ endpoints that serves train delay data, secured with JWT and updated live over Socket.io.',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
    github: `${GH}/train-delay-prediction`,
    image: { src: `${IMG}/train-delay-prediction.png`, alt: 'Train Delay Prediction System API: delay check screen and feature list', position: '50% 0%' },
  },
  {
    id: 'inventory-management',
    title: 'Inventory Management System',
    period: '2026',
    summary: 'Full-stack stock dashboard with JWT-protected CRUD APIs and Recharts views of inventory trends.',
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    github: `${GH}/inventory-management-system`,
    image: { src: `${IMG}/inventory-management.png`, alt: 'Inventory Management System: dashboard with stock totals and recent products', position: '50% 0%' },
  },
  {
    id: 'donation-and-charity',
    title: 'Donation and Charity',
    summary: 'Platform that connects donors with NGOs and makes giving simple and transparent.',
    stack: ['Angular', 'Node.js', 'Express.js', 'MySQL', 'Socket.IO'],
    github: `${GH}/-Donation-charity`,
    image: { src: `${IMG}/donation-and-charity.png`, alt: 'Donation and Charity: hands holding a heart with a Make a Donation button', position: '50% 4%' },
  },
  {
    id: 'code-craft',
    title: 'Code-Craft',
    summary: 'Online code editor with multi-language support, built to practice and learn coding.',
    stack: ['Next.js 15', 'Convex', 'Clerk'],
    github: `${GH}/code-craft`,
    image: { src: `${IMG}/code-craft.png`, alt: 'Code-Craft: online code editor running a Python example', position: '15% 50%' },
  },
  {
    id: 'goals-football-academy',
    title: 'Goals Football Academy',
    summary: 'Responsive academy website covering programs, coaches, facilities and player pathways.',
    stack: ['Next.js'],
    github: `${GH}/goals-nextjs`,
    image: { src: `${IMG}/goals-football-academy.png`, alt: 'Goals Football Academy: club badge over a football pitch', position: '30% 50%' },
  },
  {
    id: 'movie-recommender',
    title: 'Movie Recommender System',
    period: '2026',
    summary: 'User-based collaborative filtering on MovieLens that predicts ratings and suggests top-N movies.',
    stack: ['Python', 'Surprise', 'MongoDB', 'Django'],
    // NEEDS AN IMAGE: this project was not in the collage. Until a file exists the card shows a placeholder.
    // To add one: save it as public/images/projects/movie-recommender.png (1200 x 900 px), then set
    //   src: `${IMG}/movie-recommender.png`
    image: { src: null, alt: 'Movie Recommender System', position: 'center' },
  },
]
