export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

// Must match a key in the icon map in src/components/features/tracks/track-icon.tsx.
export type TrackIconName = "Server" | "Cpu" | "Cloud" | "ShieldCheck" | "Code" | "Layers";

export interface TrackItem {
  title: string;
  slug: string;
  description: string;
  icon: TrackIconName;
}
