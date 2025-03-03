'use client'; // error.tsx needs to be a Client Component.
 
import { useEffect } from 'react';

type ErrorProps = {
    error: Error & { digest?: string }; // This object is an instance of JavaScript's native Error object.
    reset: () => void; // This is a function to reset the error boundary. When executed, the function will try to re-render the route segment.
};
  
export default function Error({error, reset}: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    
    return (
        <main className="flex h-full flex-col items-center justify-center">
            {/* <h2 className="text-center"> Something went wrong! </h2> */}
            <h2 className="text-center"> {error.message} </h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={ ()=>reset() }
            >
                Try again
            </button>
        </main>
    );
}