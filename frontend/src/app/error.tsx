"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Error</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">An unexpected error occurred. Please try again.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Try again
      </button>
    </section>
  );
}
