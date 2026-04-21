import { Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('success');
  }

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
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <div>
          <Mail size={18} aria-hidden="true" />
          <input id="email" type="email" placeholder="you@example.com" required />
          <button className="button" type="submit">
            Subscribe
          </button>
        </div>
        {status === 'success' ? (
          <p className="form-status" role="status">
            Thanks. This static demo captured the signup locally; connect a form service before launch.
          </p>
        ) : null}
      </form>
    </section>
  );
}
