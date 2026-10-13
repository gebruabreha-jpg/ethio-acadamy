import "server-only";
import { apiFetch, isApiConfigured } from "@/lib/api";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(msg: ContactMessage): Promise<void> {
  if (!isApiConfigured()) {
    // Local development without the backend running: log instead of failing the form.
    console.warn("[contact] API_URL not set — message logged, not delivered", {
      name: msg.name,
      email: msg.email,
      subject: msg.subject,
    });
    return;
  }

  await apiFetch<void>("/api/v1/contact", {
    method: "POST",
    body: JSON.stringify(msg),
  });
}
