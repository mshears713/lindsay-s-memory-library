import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lock, MousePointerClick } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import warningArtifact from "@/assets/warning-artifact.jpg";

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

const RestrictedArea = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [showAngryLindsay, setShowAngryLindsay] = useState(false);

  const handleClick = useCallback(() => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5 && !showAngryLindsay) {
        setShowAngryLindsay(true);
      }
      return next;
    });
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, [showAngryLindsay]);

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

      {/* Warning Artifact — Real Photo */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="relative flex justify-center mb-16"
      >
        {/* Background echo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <img
            src={warningArtifact}
            alt=""
            className="w-[600px] h-auto opacity-[0.06] blur-[50px] scale-125 saturate-[0.4]"
          />
        </div>

        <div className="relative w-full max-w-md">
          {/* Shadow layers */}
          <div className="absolute inset-2 bg-foreground/5 rounded-lg blur-xl translate-y-3" />

          {/* Artifact card with image */}
          <div
            className="relative rounded-lg overflow-hidden shadow-lg shadow-foreground/5"
            style={{
              padding: "8px",
              background:
                "linear-gradient(135deg, hsl(var(--parchment)), hsl(var(--card)), hsl(var(--parchment)))",
            }}
          >
            <div className="relative rounded-md overflow-hidden border border-border/30">
              {/* Tape strips */}
              <div className="absolute -top-1 left-8 w-16 h-5 bg-chapter-amber/30 rotate-[-2deg] rounded-sm z-10" />
              <div className="absolute -top-1 right-10 w-14 h-5 bg-chapter-amber/25 rotate-[3deg] rounded-sm z-10" />

              <img
                src={warningArtifact}
                alt="Lindsay's Warning: No one can touch my computer"
                className="w-full h-auto block"
                style={{
                  boxShadow: "inset 0 0 40px 10px hsl(var(--background) / 0.3)",
                }}
              />

              {/* Vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-md"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 50%, hsl(var(--background) / 0.25) 100%)",
                }}
              />
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-dust italic font-light tracking-wide">
            Artifact #007 — "The Warning" — date unknown, presumed eternal
          </p>
        </div>
      </motion.section>

      {/* Interactive Centerpiece — The Forbidden Machine */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <p className="text-xs text-muted-foreground/60 font-light mb-5 tracking-wide uppercase">
          The forbidden machine
        </p>

        {/* Large emoji computer */}
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          animate={
            isShaking
              ? {
                  x: [0, -8, 7, -5, 4, -2, 0],
                  rotate: [0, -2, 2, -1, 0.5, 0],
                }
              : {}
          }
          transition={{ duration: 0.45 }}
          className="relative group cursor-pointer focus:outline-none"
        >
          {/* Hover glow */}
          <div className="absolute -inset-8 bg-chapter-coral/0 group-hover:bg-chapter-coral/[0.08] rounded-full blur-2xl transition-all duration-700" />

          <div className="relative flex flex-col items-center gap-4">
            {/* The computer emoji */}
            <motion.div
              animate={
                hovering && !isShaking
                  ? { scale: [1, 1.05, 1], rotate: [0, -1, 1, 0] }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-8xl md:text-9xl select-none drop-shadow-lg"
            >
              🖥️
            </motion.div>

            {/* Screen message overlay */}
            <AnimatePresence mode="wait">
              {hovering && clickCount === 0 ? (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-muted-foreground/50"
                >
                  <MousePointerClick className="w-4 h-4" />
                  <span className="text-xs font-light">go ahead… click it</span>
                </motion.div>
              ) : clickCount > 0 ? (
                <motion.div
                  key={`msg-${clickCount}`}
                  initial={{ opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-4 py-2 rounded-lg bg-card border border-chapter-coral/20 shadow-sm max-w-xs text-center"
                >
                  <span className="text-sm text-chapter-coral font-medium leading-tight block">
                    {currentMessage}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  className="flex items-center gap-1.5 text-muted-foreground/30"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-light">Lindsay's Computer™</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {/* Click counter */}
        <AnimatePresence>
          {clickCount > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-xs text-dust/60 font-light italic"
            >
              Violations logged: {clickCount}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Angry Lindsay reveal */}
        <AnimatePresence>
          {showAngryLindsay && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 120 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              {/* Comic flash */}
              <motion.div
                initial={{ opacity: 1, scale: 1.5 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.4 }}
                className="absolute text-6xl pointer-events-none"
              >
                ⚡
              </motion.div>

              <div
                className="relative rounded-lg overflow-hidden shadow-xl shadow-foreground/10 border border-chapter-coral/20"
                style={{
                  padding: "6px",
                  background:
                    "linear-gradient(135deg, hsl(var(--chapter-coral) / 0.15), hsl(var(--card)), hsl(var(--chapter-coral) / 0.1))",
                }}
              >
                <div className="relative bg-card rounded-md p-8 md:p-10 text-center border border-border/30 max-w-sm">
                  <div className="text-6xl mb-4">😤</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    I TOLD YOU NOT TO TOUCH IT.
                  </h3>
                  <p className="text-sm text-muted-foreground font-light italic">
                    — Lindsay, visibly unimpressed
                  </p>

                  {/* Corner doodles */}
                  <div className="absolute top-3 left-3 text-xs text-chapter-coral/30 rotate-[-12deg]">
                    ⚠️
                  </div>
                  <div className="absolute top-3 right-3 text-xs text-chapter-coral/30 rotate-[8deg]">
                    🚫
                  </div>
                </div>
              </div>

              <p className="text-xs text-dust/50 italic font-light">
                You were warned. There were consequences.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </PageContainer>
  );
};

export default RestrictedArea;
