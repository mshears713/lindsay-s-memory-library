import PageContainer from "@/components/PageContainer";
import researchImg from "@/assets/research-wing.jpg";

const ResearchWing = () => (
  <PageContainer title="Research Wing" subtitle="The professional side of things">
    <a
      href="https://paper-score.onrender.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
    >
      <img
        src={researchImg}
        alt="Lindsay's audiology workspace"
        className="w-full h-auto object-cover"
        loading="lazy"
      />
    </a>
  </PageContainer>
);

export default ResearchWing;
