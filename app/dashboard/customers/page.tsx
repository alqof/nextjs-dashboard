import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { fetchSummaryCustomers } from '@/app/lib/data';
import { BtnCreateCustomer } from '@/app/ui/customers/button-crud';
import { Suspense } from 'react';


export const metadata: Metadata = {
    title: 'Acme Dashboard | Customers',
};

export default async function Page(){
    const customers = await fetchSummaryCustomers();

    return (
        <div className="w-full">
            <h1 className={`mb-3 font-bold ${lusitana.className} text-xl md:text-3xl`}> Customers </h1>

            {/* <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                <Search placeholder="Search customers..." />
            </div> */}
            <div className="flex items-center justify-between gap-2 mt-4 md:mt-8">
                <Suspense fallback={null}>
                    <Search placeholder="Search customers..." />
                </Suspense>
                <BtnCreateCustomer />
            </div>
            
            <CustomersTable customers={customers} />
        </div>
    );
}