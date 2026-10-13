import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — questions, feedback, or topic requests.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch">
        Questions about a track, feedback on an article, or a topic you want covered — send us a message.
      </PageHeader>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        <aside className="space-y-4">
          <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
            <Mail className="size-5 text-indigo-600 dark:text-indigo-400" aria-hidden />
            <p className="mt-3 font-semibold">What happens next</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Your message goes straight to our team. We&apos;ll reply to the email address you provide, usually within
              a few days.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
