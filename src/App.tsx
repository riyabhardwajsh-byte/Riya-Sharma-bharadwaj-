/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { 
  Linkedin, 
  Twitter, 
  Code, 
  TrendingUp, 
  Bookmark, 
  Instagram, 
  Facebook, 
  Mail, 
  ArrowUpRight, 
  ExternalLink, 
  Sparkles, 
  Plus, 
  Copy, 
  Check, 
  Award, 
  FileText, 
  Layers, 
  Activity, 
  Settings, 
  Send,
  Zap,
  Droplet,
  Globe,
  Trash2,
  Lock,
  Eye,
  Terminal,
  Calendar,
  Users,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share2,
  Download,
  Cpu,
  PenTool,
  User,
  Newspaper
} from "lucide-react";
import { personalInfo, timelineAchievements, blogPosts, socialLinks, skillCategories, prFeatures } from "./data/portfolioData";
import { TimelineItem, BlogPost, SkillCategory, PRFeature } from "./types";
import logoImg from "./logo.png";
import profileImg from "./assets/images/riya_profile.jpg";
import aquasaveGlimpse1 from "./assets/images/aquasave_glimpse.png";
import aquasaveGlimpse2 from "./assets/images/aquasave_glimpse_2.jpg";
import researchGlimpse1 from "./assets/images/research_glimpse.jpg";
import researchGlimpse2 from "./assets/images/research_glimpse_v2.jpg";

// Helper component to map icon names string from database into clean monochrome Lucide Icons
function SocialIcon({ name, className }: { name: string; className?: string }) {
  const cn = className || "w-4 h-4";
  switch (name) {
    case "Linkedin": return <Linkedin className={cn} />;
    case "Twitter": return <Twitter className={cn} />;
    case "Code": return <Code className={cn} />;
    case "TrendingUp": return <TrendingUp className={cn} />;
    case "Bookmark": return <Bookmark className={cn} />;
    case "Instagram": return <Instagram className={cn} />;
    case "Facebook": return <Facebook className={cn} />;
    default: return <ExternalLink className={cn} />;
  }
}

// Helper component to map category icon names into Lucide Icon components
function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const cn = className || "w-4 h-4";
  switch (name) {
    case "Code": return <Code className={cn} />;
    case "Cpu": return <Cpu className={cn} />;
    case "PenTool": return <PenTool className={cn} />;
    case "Award": return <Award className={cn} />;
    default: return <Code className={cn} />;
  }
}

export default function App() {
  // Scroll Progress Setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Real-time Traffic Telemetry (Authentic and Live)
  const [totalVisitors, setTotalVisitors] = useState<number>(1);
  const [activeUsersNow, setActiveUsersNow] = useState<number>(0);
  const [isFetchingTraffic, setIsFetchingTraffic] = useState<boolean>(false);
  const [trafficReport, setTrafficReport] = useState<{
    regions: { name: string; percentage: number; latency: number }[];
    devices: { name: string; percentage: number }[];
    fetchedAt: string;
  } | null>(null);
  const [fetchingStep, setFetchingStep] = useState<string>("");
  const [isPaperZoomed, setIsPaperZoomed] = useState<boolean>(false);
  const [activeResearchPage, setActiveResearchPage] = useState<number>(0);
  const [isAquaSaveZoomed, setIsAquaSaveZoomed] = useState<boolean>(false);
  const [activeAquaSavePage, setActiveAquaSavePage] = useState<number>(0);

  React.useEffect(() => {
    // 1. Resolve Unique Visitor Identity
    let visitorId = sessionStorage.getItem("vs_session_visitor_id");
    if (!visitorId) {
      visitorId = "visitor_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      sessionStorage.setItem("vs_session_visitor_id", visitorId);
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    // 2. Pulse telemetry registration and fetch stats
    const sendPulseAndStat = async () => {
      try {
        await fetch("/api/telemetry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, timezone })
        });
        
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setTotalVisitors(data.totalCount);
          setActiveUsersNow(data.activeCount);
          setTrafficReport((prev) => {
            if (!prev) return null;
            return {
              regions: data.regions,
              devices: data.devices,
              fetchedAt: new Date().toLocaleTimeString()
            };
          });
        }
      } catch (err) {
        console.warn("Telemetry offline:", err);
      }
    };

    // Run immediately and then poll every 8 seconds to track active presence
    sendPulseAndStat();
    const interval = setInterval(sendPulseAndStat, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleFetchTraffic = async () => {
    if (isFetchingTraffic) return;
    setIsFetchingTraffic(true);
    setFetchingStep("Establishing telemetry link...");

    // Smooth visual transitions matching full-system state synching
    await new Promise((resolve) => setTimeout(resolve, 400));
    setFetchingStep("Reading regional DNS streams...");
    await new Promise((resolve) => setTimeout(resolve, 400));
    setFetchingStep("Analyzing visitor nodes...");
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setTotalVisitors(data.totalCount);
        setActiveUsersNow(data.activeCount);
        setTrafficReport({
          regions: data.regions,
          devices: data.devices,
          fetchedAt: new Date().toLocaleTimeString()
        });
      }
    } catch (err) {
      console.error("Traffic telemetry download error:", err);
    } finally {
      setIsFetchingTraffic(false);
      setFetchingStep("");
    }
  };

  // Main states
  const [achievements, setAchievements] = useState<TimelineItem[]>(timelineAchievements);
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  const [schemaType, setSchemaType] = useState<"achievement" | "blog">("achievement");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Interactive Simulator for AquaSave State
  const [householdSize, setHouseholdSize] = useState<number>(3);
  const [showerMinutes, setShowerMinutes] = useState<number>(8);
  const [wateringDays, setWateringDays] = useState<number>(3);
  const [kitchenLiters, setKitchenLiters] = useState<number>(15);

  // Dynamic Contact Form State
  const [contactSubject, setContactSubject] = useState<string>("General Collaboration");
  const [contactName, setContactName] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [mailCopied, setMailCopied] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Active Research parameters viewer interactive index
  const [activeParam, setActiveParam] = useState<string>("iForest");

  // Schema Generator & Achievement Live Adder State
  const [schemaTitle, setSchemaTitle] = useState<string>("");
  const [schemaYear, setSchemaYear] = useState<string>("2026");
  const [schemaDesc, setSchemaDesc] = useState<string>("");
  const [schemaBadges, setSchemaBadges] = useState<string>("Zenodo, Peer Approved");
  const [schemaLink, setSchemaLink] = useState<string>("");
  const [schemaLinkLabel, setSchemaLinkLabel] = useState<string>("View Repository");
  const [showGenerator, setShowGenerator] = useState<boolean>(false);
  const [adminNotification, setAdminNotification] = useState<string | null>(null);

  // States for Share Portfolio & Downloading PDF/TXT Resume
  const [showShareDropdown, setShowShareDropdown] = useState<boolean>(false);
  const [showMobileShare, setShowMobileShare] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [showAllPR, setShowAllPR] = useState<boolean>(false);

  // States for Developer Creator Panel Locks
  const [isAuthorizedCreator, setIsAuthorizedCreator] = useState<boolean>(() => {
    try {
      return localStorage.getItem("riya_portfolio_authorized") === "true";
    } catch {
      return false;
    }
  });
  const [creatorPasscode, setCreatorPasscode] = useState<string>("");
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [showPasscodeField, setShowPasscodeField] = useState<boolean>(false);

  // Filtered and chronologically sorted achievements
  const sortedAndFilteredAchievements = useMemo(() => {
    let list = [...achievements];
    if (activeFilter === "Research") {
      list = list.filter(item => 
        item.title.toLowerCase().includes("research") || 
        item.description.toLowerCase().includes("research") ||
        item.badges.some(b => b.label.toLowerCase().includes("zenodo") || b.label.toLowerCase().includes("dataverse"))
      );
    } else if (activeFilter === "Development") {
      list = list.filter(item => 
        item.title.toLowerCase().includes("app") || 
        item.title.toLowerCase().includes("tech") ||
        item.description.toLowerCase().includes("app") || 
        item.description.toLowerCase().includes("code") ||
        item.badges.some(b => b.label.toLowerCase().includes("herald") || b.label.toLowerCase().includes("milestone"))
      );
    }
    // Sort descending by Year
    return list.sort((a, b) => b.year.localeCompare(a.year));
  }, [achievements, activeFilter]);

  // AquaSave Savings calculations
  const aquaSaveMetrics = useMemo(() => {
    // Standard baseline consumption estimates
    const showerFlowRate = 9.5; // Liters per minute standard
    const efficientFlowRate = 6.0; // Efficient flow rate
    const baselineWateringLiters = 300; // Average garden watering litres

    const dailyShowerSavings = householdSize * (showerMinutes * (showerFlowRate - efficientFlowRate));
    const weeklyWateringSavings = wateringDays * baselineWateringLiters * 0.45; // 45% savings with local optimizer
    const kitchenSavings = kitchenLiters * 0.35; // 35% smart reuse

    const totalLitersSavedMonthly = Math.round((dailyShowerSavings * 30.4) + (weeklyWateringSavings * 4.34) + (kitchenSavings * 30.4));
    const carbonOffsetKg = Math.round((totalLitersSavedMonthly * 0.0035)); // Energy saved heating water (0.0035 KG CO2 per liter hot water reduction factor)
    
    // Quality scoring
    let conservationTier = "Novice Guardian";
    let scoreStyles = "text-amber-400 border-amber-900/30 bg-amber-950/20";
    if (totalLitersSavedMonthly > 4000) {
      conservationTier = "Hydro Champion";
      scoreStyles = "text-emerald-400 border-emerald-900/30 bg-emerald-950/20";
    } else if (totalLitersSavedMonthly > 1500) {
      conservationTier = "Ecotech Scholar";
      scoreStyles = "text-teal-400 border-teal-900/30 bg-teal-950/20";
    }

    return {
      monthlySaved: totalLitersSavedMonthly.toLocaleString(),
      carbonOffset: carbonOffsetKg,
      tier: conservationTier,
      styles: scoreStyles
    };
  }, [householdSize, showerMinutes, wateringDays, kitchenLiters]);

  // Handle copying portfolio link
  const handleCopyPortfolioLink = () => {
    const siteUrl = window.location.href.split('#')[0];
    navigator.clipboard.writeText(siteUrl).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy url: ", err);
    });
  };

  // Handle building CV/Resume & downloading client-side file
  const handleDownloadResume = () => {
    const textContent = `================================================================================
RIYA SHARMA BHARADWAJ — ECOLOGICAL TECHNOLOGY ENGINEER & COMPUTATIONAL RESEARCHER
================================================================================

About Riya:
10th-grade Student • EcoTech Builder • Author
Riya fuses mathematics, computation, and hardware to engineer high-impact
solutions for ecological challenges. She designed AquaSave to model municipal water
behaviors and authored advanced predictive maintenance analysis architectures.

--------------------------------------------------------------------------------
CORE METRICS & PROFILE DATA
--------------------------------------------------------------------------------
Github: https://github.com/riya
Zenodo: https://zenodo.org/records/18594933
Harvard Dataverse persistent ID: doi:10.7910/DVN/IHL9BT
Email Contact: riyabhardwaj.sh@gmail.com

--------------------------------------------------------------------------------
FEATURED APPLICATIONS & PLATFORMS
--------------------------------------------------------------------------------
- AquaSave (Water Conservation Web Application)
  Pragmatic computational modeling of municipal water waste for micro-grid tracking.
  Featured in: The New Indian Herald
  URL: https://aquasave-971097572615.asia-southeast1.run.app

--------------------------------------------------------------------------------
PUBLISHED RESEARCH SHEETS
--------------------------------------------------------------------------------
- High-Dimensional Sensor Stream Predictive Maintenance in Fleet Management
  A robust cyber-physical hardware system deploying Isolation Forests and autoencoders
  to detect anomaly bounds in industrial telemetry.
  Data Citation DOI: 10.7910/DVN/IHL9BT

--------------------------------------------------------------------------------
PROFESSIONAL SKILLS & AREA PROFICIENCIES
--------------------------------------------------------------------------------
${skillCategories.map((cat) => `* ${cat.category}:\n  ↳ ${cat.skills.join("\n  ↳ ")}`).join("\n\n")}

--------------------------------------------------------------------------------
TIMELINE OF SCHOLASTIC MILESTONES & ACHIEVEMENTS
--------------------------------------------------------------------------------
${achievements.map((item) => `[${item.year}] ${item.title}\n  ${item.description || "Milestone achieved successfully."}`).join("\n\n")}

--------------------------------------------------------------------------------
LATEST DEV & DESIGN NOTES
--------------------------------------------------------------------------------
${posts.map((post) => `[BLOG] ${post.title} (${post.date})\n  ${post.excerpt}`).join("\n\n")}

================================================================================
Generated seamlessly from Riya's Living Portfolio. Visit: ${window.location.host || "riya-portfolio.app"}
================================================================================`;

    const blob = new Blob([textContent.trim()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Riya_Sharma_Bharadwaj_Portfolio_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle unlocking Dev Creator Panel
  const handleUnlockCreatorPanel = (e: FormEvent) => {
    e.preventDefault();
    const cleanPass = creatorPasscode.trim().toLowerCase();
    if (cleanPass === "11166r" || cleanPass === "11166r" || cleanPass === "riyabhardwaj.sh@gmail.com" || cleanPass === "riya") {
      setIsAuthorizedCreator(true);
      try {
        localStorage.setItem("riya_portfolio_authorized", "true");
      } catch (err) {
        console.error("Local storage error:", err);
      }
      setShowGenerator(true);
      setShowPasscodeField(false);
      setCreatorPasscode("");
      setPasscodeError(null);
    } else {
      setPasscodeError("AUTHENTICATION_FAILED: ACCESS REJECTED");
    }
  };

  // Handle live adding achievement from Creator Panel
  const handleAddLiveAchievement = (e: FormEvent) => {
    e.preventDefault();
    if (!schemaTitle || !schemaDesc) {
      alert("Please provide at least a title and a description to generate.");
      return;
    }

    if (schemaType === "achievement") {
      const badgeArray = schemaBadges
        .split(",")
        .map(b => b.trim())
        .filter(Boolean)
        .map(lbl => ({ label: lbl }));

      const newAchievement: TimelineItem = {
        id: `custom-achievement-${Date.now()}`,
        year: schemaYear,
        title: schemaTitle,
        description: schemaDesc,
        badges: badgeArray,
        mainLink: schemaLink || undefined,
        linkLabel: schemaLinkLabel || undefined
      };

      setAchievements(prev => [newAchievement, ...prev]);
      triggerAdminNotice("Achievement successfully injected into live timeline! Scroll up or filter to inspect.");
    } else {
      const newPost: BlogPost = {
        id: `custom-post-${Date.now()}`,
        title: schemaTitle,
        excerpt: schemaDesc,
        date: schemaYear,
        readTime: schemaBadges,
        link: schemaLink || "https://medium.com"
      };

      setPosts(prev => [newPost, ...prev]);
      triggerAdminNotice("Blog article successfully injected into live writing list! Scroll down to inspect.");
    }
    
    // Optional reset fields
    setSchemaTitle("");
    setSchemaDesc("");
  };

  const triggerAdminNotice = (msg: string) => {
    setAdminNotification(msg);
    setTimeout(() => {
      setAdminNotification(null);
    }, 4500);
  };

  // Dynamic code generation string for easy pasting
  const generatedJSONString = useMemo(() => {
    if (schemaType === "achievement") {
      const formattedBadges = schemaBadges
        .split(",")
        .map(b => `      { label: "${b.trim()}" }`)
        .join(",\n");

      return `  {
    id: "achievement-${schemaTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}",
    year: "${schemaYear}",
    title: "${schemaTitle || "Your Achievement Title"}",
    description: "${schemaDesc || "Your Achievement Narrative."}",
    badges: [\n${formattedBadges || '      { label: "High School Scholar" }'}\n    ],${schemaLink ? `\n    mainLink: "${schemaLink}",` : ""}${schemaLinkLabel ? `\n    linkLabel: "${schemaLinkLabel}"` : ""}
  },`;
    } else {
      return `  {
    id: "blog-${schemaTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-")}",
    title: "${schemaTitle || "Your Blog Title"}",
    excerpt: "${schemaDesc || "Your Blog Excerpt text."}",
    date: "${schemaYear || "June 05, 2026"}",
    readTime: "${schemaBadges || "6 min read"}",
    link: "${schemaLink || "https://medium.com"}"
  },`;
    }
  }, [schemaType, schemaTitle, schemaYear, schemaDesc, schemaBadges, schemaLink, schemaLinkLabel]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Pre-compiled Mail draft logic
  const handleMailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;

    const emailSubject = `[Portfolio Inquiry] ${contactSubject} - from ${contactName}`;
    const emailBody = `Hi Riya,\n\n${contactMessage}\n\nBest regards,\n${contactName}`;
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  const copyEmailDirect = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setMailCopied(true);
    setTimeout(() => setMailCopied(false), 2000);
  };

  // High-Dimensional Predictive Maintenance Telemetry Parameters
  const telemetryParams = {
    iForest: {
      name: "Isolation Forest Contamination",
      value: "Contamination (η) = 0.045",
      analysis: "Isolation Forest anomaly scoring optimized with a hyperparameter grid search. It effectively segregates anomalous multidimensional sensor vectors without prior label mapping.",
    },
    Timeseries: {
      name: "Temporal Drift Factor",
      value: "Drift threshold = 1.62 σ",
      analysis: "Sliding temporal windows capture engine temperature, load dynamics, and crankshaft vibration anomalies with precise trend seasonality decomposition.",
    },
    HighDim: {
      name: "Dimensionality Compression Coefficient",
      value: "Variance Retained = 94.2%",
      analysis: "Telemetry feature arrays compressed from 48 continuous channels using advanced principal component mapping to reduce the onboard diagnostic computational footprint.",
    },
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-neutral-200 selection:text-black antialiased relative pb-24 lg:pb-0">
      
      {/* Decorative ambient grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-0" 
        style={{
          backgroundImage: `radial-gradient(#262626 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Admin Notification Banner */}
      <AnimatePresence>
        {adminNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-700 text-neutral-100 px-6 py-3 rounded-full z-50 flex items-center gap-3 shadow-xl backdrop-blur-md text-xs font-mono"
            id="admin-notification"
          >
            <Terminal className="text-emerald-400 w-4 h-4 animate-pulse" />
            <span>{adminNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Panel */}
      <header className="sticky top-0 z-40 bg-black/65 backdrop-blur-md border-b border-neutral-900/90 transition-all">
        {/* Sleek dynamic top glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-500/10 via-purple-400/80 to-purple-500/10" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group relative" id="logo-link">
            <div className="relative w-9 h-9 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center overflow-hidden group-hover:border-purple-500 transition-all duration-300 shadow-inner">
               <img 
                src={logoImg} 
                alt="Riya Sharma Bharadwaj Logo" 
                className="w-full h-full object-cover relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-widest text-[11px] uppercase text-neutral-100 font-medium group-hover:text-purple-400 transition-colors">
                Riya Sharma Bharadwaj
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="font-mono text-[9px] text-neutral-500 group-hover:text-neutral-400 transition-colors tracking-wider leading-none">
                  Telemetry Node Active
                </span>
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex flex-wrap items-center justify-end gap-x-3.5 gap-y-2 lg:gap-8 text-xs font-mono text-neutral-400">
            <a href="#about" className="hover:text-white transition-colors relative py-1 group/item">
              <span>About</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-400 transition-all group-hover/item:w-full" />
            </a>

            <a href="#journey" className="hover:text-white transition-colors relative py-1 group/item">
              <span>Journey</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-400 transition-all group-hover/item:w-full" />
            </a>
            <a href="#projects" className="hover:text-white transition-colors relative py-1 group/item">
              <span>AquaSave</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-400 transition-all group-hover/item:w-full" />
            </a>
            <a href="#research" className="hover:text-white transition-colors relative py-1 group/item">
              <span>Research</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-400 transition-all group-hover/item:w-full" />
            </a>
            <a href="#blog" className="hover:text-white transition-colors relative py-1 group/item">
              <span>Writing</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-400 transition-all group-hover/item:w-full" />
            </a>
            <a href="#press" className="hover:text-white transition-colors relative py-1 group/item">
              <span>Press</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-purple-400 transition-all group-hover/item:w-full" />
            </a>
            <div className="relative inline-block" id="share-save-container">
              <button 
                type="button"
                onClick={() => setShowShareDropdown(!showShareDropdown)}
                className="text-neutral-400 hover:text-purple-400 transition-all flex items-center gap-1 bg-neutral-900/40 hover:bg-neutral-900/90 px-2.5 py-1.5 rounded-md border border-neutral-800/80 hover:border-neutral-700/80 group"
                title="Share portfolio page or download resume document"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Share / Save</span>
                <ChevronDown className="w-3 h-3 text-neutral-550 group-hover:text-neutral-300 transition-colors" />
              </button>

              <AnimatePresence>
                {showShareDropdown && (
                  <>
                    {/* Invisible click backdrop to dismiss dropdown */}
                    <div 
                      className="fixed inset-0 z-40 bg-transparent" 
                      onClick={() => setShowShareDropdown(false)} 
                    />
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-lg bg-neutral-950 border border-neutral-900 shadow-xl py-2 z-50 text-left"
                    >
                      <div className="px-3 py-1.5 border-b border-neutral-900/80 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                        Portfolio Actions
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          handleCopyPortfolioLink();
                        }}
                        className="w-full text-left px-3.5 py-2 text-[11px] font-mono text-neutral-300 hover:text-white hover:bg-neutral-900/80 transition flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          {shareCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-purple-400" />
                          )}
                          <span>{shareCopied ? "Copied URL!" : "Copy Portfolio URL"}</span>
                        </span>
                        {shareCopied && (
                          <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded font-bold animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleDownloadResume();
                          setShowShareDropdown(false);
                        }}
                        className="w-full text-left px-3.5 py-2 text-[11px] font-mono text-neutral-300 hover:text-white hover:bg-neutral-900/80 transition flex items-center gap-2"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Download Portfolio (.TXT)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowShareDropdown(false);
                          setTimeout(() => window.print(), 150);
                        }}
                        className="w-full text-left px-3.5 py-2 text-[11px] font-mono text-neutral-300 hover:text-white hover:bg-neutral-900/80 transition flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-400" />
                        <span>Print Portfolio PDF Page</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <a 
              href="#schema-utility" 
              className="text-neutral-500 hover:text-purple-400 transition-all flex items-center gap-1.5 bg-neutral-900/40 hover:bg-neutral-900/90 px-2 py-1.5 rounded-md border border-neutral-800/80 hover:border-neutral-700/80 group/tool"
              title="Achievement Schema Live Tool"
            >
              <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden lg:inline text-[10px] tracking-wider uppercase font-semibold">compiler</span>
            </a>
            <a 
              href="#connect" 
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white transition-all hover:scale-[1.05] active:scale-[0.95] font-sans font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-md shadow-purple-950/20"
              id="header-contact-btn"
            >
              Connect
            </a>
          </nav>
        </div>
        
        {/* Scroll Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400 origin-left z-50 shadow-[0_1px_6px_rgba(168,85,247,0.4)]"
          style={{ scaleX }}
          id="scroll-progress-bar"
        />
      </header>

      {/* Main Content Sections with Staggered Load Transitions */}
      <main className="relative z-10" id="main-content">

        {/* Hero Section */}
        <motion.section 
          className="relative min-h-[75vh] flex items-center justify-center py-16 md:py-24" 
          id="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          
          {/* Animated decorative visual badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-full mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-400">
              10th-grade Student • EcoTech Builder • Author
            </span>
          </motion.div>

          {/* Master Name Header */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter text-white select-none leading-none mb-6"
            id="main-title"
          >
            Riya Sharma Bharadwaj
          </motion.h1>

          {/* Secondary Subtitle tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg md:text-2xl text-neutral-400 font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-10"
            id="hero-tagline"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Call to actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono"
          >
            <a 
              href="#journey" 
              className="w-full sm:w-auto px-8 py-3 bg-neutral-100 hover:bg-neutral-200 text-black rounded font-medium flex items-center justify-center gap-2 group transition-all"
              id="cta-timeline-btn"
            >
              Explore Timeline
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a 
              href="#research" 
              className="w-full sm:w-auto px-8 py-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded flex items-center justify-center gap-2 transition-all"
              id="cta-research-btn"
            >
              <FileText className="w-4 h-4 text-neutral-400" />
              Published Research
            </a>
          </motion.div>

        </div>
      </motion.section>

      {/* Section Divider Line */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <hr className="border-neutral-900" />
      </div>

      {/* About Me Section */}
      <motion.section 
        className="py-20 md:py-28" 
        id="about"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            
            {/* Visual element representing Riya Sharma Bharadwaj's professional portrait */}
            <div className="col-span-1 md:col-span-4 flex justify-center" id="about-image-container">
              <div className="relative group overflow-visible w-full max-w-[280px]">
                {/* Holographic corner tech brackets surrounding the main card */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-neutral-700 pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t border-r border-neutral-700 pointer-events-none" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b border-l border-neutral-700 pointer-events-none" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-neutral-700 pointer-events-none" />
                
                {/* Interactive premium shadow background glow */}
                <div className="absolute -inset-1.5 bg-gradient-to-b from-indigo-500/10 via-purple-500/0 sm:via-neutral-800/10 to-purple-500/10 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                
                {/* Main image bezel container */}
                <div className="relative aspect-[4/5] bg-neutral-950 border border-neutral-800/80 rounded-lg p-2.5 overflow-hidden shadow-2xl">
                  {/* Subtle Scanline pattern */}
                  <div className="absolute inset-x-0 h-[1px] bg-indigo-500/20 top-1/2 animate-pulse pointer-events-none" style={{ animationDuration: '3s' }} />
                  
                  {/* High quality portrait image frame */}
                  <div className="relative w-full h-full rounded border border-neutral-900 overflow-hidden bg-neutral-900 flex items-center justify-center">
                    <img 
                      id="riya-avatar-image"
                      src={profileImg} 
                      alt="Riya Sharma Bharadwaj" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.04] filter saturate-[1.02] contrast-[1.02]"
                    />
                    
                    {/* Shadow overlay gradient across portrait bottom for text contrast */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950/90 to-transparent pointer-events-none" />
                    
                    {/* Tiny watermark stamp */}
                    <div className="absolute top-2 left-2 text-[8px] font-mono tracking-widest text-neutral-400/80 bg-neutral-950/80 px-1.5 py-0.5 rounded border border-neutral-800/60 leading-none">
                      RSB // PORTRAIT
                    </div>
                  </div>
                </div>

                {/* Subtitle Telemetry Metadata stamp below the card */}
                <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-neutral-500 px-1">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>SECURE_ID: RSB-2026</span>
                  </span>
                  <span>VERIFIED_BIOMETRICS</span>
                </div>
              </div>
            </div>

            {/* About Narrative Text */}
            <div className="col-span-1 md:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">About the Innovator</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white leading-tight">
                Fusing mathematics, computation, and hardware to engineer high-impact solutions for ecological challenges.
              </h2>
              
              <p className="text-neutral-300 font-light text-base md:text-lg leading-relaxed">
                {personalInfo.bio}
              </p>

              {/* Minimal stats block */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-900">
                <div>
                  <div className="text-2xl font-display text-white font-medium">10th</div>
                  <div className="text-[11px] font-mono text-neutral-500 mt-1">Grade Level</div>
                </div>
                <div>
                  <div className="text-2xl font-display text-white font-medium">2+</div>
                  <div className="text-[11px] font-mono text-neutral-500 mt-1">Ecology Repositories</div>
                </div>
                <div>
                  <div className="text-2xl font-display text-white font-medium">100%</div>
                  <div className="text-[11px] font-mono text-neutral-500 mt-1">Open Source</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Section Divider Line */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <hr className="border-neutral-900" />
      </div>

      {/* Timeline Section */}
      <motion.section 
        className="py-20 md:py-28" 
        id="journey"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">Active Records</span>
              </div>
              <h2 className="text-4xl font-display font-medium text-white tracking-tight">The Journey So Far</h2>
              <p className="text-neutral-400 text-sm font-light">Interactive chronological directory of peer publications, applications, and environmental achievements.</p>
            </div>

            {/* Micro Filter Actions */}
            <div className="flex items-center gap-2 p-1 bg-neutral-950 border border-neutral-900 rounded font-mono text-xs text-neutral-400">
              {["All", "Research", "Development"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded transition-all capitalize ${activeFilter === filter ? "bg-neutral-900 text-white font-medium" : "hover:text-white"}`}
                  id={`filter-btn-${filter.toLowerCase()}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Node Chain */}
          <div className="relative border-l border-neutral-900 pl-6 md:pl-10 space-y-12 py-4">
            
            <AnimatePresence mode="popLayout">
              {sortedAndFilteredAchievements.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="relative group"
                  id={`timeline-card-${item.id}`}
                >
                  {/* Circle locator connector */}
                  <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-neutral-800 group-hover:border-neutral-400 transition-colors flex items-center justify-center">
                    <div className="w-1 h-1 bg-black rounded-full" />
                  </div>

                  {/* Body component */}
                  <div className="bg-neutral-950/45 border border-neutral-900/80 p-6 rounded-lg hover:border-neutral-800 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold px-2 py-1 bg-neutral-900 text-neutral-300 rounded border border-neutral-800">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-display font-medium text-white group-hover:text-neutral-100 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-neutral-400 text-sm font-light leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Badge collection representing publishers */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {item.badges.map((badge, idx) => (
                        <div key={idx} className="inline-flex">
                          {badge.link ? (
                            <a
                              href={badge.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-neutral-500 transition-colors flex items-center gap-1 text-[11px] font-mono"
                              id={`badge-link-${item.id}-${idx}`}
                            >
                              <span>{badge.label}</span>
                              <ArrowUpRight className="w-2.5 h-2.5 opacity-50" />
                            </a>
                          ) : (
                            <span 
                              className="px-2.5 py-1 rounded bg-neutral-950 text-neutral-400 border border-neutral-900 text-[11px] font-mono select-none"
                              id={`badge-label-${item.id}-${idx}`}
                            >
                              {badge.label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Direct actions */}
                    {item.mainLink && (
                      <div className="pt-2 border-t border-neutral-900">
                        <a
                          href={item.mainLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white transition-colors group/link"
                          id={`main-link-${item.id}`}
                        >
                          <span className="underline decoration-neutral-800 group-hover/link:decoration-neutral-400 transition-colors underline-offset-4">
                            {item.linkLabel || "Launch Resource"}
                          </span>
                          <ExternalLink className="w-3 h-3 text-neutral-500 group-hover/link:text-white transition-colors" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {sortedAndFilteredAchievements.length === 0 && (
              <p className="text-neutral-500 font-mono text-xs text-center py-6">No matching records detected for current filter.</p>
            )}

          </div>
        </div>
      </motion.section>

      {/* Section Divider Line */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <hr className="border-neutral-900" />
      </div>

      {/* Interactive Project Widget: AquaSave Suite */}
      <motion.section 
        className="py-20 md:py-28" 
        id="projects"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            {/* Story description column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="font-mono text-xs tracking-widest uppercase text-teal-400">Custom Built Suite</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white leading-tight">
                AquaSave Water Conservation Suite
              </h2>
              
              <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                AquaSave was featured in **The New Indian Herald** for its pragmatic computational modeling of municipal water waste. It enables local micro-grid tracking of conservation behaviors.
              </p>

              {/* AquaSave Project Interface Capture */}
              <div className="pt-2">
                <div className="relative group overflow-hidden bg-neutral-950 border border-neutral-900 rounded-lg p-3.5 shadow-2xl transition-all duration-300 hover:border-neutral-800/80">
                  {/* Decorative Tech Corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-700" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-700" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-700" />

                  {/* Header metadata label inside the card */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 mb-2 px-0.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-teal-400 animate-ping" />
                      <span className="text-teal-400 font-semibold uppercase">INTERFACE_PREVIEW</span>
                    </span>
                    <span>COCONUT_SHELL_MODEL // AQUASAVE_V1</span>
                  </div>

                  {/* Header page selector tab controls to toggle between the snapshots */}
                  <div className="flex items-center gap-1.5 mb-3 px-0.5 mt-1">
                    <button 
                      type="button"
                      onClick={() => setActiveAquaSavePage(0)}
                      className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded transition-all duration-300 ${
                        activeAquaSavePage === 0 
                          ? "bg-teal-400 text-neutral-950 border border-teal-400 font-semibold shadow-md" 
                          : "bg-neutral-900/60 text-neutral-400 border border-neutral-800/40 hover:text-white hover:bg-neutral-850"
                      }`}
                    >
                      01 // DASHBOARD VIEW
                    </button>
                    <button 
                      type="button"
                      onClick={() => setActiveAquaSavePage(1)}
                      className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded transition-all duration-300 ${
                        activeAquaSavePage === 1 
                          ? "bg-teal-400 text-neutral-950 border border-teal-400 font-semibold shadow-md" 
                          : "bg-neutral-900/60 text-neutral-400 border border-neutral-800/40 hover:text-white hover:bg-neutral-850"
                      }`}
                    >
                      02 // ANALYTIC BLUEPRINT
                    </button>
                  </div>

                  {/* Image bezel frame with interactive scale / expand toggle */}
                  <div 
                    onClick={() => setIsAquaSaveZoomed(!isAquaSaveZoomed)}
                    className={`relative cursor-zoom-in transition-all duration-500 ease-in-out w-full rounded border border-neutral-900 bg-neutral-900/60 overflow-hidden group/bezel ${
                      isAquaSaveZoomed ? "aspect-[4/3] shadow-lg shadow-teal-500/5" : "aspect-[1.5/1]"
                    }`}
                    title="Click here to toggle zoom viewport"
                  >
                    {/* Sliding frame container with sliding indicator */}
                    <div className="relative w-full h-full">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeAquaSavePage}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          src={activeAquaSavePage === 0 ? aquasaveGlimpse1 : aquasaveGlimpse2}
                          alt={`AquaSave Glimpse ${activeAquaSavePage + 1}`}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full select-none ${
                            isAquaSaveZoomed ? "object-contain bg-neutral-950" : "object-cover object-top"
                          } transition-all duration-500 ease-out`}
                        />
                      </AnimatePresence>
                    </div>

                    {/* Left & Right navigation chevrons */}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAquaSavePage(prev => (prev === 0 ? 1 : 0));
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded bg-neutral-950/85 border border-neutral-850 text-neutral-400 hover:text-white hover:border-teal-500/80 transition duration-200"
                      title="Previous Slide"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAquaSavePage(prev => (prev === 0 ? 1 : 0));
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded bg-neutral-950/85 border border-neutral-855 text-neutral-400 hover:text-white hover:border-teal-500/80 transition duration-200"
                      title="Next Slide"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-neutral-950/95 via-neutral-950/30 to-transparent pointer-events-none z-10" />

                    {/* Interactive Zoom Overlay Badge */}
                    <div className="absolute top-2.5 right-2.5 bg-neutral-950/90 text-[8px] font-mono border border-neutral-800/80 text-neutral-300 px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1.5 transition-all group-hover/bezel:border-neutral-700/80 select-none z-20">
                      <Eye className="w-2.5 h-2.5 text-teal-400 animate-pulse" />
                      <span>{isAquaSaveZoomed ? "LANDSCAPE FOCUS" : "ZOOM SCREENSHOT"}</span>
                    </div>

                    {/* Centered slide indicator dots */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-neutral-950/80 px-2.5 py-1 rounded-full border border-neutral-850/30">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveAquaSavePage(0); }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeAquaSavePage === 0 ? "bg-teal-400 scale-125" : "bg-neutral-600 hover:bg-neutral-400"}`}
                        aria-label="Dashboard Slide"
                      />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveAquaSavePage(1); }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeAquaSavePage === 1 ? "bg-teal-400 scale-125" : "bg-neutral-600 hover:bg-neutral-400"}`}
                        aria-label="Analytic Slide"
                      />
                    </div>

                    {/* Image caption */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center pointer-events-none z-10">
                      <span className="text-[8px] font-mono tracking-wider text-neutral-200 bg-neutral-950/90 border border-neutral-800/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        {activeAquaSavePage === 0 ? "AquaSave Water Tracker Dashboard" : "Mathematical Analysis Blueprint"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neutral-950 border border-neutral-900/60 rounded space-y-3 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Globe className="w-3.5 h-3.5 text-teal-400" />
                  <span>Public Dev Build Available</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  The application is fully hosted online. You can access the actual live system using the secure action gateway.
                </p>
                <div className="pt-2">
                  <a
                    href="https://aquasave-971097572615.asia-southeast1.run.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-900 text-white border border-neutral-800 rounded hover:border-teal-500 transition-colors text-[11px]"
                    id="aquasave-btn-launch"
                  >
                    <span>Launch Live Web App</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Sandbox Simulator Frame */}
            <div className="lg:col-span-3 bg-neutral-950 border border-neutral-900 rounded-lg p-6 md:p-8 relative">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
                <Activity className="w-3 h-3 text-teal-400 animate-pulse" />
                <span>AquaSave Simulator v1.02</span>
              </div>

              <h3 className="text-sm font-mono tracking-widest uppercase text-neutral-400 mb-6 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-teal-400" />
                <span>Conservation Impact Calculator</span>
              </h3>

              {/* Slider Input Suite */}
              <div className="space-y-6 mb-8">
                {/* Shower Time slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Household Size</span>
                    <span className="text-white">{householdSize} Person(s)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={householdSize}
                    onChange={(e) => setHouseholdSize(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    id="slider-household-size"
                  />
                </div>

                {/* Shower Time slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Average Shower Time per Day</span>
                    <span className="text-white">{showerMinutes} Minutes</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    step="1"
                    value={showerMinutes}
                    onChange={(e) => setShowerMinutes(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    id="slider-shower-time"
                  />
                </div>

                {/* Lawn/Garden watering days */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Garden/Lawn Watering Days</span>
                    <span className="text-white">{wateringDays} Days / Week</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="7"
                    step="1"
                    value={wateringDays}
                    onChange={(e) => setWateringDays(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    id="slider-watering-days"
                  />
                </div>

                {/* Kitchen greywater volume reuse slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-400">Smart Eco-Water Reuse Intent</span>
                    <span className="text-white">{kitchenLiters} Liters / Day</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={kitchenLiters}
                    onChange={(e) => setKitchenLiters(Number(e.target.value))}
                    className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-teal-400"
                    id="slider-greywater-reuse"
                  />
                </div>
              </div>

              {/* Dynamic Readouts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-neutral-900">
                <div className="p-4 rounded border border-neutral-900 bg-neutral-950/40">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Est. Monthly Savings</div>
                  <div className="text-2xl font-display font-medium text-white tracking-tight mt-1 mb-1">
                    {aquaSaveMetrics.monthlySaved} <span className="text-xs text-neutral-400 font-mono">Liters</span>
                  </div>
                  <p className="text-[10px] text-teal-400 font-mono font-medium tracking-tight flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-teal-400 animate-ping" />
                    <span>Saved each and every month</span>
                  </p>
                </div>

                <div className="p-4 rounded border border-neutral-900 bg-neutral-950/40">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Carbon Equivalent Reduced</div>
                  <div className="text-2xl font-display font-medium text-white tracking-tight mt-1 mb-1">
                    {aquaSaveMetrics.carbonOffset} <span className="text-xs text-neutral-400 font-mono">KG CO₂</span>
                  </div>
                  <p className="text-[10px] text-teal-400 font-mono font-medium tracking-tight flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-teal-400 animate-ping" />
                    <span>Reduced each and every month</span>
                  </p>
                </div>
              </div>

              <div className={`mt-4 p-3 rounded-lg border text-center font-mono text-xs ${aquaSaveMetrics.styles}`} id="sandbox-result-badge">
                User Ecological Tier: <span className="font-bold uppercase tracking-wider">{aquaSaveMetrics.tier}</span>
              </div>

             </div>

          </div>
        </div>
      </motion.section>

      {/* Section Divider Line */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <hr className="border-neutral-900" />
      </div>

      {/* Environmental Research Section */}
      <motion.section 
        className="py-20 md:py-28" 
        id="research"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive Research viewer left */}
            <div className="lg:col-span-7 bg-neutral-950 border border-neutral-900/80 p-6 md:p-8 rounded-lg relative">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-neutral-100" />
                  <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">Parameter Database</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-600 bg-black px-2 py-0.5 rounded border border-neutral-900">
                  Zenodo DOI Linked
                </span>
              </div>

              <p className="text-xs font-mono text-neutral-400 mb-4 uppercase tracking-widest">
                Interactive Telemetry Parameter Index:
              </p>

              {/* Toggles */}
              <div className="flex border-b border-neutral-900 pb-3 mb-5 gap-3">
                {Object.keys(telemetryParams).map((key) => {
                  const param = telemetryParams[key as keyof typeof telemetryParams];
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveParam(key)}
                      className={`text-xs font-mono px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${activeParam === key ? "bg-neutral-900 text-white font-medium border border-neutral-800" : "text-neutral-500 hover:text-neutral-300"}`}
                      id={`param-tab-${key}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      <span>{key}</span>
                    </button>
                  );
                })}
              </div>

              {/* Focused parametric readout */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-display font-medium text-white">
                    {telemetryParams[activeParam as keyof typeof telemetryParams]?.name || "Parameter"}
                  </h4>
                  <span className="text-sm font-mono text-emerald-400 px-2 py-0.5 bg-neutral-900/60 border border-neutral-900 rounded">
                    {telemetryParams[activeParam as keyof typeof telemetryParams]?.value || "N/A"}
                  </span>
                </div>
                <p className="text-sm text-neutral-400 font-light leading-relaxed bg-neutral-900/20 p-4 border border-neutral-900 rounded">
                  {telemetryParams[activeParam as keyof typeof telemetryParams]?.analysis || "No analytical metrics compiled for this vector."}
                </p>
              </div>

              {/* Direct links list */}
              <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-neutral-500">Repository Archives:</span>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://zenodo.org/records/18594933?token=eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImY1ODZiYTgyLWMxMzUtNGRmZi1hYTc4LTQwYTI2MTIxNDY1MyIsImRhdGEiOnt9LCJyYW5kb20iOiJlZTY5NmI3NjAzMjkwNTRmNmE5NDViMjNlZjc2MjNkYiJ9.DapwOe7j7hnVeolXApLnqMy1DxKt9sNjORHlb5ns5rPRDMgsHZTLQ_gj9xPcswx--16GXDGuVOM3VYRRg17Zsg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800 rounded font-mono text-[10px] flex items-center gap-1.5 transition-colors"
                    id="research-link-zenodo"
                  >
                    <span>Zenodo Repository</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                  </a>
                  <a
                    href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/IHL9BT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800 rounded font-mono text-[10px] flex items-center gap-1.5 transition-colors"
                    id="research-link-harvard"
                  >
                    <span>Harvard Dataverse</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                  </a>
                </div>
              </div>
            </div>

            {/* Academic scope description right */}
            <div className="lg:col-span-5 lg:pl-4 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">Scientific Integrity</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white leading-tight">
                Peer Registered & Globally Archived Research
              </h2>
              
              <p className="text-neutral-400 font-light text-sm md:text-base leading-relaxed">
                Applying rigorous computational modeling directly to machine telemetry. My research explores unsupervised anomaly detection inside complex industrial diagnostics, providing fully documented mathematical foundations, reproducible models, and transparent simulation data hosted on standard scientific registries.
              </p>

              {/* Research Paper Preview & Glimpse Image Card */}
              <div className="pt-2">
                <div className="relative group overflow-hidden bg-neutral-950 border border-neutral-900 rounded-lg p-3.5 shadow-2xl transition-all duration-300 hover:border-neutral-800/80">
                  {/* Digital Grid Tech lines */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-700" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-700" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-700" />
                  
                  {/* Subtle layout header stamp inside the card */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 mb-2.5 px-0.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 animate-ping" />
                      <span className="text-neutral-400">RESEARCH_PAPER_PREVIEW</span>
                    </span>
                    <span>GLIMPSE // INDUSTRIAL_METRICS</span>
                  </div>
                  
                  {/* Header page selector tab controls to toggle between the snapshots */}
                  <div className="flex items-center gap-1.5 mb-3 px-0.5 mt-1">
                    <button 
                      type="button"
                      onClick={() => setActiveResearchPage(0)}
                      className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded transition-all duration-300 ${
                        activeResearchPage === 0 
                          ? "bg-neutral-100 text-neutral-950 border border-neutral-100 font-semibold shadow-md" 
                          : "bg-neutral-900/60 text-neutral-400 border border-neutral-800/40 hover:text-white hover:bg-neutral-850"
                      }`}
                    >
                      01 // TITLE HIGHLIGHT
                    </button>
                    <button 
                      type="button"
                      onClick={() => setActiveResearchPage(1)}
                      className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded transition-all duration-300 ${
                        activeResearchPage === 1 
                          ? "bg-neutral-100 text-neutral-950 border border-neutral-100 font-semibold shadow-md" 
                          : "bg-neutral-900/60 text-neutral-400 border border-neutral-800/40 hover:text-white hover:bg-neutral-850"
                      }`}
                    >
                      02 // TELEMETRY GLIMPSE
                    </button>
                  </div>
                  
                  {/* Inner bezel frame with dynamic toggleable height or aspect ratio mapping to document format */}
                  <div 
                    onClick={() => setIsPaperZoomed(!isPaperZoomed)}
                    className={`relative cursor-zoom-in transition-all duration-500 ease-in-out w-full rounded border border-neutral-900 bg-neutral-900/40 overflow-hidden group/bezel ${
                      isPaperZoomed ? "aspect-[3/4.25] shadow-lg shadow-indigo-500/5" : "aspect-[1.4/1]"
                    }`}
                    title="Click here to view full document page fit"
                  >
                    {/* Sliding frame container with sliding indicator */}
                    <div className="relative w-full h-full">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeResearchPage}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.3 }}
                          src={activeResearchPage === 0 ? researchGlimpse1 : researchGlimpse2}
                          alt={`Published Research Paper Glimpse ${activeResearchPage + 1}`}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full select-none ${
                            isPaperZoomed ? "object-contain bg-neutral-955" : "object-cover object-top"
                          } transition-all duration-500`}
                        />
                      </AnimatePresence>
                    </div>

                    {/* Left & Right navigation chevrons */}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveResearchPage(prev => (prev === 0 ? 1 : 0));
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded bg-neutral-950/85 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition duration-200"
                      title="Toggle Glimpse View"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveResearchPage(prev => (prev === 0 ? 1 : 0));
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded bg-neutral-950/85 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition duration-200"
                      title="Toggle Glimpse View"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Shadow overlay gradient across portrait bottom for text contrast */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-transparent pointer-events-none z-10" />
                    
                    {/* Interactive Zoom Overlay Badge */}
                    <div className="absolute top-2.5 right-2.5 bg-neutral-950/90 text-[8px] font-mono border border-neutral-800/80 text-neutral-305 px-2 py-1 rounded backdrop-blur-xs flex items-center gap-1.5 transition-all group-hover/bezel:border-neutral-700/80 select-none z-20">
                      <Eye className="w-2.5 h-2.5 text-indigo-400 animate-pulse" />
                      <span>{isPaperZoomed ? "LANDSCAPE FOCUS" : "ZOOM FULL DOCUMENT"}</span>
                    </div>

                    {/* Centered slide indicator dots */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-neutral-950/80 px-2.5 py-1 rounded-full border border-neutral-800/40">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveResearchPage(0); }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeResearchPage === 0 ? "bg-indigo-400 scale-125" : "bg-neutral-600 hover:bg-neutral-400"}`}
                        aria-label="Abstract Glimpse"
                      />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setActiveResearchPage(1); }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeResearchPage === 1 ? "bg-indigo-400 scale-125" : "bg-neutral-600 hover:bg-neutral-400"}`}
                        aria-label="Dataset Glimpse"
                      />
                    </div>

                    {/* Tiny floating labels inside the viewport */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center pointer-events-none z-10">
                      <span className="text-[8px] font-mono tracking-wider text-neutral-200 bg-neutral-950/90 border border-neutral-800/60 px-2 py-0.5 rounded backdrop-blur-xs">
                        {activeResearchPage === 0 ? "Predictive Maintenance Abstract" : "Industrial Machine Telemetry"}
                      </span>
                    </div>
                  </div>

                  {/* Elegant typography instruction block underneath */}
                  <div className="mt-3.5 px-0.5 text-xs text-neutral-400 leading-relaxed font-light">
                    For a full glance of the research paper, click the{" "}
                    <a 
                      href="https://zenodo.org/records/18594933?token=eyJhbGciOiJIUzUxMiJ9.eyJpZCI6ImY1ODZiYTgyLWMxMzUtNGRmZi1hYTc4LTQwYTI2MTIxNDY1MyIsImRhdGEiOnt9LCJyYW5kb20iOiJlZTY5NmI3NjAzMjkwNTRmNmE5NDViMjNlZjc2MjNkYiJ9.DapwOe7j7hnVeolXApLnqMy1DxKt9sNjORHlb5ns5rPRDMgsHZTLQ_gj9xPcswx--16GXDGuVOM3VYRRg17Zsg" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-indigo-300 underline underline-offset-2 transition-colors inline-flex items-center gap-0.5 font-medium"
                    >
                      Zenodo Repository <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>{" "}
                    or explore the data inside the{" "}
                    <a 
                      href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/IHL9BT" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-indigo-300 underline underline-offset-2 transition-colors inline-flex items-center gap-0.5 font-medium"
                    >
                      Harvard Dataverse <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>{" "}
                    scientific archive.
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-neutral-800 pl-4 py-1.5 text-xs font-mono text-neutral-500 italic leading-relaxed">
                "Industrial fleets shouldn't rely on reactive maintenance; high-dimensional sensor streams can tell us when and where machine components are on the verge of failure long before it happens."
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Section Divider Line */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <hr className="border-neutral-900" />
      </div>

      {/* Developer Schema Generator & Achievement Builder Utility */}
      <motion.section 
        className="py-20 md:py-28 bg-[#040404]" 
        id="schema-utility"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          
          <div className="p-1 max-w-sm mx-auto mb-6 bg-neutral-950 border border-neutral-900 rounded-full flex items-center justify-center">
            <button
              onClick={() => {
                if (isAuthorizedCreator) {
                  setShowGenerator(!showGenerator);
                } else {
                  setShowPasscodeField(!showPasscodeField);
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-2 hover:bg-neutral-900 rounded-full text-xs font-mono text-neutral-300 hover:text-white transition-all shadow-md group hover:border-neutral-700/50"
              id="toggle-creator-mode-btn"
            >
              {isAuthorizedCreator ? (
                <>
                  <Settings className={`w-3.5 h-3.5 transition-transform duration-500 ${showGenerator ? "rotate-90 text-emerald-400" : ""}`} />
                  <span>{showGenerator ? "Minimize Creator Mode" : "Activate Dev Creator Panel"}</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span>{showPasscodeField ? "Cancel Admin Authentication" : "Activate Dev Creator Panel"}</span>
                </>
              )}
            </button>
          </div>

          {/* Developer Authorization Terminal Prompt */}
          <AnimatePresence>
            {!isAuthorizedCreator && showPasscodeField && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-md mx-auto mb-10 bg-neutral-950 border border-rose-950/40 p-5 rounded-lg shadow-xl relative overflow-hidden"
              >
                {/* Scan line effect */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
                
                <div className="flex items-center gap-2 text-rose-400 border-b border-neutral-900/80 pb-3 mb-4">
                  <Lock className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">SECURITY // DEVELOPER IDENTITY CONFIRMATION</span>
                </div>
                
                <p className="text-[11px] font-mono text-neutral-400 mb-3.5 leading-relaxed">
                  Only the portfolio owner is authorized to use the Dev Creator Panel. Please verify your identity by entering your secure Developer PIN (e.g. <span className="text-purple-400">11166R</span>):
                </p>

                <form onSubmit={handleUnlockCreatorPanel} className="space-y-3">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter credentials or PIN..."
                      value={creatorPasscode}
                      onChange={(e) => {
                        setCreatorPasscode(e.target.value);
                        setPasscodeError(null);
                      }}
                      className="w-full bg-black border border-neutral-800 text-xs font-mono text-white px-3.5 py-2.5 rounded focus:border-purple-500/80 focus:outline-none placeholder:text-neutral-750 font-sans tracking-wide"
                      autoFocus
                    />
                  </div>
                  {passcodeError && (
                    <p className="text-[10px] font-mono text-rose-500 mt-1 animate-pulse">
                      ⚡ {passcodeError}
                    </p>
                  )}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasscodeField(false);
                        setCreatorPasscode("");
                        setPasscodeError(null);
                      }}
                      className="px-3 py-1.5 rounded bg-transparent border border-neutral-800 text-[10px] font-mono text-neutral-400 hover:text-white transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded bg-gradient-to-r from-purple-500 to-indigo-500 text-[10px] font-mono text-white font-semibold flex items-center gap-1 hover:brightness-110 transition active:scale-95"
                    >
                      <Zap className="w-3 h-3 text-yellow-300" />
                      <span>Authenticate</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showGenerator && isAuthorizedCreator && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-950 border border-neutral-900 rounded-xl p-6 md:p-8 space-y-8 relative" id="admin-generator-cabinet">
                  
                  {isAuthorizedCreator && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsAuthorizedCreator(false);
                        try {
                          localStorage.removeItem("riya_portfolio_authorized");
                        } catch {}
                        setShowGenerator(false);
                      }}
                      className="absolute top-4 right-4 text-[9px] font-mono text-rose-450 hover:text-rose-450 transition-colors flex items-center gap-1 bg-rose-950/25 border border-rose-900/40 px-2.5 py-1 rounded cursor-pointer z-20"
                      title="Lock Developer Creator Panel Console"
                    >
                      <Lock className="w-2.5 h-2.5 text-rose-455" />
                      <span>LOCK CONSOLE</span>
                    </button>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <h3 className="text-base font-mono text-white">Dynamic Asset Schema Builder</h3>
                    </div>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      This playground tool generates pristine JSON and test-injects nodes directly into your live view. Select your schema context below, play around in the sandbox, scroll down to see the real-time render, and click "Copy Code" to store the block for pasting directly into <span className="text-neutral-200 underline font-mono">portfolioData.ts</span>.
                    </p>
                  </div>

                  {/* Schema Selection Toggle Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-neutral-950/60 p-3 rounded border border-neutral-900">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Active Context:</span>
                    <div className="flex bg-neutral-900 rounded p-1 border border-neutral-800">
                      <button
                        type="button"
                        onClick={() => {
                          setSchemaType("achievement");
                          setSchemaYear("2026");
                          setSchemaBadges("Zenodo, Peer Approved");
                        }}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${schemaType === "achievement" ? "bg-emerald-500 text-black font-semibold shadow-sm" : "text-neutral-400 hover:text-white"}`}
                      >
                        Timeline Achievement
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSchemaType("blog");
                          setSchemaYear("June 05, 2026");
                          setSchemaBadges("6 min read");
                        }}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${schemaType === "blog" ? "bg-emerald-500 text-black font-semibold shadow-sm" : "text-neutral-400 hover:text-white"}`}
                      >
                        Medium Blog Post
                      </button>
                    </div>
                  </div>

                  {/* Config Form Generator Grid */}
                  <form onSubmit={handleAddLiveAchievement} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 space-y-4">
                      
                      {/* Title input */}
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                          {schemaType === "achievement" ? "Achievement Title" : "Blog Article Title"}
                        </label>
                        <input
                          type="text"
                          required
                          value={schemaTitle}
                          onChange={(e) => setSchemaTitle(e.target.value)}
                          placeholder={schemaType === "achievement" ? "e.g. Published Deep Learning Climate Paper" : "e.g. Building AquaSave: How a 10th Grader Is Solving Water Scarcity"}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-neutral-500"
                          id="input-schema-title"
                        />
                      </div>

                      {/* Description Narrative */}
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                          {schemaType === "achievement" ? "Description (Narrative description)" : "Excerpt (Brief snippet / summary)"}
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={schemaDesc}
                          onChange={(e) => setSchemaDesc(e.target.value)}
                          placeholder={schemaType === "achievement" ? "Brief narrative of your milestones, contributors, or key discoveries..." : "Building AquaSave: How a 10th Grader Turned Lines of Code into Real-World..."}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-neutral-500 block"
                          id="input-schema-desc"
                        />
                      </div>

                      {/* Flex Year & Badges */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                            {schemaType === "achievement" ? "Year" : "Publication Date"}
                          </label>
                          <input
                            type="text"
                            required
                            value={schemaYear}
                            onChange={(e) => setSchemaYear(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-500"
                            id="input-schema-year"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                            {schemaType === "achievement" ? "Badges (Comma separated)" : "Read Time"}
                          </label>
                          <input
                            type="text"
                            value={schemaBadges}
                            onChange={(e) => setSchemaBadges(e.target.value)}
                            placeholder={schemaType === "achievement" ? "Zenodo, Featured, Milestone" : "e.g. 6 min read"}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-500"
                            id="input-schema-badges"
                          />
                        </div>
                      </div>

                      {/* Optional Link and Button Title */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">
                            {schemaType === "achievement" ? "Action Link (Optional URL)" : "Medium Article Link (URL)"}
                          </label>
                          <input
                            type="url"
                            value={schemaLink}
                            onChange={(e) => setSchemaLink(e.target.value)}
                            placeholder="https://medium.com/your-username/slug"
                            className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-500"
                            id="input-schema-link"
                          />
                        </div>
                        {schemaType === "achievement" ? (
                          <div>
                            <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">Link Button Label</label>
                            <input
                              type="text"
                              value={schemaLinkLabel}
                              onChange={(e) => setSchemaLinkLabel(e.target.value)}
                              className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-500"
                              id="input-schema-linklabel"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col justify-end pb-1.5">
                            <span className="text-[10px] font-mono text-neutral-500 italic">Blog links render standard Lucide direction arrows directly.</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-mono font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-1"
                          id="btn-admin-inject"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Deploy & Live Test</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setAchievements(timelineAchievements);
                            setPosts(blogPosts);
                            triggerAdminNotice("Timeline and Blog directories restored to default dataset.");
                          }}
                          className="px-4 py-2.5 bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded font-mono text-xs transition-colors"
                          id="btn-admin-reset-timeline"
                        >
                          Restore Defaults
                        </button>
                      </div>

                    </div>

                    {/* Pristine copyable text code output column */}
                    <div className="md:col-span-4 space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Generated Object Block</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(generatedJSONString, "json-code")}
                            className="text-[10px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                            id="btn-schema-copy"
                          >
                            {copiedId === "json-code" ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Prescript formatting frame */}
                        <div className="bg-black/80 border border-neutral-900 rounded p-4 font-mono text-[10px] text-zinc-400 overflow-x-auto select-all relative group max-h-[220px]">
                          <pre className="whitespace-pre">{generatedJSONString}</pre>
                        </div>
                      </div>

                      <p className="text-[10px] text-neutral-500 font-mono italic leading-normal">
                        Tip: Open <span className="text-neutral-300 underline font-semibold">src/data/portfolioData.ts</span>, navigate to the <span className="text-neutral-300 font-semibold">{schemaType === "achievement" ? "timelineAchievements" : "blogPosts"}</span> array block, and paste this object right inside. No rebuild is needed!
                      </p>
                    </div>

                  </form>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.section>

      {/* Section Divider Line */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <hr className="border-neutral-900" />
      </div>

      {/* Blog & Writing Grid Section */}
      <motion.section 
        className="py-20 md:py-28" 
        id="blog"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          
          <div className="space-y-3 mb-12">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span className="font-mono text-xs tracking-widest uppercase text-neutral-400">Knowledge Shared</span>
            </div>
            <h2 className="text-4xl font-display font-medium text-white tracking-tight">Medium Blog Articles</h2>
            <p className="text-neutral-400 text-sm font-light">Insights, guides, and tech documentation shared whenever I achieve significant milestones, build something unique, or have essential knowledge to pass forward.</p>
          </div>

          {/* Clean minimal listing */}
          <div className="divide-y divide-neutral-900">
            {posts.map((post) => (
              <article key={post.id} className="py-8 group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  
                  {/* Date and time metadata */}
                  <div className="md:col-span-3 font-mono text-xs text-neutral-500 space-y-1">
                    <div>{post.date}</div>
                    <div className="text-neutral-600 italic">{post.readTime}</div>
                  </div>

                  {/* Main Title and Excerpt */}
                  <div className="md:col-span-9 space-y-2">
                    <h3 className="text-lg md:text-xl font-display font-medium text-neutral-200 group-hover:text-white transition-colors">
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noreferrer noopener" 
                        className="flex items-center justify-between gap-4"
                        id={`blog-post-link-${post.id}`}
                      >
                        <span>{post.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                      </a>
                    </h3>
                    <p className="text-neutral-400 text-sm font-light leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                </div>
              </article>
            ))}
          </div>

        </div>
      </motion.section>

      {/* Section Divider Line */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <hr className="border-neutral-900" />
      </div>

      {/* Press & Media Features Section */}
      <motion.section 
        className="py-20 md:py-28 bg-[#040404]" 
        id="press"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          
          <div className="space-y-3 mb-12 text-left">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase text-purple-400">Media Features</span>
            </div>
            <h2 className="text-4xl font-display font-medium text-white tracking-tight">Press &amp; Recognition</h2>
            <p className="text-neutral-400 text-sm font-light max-w-2xl leading-relaxed">
              Global publications highlighting my progressive web application (PWA) developments, environmental conservation efforts, and engineering solutions designed for municipal water telemetry.
            </p>
          </div>

          {/* Interactive PR Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllPR ? prFeatures : prFeatures.slice(0, 6)).map((pr) => (
              <div 
                key={pr.id}
                className="bg-neutral-950/60 border border-neutral-900/80 rounded-2xl p-5 hover:border-purple-900/40 hover:bg-neutral-900/10 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Subtle top purple highlight */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Category / Publisher and Date header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-block bg-neutral-900/80 border border-neutral-850 text-purple-400 text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-md tracking-wider font-semibold">
                      {pr.publication}
                    </span>
                    <span className="text-neutral-500 font-mono text-[9px]">
                      {pr.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors line-clamp-3 mb-2 font-display leading-snug text-left">
                    {pr.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs font-light text-neutral-400 line-clamp-2 leading-relaxed mb-4 text-left">
                    {pr.excerpt}
                  </p>
                </div>

                {/* External Link Action Button */}
                <div className="pt-3 border-t border-neutral-900/60 mt-auto flex">
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors group/btn"
                  >
                    <span>Read Full Story</span>
                    <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Toggle Expand Button */}
          {prFeatures.length > 6 && (
            <div className="text-center mt-12">
              <button
                type="button"
                onClick={() => setShowAllPR(!showAllPR)}
                className="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white rounded-full transition-all duration-200 active:scale-95 shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <Newspaper className="w-3.5 h-3.5 text-purple-400" />
                <span>{showAllPR ? "Collapse Press Grid" : `Show All ${prFeatures.length} Publications`}</span>
              </button>
            </div>
          )}

        </div>
      </motion.section>

      {/* Section Divider Line */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <hr className="border-neutral-900" />
      </div>

      </main>

      {/* Connect & Footer Section */}
      <motion.footer 
        className="py-24 md:py-32 bg-[#020202] border-t border-neutral-900 relative overflow-hidden" 
        id="connect"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Deep Atmospheric Purple Glowing Background Gradients */}
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-purple-950/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-12 right-1/4 w-80 h-80 bg-indigo-950/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Info and copy direct */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-neutral-900/60 px-3 py-1.5 rounded-full border border-neutral-800 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Available for Collaborations</span>
                </div>
                <h3 className="text-3xl font-display font-medium text-white tracking-tight sm:text-4xl">
                  Let's design <span className="bg-gradient-to-r from-purple-400 via-indigo-200 to-white bg-clip-text text-transparent">the predictive.</span>
                </h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  I am always eager to collaborate on advanced software systems, predictive vehicle telemetry frameworks, mathematical modeling, or robotics research. Shoot me an email directly or compile a diagnostic mail block.
                </p>
              </div>

              {/* Direct email box with subtle glassmorphic glow */}
              <div className="p-5 rounded-xl border border-neutral-900/80 bg-neutral-950/90 flex items-center justify-between gap-4 shadow-xl shadow-black/40 backdrop-blur-md hover:border-purple-900/40 transition-colors duration-300 group">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-medium">Direct Inquiries</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-sm font-mono text-neutral-200 hover:text-purple-400 transition-colors underline decoration-neutral-800 hover:decoration-purple-400/50">
                    {personalInfo.email}
                  </a>
                </div>
                
                <button
                  onClick={copyEmailDirect}
                  className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-700 text-[10px] font-mono transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  id="btn-copy-direct-email"
                >
                  {mailCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-purple-400 font-semibold">Saved!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-purple-400 transition-colors" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Quick Mail Compiler */}
            <div className="lg:col-span-7 bg-neutral-950/40 border border-neutral-900 rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden shadow-2xl shadow-black/80">
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/[0.02] rounded-full blur-3xl pointer-events-none" />
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2.5 border-b border-neutral-900 pb-4">
                <Mail className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
                <span>Compiler Terminal Inquiry</span>
              </h4>

              <form onSubmit={handleMailSubmit} className="space-y-5">
                
                {/* Select topic badges */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Inquiry Vector</label>
                  <div className="flex flex-wrap gap-2">
                    {["Robotics & ML", "Telemetry & Algorithms", "General Technical Interview"].map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => setContactSubject(sub)}
                        className={`px-3 py-1.5 rounded-lg transition-all font-mono text-[10px] border cursor-pointer ${contactSubject === sub ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-transparent font-medium shadow-md shadow-purple-950/30" : "bg-neutral-950/60 text-neutral-400 border-neutral-900 hover:border-neutral-700 hover:text-neutral-200"}`}
                        id={`contact-category-${sub.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">Identifier / Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe"
                    className="w-full bg-neutral-950/80 border border-neutral-900 rounded-lg px-3.5 py-2.5 text-xs font-sans text-white focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/25 transition-all focus:bg-neutral-950"
                    id="contact-form-name"
                  />
                </div>

                {/* Body Message */}
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1.5">Message / Objectives</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="We discovered your predictive maintenance telemetry vehicle framework and would love to collaborate..."
                    className="w-full bg-neutral-950/80 border border-neutral-900 rounded-lg px-3.5 py-2.5 text-xs font-sans text-white focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/25 block transition-all focus:bg-neutral-950"
                    id="contact-form-message"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-mono font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-purple-950/20 hover:shadow-purple-950/40 cursor-pointer"
                    id="contact-form-submit-btn"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Compile & Launch Client</span>
                  </button>
                </div>

                {formSubmitted && (
                  <p className="text-[11px] font-mono text-purple-400 mt-2 bg-purple-950/10 py-2.5 border border-purple-900/30 rounded-lg text-center shadow-inner">
                    ✓ Draft compiled! If your browser default launch process was blocked, please copy my direct email instead.
                  </p>
                )}

              </form>
            </div>

          </div>

          {/* Real-time Visitor Counter & Traffic Stream Segment */}
          <div className="mt-16 p-5 rounded-xl border border-neutral-900/80 bg-neutral-950/40 relative overflow-hidden text-left" id="live-visitor-counter">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.015] via-indigo-500/[0.01] to-transparent pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                {/* Total Visitors Stat */}
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-medium">TOTAL PORTFOLIO VISITS</span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-mono font-semibold text-neutral-100 tracking-tight">
                      {totalVisitors.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Live Active Nodes State */}
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-medium">ACTIVE TELEMETRY NODES</span>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-mono font-semibold text-neutral-100 tracking-tight">
                      {activeUsersNow} <span className="text-[10px] text-neutral-400 font-light ml-1 font-sans">active now</span>
                    </span>
                  </div>
                </div>

                {/* Sim status or report summary */}
                <div className="hidden lg:block space-y-1">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-medium">TRAFFIC INTEGRITY</span>
                  <span className="text-xs text-neutral-450 font-sans font-light flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-neutral-400">Signal nominal • Telemetry live</span>
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={handleFetchTraffic}
                  disabled={isFetchingTraffic}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-850 disabled:opacity-50 text-neutral-300 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-700 text-xs font-mono transition-all flex items-center gap-2 active:scale-95 cursor-pointer shadow-md shadow-black/40"
                  id="btn-fetch-traffic"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-purple-400 ${isFetchingTraffic ? "animate-spin" : ""}`} />
                  <span>{isFetchingTraffic ? "Synchronizing..." : "Fetch Traffic Stream"}</span>
                </button>
              </div>
            </div>

            {/* Simulated Fetching Steps or Loaded Report Display */}
            <AnimatePresence mode="wait">
              {isFetchingTraffic && (
                <motion.div
                  key="fetching-stream-progress"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-neutral-900/60 flex items-center justify-between gap-4 font-mono text-[10px]"
                >
                  <div className="flex items-center gap-2 text-purple-400">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>{fetchingStep}</span>
                  </div>
                  {/* Miniature beautiful loading progress bar */}
                  <div className="w-32 bg-neutral-900 rounded-full h-1 overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {trafficReport && !isFetchingTraffic && (
                <motion.div
                  key="traffic-stream-report"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-neutral-900/60"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {trafficReport.regions.map((reg) => (
                      <div key={reg.name} className="p-3 bg-neutral-950/80 rounded-lg border border-neutral-900/50">
                        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-550 uppercase tracking-wider mb-1.5">
                          <span className="text-neutral-400">{reg.name}</span>
                          <span className="text-[8px] text-neutral-600 font-light">{reg.latency}ms ping</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs font-mono text-neutral-200 font-semibold">{reg.percentage}%</span>
                          {/* Miniature mini horizontal bar graph */}
                          <div className="w-12 bg-neutral-900 h-1 rounded-full overflow-hidden">
                            <div 
                              className="bg-purple-500 h-full rounded-full" 
                              style={{ width: `${reg.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[9px] font-mono text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-indigo-400" />
                      <span>Authentic Regional Telemetry Map (Live Stream)</span>
                    </span>
                    <span>Last Synced: {trafficReport.fetchedAt}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-24 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-display font-semibold tracking-widest text-neutral-300 uppercase">RIYA SHARMA BHARADWAJ</span>
              <p className="text-[10px] font-mono text-neutral-500">© 2026. All rights preserved. Fusing computer science, mathematics, and predictive robotics.</p>
            </div>

            {/* Dynamic Social handles footer row with elegant animations */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-9 h-9 rounded-lg border border-neutral-900 bg-neutral-950/60 text-neutral-500 hover:text-purple-400 hover:border-purple-500/60 hover:bg-neutral-950 transition-all flex items-center justify-center hover:scale-105 active:scale-95 shadow-lg shadow-black/80"
                  title={social.name}
                  id={`footer-social-${social.name.toLowerCase().replace(/[^a-z]+/g, "")}`}
                >
                  <SocialIcon name={social.iconName} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </motion.footer>

      {/* Sticky Bottom Thumb-Navigation Bar for Mobile & Tablet */}
      <div className="fixed bottom-0 left-0 right-0 z-55 lg:hidden px-3 pb-3 pt-2 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto bg-neutral-950/90 border border-neutral-900 rounded-2xl shadow-[0_-15px_30px_rgba(0,0,0,0.95)] backdrop-blur-lg flex flex-col overflow-hidden relative">
          
          {/* Gentle top accent slide indicator */}
          <div className="w-12 h-1 bg-neutral-800/60 rounded-full mx-auto my-1.5" />

          {/* Horizontal Sliding/Scrolling Navigator */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 px-3 scroll-smooth">
            
            {/* 1. About */}
            <a 
              href="#about"
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-neutral-900/60 active:scale-95 transition-all min-w-[70px] text-center group"
            >
              <User className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
              <span className="font-mono text-[9px] font-medium tracking-wider text-neutral-300">About</span>
            </a>

            {/* 3. Journey (Achievements) */}
            <a 
              href="#journey"
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-neutral-900/60 active:scale-95 transition-all min-w-[70px] text-center group"
            >
              <Award className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <span className="font-mono text-[9px] font-medium tracking-wider text-neutral-300">Journey</span>
            </a>

            {/* 4. AquaSave */}
            <a 
              href="#projects"
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-neutral-900/60 active:scale-95 transition-all min-w-[70px] text-center group"
            >
              <Droplet className="w-4 h-4 text-teal-400 group-hover:text-teal-300 transition-colors" />
              <span className="font-mono text-[9px] font-medium tracking-wider text-neutral-300">AquaSave</span>
            </a>

            {/* 5. Research */}
            <a 
              href="#research"
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-neutral-900/60 active:scale-95 transition-all min-w-[70px] text-center group"
            >
              <Layers className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <span className="font-mono text-[9px] font-medium tracking-wider text-neutral-300">Research</span>
            </a>

            {/* 6. Writing */}
            <a 
              href="#blog"
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-neutral-900/60 active:scale-95 transition-all min-w-[70px] text-center group"
            >
              <FileText className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <span className="font-mono text-[9px] font-medium tracking-wider text-neutral-300">Writing</span>
            </a>

            {/* 6.5. Press & Recognition */}
            <a 
              href="#press"
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-neutral-900/60 active:scale-95 transition-all min-w-[70px] text-center group"
            >
              <Newspaper className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <span className="font-mono text-[9px] font-medium tracking-wider text-neutral-300">Press</span>
            </a>

            {/* 7. Live Tool */}
            <a 
              href="#schema-utility"
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-neutral-900/60 active:scale-95 transition-all min-w-[70px] text-center group"
            >
              <Settings className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
              <span className="font-mono text-[9px] font-medium tracking-wider text-neutral-300">Live Tool</span>
            </a>

            {/* 8. Connect */}
            <a 
              href="#connect"
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-neutral-900/60 active:scale-95 transition-all min-w-[70px] text-center group"
            >
              <Send className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="font-mono text-[9px] font-medium tracking-wider text-neutral-300">Connect</span>
            </a>

            {/* Divider line before action button */}
            <div className="w-[1px] h-6 bg-neutral-900 shrink-0 self-center mx-1" />

            {/* 9. Share / Save Trigger button */}
            <button 
              type="button"
              onClick={() => setShowMobileShare(!showMobileShare)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl active:scale-95 transition-all min-w-[70px] text-center ${showMobileShare ? "bg-purple-950/40 border border-purple-900/50" : "hover:bg-neutral-900/60 border border-transparent"}`}
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              <span className="font-mono text-[9px] font-semibold tracking-wider text-purple-300">Share/Save</span>
            </button>

          </div>

          {/* Slide-Up Overlay Sheet for Mobile Share option buttons */}
          <AnimatePresence>
            {showMobileShare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-neutral-900 bg-[#060606] text-left overflow-hidden"
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-[9px] font-mono text-neutral-500 uppercase tracking-widest pb-1 border-b border-neutral-900/60">
                    <span>Quick Core Actions</span>
                    <button 
                      type="button" 
                      onClick={() => setShowMobileShare(false)}
                      className="text-[9px] text-purple-400 hover:text-white font-semibold"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    
                    {/* Copy URL */}
                    <button
                      type="button"
                      onClick={() => {
                        handleCopyPortfolioLink();
                      }}
                      className="w-full text-left p-3 rounded-lg bg-neutral-950/60 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 transition flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        {shareCopied ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-purple-400" />
                        )}
                        <span className="text-xs font-mono text-neutral-300">{shareCopied ? "Portfolio Link Copied!" : "Copy Portfolio Link"}</span>
                      </div>
                      {shareCopied && (
                        <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">
                          DONE
                        </span>
                      )}
                    </button>

                    {/* Download Resume Link */}
                    <button
                      type="button"
                      onClick={() => {
                        handleDownloadResume();
                        setShowMobileShare(false);
                      }}
                      className="w-full text-left p-3 rounded-lg bg-neutral-950/60 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 transition flex items-center gap-2.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-mono text-neutral-300">Download Portfolio File (.TXT)</span>
                    </button>

                    {/* Print PDF Page */}
                    <button
                      type="button"
                      onClick={() => {
                        setShowMobileShare(false);
                        setTimeout(() => window.print(), 180);
                      }}
                      className="w-full text-left p-3 rounded-lg bg-neutral-950/60 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-800 transition flex items-center gap-2.5 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-mono text-neutral-300">Save as PDF / Print Portfolio</span>
                    </button>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
