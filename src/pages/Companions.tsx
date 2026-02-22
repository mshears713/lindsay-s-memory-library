import { motion } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import PetCard from "@/components/PetCard";

const companions = [
  {
    name: "Buddy",
    blurb: "The first one. Loyal beyond reason, always waiting at the door. Some bonds don't need words.",
    dateRange: "2005–2017",
    accentColor: "chapter-amber",
  },
  {
    name: "Luna",
    blurb: "Queen of the couch and guardian of all naps. She chose us — not the other way around.",
    dateRange: "2012–present",
    accentColor: "chapter-lavender",
  },
  {
    name: "Mochi",
    blurb: "Small, chaotic, and absolutely convinced the world revolves around treat time.",
    dateRange: "2018–present",
    accentColor: "chapter-coral",
  },
  {
    name: "Oliver",
    blurb: "The quiet one. Preferred windowsills and warm laundry over anything else in life.",
    dateRange: "2010–2020",
    accentColor: "chapter-sage",
  },
  {
    name: "Pepper",
    blurb: "Arrived unexpectedly, stayed permanently. Expert at stealing socks and hearts equally.",
    dateRange: "2021–present",
    accentColor: "chapter-sky",
  },
  {
    name: "Rosie",
    blurb: "The gentle giant. Afraid of thunderstorms, brave about everything else.",
    dateRange: "2015–present",
    accentColor: "chapter-rose",
  },
];

const Companions = () => (
  <PageContainer title="Companions" subtitle="The ones who made every chapter warmer">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="text-sm text-muted-foreground/60 font-light italic mb-10 -mt-4"
    >
      Every life needs a few good paws.
    </motion.p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {companions.map((pet, i) => (
        <PetCard key={pet.name} {...pet} index={i} />
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="text-center text-xs text-muted-foreground/50 font-light italic mt-16"
    >
      more companions to come…
    </motion.p>
  </PageContainer>
);

export default Companions;
