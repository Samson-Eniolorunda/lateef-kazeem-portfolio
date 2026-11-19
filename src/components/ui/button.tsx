import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-colors";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  secondary: "border border-border bg-surface text-text hover:bg-surface-2",
};

export function buttonClass(variant: Variant = "primary") {
  return `${base} ${variants[variant]}`;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${buttonClass(variant)} ${className}`} {...props} />;
}

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={`${buttonClass(variant)} ${className}`} {...props} />;
}

/** Button row: secondary on the left, primary on the right, on every width. */
export function ButtonRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row justify-end gap-3">{children}</div>;
}
