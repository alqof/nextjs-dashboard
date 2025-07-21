import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import FormCreate from '@/app/ui/customers/create-form';
 
export default async function Page() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                    { label:'Customers', href:'/dashboard/customers' },
                    { label:'Add Customer', href:'/dashboard/customers/create', active:true }
                ]}
            />

            <FormCreate/>
        </main>
    );
}