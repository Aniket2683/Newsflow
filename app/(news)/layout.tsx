
export default async function NewsLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return(
        <div className="h-full">
            {children}
        </div>
    );
};
