import { Suspense } from 'react';
import { inter, lusitana } from '@/app/ui/fonts';
import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchCardData, fetchRevenue, fetchLatestInvoices } from '@/app/lib/data';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';


export default async function Page(){
    // const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers} = await fetchCardData();
    // const revenue = await fetchRevenue();
    // const latestInvoices = await fetchLatestInvoices();

    return (
        <main>
            <h1 className={`mb-3 font-bold ${lusitana.className} text-xl md:text-3xl`}> Dashboard </h1>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <RevenueChart revenue={revenue}  /> */}
                {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}