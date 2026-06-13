import { ReactNode } from 'react';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-6 py-10">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}
