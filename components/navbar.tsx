import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {

    const pathname = usePathname();

    const routes = [
        {
            href: `/`,
            label: "Dashboard",
            active: pathname === `/`
        },
        {
            href: `/news`,
            label: "News",
            active: pathname === `/news`
        },
    ];

    return(
        <nav className="border-b-2 w-full h-20 p-7 text-xl font-medium text-gray-900 flex items-center space-x-4 lg:space-x-6">
            {routes.map((route) => (
                <Link 
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-lg font-medium transition-colors hover:text-primary", 
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}

export default Navbar;