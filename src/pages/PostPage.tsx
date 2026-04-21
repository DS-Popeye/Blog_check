import { ArrowLeft } from 'lucide-react';
import { Newsletter } from '../components/Newsletter';
import { NotFoundPage } from '../components/NotFoundPage';
import { PostCard } from '../components/PostCard';
import type { BlogPost } from '../data/posts';
import { usePageMeta } from '../hooks/usePageMeta';

type PostPageProps = {
  posts: BlogPost[];
  slug: string;
};

export function PostPage({ posts, slug }: PostPageProps) {
  const post = posts.find((item) => item.slug === slug);

  usePageMeta({
    title: post?.title ?? 'Page not found',
    description: post?.excerpt ?? 'The article you were looking for could not be found.',
    image: post?.image,
    path: post ? `/blog/${post.slug}` : '/404',
    type: post ? 'article' : 'website',
  });

  if (!post) return <NotFoundPage />;

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <article className="article">
        <a className="back-link" href="/blog">
          <ArrowLeft size={16} /> Back to blog
        </a>
        <div className="article-header">
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-meta">
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
        <img className="article-image" src={post.image} alt={post.title} />
        <div className="article-content">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>What to watch next</h2>
          <p>
            The strongest technology programs will pair faster tools with better judgment:
            clear evaluation, transparent workflows, and a willingness to revise assumptions
            as evidence changes.
          </p>
        </div>
      </article>

      <section className="section soft-band">
        <div className="section-header">
          <div>
            <p className="eyebrow">Related</p>
            <h2>Keep reading</h2>
          </div>
        </div>
        <div className="post-grid">
          {related.map((item) => (
            <PostCard key={item.slug} post={item} variant="compact" />
          ))}
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
