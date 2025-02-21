'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
})
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData){
    // ===> You'll notice that amount is of type string and not number. 
    // ===> This is because input elements with type="number" actually return a string, not a number!
    // const rawFormData = {
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status'),
    // };
    // console.log(rawFormData);
    // console.log(typeof rawFormData.customerId);
    // console.log(typeof rawFormData.amount);
    // console.log(typeof rawFormData.status);



    // ===> using zod
    // validating and ensure it's in the correct format and with the correct types.
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100; // it means store monetary values in cents($4.02) in your database to eliminate JavaScript floating-point errors and ensure greater accuracy.
    const date = new Date().toISOString().split('T')[0];
    // console.log(typeof customerId);
    // console.log(typeof amount);
    // console.log(typeof status);

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}


// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}


export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  }
  