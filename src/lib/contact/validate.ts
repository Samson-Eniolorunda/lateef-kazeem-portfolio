export type ContactInput = {
  name: string;
  email: string;
  message: string;
  website: string;
};

export type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export type ValidationResult =
  { ok: true; value: ContactInput; spam: boolean } | { ok: false; errors: FieldErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Validates a contact submission. `website` is a honeypot: humans leave it empty. */
export function validateContact(raw: unknown): ValidationResult {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const value: ContactInput = {
    name: text(o.name),
    email: text(o.email),
    message: text(o.message),
    website: text(o.website),
  };
  const errors: FieldErrors = {};
  if (value.name.length < 2 || value.name.length > 100)
    errors.name = "Enter your name (2 to 100 characters).";
  if (!EMAIL.test(value.email) || value.email.length > 254)
    errors.email = "Enter a valid email address.";
  if (value.message.length < 10 || value.message.length > 4000)
    errors.message = "Enter a message (10 to 4000 characters).";
  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value, spam: value.website.length > 0 };
}
