import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import artifactImage from "@/assets/quest-list-artifact.jpg";

interface Hotspot {
  id: string;
  top: string;
  left: string;
  width: string;
  height: string;
  note: string;
}

const hotspots: Hotspot[] = [
  {
    id: "title",
    top: "0%",
    left: "5%",
    width: "55%",
    height: "8%",
    note: "The title that started it all — a young dreamer's manifesto.",
  },
  {
    id: "bungee",
    top: "8%",
    left: "3%",
    width: "50%",
    height: "6%",
    note: "Bungee jump or parachute — go big or go home.",
  },
  {
    id: "cat",
    top: "18%",
    left: "3%",
    width: "65%",
    height: "6%",
    note: "Greg or Waffles — the most important naming decision of a lifetime.",
  },
  {
    id: "ucf",
    top: "30%",
    left: "3%",
    width: "25%",
    height: "6%",
    note: "Go to UCF — a dream campus, circled with determination.",
  },
  {
    id: "chipmunk",
    top: "68%",
    left: "3%",
    width: "45%",
    height: "7%",
    note: "Own a chipmunk. Non-negotiable life goal.",
  },
  {
    id: "movie",
    top: "56%",
    left: "3%",
    width: "42%",
    height: "6%",
    note: "Make a movie — the director's chair was always calling.",
  },
  {
    id: "stargirl",
    top: "50%",
    left: "55%",
    width: "40%",
    height: "10%",
    note: "Comic book collection with Supergirl and Stargirl. Excellent taste.",
  },
  {
    id: "surf",
    top: "86%",
    left: "3%",
    width: "35%",
    height: "6%",
    note: "Learn to surf — Florida dreams in the making.",
  },
];

const Sketchbook = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <PageContainer title="Sketchbook" subtitle="Prologue — Where it all began">
      {/* Prologue Intro */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 max-w-2xl"
      >
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          Before the chapters were written, there was a list — scrawled on a wall in bold,
          unfiltered handwriting. A young Lindsay mapped out an entire life in bullet points:
          dreams, goals, and the kind of plans only a kid with limitless imagination could make.
        </p>
        <p className="mt-4 text-muted-foreground/70 font-light italic text-sm">
          Hover over the artifact to read the margin notes.
        </p>
      </motion.section>

      {/* Artifact Section with Background Echo */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative flex justify-center"
      >
        {/* Background Echo — blurred atmosphere */}
        <div className="absolute inset-0 -inset-x-12 -inset-y-20 overflow-hidden pointer-events-none">
          <img
            src={artifactImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-[0.06] blur-[40px] scale-110"
          />
        </div>

        {/* Floating Artifact */}
        <div className="relative w-full max-w-lg">
          {/* Paper shadow layers for depth */}
          <div className="absolute inset-2 bg-foreground/5 rounded-sm blur-xl translate-y-3" />
          <div className="absolute inset-1 bg-foreground/3 rounded-sm blur-md translate-y-1.5" />

          <div className="relative rounded-sm overflow-hidden border border-border/40 shadow-lg shadow-foreground/5">
            <img
              src={artifactImage}
              alt="Lindsay's childhood quest list — 'Things to do before I die'"
              className="w-full h-auto block"
            />

            {/* Hotspot Overlay */}
            <div className="absolute inset-0">
              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  className="absolute cursor-pointer group"
                  style={{
                    top: spot.top,
                    left: spot.left,
                    width: spot.width,
                    height: spot.height,
                  }}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() =>
                    setActiveHotspot(activeHotspot === spot.id ? null : spot.id)
                  }
                >
                  {/* Subtle hover highlight */}
                  <div className="absolute inset-0 rounded-sm bg-glow/0 group-hover:bg-glow/10 transition-colors duration-300" />

                  {/* Annotation Note */}
                  <AnimatePresence>
                    {activeHotspot === spot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-20 left-0 bottom-full mb-2 w-56 px-3 py-2.5 rounded-md bg-card/95 backdrop-blur-md border border-border/60 shadow-lg shadow-foreground/5"
                      >
                        <p className="text-xs text-card-foreground/90 font-light leading-relaxed italic">
                          {spot.note}
                        </p>
                        <div className="absolute left-4 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-border/60" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Artifact caption */}
          <p className="mt-4 text-center text-xs text-dust italic font-light tracking-wide">
            Artifact #001 — "Things to do before I die" — circa 2005
          </p>
        </div>
      </motion.section>
    </PageContainer>
  );
};

export default Sketchbook;
