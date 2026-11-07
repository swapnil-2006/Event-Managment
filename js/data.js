// ==========================================================================
// EventPulse - Curated Events Dataset
// Rich dataset with realistic dates, venues, categories, agendas & speakers
// ==========================================================================

const INITIAL_EVENTS = [
  {
    id: "ep-001",
    title: "Global Tech Innovators Summit 2026",
    category: "technology",
    categoryLabel: "Technology & AI",
    date: "2026-11-20T09:00:00",
    dateFormatted: "Nov 20, 2026",
    time: "09:00 AM - 06:00 PM EST",
    venue: "Metropolitan Tech Pavilion, Silicon Valley, CA",
    locationType: "In-Person",
    price: 49,
    isFree: false,
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Explore breakthrough AI agents, quantum computing, and the next frontier of web intelligence with industry pioneers.",
    fullDescription: "Join over 2,500 engineers, researchers, and tech founders at the flagship technology summit of the year. The Global Tech Innovators Summit dives deep into applied generative intelligence, edge computing architectures, next-gen cloud systems, and responsible AI governance. Enjoy keynote fireside chats, live coding deep-dives, hands-on workshop labs, and high-impact investor networking opportunities.",
    totalSpots: 400,
    spotsRemaining: 42,
    rating: 4.9,
    attendeesCount: 358,
    tags: ["Artificial Intelligence", "Cloud Native", "DevOps", "NextGen Web"],
    speakers: [
      {
        name: "Dr. Elena Vance",
        role: "Chief AI Scientist",
        org: "NeuralDynamics Lab",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Marcus Sterling",
        role: "VP of Cloud Systems",
        org: "HyperScale Infrastructure",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Amina Al-Mansoor",
        role: "Founder & CEO",
        org: "Synthetix BioTech",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "09:00 AM", title: "Registration & Welcome Breakfast", speaker: "EventPulse Team" },
      { time: "10:00 AM", title: "Keynote: Beyond Humanoid & Agentic AI", speaker: "Dr. Elena Vance" },
      { time: "11:30 AM", title: "Scaling Distributed Cloud Infrastructure", speaker: "Marcus Sterling" },
      { time: "01:00 PM", title: "Gourmet Networking Lunch & Demos", speaker: "Exhibition Hall" },
      { time: "02:30 PM", title: "Founder Panel: Bootstrapping to Series B", speaker: "Amina Al-Mansoor & Guests" },
      { time: "04:30 PM", title: "Lightning Demos & Closing Ceremony", speaker: "All Speakers" }
    ],
    ticketTiers: [
      { id: "tech-std", name: "Standard Pass", price: 49, perks: ["Full Day Stage Access", "Breakfast & Lunch Included", "Digital Session Recordings"] },
      { id: "tech-vip", name: "VIP Executive", price: 149, perks: ["Priority Front-Row Seating", "Exclusive Speakers Lounge", "Post-Event Networking Gala", "VIP Swag Bag"] },
      { id: "tech-stu", name: "Student Pass", price: 20, perks: ["General Hall Access", "Workshop Materials", "Requires Valid Student ID"] }
    ]
  },
  {
    id: "ep-002",
    title: "Neon Horizon Music & Arts Carnival",
    category: "music",
    categoryLabel: "Music & Arts",
    date: "2026-11-28T16:00:00",
    dateFormatted: "Nov 28, 2026",
    time: "04:00 PM - 02:00 AM EST",
    venue: "Solaria Open Arena & Waterfront Bay, Miami, FL",
    locationType: "Outdoor Stage",
    price: 65,
    isFree: false,
    featured: true,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "An electrifying sunset-to-dawn audio-visual spectacle featuring world-class electronic producers and immersive projection art.",
    fullDescription: "Immerse your senses in Neon Horizon, an extraordinary multi-stage celebration of electronic dance music, ambient soundscapes, live instrumental fusions, and state-of-the-art interactive holographic projections. Walk through sprawling digital art gardens, sample curated culinary food trucks, and dance under laser-illuminated skies alongside 5,000 music lovers.",
    totalSpots: 500,
    spotsRemaining: 78,
    rating: 4.8,
    attendeesCount: 422,
    tags: ["Live Concert", "EDM", "Visual Arts", "Festival", "Nightlife"],
    speakers: [
      {
        name: "DJ Kaelen Nova",
        role: "Headlining Producer",
        org: "Universal Grooves",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Luna Chen",
        role: "Visual Light Architect",
        org: "Illumina Interactive",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "04:00 PM", title: "Gates Open & Ambient Sunset Chillout", speaker: "Acoustic Stage" },
      { time: "06:30 PM", title: "Interactive Holographic Light Activation", speaker: "Luna Chen" },
      { time: "08:00 PM", title: "Electro-Synth Live Band Showcase", speaker: "The Neon Collective" },
      { time: "10:30 PM", title: "Headline Midnight Set", speaker: "DJ Kaelen Nova" },
      { time: "01:00 AM", title: "Deep Bass Afterglow Session", speaker: "Guest DJs" }
    ],
    ticketTiers: [
      { id: "music-ga", name: "General Admission", price: 65, perks: ["Access to all 3 stages", "Free Hydration Stations", "Wristband Entry"] },
      { id: "music-vip", name: "VIP Deck Pass", price: 135, perks: ["Elevated Viewing Platform", "Express Bar Lanes", "Private Restrooms", "Complimentary Welcome Drink"] }
    ]
  },
  {
    id: "ep-003",
    title: "Global Venture & Startup Pitchfest 2026",
    category: "business",
    categoryLabel: "Business & Startups",
    date: "2026-12-05T09:30:00",
    dateFormatted: "Dec 05, 2026",
    time: "09:30 AM - 05:00 PM EST",
    venue: "Empire Financial Tower, 42nd Floor, New York, NY",
    locationType: "In-Person & Hybrid",
    price: 0,
    isFree: true,
    featured: true,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "30 vetted high-growth startups compete live for $1.5M in seed funding in front of 120+ top tier Angel & VC investors.",
    fullDescription: "Witness the next wave of disruptive tech, climate tech, SaaS, and consumer brands as ambitious founders pitch live on stage. Founders receive real-time investor feedback, scorecards, and live term sheet commitments. Includes curated 1-on-1 breakout speed-networking sessions between angel syndicates and startup founders.",
    totalSpots: 200,
    spotsRemaining: 15,
    rating: 4.9,
    attendeesCount: 185,
    tags: ["Venture Capital", "Pitch Competition", "Startups", "Fundraising", "Angel Investors"],
    speakers: [
      {
        name: "Harrison Vance",
        role: "Managing Partner",
        org: "Apex Horizon Ventures",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Sophia Delgado",
        role: "Founding Partner",
        org: "FemmeTech Capital",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "09:30 AM", title: "Investor Check-in & Morning Espresso", speaker: "Foyer Lounge" },
      { time: "10:15 AM", title: "Batch A: Enterprise AI & FinTech Pitches", speaker: "10 Selected Teams" },
      { time: "12:30 PM", title: "Curated 1-on-1 Speed Matchmaking Lunch", speaker: "Private Dining Hall" },
      { time: "02:00 PM", title: "Batch B: Climate & DeepTech Pitches", speaker: "10 Selected Teams" },
      { time: "04:00 PM", title: "Deliberation & $1.5M Grand Prize Awards", speaker: "VC Judging Panel" }
    ],
    ticketTiers: [
      { id: "biz-free", name: "Community Observer (Free)", price: 0, perks: ["Auditorium Seating", "Access to Pitch Showcase", "Digital Pitch Booklet"] },
      { id: "biz-accred", name: "Accredited Investor / Founder", price: 75, perks: ["1-on-1 Founder Matchmaking Access", "Private Dealroom Access", "Networking Cocktail Hour"] }
    ]
  },
  {
    id: "ep-004",
    title: "International UX & Design Systems Summit",
    category: "design",
    categoryLabel: "Arts & Design",
    date: "2026-12-12T10:00:00",
    dateFormatted: "Dec 12, 2026",
    time: "10:00 AM - 05:30 PM EST",
    venue: "Creative Arts Center & Auditorium, Chicago, IL",
    locationType: "In-Person & Workshop",
    price: 39,
    isFree: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Master scalable design tokens, micro-interactions, accessibility compliance, and design engineering workflows.",
    fullDescription: "From Figma variables to atomic component libraries in code, this summit is crafted specifically for product designers, creative directors, and front-end design engineers. Discover how Fortune 500 teams align design tokens with production code, build fluid motion languages, and test for WCAG 2.2 AAA accessibility compliance.",
    totalSpots: 300,
    spotsRemaining: 55,
    rating: 4.7,
    attendeesCount: 245,
    tags: ["UI/UX", "Design Systems", "Figma", "CSS Architecture", "Design Engineering"],
    speakers: [
      {
        name: "Clara Moreau",
        role: "Head of Design Systems",
        org: "Stripe Design",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Devon Reed",
        role: "Staff Product Designer",
        org: "Vercel Labs",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "10:00 AM", title: "Keynote: The Evolution of Living Design Systems", speaker: "Clara Moreau" },
      { time: "11:30 AM", title: "Workshop: Bridging Figma Variables to CSS Custom Properties", speaker: "Devon Reed" },
      { time: "01:00 PM", title: "Designers Social Buffet", speaker: "Atrium Gallery" },
      { time: "02:15 PM", title: "Accessibility Without Sacrificing Visual Aesthetics", speaker: "Panel of Design Advocates" },
      { time: "04:15 PM", title: "Design Portfolio Clinic & Live Critiques", speaker: "Lead Mentors" }
    ],
    ticketTiers: [
      { id: "des-std", name: "Standard Design Pass", price: 39, perks: ["Access to Keynotes & Panels", "UI Toolkit Assets Bundle", "Lunch & Refreshments"] },
      { id: "des-wksp", name: "Full Summit + Workshop Lab", price: 89, perks: ["Hands-on Design Token Lab", "Figma File Templates", "1-on-1 Portfolio Critique"] }
    ]
  },
  {
    id: "ep-005",
    title: "City Lights Night Half-Marathon & Fitness Gala",
    category: "sports",
    categoryLabel: "Health & Sports",
    date: "2026-12-18T18:00:00",
    dateFormatted: "Dec 18, 2026",
    time: "06:00 PM - 11:00 PM EST",
    venue: "Harbor Promenade & Olympic Village, Seattle, WA",
    locationType: "Outdoor Athletic",
    price: 30,
    isFree: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Lace up your running shoes for a scenic 10K / 21K night run along the illuminated coastline, followed by a recovery festival.",
    fullDescription: "Experience the thrill of racing through illuminated bridges, coastal piers, and city skylines under starry skies. Fully timed by precision RFID bibs with emergency medics, nutrition hydration stops every 2.5K, and pacers for all target goals. Cross the finish line to claim your custom glowing medal and join the celebration with live acoustic music and sports nutrition bars.",
    totalSpots: 600,
    spotsRemaining: 112,
    rating: 4.9,
    attendeesCount: 488,
    tags: ["Running", "Marathon", "Health", "Fitness", "Outdoor Challenge"],
    speakers: [
      {
        name: "Coach Tariq Nelson",
        role: "Olympian Marathon Coach",
        org: "Seattle Track Guild",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "05:00 PM", title: "Bib Collection & Warm-up Stretching Zone", speaker: "Olympic Village" },
      { time: "06:00 PM", title: "Half-Marathon (21K) Wave 1 Gun Shot", speaker: "Starting Line" },
      { time: "06:30 PM", title: "10K Challenge Wave 2 Gun Shot", speaker: "Starting Line" },
      { time: "08:30 PM", title: "Podium Ceremony & Medal Presentation", speaker: "Coach Tariq Nelson" },
      { time: "09:30 PM", title: "Post-Race Hydrotherapy & DJ Party", speaker: "Promenade Lawn" }
    ],
    ticketTiers: [
      { id: "run-10k", name: "10K Runner Entry", price: 30, perks: ["RFID Timing Chip", "Official Technical Running Tee", "Finisher Medal", "Hydration Stations"] },
      { id: "run-21k", name: "21K Half-Marathon Entry", price: 50, perks: ["Half-Marathon Bib & Timing", "Premium Running Windbreaker", "Finisher Medal & Gift Bag", "Post-Race Massage"] }
    ]
  },
  {
    id: "ep-006",
    title: "Artisan Culinary & Craft Wine Festival",
    category: "food",
    categoryLabel: "Food & Culinary",
    date: "2026-12-24T12:00:00",
    dateFormatted: "Dec 24, 2026",
    time: "12:00 PM - 09:00 PM EST",
    venue: "Heritage Vineyard & Botanical Grounds, Napa Valley, CA",
    locationType: "Outdoor & Pavilion",
    price: 55,
    isFree: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Indulge in tastings from 45 award-winning master chefs, organic local winemakers, and artisan chocolatiers.",
    fullDescription: "A holiday gastronomic paradise set against rolling hills and centuries-old vineyards. Treat your palate to masterclass food pairings, wood-fired seasonal delicacies, authentic farm-to-table courses, and vintage wine cellars. Includes live acoustic jazz trios and chef cooking masterclasses on stage.",
    totalSpots: 350,
    spotsRemaining: 28,
    rating: 4.9,
    attendeesCount: 322,
    tags: ["Gourmet Food", "Wine Tasting", "Chefs", "Organic", "Culinary Arts"],
    speakers: [
      {
        name: "Chef Mateo Bianchi",
        role: "Michelin 2-Star Executive Chef",
        org: "Ristorante Luce",
        avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80"
      },
      {
        name: "Genevieve Dubois",
        role: "Master Sommelier",
        org: "Heritage Cellars Napa",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "12:00 PM", title: "Gates Open & Welcome Champagne Toast", speaker: "Vineyard Terrace" },
      { time: "01:30 PM", title: "Masterclass: Searing & Truffle Gastronomy", speaker: "Chef Mateo Bianchi" },
      { time: "03:30 PM", title: "Blind Wine Tasting Challenge & Sensory Journey", speaker: "Genevieve Dubois" },
      { time: "05:30 PM", title: "Grand Twilight Artisan Feast", speaker: "Main Pavilion" },
      { time: "07:30 PM", title: "Acoustic Jazz Sunset & Dessert Lounge", speaker: "The Heritage Trio" }
    ],
    ticketTiers: [
      { id: "food-taster", name: "Tasting Pass", price: 55, perks: ["10 Food Tasting Tokens", "Souvenir Wine Glass", "Access to Cooking Demos"] },
      { id: "food-connoisseur", name: "Gourmet Connoisseur", price: 110, perks: ["Unlimited Food & Wine Tastings", "VIP Reserved Pavilion Seating", "Gift Hamper with Artisan Truffles"] }
    ]
  },
  {
    id: "ep-007",
    title: "NextGen Cloud Native & Cyber Defense Expo 2027",
    category: "technology",
    categoryLabel: "Technology & AI",
    date: "2027-01-15T09:00:00",
    dateFormatted: "Jan 15, 2027",
    time: "09:00 AM - 05:00 PM EST",
    venue: "International Congress Center, Austin, TX",
    locationType: "In-Person & Virtual Stream",
    price: 0,
    isFree: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Zero-trust architectures, ethical hacking demonstrations, and defense strategies against automated cyber threats.",
    fullDescription: "Join 1,800 security analysts, infrastructure architects, and white-hat hackers. Watch live red-team vs blue-team capture-the-flag competitions, dissect real-world zero-day exploit scenarios, and explore quantum-resistant encryption protocols.",
    totalSpots: 500,
    spotsRemaining: 94,
    rating: 4.8,
    attendeesCount: 406,
    tags: ["Cyber Security", "Cloud Native", "DevSecOps", "Zero Trust", "Hacking"],
    speakers: [
      {
        name: "Zack Kowalski",
        role: "Director of Threat Intelligence",
        org: "Aegis Cyber Defense",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "09:00 AM", title: "Keynote: Zero Trust in Autonomous Cloud Era", speaker: "Zack Kowalski" },
      { time: "11:00 AM", title: "Live Hacking Demo: Modern Container Escapes", speaker: "Red Team Specialists" },
      { time: "01:00 PM", title: "Cyber Defense Career Fair & Networking", speaker: "Expo Floor" },
      { time: "02:30 PM", title: "Defending Against AI-Driven Social Engineering", speaker: "Security Panel" },
      { time: "04:30 PM", title: "CTF Competition Winners Announcement", speaker: "Judging Team" }
    ],
    ticketTiers: [
      { id: "sec-free", name: "Free Expo Pass", price: 0, perks: ["Expo Floor Access", "Keynote Stream", "Digital Badge"] },
      { id: "sec-pro", name: "Hands-on CTF Competitor", price: 45, perks: ["Live CTF Arena Seat", "Hardware Security Token", "Official Certificate"] }
    ]
  },
  {
    id: "ep-008",
    title: "Acoustic Sunset Strings & Indie Symphony",
    category: "music",
    categoryLabel: "Music & Arts",
    date: "2027-01-22T17:30:00",
    dateFormatted: "Jan 22, 2027",
    time: "05:30 PM - 09:30 PM EST",
    venue: "Starlight Botanical Amphitheater, Austin, TX",
    locationType: "Outdoor Amphitheater",
    price: 35,
    isFree: false,
    featured: false,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "A magical twilight performance blending a 40-piece modern orchestra with indie folk singer-songwriters.",
    fullDescription: "Nestled in lush botanical surroundings under lantern-draped cedar canopies, enjoy contemporary orchestral arrangements of indie folk, cinematic soundscapes, and timeless melodic anthems. Bring a blanket or reserve picnic bench seating under the stars.",
    totalSpots: 450,
    spotsRemaining: 62,
    rating: 4.9,
    attendeesCount: 388,
    tags: ["Acoustic", "Orchestra", "Indie Music", "Classical Crossover", "Outdoors"],
    speakers: [
      {
        name: "Mira Rosenthal",
        role: "Principal Conductor",
        org: "Starlight Chamber Orchestra",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "05:30 PM", title: "Lawn Gathering & Craft Cider Bar", speaker: "Amphitheater Grounds" },
      { time: "06:30 PM", title: "Part I: Twilight Cinematic Strings", speaker: "Mira Rosenthal & Chamber Orchestra" },
      { time: "07:45 PM", title: "Intermission & Stargazing", speaker: "Botanical Lawn" },
      { time: "08:15 PM", title: "Part II: Indie Folk Symphony Finale", speaker: "Guest Songwriters & Orchestra" }
    ],
    ticketTiers: [
      { id: "indie-lawn", name: "Lawn Picnic Pass", price: 35, perks: ["Lawn Access (Bring your blanket)", "Complimentary Warm Apple Cider"] },
      { id: "indie-reserved", name: "Reserved Canopy Table", price: 70, perks: ["Dedicated Table Seating", "Artisan Cheese & Charcuterie Board", "VIP Priority Entry"] }
    ]
  },
  {
    id: "ep-009",
    title: "Global EcoTech & Sustainable Living Forum",
    category: "business",
    categoryLabel: "Business & Startups",
    date: "2027-02-05T09:00:00",
    dateFormatted: "Feb 05, 2027",
    time: "09:00 AM - 04:30 PM EST",
    venue: "Green Energy Innovation Campus, Denver, CO",
    locationType: "In-Person & Clean Tech Lab",
    price: 0,
    isFree: true,
    featured: false,
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80",
    shortDescription: "Unlocking circular economy breakthroughs, solar grid innovations, and regenerative enterprise business models.",
    fullDescription: "A gathering for leaders passionate about climate action, environmental sustainability, clean energy, and sustainable product life cycles. Connect with climate scientists, renewable energy venture capitalists, and civic innovators driving zero-waste manufacturing.",
    totalSpots: 300,
    spotsRemaining: 80,
    rating: 4.8,
    attendeesCount: 220,
    tags: ["Sustainability", "Clean Tech", "Green Energy", "ESG", "Climate Action"],
    speakers: [
      {
        name: "Dr. Maya Lindqvist",
        role: "Chair of Circular Economics",
        org: "Nordic Institute of Sustainability",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
      }
    ],
    agenda: [
      { time: "09:00 AM", title: "Solar Morning Coffee & Networking", speaker: "Green Campus Atrium" },
      { time: "10:00 AM", title: "Regenerative Systems: Redesigning Modern Supply Chains", speaker: "Dr. Maya Lindqvist" },
      { time: "12:00 PM", title: "Zero-Waste Farm-Fresh Lunch", speaker: "Campus Greenhouse" },
      { time: "01:30 PM", title: "Clean Energy Pitch Showcases", speaker: "Climate Tech Pioneers" },
      { time: "03:30 PM", title: "Collaborative Policy Roundtables", speaker: "All Attendees" }
    ],
    ticketTiers: [
      { id: "eco-free", name: "Free Admission Pass", price: 0, perks: ["Full Access to Panels & Labs", "Sustainable Lunch Included", "Digital Carbon-Neutral Certificate"] }
    ]
  }
];
