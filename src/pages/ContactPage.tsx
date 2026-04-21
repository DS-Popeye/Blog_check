import { Mail, MapPin, MessageSquare } from 'lucide-react';
import { Newsletter } from '../components/Newsletter';

export function ContactPage() {
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
            <p>hello@signalstudy.example</p>
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

        <form className="contact-form">
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
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
            <textarea rows={6} placeholder="Tell us what you are thinking about." />
          </label>
          <button className="button" type="submit">
            Send message
          </button>
        </form>
      </section>

      <Newsletter />
    </main>
  );
}
