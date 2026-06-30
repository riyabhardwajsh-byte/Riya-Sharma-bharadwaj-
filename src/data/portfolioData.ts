import { TimelineItem, BlogPost, SocialLink, SkillCategory, PRFeature } from "../types";

export const personalInfo = {
  name: "Riya Sharma Bharadwaj",
  fullName: "Riya Sharma Bharadwaj",
  tagline: "10th-grade innovator, researcher, and developer building technical solutions for global challenges.",
  bio: "I am a 10th-grade developer and researcher passionate about computer science, math, high-performance app development, and robotics. I focus on building advanced software systems, modeling telemetry pipelines, and designing intelligent robotic systems. Rooted in continuous learning and real-world impact, I strive to merge mathematical precision with modern predictive engineering.",
  email: "riyabhardwaj.sh@gmail.com",
};

/**
 * ACHIEVEMENTS & MILESTONES DATABANK
 * How to add a new achievement:
 * Simply append a new object to the array below following this structure:
 * 
 * {
 *   id: "unique-string-identifier",
 *   year: "Year of achievement (e.g., 2026)",
 *   title: "Name/Title of your new accomplishment",
 *   description: "A short, sophisticated narrative explaining what you built, solved, or published.",
 *   badges: [
 *     { label: "Organization/Medium Banner", link: "Optional link for the badge itself" },
 *     { label: "Another Badge Label" }
 *   ],
 *   mainLink: "Optional main action Link (e.g., website, github, paper, article)",
 *   linkLabel: "Optional display text for the main action link (e.g., 'View Research', 'Launch App')"
 * },
 * 
 * Be sure to preserve the comma separated sequence. Your changes will automatically hot-render 
 * into the interactive timeline without modifying any of the layout or CSS components!
 */
export const timelineAchievements: TimelineItem[] = [
  /* 
  {
    id: "template-id-for-future-use",
    year: "2026",
    title: "Your New Achievement",
    description: "Brief description of what you did.",
    badges: [
      { label: "Badge Label 1", link: "#" },
      { label: "Badge Label 2" }
    ],
    mainLink: "#",
    linkLabel: "Action Label"
  },
  */
  {
    id: "published-research-paper",
    year: "2026",
    title: "Unsupervised Anomaly Detection in High-Dimensional Vehicle Telemetry: A Predictive Maintenance Framework for Fleet Operations Utilizing Isolation Forests and Time-Series Analysis",
    description: "Developed and published an unsupervised predictive maintenance framework. The paper leverages Isolation Forests and temporal data pipelines to detect anomalous fleet operations in real-time across high-dimensional sensor telemetry datasets.",
    badges: [
      { 
        label: "Zenodo Repository", 
        link: "https://zenodo.org/records/18594933?token=eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImY1ODZiYTgyLWMxMzUtNGRmZi1hYTc4LTQwYTI2MTIxNDY1MyIsImRhdGEiOnt9LCJyYW5kb20iOiJlZTY5NmI3NjAzMjkwNTRmNmE5NDViMjNlZjc2MjNkYiJ9.DapwOe7j7hnVeolXApLnqMy1DxKt9sNjORHlb5ns5rPRDMgsHZTLQ_gj9xPcswx--16GXDGuVOM3VYRRg17Zsg" 
      },
      { 
        label: "Harvard Dataverse", 
        link: "https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/IHL9BT" 
      }
    ],
    mainLink: "https://zenodo.org/records/18594933?token=eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImY1ODZiYTgyLWMxMzUtNGRmZi1hYTc4LTQwYTI2MTIxNDY1MyIsImRhdGEiOnt9LCJyYW5kb20iOiJlZTY5NmI3NjAzMjkwNTRmNmE5NDViMjNlZjc2MjNkYiJ9.DapwOe7j7hnVeolXApLnqMy1DxKt9sNjORHlb5ns5rPRDMgsHZTLQ_gj9xPcswx--16GXDGuVOM3VYRRg17Zsg",
    linkLabel: "View Research on Zenodo"
  },
  {
    id: "aquasave-app",
    year: "2026",
    title: "AquaSave (Water Conservation App)",
    description: "Designed, engineered, and shipped an interactive water conservation suite featuring high-fidelity local tracking, custom optimization algorithms, and intuitive dynamic metrics.",
    badges: [
      { 
        label: "Featured in The New Indian Herald" 
      }
    ],
    mainLink: "https://aquasave-971097572615.asia-southeast1.run.app",
    linkLabel: "Launch AquaSave Web App"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "building-aquasave-10th-grader-water-scarcity",
    title: "Building AquaSave: How a 10th Grader Is Solving Water Scarcity with Code | By Riya Sharma Bharadwaj",
    excerpt: "Building AquaSave: How a 10th Grader Turned Lines of Code into Real-World Water Conservation.",
    date: "June 05, 2026",
    readTime: "6 min read",
    link: "https://medium.com/@riyabhardwaj.sh/building-aquasave-how-a-10th-grader-is-solving-water-scarcity-with-code-by-riya-sharma-bharadwaj-8aebdea14590"
  }
];

// Fully compatible list mapping social handles dynamically
export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/riya-sharma-bharadwaj-451b783a6/",
    iconName: "Linkedin"
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/RiyaSharmasmh6",
    iconName: "Twitter"
  },
  {
    name: "Dev.to",
    url: "https://dev.to/riya_sharma_b40725b0d4d9e",
    iconName: "Code"
  },
  {
    name: "Crunchbase",
    url: "https://www.crunchbase.com/account",
    iconName: "TrendingUp"
  },
  {
    name: "Pinterest",
    url: "https://in.pinterest.com/riyasharmabhardwajsh/",
    iconName: "Bookmark"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/riyasharmabhardwaj.sh/",
    iconName: "Instagram"
  },
  {
    name: "Facebook Profile",
    url: "https://www.facebook.com/profile.php?id=61590822350775&sk=about",
    iconName: "Facebook"
  },
  {
    name: "Facebook Page",
    url: "https://www.facebook.com/profile.php?id=61590613469768",
    iconName: "Facebook"
  },
  {
    name: "About.me",
    url: "https://about.me/riyasharmabharadwaj",
    iconName: "User"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    iconName: "Code",
    skills: [
      "Python (Data Science, Scikit-Learn, Isolation Forests)",
      "TypeScript / JavaScript (React, Node.js, ESM/CJS)",
      "C++ (Hardware Integration, Embedded Systems)",
      "SQL (PostgreSQL, Structured Relational Queries)",
      "HTML5 & Tailwind CSS (Responsive Design, Custom Themes)"
    ]
  },
  {
    category: "Software & Systems",
    iconName: "Cpu",
    skills: [
      "Git & GitHub Version Control (CI/CD Pipelines)",
      "Docker & Container Deployments (Cloud Run Ecosystems)",
      "Express.js Backend Systems (Vite Middleware Integration)",
      "Telemetry & Sensor Streams (Real-Time Telemetry Mapping)",
      "Arduino & Raspberry Pi Hardware Architecture",
      "Jupyter Notebook Environments & Predictive Modeling"
    ]
  },
  {
    category: "Design & Modeling Tools",
    iconName: "PenTool",
    skills: [
      "Figma (High-Fidelity UI/UX & Interaction Design)",
      "Fusion 360 / AutoCAD (Mechanical Hardware Design)",
      "LaTeX (Typesetting Complex Academic manuscripts)",
      "MATLAB / Numerical Computation & Time-Series Graphs",
      "D3.js & Recharts (Advanced Data Graphics)",
      "Vector Graphics & SVG Illustration"
    ]
  },
  {
    category: "Soft Skills & Leadership",
    iconName: "Award",
    skills: [
      "Scientific & Empirical Research Writing",
      "Interdisciplinary Presentation & Public Speaking",
      "Critical Problem Solving & Algorithm Engineering",
      "Collaborative Teamwork & Multi-User Ideation",
      "Environmental Resource Optimization & Analysis",
      "Productive Time-Management & Academic Rigor"
    ]
  }
];

export const prFeatures: PRFeature[] = [
  {
    id: "pr-rvrising",
    publication: "RV Rising",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://rvrising.com/blogs/uncategorized/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa/",
    date: "June 2026",
    excerpt: "Exploring how water conservation can be supercharged through smart client-side caching, local storage state loops, and predictive telemetry algorithms designed for web apps."
  },
  {
    id: "pr-attentionpedia",
    publication: "Attention Pedia",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.attentionpedia.com/agency-news/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "An in-depth look at Riya's design philosophy, leveraging lightweight Web Manifests and Service Workers to combat global resource scarcities."
  },
  {
    id: "pr-newsvachan",
    publication: "News Vachan",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.newsvachan.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Featuring a high-performance interactive utility designed to democratize access to robust environmental tracking tools."
  },
  {
    id: "pr-enter10india",
    publication: "Enter10 India",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.enter10india.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Riya Sharma Bharadwaj details her journey merging environmental advocacy with elegant computer science paradigms in her progressive web application."
  },
  {
    id: "pr-attentionmumbai",
    publication: "Attention Mumbai",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.attentionmumbai.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Spotlighting Riya's advanced offline algorithms that allow reliable environmental telemetry tracking in remote or disconnected locations."
  },
  {
    id: "pr-newsportlive",
    publication: "News Port Live",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.newsportlive.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Highlights how a high-schooler bridges academic research with actual physical web tools for everyday community empowerment."
  },
  {
    id: "pr-filmyapa",
    publication: "Filmyapa",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.filmyapa.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Celebrating the creative union of design aesthetic and technical accuracy to engage modern users in ecological protection."
  },
  {
    id: "pr-deshduniyatimes",
    publication: "Desh Duniya Times",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.deshduniyatimes.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "A deep profile on Riya's technical execution of the AquaSave water tracker, showcasing a major leap for modern offline-capable tools."
  },
  {
    id: "pr-forbesofindia",
    publication: "Forbes of India",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.forbesofindia.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Reviewing the socioeconomic and computational impact of Riya's conservation framework on scalable digital models."
  },
  {
    id: "pr-firstlooktimes",
    publication: "First Look Times",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.firstlooktimes.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "A premier showcase of Riya's progressive web application architecture, with detailed metrics on user engagement and impact."
  },
  {
    id: "pr-startup24live",
    publication: "Startup 24 Live",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.startup24live.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Exploring the development process, user experience maps, and long-term vision of a promising young technical founder."
  },
  {
    id: "pr-filmychakkar",
    publication: "Filmy Chakkar",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.filmychakkar.com/agency-wire/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Highlighting how next-generation developers are rewriting the scripts of digital responsibility and resource management."
  },
  {
    id: "pr-zeenewsworld",
    publication: "Zee News World",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.zeenewsworld.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Broadcasting Riya Sharma Bharadwaj's pioneering water conservation algorithms to a global audience."
  },
  {
    id: "pr-attentionworlds",
    publication: "Attention Worlds",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.attentionworlds.com/agency-news/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Highlighting the universal design structure that allows users across multiple territories to set custom goals."
  },
  {
    id: "pr-startupbabu",
    publication: "Startup Babu",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://www.startupbabu.in/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "An deep-dive interface walkthrough showing how simple user behaviors are translated to concrete metrics of resource saving."
  },
  {
    id: "pr-attentionindia",
    publication: "Attention India",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://attentionindia.com/press-release/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Covering the official release and community deployment of Riya's groundbreaking resource management system."
  },
  {
    id: "pr-instastory",
    publication: "Insta Story",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://instastory.in/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Exploring the visual components and micro-interactions that make environmental tracking intuitive for all age groups."
  },
  {
    id: "pr-btvindia",
    publication: "BTV India",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "http://btvindia.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "BTV India profiles Riya's technical execution, focusing on the dynamic chart components built with state-of-the-art web technology."
  },
  {
    id: "pr-jaipurbytes",
    publication: "Jaipur Bytes",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://jaipurbytes.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Spotlighting the local impact and regional relevance of smarter resource management strategies in hyper-local contexts."
  },
  {
    id: "pr-ahmedabadbytes",
    publication: "Ahmedabad Bytes",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "https://ahmedabadbytes.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Discussing how regional telemetry data can assist municipal planning for robust urban sustainability."
  },
  {
    id: "pr-newsbglobal",
    publication: "NewsB Global",
    title: "From Code to Conservation: How Developer Riya Sharma Bharadwaj is Rewriting Resource Management with an Android PWA",
    url: "http://newsbglobal.com/from-code-to-conservation-how-developer-riya-sharma-bharadwaj-is-rewriting-resource-management-with-an-android-pwa",
    date: "June 2026",
    excerpt: "Synthesizing global perspectives on Riya's lightweight, ultra-optimized progressive web application designed for worldwide accessibility."
  }
];

