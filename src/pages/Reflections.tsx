import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import saranacImg from "@/assets/saranac-lake.png?w=1600&format=webp&quality=80";
import pagosaImg from "@/assets/pagosa-springs.png?w=1600&format=webp&quality=80";
import cruiseImg from "@/assets/last-cruise.png?w=1600&format=webp&quality=80";
import saranacFull from "@/assets/saranac-lake.png?w=1600&format=webp&quality=90";
import pagosaFull from "@/assets/pagosa-springs.png?w=1600&format=webp&quality=90";
import cruiseFull from "@/assets/last-cruise.png?w=1600&format=webp&quality=90";

const memories = [
  { src: saranacImg as string, full: saranacFull as string, caption: "Where summer kept bringing us back." },
  { src: pagosaImg as string, full: pagosaFull as string, caption: "Where winter finally felt warm." },
  { src: cruiseImg as string, full: cruiseFull as string, caption: "We loved every minute. Aunt Bonnie… less so." },
];

const Reflections = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <PageContainer title="Our Little World" subtitle="Little reminders of the places we loved">
      <div className="flex flex-col gap-16 md:gap-24 mt-4">
        {memories.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div
              className="w-full max-w-3xl overflow-hidden rounded-xl border border-border/40 shadow-md cursor-pointer transition-shadow duration-500 hover:shadow-xl"
              onClick={() => setLightbox(i)}
            >
              <img
                src={m.src}
                alt={m.caption}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm md:text-base text-muted-foreground font-light italic tracking-wide text-center">
              {m.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={memories[lightbox].src}
              alt={memories[lightbox].caption}
              className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Reflections;
