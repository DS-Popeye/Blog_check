import { Mail } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div>
        <p className="eyebrow">Weekly Briefing</p>
        <h2 id="newsletter-title">Ideas worth taking into your next study session.</h2>
        <p>
          Join researchers, educators, and builders getting concise notes on AI tools,
          learning systems, and thoughtful technology.
        </p>
      </div>
      <form className="signup-form">
        <label htmlFor="email">Email address</label>
        <div>
          <Mail size={18} aria-hidden="true" />
          <input id="email" type="email" placeholder="you@example.com" />
          <button className="button" type="submit">
            Subscribe
          </button>
        </div>
      </form>
    </section>
  );
}
