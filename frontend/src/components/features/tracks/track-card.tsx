import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrackIcon } from "@/components/features/tracks/track-icon";
import type { Track } from "@/config/site";

export function TrackCard({ track }: { track: Track }) {
  return (
    <Link
      href={`/courses/${track.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700"
    >
      <span className="grid size-11 place-items-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
        <TrackIcon name={track.icon} className="size-6" />
      </span>
      <h3 className="mt-4 text-lg font-semibold">{track.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{track.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
        Explore track
        <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
