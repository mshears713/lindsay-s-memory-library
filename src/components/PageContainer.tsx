interface PageContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const PageContainer = ({ children, title, subtitle }: PageContainerProps) => {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-lg text-muted-foreground font-light">
            {subtitle}
          </p>
        )}
      </header>
      <div>{children}</div>
    </div>
  );
};

export default PageContainer;
