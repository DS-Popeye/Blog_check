import { ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';
import { AuthorBlock } from '../components/AuthorBlock';
import { Newsletter } from '../components/Newsletter';
import { PostCard } from '../components/PostCard';
import { SectionHeader } from '../components/SectionHeader';
import type { BlogPost } from '../data/posts';
import { usePageMeta } from '../hooks/usePageMeta';

type HomePageProps = {
  posts: BlogPost[];
};

const categories = ['AI Tools', 'Research', 'Education', 'Learning Design', 'Technology'];

export function HomePage({ posts }: HomePageProps) {
  usePageMeta({
    title: 'AI, Research, and Education Blog',
    description: 'Useful ideas for AI, technology, research workflows, and modern education.',
    path: '/',
  });

  const featured = posts.filter((post) => post.featured);
  const latest = posts.slice(2);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">AI, Research, Education</p>
          <h1>Useful ideas for a smarter learning future.</h1>
          <p>
            A polished editorial blog for practical essays on artificial intelligence,
            research workflows, digital learning, and the people shaping modern education.
          </p>
          <div className="hero-actions">
            <a className="button" href="/blog">
              Browse articles <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href="/about">
              About the journal
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Featured insight">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
            alt=""
          />
          <div>
            <span>Editor pick</span>
            <h2>How teams turn fast-moving AI research into usable knowledge.</h2>
          </div>
        </aside>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Featured"
          title="Deep reads for thoughtful builders"
          text="Hand-picked essays with practical framing and strong source awareness."
          action={{ href: '/blog', label: 'View all posts' }}
        />
        <div className="featured-grid">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} variant="featured" />
          ))}
        </div>
      </section>

      <section className="section soft-band">
        <SectionHeader
          eyebrow="Latest"
          title="Fresh from the notebook"
          text="Short, readable pieces on AI systems, educational design, and research practice."
        />
        <div className="post-grid">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="section category-section">
        <div className="category-copy">
          <p className="eyebrow">Explore Topics</p>
          <h2>Follow the questions that matter to your work.</h2>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const icons = [Sparkles, BookOpen, Layers];
            const Icon = icons[index % icons.length];
            return (
              <a className="category-card" href={`/blog?tag=${encodeURIComponent(category)}`} key={category}>
                <Icon size={20} />
                <span>{category}</span>
              </a>
            );
          })}
        </div>
      </section>

      <Newsletter />
      <AuthorBlock />
    </main>
  );
}
