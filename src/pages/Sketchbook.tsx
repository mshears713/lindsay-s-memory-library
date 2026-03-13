import { useState, useCallback } from "react";
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
  special?: "chipmunk";
}

const hotspots: Hotspot[] = [
  {
    id: "title",
    top: "4%",
    left: "5%",
    width: "55%",
    height: "8%",
    note: "The title that started it all — a young dreamer's manifesto.",
  },
  {
    id: "bungee",
    top: "12%",
    left: "5%",
    width: "50%",
    height: "6%",
    note: "Bungee jump or parachute — go big or go home.",
  },
  {
    id: "cat",
    top: "24%",
    left: "3%",
    width: "65%",
    height: "6%",
    note: "Greg or Waffles — still hasnt happened...yet",
  },
  {
    id: "ucf",
    top: "33%",
    left: "3%",
    width: "30%",
    height: "6%",
    note: "Go to UCF — a warmup to NSU.",
  },
  {
    id: "chipmunk",
    top: "45%",
    left: "3%",
    width: "45%",
    height: "7%",
    note: "Buy a house ✓ … with $15k from Dad. You're welcome. 😘",
  },
  {
    id: "mike-chipmunk",
    top: "69%",
    left: "3%",
    width: "65%",
    height: "7%",
    note: "🐿️ Click to see what Mike actually got…",
    special: "chipmunk",
  },
  {
    id: "movie",
    top: "60%",
    left: "3%",
    width: "42%",
    height: "6%",
    note: "Make a movie — the director's chair is still calling.",
  },
  {
    id: "stargirl",
    top: "40%",
    left: "70%",
    width: "20%",
    height: "10%",
    note: "Comic book collection with Supergirl and Stargirl. Excellent taste.",
  },
  {
    id: "surf",
    top: "92%",
    left: "13%",
    width: "35%",
    height: "6%",
    note: "Does Snowboarding and Wakeboarding count?.",
  },
];

const chipmunkEmojis = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  emoji: "🐿️",
  x: Math.random() * 100,
  delay: Math.random() * 0.8,
  duration: 1.5 + Math.random() * 1.5,
  size: 20 + Math.random() * 28,
  rotation: Math.random() * 360,
}));

const Sketchbook = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [showChipmunks, setShowChipmunks] = useState(false);
  const [showDachshund, setShowDachshund] = useState(false);

  const triggerChipmunkParty = useCallback(() => {
    setShowChipmunks(true);
    setTimeout(() => setShowDachshund(true), 2200);
    setTimeout(() => {
      setShowChipmunks(false);
      setTimeout(() => setShowDachshund(false), 3000);
    }, 4000);
  }, []);

  return (
    <PageContainer title="First Draft" subtitle="Life imagined before it happened.">
      {/* Chipmunk explosion overlay */}
      <AnimatePresence>
        {showChipmunks && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            {chipmunkEmojis.map((c) => (
              <motion.div
                key={c.id}
                initial={{ y: "-10vh", x: `${c.x}vw`, opacity: 0, rotate: 0, scale: 0 }}
                animate={{
                  y: "110vh",
                  opacity: [0, 1, 1, 0.8],
                  rotate: c.rotation,
                  scale: [0, 1.2, 1, 0.8],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  ease: "easeIn",
                }}
                style={{ fontSize: c.size, position: "absolute" }}
              >
                {c.emoji}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Dachshund reveal */}
      <AnimatePresence>
        {showDachshund && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl p-6 shadow-2xl text-center max-w-xs pointer-events-auto">
              <div className="text-6xl mb-3">🐕</div>
              <p className="font-display text-lg text-card-foreground font-medium">Plot twist.</p>
              <p className="text-sm text-muted-foreground font-light mt-1.5 leading-relaxed">
                Mike didn't get a chipmunk. He got a dachshund because Lindsay wouldn't shut up about it.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prologue Intro */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 max-w-2xl"
      >
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          Before the chapters were written, there was a list — scrawled on a wall in bold, unfiltered handwriting. A
          young Lindsay mapped out an entire life in bullet points: dreams, goals, and the kind of plans only a kid with
          limitless imagination could make.
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
        {/* Background Echo — matched warm tone */}
        <div className="absolute -inset-x-24 -inset-y-32 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-background/30 mix-blend-multiply z-[1]" />
          <img
            src={artifactImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-[0.09] blur-[50px] scale-125 saturate-[0.6] brightness-110"
          />
        </div>

        {/* Floating Artifact */}
        <div className="relative w-full max-w-lg">
          {/* Paper shadow layers */}
          <div className="absolute inset-2 bg-foreground/5 rounded-sm blur-xl translate-y-3" />
          <div className="absolute inset-1 bg-foreground/3 rounded-sm blur-md translate-y-1.5" />

          {/* Warm parchment border frame to blend edges */}
          <div
            className="relative rounded-sm overflow-hidden shadow-lg shadow-foreground/5"
            style={{
              padding: "6px",
              background:
                "linear-gradient(135deg, hsl(var(--parchment)), hsl(var(--background)), hsl(var(--parchment)))",
            }}
          >
            <div className="relative rounded-[2px] overflow-hidden">
              <img
                src={artifactImage}
                alt="Lindsay's childhood quest list — 'Things to do before I die'"
                className="w-full h-auto block"
                style={{
                  filter: "saturate(0.85) brightness(1.02) contrast(0.98)",
                }}
              />

              {/* Soft edge vignette on image to blend into frame */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 30px 10px hsl(var(--parchment) / 0.5)",
                }}
              />

              {/* Hotspot Overlay */}
              <div className="absolute inset-0">
                {hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    className={`absolute group ${spot.special ? "cursor-pointer" : "cursor-default"}`}
                    style={{
                      top: spot.top,
                      left: spot.left,
                      width: spot.width,
                      height: spot.height,
                    }}
                    onMouseEnter={() => setActiveHotspot(spot.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    onClick={() => {
                      if (spot.special === "chipmunk") {
                        triggerChipmunkParty();
                      } else {
                        setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
                      }
                    }}
                  >
                    {/* Hover highlight */}
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
                          {spot.special && (
                            <p className="text-[10px] text-primary/70 mt-1 font-medium not-italic">Tap to find out →</p>
                          )}
                          <div className="absolute left-4 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-border/60" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="mt-4 text-center text-xs text-dust italic font-light tracking-wide">
            Artifact #001 — "Things to do before I die" — circa 2005
          </p>
        </div>
      </motion.section>
    </PageContainer>
  );
};

export default Sketchbook;
