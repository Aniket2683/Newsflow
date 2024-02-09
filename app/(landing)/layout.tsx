const LandingLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
  return (
    <main className="h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 overflow-auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">
            {children}
        </div>
    </main>
  );
};

export default LandingLayout;