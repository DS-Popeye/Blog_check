import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Newsletter } from '../components/Newsletter';
import { site } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  usePageMeta({
    title: 'Contact',
    description: 'Contact Signal & Study for article pitches, research collaborations, and questions.',
    path: '/contact',
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('success');
  }

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Pitch a story, ask a question, or start a collaboration.</h1>
        <p>
          Use the form for editorial ideas, research partnerships, or questions about the
          publication.
        </p>
      </section>

      <section className="section contact-layout">
        <div className="contact-cards">
          <div className="info-card">
            <Mail size={20} />
            <h2>Email</h2>
            <p>{site.email}</p>
          </div>
          <div className="info-card">
            <MapPin size={20} />
            <h2>Location</h2>
            <p>Remote editorial studio</p>
          </div>
          <div className="info-card">
            <MessageSquare size={20} />
            <h2>Response time</h2>
            <p>Usually within two business days</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" required />
          </label>
          <label>
            Topic
            <select defaultValue="pitch">
              <option value="pitch">Article pitch</option>
              <option value="research">Research collaboration</option>
              <option value="general">General question</option>
            </select>
          </label>
          <label>
            Message
            <textarea rows={6} placeholder="Tell us what you are thinking about." required />
          </label>
          <button className="button" type="submit">
            Send message
          </button>
          {status === 'success' ? (
            <p className="form-status form-status-dark" role="status">
              Message noted locally. Add Netlify Forms, Formspree, or a CMS form endpoint before launch.
            </p>
          ) : null}
        </form>
      </section>

      <Newsletter />
    </main>
  );
}
