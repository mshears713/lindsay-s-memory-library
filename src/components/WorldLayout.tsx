import { Link, useLocation } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

interface WorldLayoutProps {
  children: React.ReactNode;
}

/** Lightweight drifting dust particles — pure CSS, no heavy libs */
const DustParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
    {Array.from({ length: 18 }).map((_, i) => (
      <span
        key={i}
        className="dust-mote absolute rounded-full bg-foreground/[0.04]"
        style={{
          width: `${2 + (i % 4)}px`,
          height: `${2 + (i % 4)}px`,
          left: `${(i * 17 + 5) % 100}%`,
          top: `${(i * 23 + 10) % 100}%`,
          animationDelay: `${i * 1.6}s`,
          animationDuration: `${18 + (i % 6) * 4}s`,
        }}
      />
    ))}
  </div>
);

const WorldLayout = ({ children }: WorldLayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Minimal parallax: background moves at 30% of scroll speed
  useEffect(() => {
    const el = scrollRef.current;
    const bg = bgRef.current;
    if (!el || !bg) return;
    const onScroll = () => {
      bg.style.transform = `translateY(${el.scrollTop * 0.3}px)`;
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={scrollRef} className="relative min-h-screen bg-background bg-grain bg-vignette overflow-y-auto overflow-x-hidden">
      {/* Drifting dust atmosphere */}
      <DustParticles />

      {/* Ambient background texture — parallax layer */}
      <div ref={bgRef} className="fixed inset-0 pointer-events-none will-change-transform">
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-glow/6 rounded-full blur-[100px] animate-glow-pulse" />
        <div className="absolute bottom-[-10%] right-1/4 w-[420px] h-[420px] bg-chapter-sage/8 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-[10%] w-[320px] h-[320px] bg-chapter-rose/5 rounded-full blur-[80px] animate-glow-pulse" style={{ animationDelay: "4s" }} />
        <div className="absolute top-[60%] left-[8%] w-[260px] h-[260px] bg-chapter-sky/4 rounded-full blur-[90px] animate-glow-pulse" style={{ animationDelay: "6s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Future logo placeholder */}
          <div className="w-6 h-6 rounded-md border border-border/50 flex items-center justify-center bg-card/60 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-primary/70 transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span className="font-display text-sm font-medium text-muted-foreground tracking-wide uppercase">
            The Lindsay Archive
          </span>
        </Link>

        {!isHome && (
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>
        )}
      </nav>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export default WorldLayout;
