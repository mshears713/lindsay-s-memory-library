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
    blurb: "Our first companion. He followed us through different houses, new schools, and all the small changes that come with growing up — always finding his place by a window or at the foot of the bed, watching as we grew and changed. He lived a long, gentle life, a quiet thread woven through our family's story, steady and familiar no matter where we landed.",
    dateRange: "Cat · Childhood",
    accentColor: "chapter-amber",
    memoryLine: "He was the quiet constant through every chapter.",
    image: babyImg,
  },
  {
    name: "Lily",
    blurb: "A true New Jersey cat, famously bullied by the Holderith twins before she ever experienced the calmer rhythm of the Shears household. She never quite picked up the easygoing chill that most of our pets had, keeping her distance and tolerating affection strictly on her own terms. She was perfectly fine as long as you didn't get too close, a cautious little survivor whose story was shaped as much by where she started as by where she ended up.",
    dateRange: "Cat · New Jersey",
    accentColor: "chapter-lavender",
    memoryLine: "Cautious, independent, and perfectly herself.",
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
    blurb: "Dad's graduation gift was supposed to be a car, but Lindsay convinced him that what she really needed was a dog — and that's how Mickey found her way to us.\n\nWhat started as \"we are not getting a dog\" slowly turned into Dad's best-friend era — helped, no doubt, by sleeping late and never barking.\n\nMickey carried a kind of easy happiness that seemed to spill over onto everyone she met.\n\nGentle and full of quiet joy, Mickey had a way of making everyone she met feel chosen, as if her happiness existed just to be shared.",
    dateRange: "Dog · Rescued 🐾",
    accentColor: "chapter-rose",
    memoryLine: "Perfectly happy just going wherever Dad went.",
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
