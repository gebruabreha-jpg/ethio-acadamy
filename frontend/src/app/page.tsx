import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrackCard } from "@/components/features/tracks/track-card";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          {siteConfig.name}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{siteConfig.tagline}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">{siteConfig.description}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Choose your track <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Six learning tracks</h2>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            From the rack to the request path — pick a track and go deep.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.tracks.map((track) => (
              <TrackCard key={track.slug} track={track} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Have a question or a topic request?</h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
          Tell us what you want to learn next — we read every message.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Contact us
        </Link>
      </section>
    </>
  );
}
