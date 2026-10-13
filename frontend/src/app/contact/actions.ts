"use server";

import { sendContactMessage } from "@/services/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
  values?: { name: string; email: string; subject: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Validate on the server too: Server Actions are reachable by direct POST, bypassing the form.
  const errors: ContactFormState["errors"] = {};
  if (values.name.length < 2 || values.name.length > 100) errors.name = "Please enter your name (2–100 characters).";
  if (!EMAIL_RE.test(values.email) || values.email.length > 254) errors.email = "Please enter a valid email address.";
  if (values.subject.length > 150) errors.subject = "Subject must be 150 characters or fewer.";
  if (values.message.length < 10 || values.message.length > 5000)
    errors.message = "Message must be between 10 and 5000 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  try {
    await sendContactMessage(values);
  } catch (err) {
    console.error("[contact] failed to send message", err);
    return {
      status: "error",
      message: "Sorry, we couldn't send your message. Please try again in a few minutes.",
      values,
    };
  }

  return { status: "success", message: "Thanks for reaching out — we'll get back to you soon." };
}
