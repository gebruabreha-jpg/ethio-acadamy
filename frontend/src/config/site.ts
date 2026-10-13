// src/config/site.ts

import type { NavItem, TrackItem } from "@/types";

export const siteConfig = {
  name: "Ethio Infra Academy",
  shortName: "EthioInfra",
  tagline: "From Datacenter Racks to Distributed Systems — Master the Full Infrastructure Stack",
  description:
    "In-depth courses and weekly technical deep-dives across six tracks: Enterprise Datacenter, AI Datacenter & Compute, Cloud & DevOps, Platform and Security Engineering, Backend Engineering, and System Design & Scale.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Main Navigation Routes
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Courses & Training", href: "/courses" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ] as const satisfies readonly NavItem[],

  // Core Learning Tracks (6 Track Architecture) — each is served at /courses/[slug]
  // and owns its articles (planned: /courses/[slug]/[postSlug]); there is no global posts section.
  tracks: [
    {
      title: "Enterprise Datacenter",
      slug: "enterprise-datacenter",
      description: "Bare-metal infrastructure, SAN/NAS storage, enterprise networking, rack layout, and high availability.",
      icon: "Server",
    },
    {
      title: "AI Datacenter & Compute",
      slug: "ai-datacenter",
      description: "GPU clusters (NVIDIA/AMD), InfiniBand/RoCE fabrics, liquid cooling, high-density power, and AI cluster networking.",
      icon: "Cpu",
    },
    {
      title: "Cloud & DevOps",
      slug: "cloud-devops",
      description: "Kubernetes orchestration, Terraform IaC, multi-cloud architectures (AWS/Azure/GCP), and CI/CD pipelines.",
      icon: "Cloud",
    },
    {
      title: "Platform and Security Engineering",
      slug: "platform-security",
      description: "Zero Trust architecture, IAM policy design, secrets management, hardware security modules (HSM), and compliance.",
      icon: "ShieldCheck",
    },
    {
      title: "Backend Engineering",
      slug: "backend-engineering",
      description: "High-performance Go systems, concurrency models, memory management, and database query optimization.",
      icon: "Code",
    },
    {
      title: "System Design & Scale",
      slug: "system-design",
      description: "Distributed rate-limiters, consensus protocols (Raft/Paxos), message queues, and global caching.",
      icon: "Layers",
    },
  ] as const satisfies readonly TrackItem[],
} as const;

export type SiteConfig = typeof siteConfig;
export type Track = (typeof siteConfig.tracks)[number];
export type TrackSlug = Track["slug"];

export function getTrack(slug: string): Track | undefined {
  return siteConfig.tracks.find((t) => t.slug === slug);
}
