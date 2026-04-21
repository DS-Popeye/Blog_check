import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PostCard } from '../components/PostCard';
import { SectionHeader } from '../components/SectionHeader';
import { usePageMeta } from '../hooks/usePageMeta';
import type { BlogPost } from '../lib/posts';

type BlogPageProps = {
  posts: BlogPost[];
};

export function BlogPage({ posts }: BlogPageProps) {
  usePageMeta({
    title: 'Blog',
    description: 'Browse essays about AI, research workflows, education, and learning design.',
    path: '/blog',
  });

  const requestedTag = new URLSearchParams(window.location.search).get('tag');
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(requestedTag ?? 'All');
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag) || post.category === selectedTag;
      const searchable = [post.title, post.excerpt, post.category, post.author, ...post.tags]
        .join(' ')
        .toLowerCase();

      return matchesTag && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [posts, query, selectedTag]);

  const hasActiveFilters = selectedTag !== 'All' || query.trim().length > 0;

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">All Articles</p>
        <h1>Field notes on AI, research, and learning.</h1>
        <p>
          Browse practical essays written for builders, educators, and research-minded teams.
        </p>
      </section>

      <section className="section blog-controls" id="search">
        <label className="search-field" htmlFor="post-search">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search posts</span>
          <input
            id="post-search"
            type="search"
            placeholder="Search by title, topic, or author"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="tag-cloud" aria-label="Filter posts by tag">
          {['All', ...tags].map((tag) => (
            <button
              className={tag === selectedTag ? 'is-active' : ''}
              type="button"
              key={tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        {hasActiveFilters ? (
          <button
            className="clear-filter"
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedTag('All');
            }}
          >
            <X size={16} /> Clear filters
          </button>
        ) : null}
      </section>

      <section className="section soft-band">
        <SectionHeader
          title={filteredPosts.length === 1 ? '1 matching post' : `${filteredPosts.length} matching posts`}
          text="Sample CMS-ready content stored as typed data."
        />
        {filteredPosts.length ? (
          <div className="post-grid">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No posts found</h2>
            <p>Try a broader search term or clear the selected tag.</p>
          </div>
        )}
      </section>
    </main>
  );
}
