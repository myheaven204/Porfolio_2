export type Category = 'Film' | 'Commercial' | 'Game';

export interface ProjectImage {
  src: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  role: string;
  image: string;
  year: string;
  description: string;
  client?: string;
  duration?: string;
  tools?: string[];
  team?: string;
  challenge?: string;
  solution?: string;
  gallery?: ProjectImage[];
  videoUrl?: string;
  awards?: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'stellar-odyssey',
    title: 'Stellar Odyssey',
    category: 'Film',
    role: 'Lead FX Artist',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    year: '2026',
    description: 'Epic space adventure with massive destruction sequences and nebula environments.',
    client: 'Universal Pictures',
    duration: '18 months',
    tools: ['Houdini', 'Nuke', 'Maya', 'Redshift'],
    team: '45 VFX Artists',
    challenge: 'Creating photorealistic nebula environments that could seamlessly integrate with live-action footage while maintaining artistic direction.',
    solution: 'Developed a custom volumetric rendering pipeline in Houdini that allowed for art-directable nebula clouds with accurate light scattering.',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80', caption: 'Hero Shot - Nebula Sequence' },
      { src: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80', caption: 'Destruction FX' },
      { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80', caption: 'Space Station Interior' },
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: ['VES Award - Outstanding FX', 'HPA Award - Best Visual Effects'],
    testimonial: {
      text: 'The VFX team exceeded all expectations. Their nebula work is some of the most beautiful space imagery ever created for film.',
      author: 'James Morrison',
      position: 'Director, Stellar Odyssey'
    }
  },
  {
    id: 'aether-dynamics',
    title: 'Aether Dynamics',
    category: 'Commercial',
    role: 'Compositing Lead',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    year: '2025',
    description: 'High-end automotive commercial with fluid simulations and particle systems.',
    client: 'Mercedes-Benz',
    duration: '3 months',
    tools: ['Nuke', 'Houdini', 'Cinema 4D', 'After Effects'],
    team: '12 Artists',
    challenge: 'Integrating complex fluid dynamics around the vehicle while maintaining the premium feel of the brand.',
    solution: 'Created a hybrid approach combining practical water elements with CG fluid simulations for maximum realism.',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80', caption: 'Final Frame' },
      { src: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&q=80', caption: 'Fluid Integration' },
    ],
    testimonial: {
      text: 'Exceptional attention to detail. The fluid work elevated our campaign to new heights.',
      author: 'Sarah Chen',
      position: 'Creative Director, BBDO'
    }
  },
  {
    id: 'neon-horizon',
    title: 'Neon Horizon',
    category: 'Game',
    role: 'Cinematic VFX',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    year: '2025',
    description: 'Cyberpunk game cinematics featuring holographic effects and neon environments.',
    client: 'CD Projekt Red',
    duration: '8 months',
    tools: ['Unreal Engine 5', 'Houdini', 'Nuke', 'Substance Painter'],
    team: '20 Artists',
    challenge: 'Creating a cohesive holographic language that felt futuristic yet grounded in reality.',
    solution: 'Developed a modular hologram system with procedural glitching and chromatic aberration effects.',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80', caption: 'Night City Vista' },
      { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80', caption: 'Holographic UI' },
    ],
    awards: ['Game Awards - Best Art Direction Nomination'],
  },
  {
    id: 'the-last-signal',
    title: 'The Last Signal',
    category: 'Film',
    role: 'Environment TD',
    image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
    year: '2024',
    description: 'Sci-fi thriller with alien planet environments and atmospheric effects.',
    client: 'A24 Films',
    duration: '12 months',
    tools: ['Houdini', 'Clarisse', 'Nuke', 'ZBrush'],
    team: '30 Artists',
    challenge: 'Designing alien landscapes that felt both beautiful and threatening.',
    solution: 'Combined procedural terrain generation with hand-sculpted hero assets for unique otherworldly environments.',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1200&q=80', caption: 'Alien Planet Surface' },
    ],
  },
  {
    id: 'quantum-drive',
    title: 'Quantum Drive',
    category: 'Commercial',
    role: 'FX Supervisor',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    year: '2024',
    description: 'Tech product launch with abstract particle simulations and light trails.',
    client: 'Apple Inc.',
    duration: '2 months',
    tools: ['Houdini', 'Nuke', 'Cinema 4D'],
    team: '8 Artists',
    challenge: 'Visualizing abstract concepts of speed and innovation in a minimal, elegant way.',
    solution: 'Designed particle systems that revealed product features through choreographed light trails.',
  },
  {
    id: 'phantom-protocol',
    title: 'Phantom Protocol',
    category: 'Game',
    role: 'VFX Artist',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80',
    year: '2024',
    description: 'Action game with explosive effects, magic systems, and environmental destruction.',
    client: 'Ubisoft',
    duration: '6 months',
    tools: ['Unreal Engine 5', 'Houdini', 'EmberGen'],
    team: '15 Artists',
  },
  {
    id: 'crimson-eclipse',
    title: 'Crimson Eclipse',
    category: 'Film',
    role: 'Senior FX Artist',
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80',
    year: '2024',
    description: 'Fantasy epic featuring fire and water simulations with magical creatures.',
    client: 'Warner Bros.',
    duration: '14 months',
    tools: ['Houdini', 'Maya', 'Nuke', 'Arnold'],
    team: '35 Artists',
  },
  {
    id: 'aurora-motors',
    title: 'Aurora Motors',
    category: 'Commercial',
    role: 'Lead Compositor',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
    year: '2024',
    description: 'Luxury car reveal with dynamic lighting, reflections, and environment integration.',
    client: 'BMW',
    duration: '2 months',
    tools: ['Nuke', 'Houdini', 'DaVinci Resolve'],
    team: '10 Artists',
  },
  {
    id: 'echoes-of-war',
    title: 'Echoes of War',
    category: 'Game',
    role: 'FX Lead',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    year: '2023',
    description: 'Military FPS cinematics with realistic explosions and debris simulations.',
    client: 'Activision',
    duration: '10 months',
    tools: ['Unreal Engine 5', 'Houdini', 'Nuke'],
    team: '18 Artists',
  },
  {
    id: 'nebula-rising',
    title: 'Nebula Rising',
    category: 'Film',
    role: 'FX Artist',
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80',
    year: '2023',
    description: 'Space opera with volumetric nebulae, asteroid fields, and ship destruction.',
    client: 'Paramount Pictures',
    duration: '16 months',
    tools: ['Houdini', 'Nuke', 'Katana'],
    team: '40 Artists',
  },
  {
    id: 'titan-energy',
    title: 'Titan Energy',
    category: 'Commercial',
    role: 'VFX Artist',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    year: '2023',
    description: 'Energy drink commercial with electric arcs, plasma effects, and speed trails.',
    client: 'Red Bull',
    duration: '1 month',
    tools: ['Houdini', 'After Effects', 'Cinema 4D'],
    team: '6 Artists',
  },
  {
    id: 'realm-of-shadows',
    title: 'Realm of Shadows',
    category: 'Game',
    role: 'Cinematic Artist',
    image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80',
    year: '2023',
    description: 'Dark fantasy game with smoke, fog, and ethereal magic effects.',
    client: 'FromSoftware',
    duration: '8 months',
    tools: ['Unreal Engine 5', 'Houdini', 'Substance Designer'],
    team: '12 Artists',
  },
  {
    id: 'arctic-expedition',
    title: 'Arctic Expedition',
    category: 'Film',
    role: 'Environment FX',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    year: '2023',
    description: 'Survival thriller with blizzard simulations, ice fracturing, and aurora effects.',
    client: 'Netflix',
    duration: '10 months',
    tools: ['Houdini', 'Nuke', 'Maya'],
    team: '25 Artists',
  },
  {
    id: 'velocity-x',
    title: 'Velocity X',
    category: 'Commercial',
    role: 'Motion Graphics',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    year: '2022',
    description: 'Sports brand campaign with dynamic motion trails and impact effects.',
    client: 'Nike',
    duration: '6 weeks',
    tools: ['After Effects', 'Cinema 4D', 'Houdini'],
    team: '5 Artists',
  },
  {
    id: 'eternal-conquest',
    title: 'Eternal Conquest',
    category: 'Game',
    role: 'Senior VFX',
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&q=80',
    year: '2022',
    description: 'Strategy game cinematics with large-scale battle effects and magic systems.',
    client: 'Blizzard Entertainment',
    duration: '12 months',
    tools: ['Unreal Engine', 'Houdini', 'Nuke'],
    team: '20 Artists',
  },
  {
    id: 'deep-impact',
    title: 'Deep Impact',
    category: 'Film',
    role: 'Destruction FX',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80',
    year: '2022',
    description: 'Disaster film with building collapses, floods, and pyrotechnic simulations.',
    client: 'Sony Pictures',
    duration: '14 months',
    tools: ['Houdini', 'Maya', 'Nuke', 'Arnold'],
    team: '50 Artists',
  },
  {
    id: 'luxe-cosmetics',
    title: 'Luxe Cosmetics',
    category: 'Commercial',
    role: 'Beauty VFX',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    year: '2022',
    description: 'High-end beauty campaign with liquid simulations and product visualization.',
    client: 'Chanel',
    duration: '3 weeks',
    tools: ['Houdini', 'Nuke', 'Cinema 4D'],
    team: '4 Artists',
  },
  {
    id: 'cyber-nexus',
    title: 'Cyber Nexus',
    category: 'Game',
    role: 'Tech VFX',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    year: '2022',
    description: 'Hacking game with digital glitch effects, data streams, and UI animations.',
    client: 'Electronic Arts',
    duration: '6 months',
    tools: ['Unreal Engine', 'After Effects', 'Houdini'],
    team: '10 Artists',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return PROJECTS.find(project => project.id === id);
};
