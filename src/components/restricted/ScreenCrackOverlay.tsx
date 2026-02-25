import { motion, AnimatePresence } from "framer-motion";

interface ScreenCrackOverlayProps {
  damageLevel: number; // 0-5
  onBoomComplete?: () => void;
}

// Each crack group: main path + branch paths for organic look
const crackGroups = [
  // Level 1 — top-right impact
  {
    main: "M 70 0 L 66 8 L 63 15 L 60 18 L 63 25 L 58 32 L 55 38",
    branches: [
      "M 63 25 L 67 28 L 70 30",
      "M 63 15 L 58 14 L 55 16",
      "M 55 38 L 52 37 L 50 39",
    ],
    hairlines: [
      "M 66 8 L 68 10",
      "M 60 18 L 57 19",
      "M 55 38 L 56 42 L 54 45",
    ],
  },
  // Level 2 — left side fracture
  {
    main: "M 20 0 L 22 10 L 25 18 L 23 26 L 27 34 L 24 44 L 22 52",
    branches: [
      "M 25 18 L 30 20 L 34 19",
      "M 27 34 L 32 35 L 35 33",
      "M 22 52 L 18 54 L 16 53",
      "M 22 10 L 18 11 L 16 13",
    ],
    hairlines: [
      "M 23 26 L 20 27",
      "M 24 44 L 21 45",
      "M 27 34 L 26 39 L 28 43",
    ],
  },
  // Level 3 — bottom-center rising
  {
    main: "M 50 100 L 52 92 L 49 82 L 52 74 L 50 64 L 48 57 L 51 48",
    branches: [
      "M 49 82 L 44 78 L 40 79",
      "M 50 64 L 55 60 L 58 61",
      "M 51 48 L 47 45 L 45 47",
      "M 52 92 L 56 90 L 58 91",
    ],
    hairlines: [
      "M 52 74 L 55 72",
      "M 48 57 L 45 55",
      "M 49 82 L 47 86 L 48 89",
      "M 51 48 L 54 46 L 53 43",
    ],
  },
  // Level 4 — diagonal stress fracture
  {
    main: "M 84 100 L 80 90 L 76 78 L 74 70 L 72 60 L 70 52 L 72 42 L 68 32 L 66 22",
    branches: [
      "M 76 78 L 71 74 L 67 75",
      "M 72 60 L 77 56 L 80 57",
      "M 72 42 L 67 38 L 64 39",
      "M 66 22 L 70 19 L 73 20",
      "M 80 90 L 84 88 L 86 89",
    ],
    hairlines: [
      "M 74 70 L 77 68",
      "M 70 52 L 67 50",
      "M 68 32 L 71 30",
      "M 76 78 L 74 82 L 76 86",
      "M 72 42 L 70 46 L 72 50",
    ],
  },
];

const comicTexts = [
  null,
  null,
  "uh oh…",
  "this is bad…",
  null,
];

const ScreenCrackOverlay = ({ damageLevel }: ScreenCrackOverlayProps) => {
  if (damageLevel <= 0) return null;

  const isBoom = damageLevel >= 5;
  const visibleCracks = Math.min(damageLevel, 4);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 pointer-events-none"
      >
        {/* Dim background */}
        <div
          className="absolute inset-0 bg-foreground/[var(--dim)] transition-all duration-500"
          style={{ "--dim": `${Math.min(damageLevel * 0.06, 0.3)}` } as React.CSSProperties}
        />

        {/* Crack SVG layer */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            {/* Glow filter for depth highlight */}
            <filter id="crack-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.15" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Shadow offset for depth */}
            <filter id="crack-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feOffset dx="0.15" dy="0.15" in="SourceGraphic" result="offset" />
              <feGaussianBlur in="offset" stdDeviation="0.12" result="blur" />
              <feFlood floodColor="hsl(var(--foreground))" floodOpacity="0.15" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {crackGroups.slice(0, visibleCracks).map((group, groupIdx) => {
            const isNewest = groupIdx === visibleCracks - 1;
            const stagger = isNewest ? 0.06 : 0;

            return (
              <g key={groupIdx}>
                {/* Shadow layer — dark edge */}
                <motion.path
                  d={group.main}
                  fill="none"
                  stroke="hsl(var(--foreground) / 0.12)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  filter="url(#crack-shadow)"
                  initial={isNewest ? { pathLength: 0, opacity: 0 } : {}}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: isNewest ? 0.35 : 0, ease: "easeOut" }}
                />

                {/* Main crack — varied weight */}
                <motion.path
                  d={group.main}
                  fill="none"
                  stroke="hsl(var(--foreground) / 0.7)"
                  strokeWidth="0.35"
                  strokeLinecap="round"
                  filter="url(#crack-glow)"
                  initial={isNewest ? { pathLength: 0, opacity: 0 } : {}}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: isNewest ? 0.3 : 0, ease: "easeOut" }}
                />

                {/* Highlight edge — inner light */}
                <motion.path
                  d={group.main}
                  fill="none"
                  stroke="hsl(var(--parchment) / 0.25)"
                  strokeWidth="0.15"
                  strokeLinecap="round"
                  strokeDasharray="1 2"
                  initial={isNewest ? { pathLength: 0, opacity: 0 } : {}}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: isNewest ? 0.35 : 0, delay: stagger, ease: "easeOut" }}
                />

                {/* Branch cracks — thinner, staggered */}
                {group.branches.map((branch, i) => (
                  <motion.path
                    key={`branch-${groupIdx}-${i}`}
                    d={branch}
                    fill="none"
                    stroke="hsl(var(--foreground) / 0.5)"
                    strokeWidth="0.22"
                    strokeLinecap="round"
                    initial={isNewest ? { pathLength: 0, opacity: 0 } : {}}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: isNewest ? 0.2 : 0,
                      delay: isNewest ? 0.15 + i * stagger : 0,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Hairline fractures — very thin, subtle */}
                {group.hairlines.map((line, i) => (
                  <motion.path
                    key={`hair-${groupIdx}-${i}`}
                    d={line}
                    fill="none"
                    stroke="hsl(var(--foreground) / 0.25)"
                    strokeWidth="0.1"
                    strokeLinecap="round"
                    initial={isNewest ? { pathLength: 0, opacity: 0 } : {}}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: isNewest ? 0.15 : 0,
                      delay: isNewest ? 0.25 + i * 0.04 : 0,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Stress micro-dots at junctions */}
                {damageLevel >= 3 && groupIdx < visibleCracks && (
                  <>
                    <motion.circle
                      cx={group.main.match(/M\s([\d.]+)\s([\d.]+)/)?.[1] || "50"}
                      cy={group.main.match(/M\s([\d.]+)\s([\d.]+)/)?.[2] || "50"}
                      r="0.4"
                      fill="hsl(var(--foreground) / 0.15)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    />
                  </>
                )}
              </g>
            );
          })}
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
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-chapter-amber/30"
              />

              <motion.div
                initial={{ scale: 0.2, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 8, stiffness: 100 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 3, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="absolute -inset-16 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5] }}
                          transition={{ duration: 1.2, delay: i * 0.05, repeat: Infinity, repeatDelay: 3 }}
                          className="absolute top-1/2 left-1/2 w-3 h-12 bg-chapter-amber/40 rounded-full origin-bottom"
                          style={{ transform: `translate(-50%, -100%) rotate(${i * 45}deg)` }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-6xl md:text-8xl font-display font-black text-chapter-coral drop-shadow-lg select-none"
                      style={{
                        textShadow: "3px 3px 0 hsl(var(--chapter-amber) / 0.5), -1px -1px 0 hsl(var(--chapter-coral) / 0.3)",
                        WebkitTextStroke: "2px hsl(var(--chapter-coral) / 0.2)",
                      }}
                    >
                      BOOM!
                    </span>
                  </motion.div>

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
                        background: "linear-gradient(135deg, hsl(var(--chapter-coral) / 0.15), hsl(var(--card)), hsl(var(--chapter-coral) / 0.1))",
                      }}
                    >
                      <div className="bg-card rounded-lg p-6 md:p-8 text-center max-w-xs">
                        <div className="text-7xl mb-3">😤</div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
                          I TOLD YOU<br />NOT TO TOUCH IT.
                        </h3>
                        <div className="w-12 h-px bg-chapter-coral/30 mx-auto my-3" />
                        <p className="text-sm text-muted-foreground font-light italic">
                          — Lindsay, visibly unimpressed
                        </p>
                      </div>
                    </div>
                    {["⚡", "💥", "🚫", "☠️"].map((emoji, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: [-20, -60], x: [0, (i % 2 === 0 ? 1 : -1) * 30] }}
                        transition={{ duration: 1.5, delay: 0.8 + i * 0.15, repeat: Infinity, repeatDelay: 4 }}
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
