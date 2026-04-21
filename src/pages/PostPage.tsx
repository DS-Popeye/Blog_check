import { ArrowLeft } from 'lucide-react';
import { Newsletter } from '../components/Newsletter';
import { NotFoundPage } from '../components/NotFoundPage';
import { PostCard } from '../components/PostCard';
import { usePageMeta } from '../hooks/usePageMeta';
import type { BlogPost } from '../lib/posts';

type PostPageProps = {
  posts: BlogPost[];
  slug: string;
};

export function PostPage({ posts, slug }: PostPageProps) {
  const post = posts.find((item) => item.slug === slug);

  usePageMeta({
    title: post?.title ?? 'Page not found',
    description: post?.excerpt ?? 'The article you were looking for could not be found.',
    image: post?.coverImage,
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
            <span>{post.displayDate}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
        <img className="article-image" src={post.coverImage} alt={post.title} />
        <div className="article-content" dangerouslySetInnerHTML={{ __html: post.html }} />
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
