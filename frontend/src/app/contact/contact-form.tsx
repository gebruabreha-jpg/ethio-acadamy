"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

const inputClass =
  "mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 aria-[invalid=true]:border-red-500 dark:border-zinc-700 dark:bg-zinc-900";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-green-300 bg-green-50 p-6 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
        <p className="font-semibold">Message sent</p>
        <p className="mt-1 text-sm">{state.message}</p>
      </div>
    );
  }

  const field = (name: keyof NonNullable<ContactFormState["errors"]>) => ({
    id: name,
    name,
    defaultValue: state.values?.[name],
    "aria-invalid": state.errors?.[name] ? true : undefined,
    "aria-describedby": state.errors?.[name] ? `${name}-error` : undefined,
  });

  const errorText = (name: keyof NonNullable<ContactFormState["errors"]>) =>
    state.errors?.[name] && (
      <p id={`${name}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
        {state.errors[name]}
      </p>
    );

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input {...field("name")} type="text" autoComplete="name" required className={inputClass} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input {...field("email")} type="email" autoComplete="email" required className={inputClass} />
          {errorText("email")}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium">
          Subject <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <input {...field("subject")} type="text" className={inputClass} />
        {errorText("subject")}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea {...field("message")} rows={6} required className={inputClass} />
        {errorText("message")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
