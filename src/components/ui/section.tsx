export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-8">
        <h2
          id={`${id}-title`}
          className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
