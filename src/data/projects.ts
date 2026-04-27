export type Category = 'All' | 'Film' | 'Commercial' | 'Game';

export interface Project {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  role: string;
  image: string;
  year: string;
  description: string;
  client?: string;
  duration?: string;
  team?: string;
  tools?: string[];
  challenge?: string;
  solution?: string;
  gallery?: string[];
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
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80',
    year: '2026',
    description: 'Epic space adventure with massive destruction sequences and nebula environments.',
    client: 'Universal Pictures',
    duration: '14 months',
    team: '24 artists',
    tools: ['Houdini', 'Nuke', 'Maya', 'Redshift', 'Substance'],
    challenge:
      'Creating photoreal nebula environments and large-scale spaceship destruction sequences that hold up at 4K resolution while maintaining art-directable control across more than 80 hero shots.',
    solution:
      'Built a custom volumetric pipeline in Houdini combined with procedural debris systems and a layered comp setup in Nuke. Developed reusable HDAs to give supervisors fast art direction without re-simulating from scratch.',
    gallery: [
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80',
      'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1600&q=80',
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80',
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80',
    ],
    awards: ['VES Awards 2026 - Outstanding FX', 'Annecy Selection 2026'],
    testimonial: {
      text: 'The destruction work elevated the entire third act. The team delivered photoreal results under an incredibly tight schedule.',
      author: 'Sarah Mitchell',
      position: 'VFX Supervisor, Universal Pictures',
    },
  },
  {
    id: 'aether-dynamics',
    title: 'Aether Dynamics',
    category: 'Commercial',
    role: 'Compositing Lead',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
    year: '2025',
    description: 'High-end automotive commercial with fluid simulations and particle systems.',
    client: 'Aether Motors',
    duration: '4 months',
    team: '12 artists',
    tools: ['Houdini', 'Nuke', 'Cinema 4D', 'Octane'],
    challenge:
      'Integrating CG fluid and particle simulations seamlessly with practical plates of a luxury vehicle while preserving the brand’s signature lighting language.',
    solution:
      'Designed a multi-pass comp template, used custom flip simulations with retimed cache layers, and matched lighting via deep compositing and projected HDRIs.',
    gallery: [
      'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80',
    ],
    awards: ['Cannes Lions 2025 - Silver'],
    testimonial: {
      text: 'A masterclass in bringing CG and live action together. Every frame feels intentional and premium.',
      author: 'David Chen',
      position: 'Creative Director, Aether Motors',
    },
  },
  {
    id: 'neon-horizon',
    title: 'Neon Horizon',
    category: 'Game',
    role: 'Cinematic VFX',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80',
    year: '2025',
    description: 'Cyberpunk game cinematics featuring holographic effects and neon environments.',
    client: 'Horizon Studios',
    duration: '8 months',
    team: '18 artists',
    tools: ['Unreal Engine 5', 'Houdini', 'Nuke', 'Substance Designer'],
    challenge:
      'Delivering pre-rendered cinematics that match the in-engine art direction while pushing the visual fidelity beyond real-time constraints.',
    solution:
      'Built a hybrid pipeline streaming USD scenes between Unreal and Houdini, with bespoke shaders to translate the in-game look into ray-traced cinematic frames.',
    gallery: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80',
      'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1600&q=80',
      'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=1600&q=80',
    ],
    awards: ['Game Awards 2025 - Best Trailer'],
    testimonial: {
      text: 'The cinematic captured the soul of the game. It set the tone for our entire marketing campaign.',
      author: 'Alex Rivera',
      position: 'Game Director, Horizon Studios',
    },
  },
  {
    id: 'the-last-signal',
    title: 'The Last Signal',
    category: 'Film',
    role: 'Environment TD',
    image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80',
    year: '2024',
    description: 'Sci-fi thriller with alien planet environments and atmospheric effects.',
    client: 'A24',
    duration: '10 months',
    team: '16 artists',
    tools: ['Houdini', 'Clarisse', 'Nuke', 'SpeedTree'],
    challenge:
      'Designing alien biomes that feel scientifically grounded across multiple lighting conditions and time-of-day setups.',
    solution:
      'Developed a procedural ecosystem toolkit in Houdini with reusable scatter rules and a custom atmospheric shader for volumetric haze.',
    gallery: [
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=80',
    ],
  },
  {
    id: 'quantum-drive',
    title: 'Quantum Drive',
    category: 'Commercial',
    role: 'FX Supervisor',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1600&q=80',
    year: '2024',
    description: 'Tech product launch with abstract particle simulations and light trails.',
    client: 'Quantum Inc.',
    duration: '3 months',
    team: '8 artists',
    tools: ['Houdini', 'Redshift', 'After Effects'],
    challenge:
      'Visualising the abstract concept of quantum computing in a way that feels tactile and brand aligned.',
    solution:
      'Created a particle and ribbon system driven by audio reactive curves, paired with a clean photographic comp style to ground the abstract elements.',
  },
  {
    id: 'phantom-protocol',
    title: 'Phantom Protocol',
    category: 'Game',
    role: 'VFX Artist',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1600&q=80',
    year: '2024',
    description: 'Action game with explosive effects, magic systems, and environmental destruction.',
    client: 'Phantom Studios',
    duration: '12 months',
    team: '20 artists',
    tools: ['Unreal Engine 5', 'Niagara', 'Houdini'],
    challenge:
      'Designing a magic system with consistent visual language across over 40 unique abilities while staying within strict performance budgets.',
    solution:
      'Built a modular Niagara library with shared sub-emitters and curated colour palettes, allowing rapid iteration and a cohesive look.',
  },
  {
    id: 'crimson-eclipse',
    title: 'Crimson Eclipse',
    category: 'Film',
    role: 'Senior FX Artist',
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1600&q=80',
    year: '2024',
    description: 'Fantasy epic featuring fire and water simulations with magical creatures.',
    tools: ['Houdini', 'Mantra', 'Nuke'],
  },
  {
    id: 'aurora-motors',
    title: 'Aurora Motors',
    category: 'Commercial',
    role: 'Lead Compositor',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1600&q=80',
    year: '2024',
    description: 'Luxury car reveal with dynamic lighting, reflections, and environment integration.',
    tools: ['Nuke', 'Maya', 'Arnold'],
  },
  {
    id: 'echoes-of-war',
    title: 'Echoes of War',
    category: 'Game',
    role: 'FX Lead',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80',
    year: '2023',
    description: 'Military FPS cinematics with realistic explosions and debris simulations.',
    tools: ['Houdini', 'Unreal Engine 5'],
  },
  {
    id: 'nebula-rising',
    title: 'Nebula Rising',
    category: 'Film',
    role: 'FX Artist',
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1600&q=80',
    year: '2023',
    description: 'Space opera with volumetric nebulae, asteroid fields, and ship destruction.',
    tools: ['Houdini', 'Nuke'],
  },
  {
    id: 'titan-energy',
    title: 'Titan Energy',
    category: 'Commercial',
    role: 'VFX Artist',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80',
    year: '2023',
    description: 'Energy drink commercial with electric arcs, plasma effects, and speed trails.',
  },
  {
    id: 'realm-of-shadows',
    title: 'Realm of Shadows',
    category: 'Game',
    role: 'Cinematic Artist',
    image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1600&q=80',
    year: '2023',
    description: 'Dark fantasy game with smoke, fog, and ethereal magic effects.',
  },
  {
    id: 'arctic-expedition',
    title: 'Arctic Expedition',
    category: 'Film',
    role: 'Environment FX',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=80',
    year: '2023',
    description: 'Survival thriller with blizzard simulations, ice fracturing, and aurora effects.',
  },
  {
    id: 'velocity-x',
    title: 'Velocity X',
    category: 'Commercial',
    role: 'Motion Graphics',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    year: '2022',
    description: 'Sports brand campaign with dynamic motion trails and impact effects.',
  },
  {
    id: 'eternal-conquest',
    title: 'Eternal Conquest',
    category: 'Game',
    role: 'Senior VFX',
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=1600&q=80',
    year: '2022',
    description: 'Strategy game cinematics with large-scale battle effects and magic systems.',
  },
  {
    id: 'deep-impact',
    title: 'Deep Impact',
    category: 'Film',
    role: 'Destruction FX',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1600&q=80',
    year: '2022',
    description: 'Disaster film with building collapses, floods, and pyrotechnic simulations.',
  },
  {
    id: 'luxe-cosmetics',
    title: 'Luxe Cosmetics',
    category: 'Commercial',
    role: 'Beauty VFX',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80',
    year: '2022',
    description: 'High-end beauty campaign with liquid simulations and product visualization.',
  },
  {
    id: 'cyber-nexus',
    title: 'Cyber Nexus',
    category: 'Game',
    role: 'Tech VFX',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80',
    year: '2022',
    description: 'Hacking game with digital glitch effects, data streams, and UI animations.',
  },
];

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getAdjacentProjects(id: string): { prev: Project; next: Project } | null {
  const idx = PROJECTS.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return { prev, next };
}
