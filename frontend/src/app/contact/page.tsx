export default function ContactPage() {
  return (
    <div className="space-y-4 py-10">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <form className="grid max-w-xl gap-3 rounded border p-4">
        <input placeholder="Your Name" className="rounded border px-3 py-2" />
        <input type="email" placeholder="Your Email" className="rounded border px-3 py-2" />
        <textarea placeholder="Message" className="rounded border px-3 py-2" rows={5} />
        <button className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black">Send Message</button>
      </form>
    </div>
  );
}
