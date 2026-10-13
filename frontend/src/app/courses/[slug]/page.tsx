import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { TrackIcon } from "@/components/features/tracks/track-icon";
import { getTrack, siteConfig } from "@/config/site";

export function generateStaticParams() {
  return siteConfig.tracks.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata(props: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const track = getTrack(slug);
  return track ? { title: track.title, description: track.description } : {};
}

export default async function TrackPage(props: PageProps<"/courses/[slug]">) {
  const { slug } = await props.params;
  const track = getTrack(slug);
  if (!track) notFound();

  const otherTracks = siteConfig.tracks.filter((t) => t.slug !== track.slug);

  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="size-4" aria-hidden /> All tracks
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-xl bg-indigo-600 text-white">
              <TrackIcon name={track.icon} className="size-7" />
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{track.title}</h1>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">{track.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-xl font-semibold">Articles in this track</h2>
        {/* TODO: list this track's posts via a services/posts.ts call (e.g. GET /api/v1/tracks/{slug}/posts);
            each post page lives at /courses/[slug]/[postSlug]. */}
        <div className="mt-6 rounded-xl border border-dashed border-zinc-300 p-10 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          The first {track.title} articles are on their way.{" "}
          <Link href="/contact" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
            Suggest a topic
          </Link>
          .
        </div>

        <h2 className="mt-16 text-xl font-semibold">Other tracks</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherTracks.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/courses/${t.slug}`}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 p-4 hover:border-indigo-300 dark:border-zinc-800 dark:hover:border-indigo-700"
              >
                <TrackIcon name={t.icon} className="size-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium">{t.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
