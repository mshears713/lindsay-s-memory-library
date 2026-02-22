import { motion } from "framer-motion";
import ChapterCard from "@/components/ChapterCard";
import { Pencil, Clock, Heart, Smile, Lock, Stethoscope } from "lucide-react";

const chapters = [
  {
    title: "Sketchbook",
    subtitle: "Childhood drawings & the memory wall",
    icon: Pencil,
    to: "/wall",
    accentColor: "chapter-coral",
  },
  {
    title: "Chronicles",
    subtitle: "A timeline through the chapters of life",
    icon: Clock,
    to: "/timeline",
    accentColor: "chapter-sky",
  },
  {
    title: "Companions",
    subtitle: "The pets who made everything better",
    icon: Heart,
    to: "/pets",
    accentColor: "chapter-rose",
  },
  {
    title: "Reflections",
    subtitle: "Mood-shifting spaces for quiet thought",
    icon: Smile,
    to: "/mood",
    accentColor: "chapter-sage",
  },
  {
    title: "Restricted Area",
    subtitle: "You probably shouldn't go in here",
    icon: Lock,
    to: "/lindsay-only",
    accentColor: "chapter-lavender",
  },
  {
    title: "Research Wing",
    subtitle: "The professional side of things",
    icon: Stethoscope,
    to: "/audiology",
    accentColor: "chapter-amber",
  },
];

const Index = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16 md:mb-20"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-foreground tracking-tight mb-3">
          Memory Library
        </h1>
        <div className="w-12 h-px bg-glow/40 mx-auto mb-4" />
        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
          A quiet place where stories live. Pick a chapter, stay a while.
        </p>
      </motion.div>

      {/* Chapter grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {chapters.map((chapter, i) => (
          <ChapterCard key={chapter.to} {...chapter} index={i} />
        ))}
      </div>

      {/* Footer whisper */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center text-sm text-dust mt-20 font-light italic"
      >
        Every memory deserves a shelf.
      </motion.p>
    </div>
  );
};

export default Index;
