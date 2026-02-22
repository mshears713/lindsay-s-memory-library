import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lock, MousePointerClick } from "lucide-react";
import PageContainer from "@/components/PageContainer";

const warningMessages = [
  "I said DON'T.",
  "You're still clicking?",
  "This is a restricted area for a reason.",
  "Lindsay is watching.",
  "Okay fine, but you asked for it…",
  "🐿️ …nothing happened. Or did it?",
  "Seriously, stop.",
  "Last warning.",
];

const Skullicon = () => (
  <span className="text-2xl">💀</span>
);

const RestrictedArea = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleClick = useCallback(() => {
    setClickCount((prev) => prev + 1);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  const currentMessage =
    clickCount > 0
      ? warningMessages[Math.min(clickCount - 1, warningMessages.length - 1)]
      : null;

  return (
    <PageContainer title="Restricted Area" subtitle="You probably shouldn't be here">
      {/* Restricted Intro */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14 max-w-2xl"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldAlert className="w-5 h-5 text-chapter-coral" />
          <p className="text-sm font-medium text-chapter-coral tracking-wide uppercase">
            Clearance Level: Lindsay Only
          </p>
        </div>
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          Every library has a volume that doesn't belong on the shelf — one that
          smells faintly of mischief and was probably filed under "do not open."
          You found it. Congratulations. Or condolences.
        </p>
      </motion.section>

      {/* Artifact — "DO NOT TOUCH" sign */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="relative flex justify-center mb-16"
      >
        {/* Background glow — warmer, slightly ominous */}
        <div className="absolute -inset-x-16 -inset-y-20 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-chapter-coral/[0.04] blur-[60px] rounded-full scale-110" />
        </div>

        <div className="relative w-full max-w-md">
          {/* Shadow layers */}
          <div className="absolute inset-2 bg-foreground/5 rounded-lg blur-xl translate-y-3" />

          {/* Artifact card */}
          <div
            className="relative rounded-lg overflow-hidden border border-chapter-coral/20 shadow-lg shadow-foreground/5"
            style={{
              padding: "8px",
              background:
                "linear-gradient(135deg, hsl(var(--parchment)), hsl(var(--card)), hsl(var(--parchment)))",
            }}
          >
            <div className="relative bg-card rounded-md p-8 md:p-10 text-center border border-border/30">
              {/* Tape strips */}
              <div className="absolute -top-1 left-8 w-16 h-5 bg-chapter-amber/30 rotate-[-2deg] rounded-sm" />
              <div className="absolute -top-1 right-10 w-14 h-5 bg-chapter-amber/25 rotate-[3deg] rounded-sm" />

              <div className="flex flex-col items-center gap-3">
                <Skullicon />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
                  DO NOT TOUCH
                  <br />
                  MY COMPUTER
                </h2>
                <div className="w-16 h-px bg-chapter-coral/30 my-1" />
                <p className="text-sm text-muted-foreground font-light italic">
                  — Management (Lindsay, age 11)
                </p>
              </div>

              {/* Corner doodles */}
              <div className="absolute bottom-3 left-3 text-xs text-muted-foreground/30 rotate-[-8deg]">
                ⚡
              </div>
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground/30 rotate-[12deg]">
                ☠️
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-dust italic font-light tracking-wide">
            Artifact #007 — "The Warning" — date unknown, presumed eternal
          </p>
        </div>
      </motion.section>

      {/* Interactive Centerpiece — The Computer */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <p className="text-xs text-muted-foreground/60 font-light mb-5 tracking-wide uppercase">
          The forbidden machine
        </p>

        {/* Computer object */}
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          animate={
            isShaking
              ? {
                  x: [0, -6, 5, -4, 3, -1, 0],
                  rotate: [0, -1, 1, -0.5, 0.3, 0],
                }
              : {}
          }
          transition={{ duration: 0.45 }}
          className="relative group cursor-pointer focus:outline-none"
        >
          {/* Hover glow */}
          <div className="absolute -inset-4 bg-chapter-coral/0 group-hover:bg-chapter-coral/[0.06] rounded-2xl blur-xl transition-all duration-500" />

          <div className="relative flex flex-col items-center gap-3 px-10 py-8 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm group-hover:border-chapter-coral/30 transition-all duration-300">
            {/* Screen */}
            <div className="w-28 h-20 rounded-md bg-muted/60 border border-border/40 flex items-center justify-center overflow-hidden group-hover:border-chapter-coral/20 transition-colors duration-300">
              <AnimatePresence mode="wait">
                {hovering && clickCount === 0 ? (
                  <motion.div
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 text-muted-foreground/50"
                  >
                    <MousePointerClick className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-light">click?</span>
                  </motion.div>
                ) : clickCount > 0 ? (
                  <motion.div
                    key={`msg-${clickCount}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-2 text-center"
                  >
                    <span className="text-[10px] text-chapter-coral/80 font-light leading-tight block">
                      {currentMessage}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div key="idle">
                    <Lock className="w-4 h-4 text-muted-foreground/30" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Keyboard base */}
            <div className="w-32 h-2.5 rounded-sm bg-muted/40 border border-border/30" />

            <p className="text-[10px] text-muted-foreground/40 font-light mt-1">
              Lindsay's Computer™
            </p>
          </div>
        </motion.button>

        {/* Click counter */}
        <AnimatePresence>
          {clickCount > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-xs text-dust/60 font-light italic"
            >
              Violations logged: {clickCount}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.section>
    </PageContainer>
  );
};

export default RestrictedArea;
