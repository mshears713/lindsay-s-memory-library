import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const accentMap: Record<string, { border: string; glow: string; tag: string }> = {
  "chapter-coral": {
    border: "border-chapter-coral/20",
    glow: "bg-chapter-coral/8",
    tag: "text-chapter-coral bg-chapter-coral/10",
  },
  "chapter-sky": {
    border: "border-chapter-sky/20",
    glow: "bg-chapter-sky/8",
    tag: "text-chapter-sky bg-chapter-sky/10",
  },
  "chapter-rose": {
    border: "border-chapter-rose/20",
    glow: "bg-chapter-rose/8",
    tag: "text-chapter-rose bg-chapter-rose/10",
  },
  "chapter-sage": {
    border: "border-chapter-sage/20",
    glow: "bg-chapter-sage/8",
    tag: "text-chapter-sage bg-chapter-sage/10",
  },
  "chapter-lavender": {
    border: "border-chapter-lavender/20",
    glow: "bg-chapter-lavender/8",
    tag: "text-chapter-lavender bg-chapter-lavender/10",
  },
  "chapter-amber": {
    border: "border-chapter-amber/20",
    glow: "bg-chapter-amber/8",
    tag: "text-chapter-amber bg-chapter-amber/10",
  },
};

interface PetCardProps {
  name: string;
  blurb?: string;
  image?: string;
  dateRange?: string;
  accentColor?: string;
  index?: number;
  memoryLine?: string;
}

const PetCard = ({
  name,
  blurb,
  image,
  dateRange,
  accentColor = "chapter-amber",
  index = 0,
  memoryLine,
}: PetCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const colors = accentMap[accentColor] ?? accentMap["chapter-amber"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      className="group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur-sm border ${colors.border} transition-all duration-500 hover:shadow-xl hover:shadow-foreground/4 hover:-translate-y-1.5 hover:border-border/80`}
      >
        {/* Accent glow on hover */}
        <div
          className={`absolute -top-12 -right-12 w-36 h-36 ${colors.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-5xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 select-none">
                🐾
              </span>
            </div>
          )}

          {/* Soft bottom gradient for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/60 to-transparent" />
        </div>

        {/* Text content */}
        <div className="relative p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-foreground tracking-tight">
              {name}
            </h3>
            {dateRange && (
              <span
                className={`shrink-0 text-[10px] font-medium uppercase tracking-widest px-2.5 py-1 rounded-full ${colors.tag}`}
              >
                {dateRange}
              </span>
            )}
          </div>

          {blurb && (
            <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
              {blurb}
            </p>
          )}

          {/* Emotional memory line — revealed on hover */}
          {memoryLine && (
            <p className="mt-3 text-xs text-muted-foreground/0 group-hover:text-muted-foreground/70 font-light italic leading-relaxed transition-all duration-700 translate-y-1 group-hover:translate-y-0">
              "{memoryLine}"
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PetCard;
