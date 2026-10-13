import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
          Go home
        </Link>
        <Link href="/courses" className="rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-semibold dark:border-zinc-700">
          Choose your track
        </Link>
      </div>
    </section>
  );
}
