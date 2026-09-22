import { faqs } from '@/lib/data';

export default function FAQPage() {
  return (
    <div className="space-y-4 py-10">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      {faqs.map((faq) => (
        <article key={faq.question} className="rounded border p-4">
          <h2 className="font-semibold">{faq.question}</h2>
          <p>{faq.answer}</p>
        </article>
      ))}
    </div>
  );
}
