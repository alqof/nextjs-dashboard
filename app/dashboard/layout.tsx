import SideNav from '@/app/ui/dashboard/sidenav';

// The 'incremental' value allows you to adopt PPR for specific routes.
// https://nextjs.org/learn/dashboard-app/partial-prerendering
export const experimental_ppr = true;
 
export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            
            <div className="flex-grow px-3 py-4 md:overflow-y-auto">{children}</div>
        </div>
    );
}