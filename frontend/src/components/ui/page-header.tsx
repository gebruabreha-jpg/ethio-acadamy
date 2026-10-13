// Shared title block for inner pages (About, Courses, Contact, …).
export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">{children}</div>}
      </div>
    </section>
  );
}
