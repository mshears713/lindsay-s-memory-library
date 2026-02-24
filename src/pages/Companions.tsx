import { motion } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import PetCard from "@/components/PetCard";
import babyImg from "@/assets/baby.jpg";
import lilyImg from "@/assets/lily.jpg";
import doughnutImg from "@/assets/doughnut.jpg";
import mickeyImg from "@/assets/mickey.jpg";

const companions = [
  {
    name: "Baby",
    blurb: "Our first love. She was there through every messy, beautiful year of growing up — curled at the foot of the bed, purring through homework and heartbreaks alike. She lived a long, gentle life and never once stopped choosing us.",
    dateRange: "Cat · Childhood",
    accentColor: "chapter-amber",
    memoryLine: "She was the quiet constant through every chapter.",
    image: babyImg,
  },
  {
    name: "Lily",
    blurb: "A scrappy little tabby we found in New Jersey. She had the sweetest face but the twins made her life a bit hard — they weren't always kind to her. She deserved softer days than she sometimes got.",
    dateRange: "Cat · New Jersey",
    accentColor: "chapter-lavender",
    memoryLine: "Tough little soul in a world that wasn't always gentle.",
    image: lilyImg,
  },
  {
    name: "Doughnut",
    blurb: "Our sweet, goofy girl. She didn't get enough oxygen as a puppy, so she's a little slow — but honestly, she loves harder than anyone because of it. Still here, still wagging, still the best part of every morning.",
    dateRange: "Dog · Still here 💛",
    accentColor: "chapter-coral",
    memoryLine: "A little slower, a lot more love.",
    image: doughnutImg,
  },
  {
    name: "Mickey",
    blurb: "My favorite. Lindsay saved her from the pound — she had mange, was probably days from being put down. But she came home, healed up, and became the happiest dog you've ever seen. Pure joy with a spotted nose.",
    dateRange: "Dog · Rescued 🐾",
    accentColor: "chapter-rose",
    memoryLine: "She got a second chance, and she made the most of every single day.",
    image: mickeyImg,
  },
];

const Companions = () => (
  <PageContainer title="Companions" subtitle="The ones who made every chapter warmer">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      className="text-sm text-muted-foreground/60 font-light italic mb-10 -mt-4"
    >
      Some souls stay with you long after they're gone.
    </motion.p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
      {companions.map((pet, i) => (
        <PetCard key={pet.name} {...pet} index={i} />
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.7 }}
      className="text-center text-xs text-muted-foreground/50 font-light italic mt-16"
    >
      every paw print leaves a mark on the heart.
    </motion.p>
  </PageContainer>
);

export default Companions;
