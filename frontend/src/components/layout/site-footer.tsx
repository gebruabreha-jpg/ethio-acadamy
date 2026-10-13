import Link from "next/link";
import { cacheLife } from "next/cache";
import { siteConfig } from "@/config/site";

// new Date() is not allowed in a prerendered shell with cacheComponents; caching it makes it static.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold">Site</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {siteConfig.mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Tracks">
          <p className="text-sm font-semibold">Tracks</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {siteConfig.tracks.map((track) => (
              <li key={track.slug}>
                <Link href={`/courses/${track.slug}`} className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  {track.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-zinc-200 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800">
        © <CurrentYear /> {siteConfig.name}
      </div>
    </footer>
  );
}
