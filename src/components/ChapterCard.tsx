import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

const accentMap: Record<string, { bg: string; text: string; glow: string; line: string }> = {
  "chapter-coral": {
    bg: "bg-chapter-coral/15",
    text: "text-chapter-coral",
    glow: "bg-chapter-coral/10",
    line: "bg-chapter-coral/30",
  },
  "chapter-sky": {
    bg: "bg-chapter-sky/15",
    text: "text-chapter-sky",
    glow: "bg-chapter-sky/10",
    line: "bg-chapter-sky/30",
  },
  "chapter-rose": {
    bg: "bg-chapter-rose/15",
    text: "text-chapter-rose",
    glow: "bg-chapter-rose/10",
    line: "bg-chapter-rose/30",
  },
  "chapter-sage": {
    bg: "bg-chapter-sage/15",
    text: "text-chapter-sage",
    glow: "bg-chapter-sage/10",
    line: "bg-chapter-sage/30",
  },
  "chapter-lavender": {
    bg: "bg-chapter-lavender/15",
    text: "text-chapter-lavender",
    glow: "bg-chapter-lavender/10",
    line: "bg-chapter-lavender/30",
  },
  "chapter-amber": {
    bg: "bg-chapter-amber/15",
    text: "text-chapter-amber",
    glow: "bg-chapter-amber/10",
    line: "bg-chapter-amber/30",
  },
};

/** Chapter-specific hover signature elements */
const chapterSignatures: Record<string, React.ReactNode> = {
  "/wall": (
    /* Sketchbook — faint pencil sketch lines */
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
      <svg className="absolute bottom-3 right-3 w-16 h-16 text-chapter-coral/40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M8 56 L20 12 L24 14 L12 58 Z" />
        <path d="M20 12 L22 8 L26 10 L24 14 Z" />
        <line x1="28" y1="42" x2="52" y2="42" strokeDasharray="2 3" />
        <line x1="28" y1="48" x2="46" y2="48" strokeDasharray="2 3" />
      </svg>
    </div>
  ),
  "/timeline": (
    /* Chronicles — thin timeline node */
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
      <div className="absolute right-5 top-4 bottom-4 w-px bg-chapter-sky/40" />
      <div className="absolute right-[18px] top-1/3 w-2 h-2 rounded-full bg-chapter-sky/50" />
      <div className="absolute right-[18px] top-2/3 w-2 h-2 rounded-full bg-chapter-sky/50" />
    </div>
  ),
  "/pets": (
    /* Companions — soft paw print */
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
      <span className="absolute bottom-3 right-4 text-xl opacity-40 select-none">🐾</span>
    </div>
  ),
  "/mood": (
    /* Reflections — soft gradient shimmer */
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-chapter-sage/10 via-transparent to-chapter-sage/15 rounded-2xl" />
    </div>
  ),
  "/lindsay-only": (
    /* Restricted Area — warning sign with micro-glitch */
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
      <span className="absolute top-3 right-3 text-lg opacity-40 select-none animate-pulse">⚠️</span>
      <div className="absolute bottom-4 left-8 w-8 h-px bg-chapter-lavender/30 animate-pulse" style={{ animationDelay: "0.3s" }} />
    </div>
  ),
  "/audiology": (
    /* Research Wing — clean clinical accent */
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
      <div className="absolute top-3 right-3 bottom-3 w-px bg-chapter-amber/30" />
      <div className="absolute bottom-3 left-6 right-6 h-px bg-chapter-amber/20" />
    </div>
  ),
};

interface ChapterCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  to: string;
  accentColor?: string;
  index?: number;
}

const ChapterCard = ({ title, subtitle, icon: Icon, to, accentColor = "chapter-amber", index = 0 }: ChapterCardProps) => {
  const colors = accentMap[accentColor] ?? accentMap["chapter-amber"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link to={to} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/60 p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1.5 hover:border-border">
          {/* Spine accent — like a book binding */}
          <div className={`absolute top-3 bottom-3 left-0 w-[3px] rounded-full ${colors.line} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* Accent glow on hover */}
          <div
            className={`absolute -top-16 -right-16 w-40 h-40 ${colors.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-700`}
          />

          {/* Chapter signature preview */}
          {chapterSignatures[to]}

          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${colors.bg} mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-md`}>
            <Icon className={`w-5 h-5 ${colors.text}`} />
          </div>

          {/* Text */}
          <h3 className="font-display text-xl font-semibold text-foreground mb-1.5 tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Bottom accent line */}
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${colors.line} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>
      </Link>
    </motion.div>
  );
};

export default ChapterCard;
