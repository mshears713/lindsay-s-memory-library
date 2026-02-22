import PageContainer from "@/components/PageContainer";

const RestrictedArea = () => (
  <PageContainer title="Restricted Area" subtitle="You probably shouldn't be here">
    <div className="flex items-center justify-center min-h-[40vh] rounded-2xl border border-border bg-card/50">
      <p className="text-muted-foreground font-light italic">🚧 Chaos under construction 🚧</p>
    </div>
  </PageContainer>
);

export default RestrictedArea;
