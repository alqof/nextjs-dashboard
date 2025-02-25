import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { fetchSummaryCustomers } from '@/app/lib/data';


export const metadata: Metadata = {
    title: 'Acme Dashboard | Customers',
};

export default async function Page(){
    const customers = await fetchSummaryCustomers();

    return (
        <div className="w-full">
            <h1 className={`mb-3 font-bold ${lusitana.className} text-xl md:text-3xl`}> Customers </h1>

            <Search placeholder="Search customers..." />

            {/* Table Customers */}
            <CustomersTable customers={customers} />
        </div>
    );
}