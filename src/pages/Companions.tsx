import { motion } from "framer-motion";
import PageContainer from "@/components/PageContainer";
import PetCard from "@/components/PetCard";
import babyImg from "@/assets/baby.jpg";
import lilyImg from "@/assets/lily.jpg";
import doughnutImg from "@/assets/doughnut.jpg";
import mickeyImg from "@/assets/mickey.jpg";
import chaiImg from "@/assets/chai.jpg";
import mochaImg from "@/assets/mocha.jpg";

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
    blurb: "Born a chubby little chill-ball with a slightly scrambled start in life, he somehow evolved into Lindsay's chaotic sidekick — equal parts sweet, strange, and permanently confused. He's the kind of dog you don't fully understand but end up tolerating anyway, mostly because his weird little personality keeps things interesting (and occasionally gets him into trouble he absolutely didn't think through).",
    dateRange: "Dog · Still here 💛",
    accentColor: "chapter-coral",
    memoryLine: "Be sure to keep your stash out of reach.",
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
  {
    name: "Chai",
    blurb: "Chai showed up late but made himself right at home — more social than the other cats, a little playful, a lot chill, and somehow more dog than feline. He had a way of pulling Mom into full-on conversations, which we all found a little funny… but he didn't seem to mind being the one who opened that very chatty door.",
    dateRange: "Cat · Mom's sidekick",
    accentColor: "chapter-sage",
    memoryLine: "Mom's quiet little sidekick when she needed one most.",
    image: chaiImg,
  },
  {
    name: "Mocha",
    blurb: "Mocha showed up from the pound with a heart built for motion — part athlete, part chaos, and completely unforgettable. For a moment she looked like a low-energy upgrade… and then the shelter meds wore off and the real, turbo-charged Mocha made her dramatic entrance. Strong, fast, and always ready for the next adventure, she lives life at full speed, powered by endless fetch, ambitious digging projects, and an ongoing rivalry with light and shadows.",
    dateRange: "Dog · Pitbull 🐾",
    accentColor: "chapter-coral",
    memoryLine: "Overwhelming to most, her wild spirit fits right in with the energy of this family.",
    image: mochaImg,
    imagePosition: "center 20%",
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
