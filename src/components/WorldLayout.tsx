import { Link, useLocation } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WorldLayoutProps {
  children: React.ReactNode;
}

const WorldLayout = ({ children }: WorldLayoutProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Ambient background texture */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-glow/5 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-chapter-sage/8 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/6 w-64 h-64 bg-chapter-rose/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "4s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="flex items-center gap-2.5 group">
          <BookOpen className="w-5 h-5 text-primary transition-transform group-hover:scale-110" />
          <span className="font-display text-lg font-medium text-foreground tracking-tight">
            Lindsay's Memory Library
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
