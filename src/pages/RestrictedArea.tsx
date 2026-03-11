import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lock, MousePointerClick } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import ScreenCrackOverlay from "@/components/restricted/ScreenCrackOverlay";
import warningArtifact from "@/assets/warning-artifact.jpg";

const warningMessages = [
  "I said DON'T.",
  "You're still clicking?",
  "This is a restricted area for a reason.",
  "Lindsay is watching.",
  "💥 BOOM.",
];

const RestrictedArea = () => {
  const [damageLevel, setDamageLevel] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleClick = useCallback(() => {
    setDamageLevel((prev) => Math.min(prev + 1, 5));
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  }, []);

  const shakeIntensity = Math.min(damageLevel, 4) * 2;
  const currentMessage =
    damageLevel > 0
      ? warningMessages[Math.min(damageLevel - 1, warningMessages.length - 1)]
      : null;

  return (
    <PageContainer title="Restricted Area" subtitle="Proceed at your own risk">
      {/* Progressive overlay */}
      <ScreenCrackOverlay damageLevel={damageLevel} />

      {/* Clearance Level Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 max-w-2xl"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldAlert className="w-5 h-5 text-chapter-coral" />
          <p className="text-sm font-medium text-chapter-coral tracking-wide uppercase">
            Clearance Level: Lindsay Only
          </p>
        </div>
      </motion.section>

      {/* Forbidden Machine — right below clearance level */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="flex flex-col items-center relative z-[40] mb-16"
      >
        <p className="text-xs text-muted-foreground/60 font-light mb-5 tracking-wide uppercase">
          The forbidden machine
        </p>

        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          animate={
            isShaking
              ? {
                  x: [0, -shakeIntensity, shakeIntensity, -shakeIntensity * 0.7, shakeIntensity * 0.5, -shakeIntensity * 0.2, 0],
                  rotate: [0, -shakeIntensity * 0.3, shakeIntensity * 0.3, -shakeIntensity * 0.15, 0],
                }
              : {}
          }
          transition={{ duration: 0.45 }}
          className="relative group cursor-pointer focus:outline-none"
          disabled={damageLevel >= 5}
        >
          <div className="absolute -inset-8 bg-chapter-coral/0 group-hover:bg-chapter-coral/[0.08] rounded-full blur-2xl transition-all duration-700" />

          <div className="relative flex flex-col items-center gap-4">
            <motion.div
              animate={
                hovering && !isShaking && damageLevel < 5
                  ? { scale: [1, 1.05, 1], rotate: [0, -1, 1, 0] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl md:text-9xl select-none drop-shadow-lg"
            >
              🖥️
            </motion.div>

            <AnimatePresence mode="wait">
              {hovering && damageLevel === 0 ? (
                <motion.div key="hint" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-muted-foreground/50">
                  <MousePointerClick className="w-4 h-4" />
                  <span className="text-xs font-light">go ahead… click it</span>
                </motion.div>
              ) : damageLevel > 0 && damageLevel < 5 ? (
                <motion.div key={`msg-${damageLevel}`} initial={{ opacity: 0, scale: 0.9, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} className="px-4 py-2 rounded-lg bg-card border border-chapter-coral/20 shadow-sm max-w-xs text-center">
                  <span className="text-sm text-chapter-coral font-medium">{currentMessage}</span>
                </motion.div>
              ) : damageLevel === 0 ? (
                <motion.div key="idle" className="flex items-center gap-1.5 text-muted-foreground/30">
                  <Lock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-light">Lindsay's Computer™</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.button>

        <AnimatePresence>
          {damageLevel > 0 && damageLevel < 5 && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-xs text-dust/60 font-light italic">
              Damage level: {damageLevel}/5
            </motion.p>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Warning Artifact */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        className="relative flex justify-center mb-16"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <img src={warningArtifact} alt="" className="w-[600px] h-auto opacity-[0.06] blur-[50px] scale-125 saturate-[0.4]" />
        </div>

        <div className="relative w-full max-w-md">
          <div className="absolute inset-2 bg-foreground/5 rounded-lg blur-xl translate-y-3" />
          <div
            className="relative rounded-lg overflow-hidden shadow-lg shadow-foreground/5"
            style={{ padding: "8px", background: "linear-gradient(135deg, hsl(var(--parchment)), hsl(var(--card)), hsl(var(--parchment)))" }}
          >
            <div className="relative rounded-md overflow-hidden border border-border/30">
              <div className="absolute -top-1 left-8 w-16 h-5 bg-chapter-amber/30 rotate-[-2deg] rounded-sm z-10" />
              <div className="absolute -top-1 right-10 w-14 h-5 bg-chapter-amber/25 rotate-[3deg] rounded-sm z-10" />
              <img src={warningArtifact} alt="Lindsay's Warning" className="w-full h-auto block" />
              <div className="absolute inset-0 pointer-events-none rounded-md" style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsl(var(--background) / 0.25) 100%)" }} />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-dust italic font-light tracking-wide">
            Artifact #007 — "The Warning" — date unknown, presumed eternal
          </p>
        </div>
      </motion.section>

      {/* Intro text — moved to bottom */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          Every library has a volume that doesn't belong on the shelf — one that
          smells faintly of mischief and was probably filed under "do not open."
          You found it. Congratulations. Or condolences.
        </p>
      </motion.section>
    </PageContainer>
  );
};

export default RestrictedArea;
