import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { TrackIcon } from "@/components/features/tracks/track-icon";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `What ${siteConfig.name} is, who it's for, and how the learning tracks are organized.`,
};

// TODO: replace the copy below with your own story, team, and background.
const principles = [
  {
    title: "Production first",
    body: "Every topic is taught the way it runs in real environments — trade-offs, failure modes, and operations included.",
  },
  {
    title: "End to end",
    body: "From power and cooling in the datacenter to the request path in a Go service — the full stack, connected.",
  },
  {
    title: "Consistent cadence",
    body: "A new technical deep-dive every week, so your knowledge keeps pace with the field.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={`About ${siteConfig.name}`}>
        {siteConfig.description}
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight">Who it&apos;s for</h2>
        <p className="mt-4 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-400">
          Engineers who build and run serious systems — infrastructure, platform, SRE, security, and backend engineers —
          and anyone moving into those roles who wants depth rather than surface-level overviews.
        </p>

        <h2 className="mt-16 text-2xl font-bold tracking-tight">How we teach</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{p.body}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-2xl font-bold tracking-tight">The six tracks</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {siteConfig.tracks.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/courses/${t.slug}`}
                className="flex items-start gap-3 rounded-lg p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <TrackIcon name={t.icon} className="mt-0.5 size-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                <span>
                  <span className="font-medium">{t.title}</span>
                  <span className="block text-sm text-zinc-600 dark:text-zinc-400">{t.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
