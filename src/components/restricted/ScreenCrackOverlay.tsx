import { motion, AnimatePresence } from "framer-motion";

interface ScreenCrackOverlayProps {
  damageLevel: number; // 0-5
  onBoomComplete?: () => void;
}

// SVG crack paths that progressively appear
const crackPaths = [
  // Level 1 — small crack top-right
  "M 65 0 L 58 12 L 62 18 L 55 32",
  // Level 2 — second crack from left
  "M 20 0 L 28 15 L 24 22 L 30 38 L 26 50",
  // Level 3 — crack from bottom
  "M 45 100 L 50 82 L 46 70 L 52 58 L 48 45",
  // Level 4 — diagonal stress crack
  "M 80 100 L 72 78 L 76 65 L 68 50 L 74 35 L 70 20",
];

const comicTexts = [
  null,
  null,
  "uh oh…",
  "this is bad…",
  null, // boom replaces text
];

const ScreenCrackOverlay = ({ damageLevel }: ScreenCrackOverlayProps) => {
  if (damageLevel <= 0) return null;

  const isBoom = damageLevel >= 5;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 pointer-events-none"
      >
        {/* Dim background — increases with damage */}
        <div
          className="absolute inset-0 bg-foreground/[var(--dim)] transition-all duration-500"
          style={{
            "--dim": `${Math.min(damageLevel * 0.06, 0.3)}`,
          } as React.CSSProperties}
        />

        {/* Crack SVG layer */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {crackPaths.slice(0, Math.min(damageLevel, 4)).map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke="hsl(var(--chapter-coral) / 0.5)"
              strokeWidth="0.3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: i === damageLevel - 1 ? 0 : 0 }}
            />
          ))}

          {/* Stress lines at level 3+ */}
          {damageLevel >= 3 &&
            [
              "M 40 30 L 42 32",
              "M 60 55 L 58 57",
              "M 30 70 L 33 68",
              "M 70 25 L 68 28",
              "M 50 50 L 52 48",
            ]
              .slice(0, damageLevel - 1)
              .map((d, i) => (
                <motion.path
                  key={`stress-${i}`}
                  d={d}
                  fill="none"
                  stroke="hsl(var(--chapter-coral) / 0.3)"
                  strokeWidth="0.2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              ))}
        </svg>

        {/* Comic text bubbles */}
        <AnimatePresence>
          {comicTexts[damageLevel - 1] && !isBoom && (
            <motion.div
              key={`comic-${damageLevel}`}
              initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 10 }}
              className="absolute top-[20%] right-[15%] bg-card border border-chapter-coral/20 rounded-xl px-4 py-2 shadow-lg"
            >
              <span className="text-sm font-display text-chapter-coral italic">
                {comicTexts[damageLevel - 1]}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOOM — Level 5 */}
        <AnimatePresence>
          {isBoom && (
            <>
              {/* Flash */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-chapter-amber/30"
              />

              {/* BOOM text */}
              <motion.div
                initial={{ scale: 0.2, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 8, stiffness: 100 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-6">
                  {/* Starburst */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 3, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    {/* Burst rays */}
                    <div className="absolute -inset-16 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5] }}
                          transition={{
                            duration: 1.2,
                            delay: i * 0.05,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          className="absolute top-1/2 left-1/2 w-3 h-12 bg-chapter-amber/40 rounded-full origin-bottom"
                          style={{
                            transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                          }}
                        />
                      ))}
                    </div>

                    <span className="text-6xl md:text-8xl font-display font-black text-chapter-coral drop-shadow-lg select-none"
                      style={{
                        textShadow: "3px 3px 0 hsl(var(--chapter-amber) / 0.5), -1px -1px 0 hsl(var(--chapter-coral) / 0.3)",
                        WebkitTextStroke: "2px hsl(var(--chapter-coral) / 0.2)",
                      }}
                    >
                      BOOM!
                    </span>
                  </motion.div>

                  {/* Angry Lindsay reveal */}
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", damping: 12 }}
                    className="relative"
                  >
                    <div
                      className="rounded-xl overflow-hidden shadow-2xl border-2 border-chapter-coral/30 bg-card"
                      style={{
                        padding: "6px",
                        background:
                          "linear-gradient(135deg, hsl(var(--chapter-coral) / 0.15), hsl(var(--card)), hsl(var(--chapter-coral) / 0.1))",
                      }}
                    >
                      <div className="bg-card rounded-lg p-6 md:p-8 text-center max-w-xs">
                        <div className="text-7xl mb-3">😤</div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
                          I TOLD YOU
                          <br />
                          NOT TO TOUCH IT.
                        </h3>
                        <div className="w-12 h-px bg-chapter-coral/30 mx-auto my-3" />
                        <p className="text-sm text-muted-foreground font-light italic">
                          — Lindsay, visibly unimpressed
                        </p>
                      </div>
                    </div>

                    {/* Floating emojis */}
                    {["⚡", "💥", "🚫", "☠️"].map((emoji, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: [-20, -60],
                          x: [0, (i % 2 === 0 ? 1 : -1) * 30],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: 0.8 + i * 0.15,
                          repeat: Infinity,
                          repeatDelay: 4,
                        }}
                        className="absolute text-xl pointer-events-none"
                        style={{
                          top: `${20 + i * 15}%`,
                          left: i % 2 === 0 ? "-20px" : "auto",
                          right: i % 2 !== 0 ? "-20px" : "auto",
                        }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-xs text-dust/50 italic font-light"
                  >
                    You were warned. There were consequences.
                  </motion.p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenCrackOverlay;
