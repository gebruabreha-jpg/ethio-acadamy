import { Cloud, Code, Cpu, Layers, Server, ShieldCheck, type LucideIcon, type LucideProps } from "lucide-react";
import type { TrackIconName } from "@/types";

// Record<TrackIconName, …> makes a missing or misspelled icon a compile error.
const icons: Record<TrackIconName, LucideIcon> = { Server, Cpu, Cloud, ShieldCheck, Code, Layers };

export function TrackIcon({ name, ...props }: { name: TrackIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden {...props} />;
}
