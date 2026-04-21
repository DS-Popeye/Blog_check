import { ArrowUpRight } from 'lucide-react';
import type { BlogPost } from '../data/posts';

type PostCardProps = {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
};

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  return (
    <article className={`post-card post-card-${variant}`}>
      <a className="post-image-link" href={`/blog/${post.slug}`} aria-label={post.title}>
        <img src={post.image} alt={post.title} loading="lazy" />
      </a>
      <div className="post-card-body">
        <div className="meta-row">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3>
          <a href={`/blog/${post.slug}`}>{post.title}</a>
        </h3>
        <p>{post.excerpt}</p>
        <a className="text-link" href={`/blog/${post.slug}`}>
          Read article <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  );
}
