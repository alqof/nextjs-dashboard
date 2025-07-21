'use client'

import { EnvelopeIcon, PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createCustomer, StateCustomer } from '@/app/lib/actions';



export default function FormCreate(){
  const initialState: StateCustomer = {message: null, errors: {}};
  const [state, formAction] = useActionState(createCustomer, initialState);
  const maxSize = 1024 * 1024;
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-medium"> Name </label>
          <div className="relative">
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            <input
              id="customerName"
              className="peer block w-full py-2 pl-10 rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
              name="name"
              type="text"
              step="0.01"
              placeholder="Full Name"
              aria-describedby="customerName-error"
            />
          </div>

          <div id="customerName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name && state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-medium"> Email </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <input
                id="customerEmail"
                className="peer block w-full py-2 pl-10 rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
                name="email"
                type="email"
                step="0.01"
                placeholder="Enter email"
                aria-describedby="email-error"
              />
            </div>
          </div>

          <div id="customerEmail-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email && state.errors.email.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="" className="mb-2 block text-sm font-medium"> Upload Image </label>
          <div className="relative w-full mt-2 rounded-md border border-gray-200">
            <PhotoIcon className="pointer-events-none absolute left-3 bottom-1 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

              <div className="p-3">
                {imagePreview ? (
                  <div
                  className="w-52 h-52 rounded-md"
                  style={{
                    backgroundImage: `url(${imagePreview})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  />
                ) : (
                  <div
                  className="w-52 h-52 rounded-md"
                  style={{
                    backgroundImage: `url(/customers/default.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  />
                )}
              </div>

            <input
              id="customerImage"
              className="peer block py-2 pl-10 rounded-md text-sm outline-2 placeholder:text-gray-500"
              name="image_url"
              type="file"
              step="0.01"
              aria-describedby="customerImage-error"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && file.size > maxSize) {
                  e.target.value = '';
                  alert('File size exceeds 1MB limit.');
                  setImagePreview(null);
                  return;
                }
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(null);
                }
              }}
            />
          </div>

          <div id="customerImage-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url && state.errors.image_url.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/customers" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"> Cancel </Link>
        <Button type="submit"> Add Customer </Button>
      </div>
    </form>
  );
}
