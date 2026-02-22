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
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link to={to} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/60 p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5 hover:-translate-y-1.5 hover:border-border">
          {/* Spine accent — like a book binding */}
          <div className={`absolute top-3 bottom-3 left-0 w-[3px] rounded-full ${colors.line} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* Accent glow on hover */}
          <div
            className={`absolute -top-16 -right-16 w-40 h-40 ${colors.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-700`}
          />

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
