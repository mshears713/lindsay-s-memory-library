import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LucideIcon } from "lucide-react";

const accentMap: Record<string, { bg: string; text: string; line: string; dot: string }> = {
  "chapter-coral": {
    bg: "bg-chapter-coral/12",
    text: "text-chapter-coral",
    line: "bg-chapter-coral/25",
    dot: "bg-chapter-coral",
  },
  "chapter-sky": {
    bg: "bg-chapter-sky/12",
    text: "text-chapter-sky",
    line: "bg-chapter-sky/25",
    dot: "bg-chapter-sky",
  },
  "chapter-rose": {
    bg: "bg-chapter-rose/12",
    text: "text-chapter-rose",
    line: "bg-chapter-rose/25",
    dot: "bg-chapter-rose",
  },
  "chapter-sage": {
    bg: "bg-chapter-sage/12",
    text: "text-chapter-sage",
    line: "bg-chapter-sage/25",
    dot: "bg-chapter-sage",
  },
  "chapter-lavender": {
    bg: "bg-chapter-lavender/12",
    text: "text-chapter-lavender",
    line: "bg-chapter-lavender/25",
    dot: "bg-chapter-lavender",
  },
  "chapter-amber": {
    bg: "bg-chapter-amber/12",
    text: "text-chapter-amber",
    line: "bg-chapter-amber/25",
    dot: "bg-chapter-amber",
  },
};

interface TimelineNodeProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  accentColor?: string;
  index?: number;
  /** Used for future era-based theme shifts */
  era?: string;
}

const TimelineNode = ({
  title,
  subtitle,
  description,
  icon: Icon,
  accentColor = "chapter-amber",
  index = 0,
}: TimelineNodeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const colors = accentMap[accentColor] ?? accentMap["chapter-amber"];
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-center w-full group" style={{ minHeight: "140px" }}>
      {/* Center dot on the guide line */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`w-4 h-4 rounded-full ${colors.dot} shadow-md ring-4 ring-background`}
        />
      </div>

      {/* Content card — alternates sides */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30, y: 8 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className={`relative w-[calc(50%-2rem)] ${isEven ? "mr-auto pr-6" : "ml-auto pl-6"}`}
      >
        {/* Connector line from card to dot */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-px ${colors.line} ${
            isEven ? "right-0 w-6" : "left-0 w-6"
          }`}
        />

        <div className="relative rounded-xl bg-card/70 backdrop-blur-sm border border-border/50 p-5 md:p-6 transition-all duration-400 hover:bg-card/90 hover:border-border/80 hover:shadow-lg hover:shadow-foreground/3">
          {/* Icon */}
          {Icon && (
            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${colors.bg} mb-3`}>
              <Icon className={`w-4 h-4 ${colors.text}`} />
            </div>
          )}

          {/* Subtitle / era label */}
          {subtitle && (
            <p className={`text-xs font-medium uppercase tracking-widest ${colors.text} mb-1.5`}>
              {subtitle}
            </p>
          )}

          <h3 className="font-display text-lg font-semibold text-foreground tracking-tight leading-snug">
            {title}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineNode;
