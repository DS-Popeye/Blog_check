import { CheckCircle2 } from 'lucide-react';
import { AuthorBlock } from '../components/AuthorBlock';
import { Newsletter } from '../components/Newsletter';

const principles = [
  'Write with clarity before novelty.',
  'Treat AI as a design material, not magic.',
  'Keep education human, rigorous, and measurable.',
];

export function AboutPage() {
  return (
    <main>
      <section className="page-hero about-hero">
        <p className="eyebrow">About</p>
        <h1>A content studio for careful technology thinking.</h1>
        <p>
          Signal & Study helps readers understand how emerging tools reshape research,
          teaching, and knowledge work without losing sight of people.
        </p>
      </section>

      <section className="section two-column">
        <div>
          <p className="eyebrow">Editorial Promise</p>
          <h2>Practical enough for teams. Thoughtful enough for educators.</h2>
        </div>
        <div className="stacked-copy">
          <p>
            We publish essays that connect product decisions, learning science, AI capability,
            and classroom reality. The goal is not hype. The goal is better judgment.
          </p>
          {principles.map((principle) => (
            <div className="principle" key={principle}>
              <CheckCircle2 size={20} />
              <span>{principle}</span>
            </div>
          ))}
        </div>
      </section>

      <AuthorBlock />
      <Newsletter />
    </main>
  );
}
