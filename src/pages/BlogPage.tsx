import { PostCard } from '../components/PostCard';
import { SectionHeader } from '../components/SectionHeader';
import type { BlogPost } from '../data/posts';

type BlogPageProps = {
  posts: BlogPost[];
};

export function BlogPage({ posts }: BlogPageProps) {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">All Articles</p>
        <h1>Field notes on AI, research, and learning.</h1>
        <p>
          Browse practical essays written for builders, educators, and research-minded teams.
        </p>
      </section>

      <section className="section">
        <div className="tag-cloud" aria-label="Popular tags">
          {tags.map((tag) => (
            <a href="/blog" key={tag}>
              {tag}
            </a>
          ))}
        </div>
      </section>

      <section className="section soft-band">
        <SectionHeader title="Latest posts" text="Sample CMS-ready content stored as typed data." />
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
