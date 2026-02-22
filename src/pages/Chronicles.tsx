import { motion } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import TimelineNode from "@/components/TimelineNode";
import { Baby, GraduationCap, Heart, Briefcase, Sparkles, MapPin } from "lucide-react";

const timelineEntries = [
  {
    title: "The Very Beginning",
    subtitle: "Chapter One",
    description: "Where it all started — the first pages of a story still being written.",
    icon: Baby,
    accentColor: "chapter-coral",
    era: "origins",
  },
  {
    title: "Growing Up & Finding a Voice",
    subtitle: "Early Years",
    description: "School days, first friendships, and the slow discovery of what makes Lindsay… Lindsay.",
    icon: Sparkles,
    accentColor: "chapter-amber",
    era: "childhood",
  },
  {
    title: "The Learning Chapters",
    subtitle: "Education",
    description: "Classrooms, late nights, breakthroughs, and the quiet confidence that comes from showing up.",
    icon: GraduationCap,
    accentColor: "chapter-sky",
    era: "education",
  },
  {
    title: "Love & Important People",
    subtitle: "Connections",
    description: "The people who changed the story — companions, mentors, and the ones who stayed.",
    icon: Heart,
    accentColor: "chapter-rose",
    era: "connections",
  },
  {
    title: "Building Something Real",
    subtitle: "Career",
    description: "First jobs, big moves, and the slow art of building a life you actually like.",
    icon: Briefcase,
    accentColor: "chapter-sage",
    era: "career",
  },
  {
    title: "Where the Story Goes Next",
    subtitle: "Present Day",
    description: "The latest chapter — still unfolding, still full of possibility.",
    icon: MapPin,
    accentColor: "chapter-lavender",
    era: "present",
  },
];

const Chronicles = () => (
  <PageContainer title="Chronicles" subtitle="A timeline through the chapters of life">
    {/* Timeline container */}
    <div className="relative mt-4 pb-16">
      {/* Central guide line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/60" />

      {/* Top flourish */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-16 bg-gradient-to-b from-primary/40 to-transparent origin-top"
      />

      {/* Timeline nodes */}
      <div className="flex flex-col gap-8 md:gap-12 pt-8">
        {timelineEntries.map((entry, i) => (
          <TimelineNode key={entry.era} {...entry} index={i} />
        ))}
      </div>

      {/* Bottom flourish — story continues */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-col items-center mt-12 gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-border/60 to-transparent" />
        <p className="text-xs text-muted-foreground/60 font-light italic tracking-wide">
          the story continues…
        </p>
      </motion.div>
    </div>
  </PageContainer>
);

export default Chronicles;
