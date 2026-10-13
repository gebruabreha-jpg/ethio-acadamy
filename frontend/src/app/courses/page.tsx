import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { TrackCard } from "@/components/features/tracks/track-card";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Courses & Training",
  description: "Explore the six learning tracks: datacenter, AI compute, cloud, security, backend, and system design.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader eyebrow="Courses & Training" title="Choose your track">
        Each track is a structured path from fundamentals to production-grade practice.
      </PageHeader>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.tracks.map((track) => (
            <TrackCard key={track.slug} track={track} />
          ))}
        </div>
      </section>
    </>
  );
}
