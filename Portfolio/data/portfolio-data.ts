// ============================================
// PORTFOLIO DATA FILE
// Edit this file to update all website content
// ============================================

export const siteConfig = {
  name: "João Rodrigues",
  title: "Roblox Game Developer",
  description: "Software Developer focused on Roblox game creation.",
  email: "joaovcprodrigues@gmail.com",
  social: {
    roblox: "https://www.roblox.com/users/43706814/profile",
    instagram: "https://www.instagram.com/joaovcarvlh/",
    discord: "jvcprodrigues",
    linkedin: "https://www.linkedin.com/in/jo%C3%A3o-v%C3%ADtor-carvalho-64469a343/",
  },
}

// ============================================
// CAREER (Education + Work Experience)
// ============================================

export type CareerItem = {
  id: string
  type: "education" | "work"
  title: string
  organization: string
  location?: string
  startDate: string
  endDate?: string // leave empty for "Present"
  description: string
  skills?: string[]
}

export const careerItems: CareerItem[] = [
 {
    id: "1",
    type: "education",
    title: "Majoring in Computer Science",
    organization: "Universidade Federal do Espírito Santo (UFES)",
    location: "Vitória, Espírito Santo",
    startDate: "2024",
    description: "Currently pursuing my degree at UFES, recognized as one of the top universities in Brazil.",
  },
  {
    id: "2",
    type: "work",
    title: "Freelance Roblox Developer",
    organization: "Independent",
    startDate: "2024",
    endDate: "2025",
    description: "Self-taught developer, building foundational skills across all core areas of Roblox game creation and design.",
    skills: ["Lua", "Roblox Studio", "UI Design", "3D Modeling"],
  },
  {
    id: "3",
    type: "work",
    title: "Game Development Intern",
    organization: "Unlimited Fusions Studio",
    startDate: "2025",
    endDate: "2026",
    description: "Collaborated directly with Brazilian content creators to design and develop their official games.",
    skills: ["Database Management", "Signal & Janitor Modules", "Game Design", "Object-Oriented Programming"],
  },
  {
    id: "4",
    type: "work",
    title: "Gameplay Programmer",
    organization: "Los Calientes Studio",
    startDate: "2026",
    endDate: "2026",
    description: "Authored comprehensive technical documentation and implemented strict Luau type annotations across multiple game systems.",
    skills: ["Promise Module", "Luau Typechecking"],
  },
]

// ============================================
// GAMES / PROJECTS
// ============================================

export type Game = {
  id: string
  title: string
  description: string
  imageUrl?: string // URL of the game logo/thumbnail (e.g. "https://example.com/game-logo.png")
  robloxUrl?: string
  players?: string // e.g. "10K+"
  likes?: string // e.g. "5K+"
  tags: string[]
  featured?: boolean // highlight on home
}

export const games: Game[] = [
  {
    id: "1",
    title: "BELINHA MISSÃO ZARA!",
    description: "Developed exclusively for a prominent YouTuber, providing an immersive experience designed to connect the creator with their fanbase.",
    imageUrl: "", // Add the URL of your game logo here (e.g. "https://tr.rbxcdn.com/...")
    robloxUrl: "https://www.roblox.com/games/103497891256081/MISS-O-ZARA-EXPERI-NCIA-OFICIAL",
    players: "1.5M+",
    likes: "1K+",
    tags: ["Hangout", "Open World"],
    featured: true,
  },
  {
    id: "2",
    title: "Pats vs. Monsters",
    description: "Defeat monsters and collect a wide variety of pets by opening card packs!",
    imageUrl: "", // Add the URL of your game logo here
    robloxUrl: "https://www.roblox.com/games/106098137333680/PETS-VS-MONSTERS",
    players: "30K+",
    likes: "5+",
    tags: ["Collection", "Strategy"],
  },
  {
    id: "3",
    title: "Serve the Costumer",
    description: "Build, upgrade, and manage your own food machines to keep every customer satisfied.",
    imageUrl: "", // Add the URL of your game logo here
    robloxUrl: "https://www.roblox.com/games/120424429814872/Serve-the-Customers",
    players: "100K+",
    likes: "5K+",
    tags: ["Tycoon", "Food"],
    featured: true,
  }
]

// ============================================
// HIGHLIGHTS / ACHIEVEMENTS
// ============================================

export type Highlight = {
  id: string
  title: string
  description: string
  date: string
  type: "achievement" | "talk" | "travel" | "award" | "milestone"
  icon?: string // emoji or icon identifier
}

export const highlights: Highlight[] = [
 {
    id: "1",
    title: "Guest Lecturer at UVV",
    description: "Delivered a lecture on pursuing a career in Roblox development at Universidade de Vila Velha (UVV).",
    date: "2025",
    type: "talk",
  },
  {
    id: "2",
    title: "Roblox Creators Tour 2025",
    description: "Participated in roundtables, discussions, and networking activities at the official Roblox Creators Tour in Rio de Janeiro.",
    date: "2025",
    type: "travel",
  },
  {
    id: "3",
    title: "Roblox Mixer SP",
    description: "Attended the exclusive São Paulo Roblox Mixer by invitation, networking with top content creators and leading game developers in the Brazilian community.",
    date: "2026",
    type: "travel",
  },
]

// ============================================
// SKILLS
// ============================================

export const skills = [
  "Lua",
  "Roblox Studio",
  "Game Design",
  "UI/UX Design",
  "Level Design",
  "3D Modeling (Blender)",
  "Git/GitHub",
  "JavaScript",
  "TypeScript",
]
