export default function Loading() {
  return (
    <div className="flex justify-center px-4 py-28" role="status">
      <span className="size-8 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600 dark:border-zinc-800 dark:border-t-indigo-400" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
