import { marked } from 'marked';
import { parse } from 'yaml';

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  displayDate: string;
  author: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  body: string;
  html: string;
  readTime: string;
};

type PostFrontmatter = {
  title?: string;
  slug?: string;
  date?: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags?: string[] | string;
};

type ParsedMarkdown = {
  data: PostFrontmatter;
  content: string;
};

const markdownFiles = import.meta.glob<string>('/content/posts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

function requireString(value: unknown, field: keyof PostFrontmatter, filePath: string) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Missing required frontmatter field "${field}" in ${filePath}`);
  }

  return value.trim();
}

function normalizeTags(tags: PostFrontmatter['tags'], filePath: string) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  throw new Error(`Missing required frontmatter field "tags" in ${filePath}`);
}

function getReadTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function parseMarkdownWithFrontmatter(filePath: string, rawMarkdown: string): ParsedMarkdown {
  if (!rawMarkdown.startsWith('---')) {
    throw new Error(`Missing YAML frontmatter block in ${filePath}`);
  }

  const closingFenceIndex = rawMarkdown.indexOf('\n---', 3);
  if (closingFenceIndex === -1) {
    throw new Error(`Unclosed YAML frontmatter block in ${filePath}`);
  }

  const frontmatterBlock = rawMarkdown.slice(3, closingFenceIndex).trim();
  const content = rawMarkdown.slice(closingFenceIndex + 4).trim();
  const data = parse(frontmatterBlock) as PostFrontmatter;

  return { data, content };
}

function parsePost(filePath: string, rawMarkdown: string): BlogPost {
  const parsed = parseMarkdownWithFrontmatter(filePath, rawMarkdown);
  const frontmatter = parsed.data;
  const date = requireString(frontmatter.date, 'date', filePath);

  return {
    title: requireString(frontmatter.title, 'title', filePath),
    slug: requireString(frontmatter.slug, 'slug', filePath),
    date,
    displayDate: formatDate(date),
    author: requireString(frontmatter.author, 'author', filePath),
    excerpt: requireString(frontmatter.excerpt, 'excerpt', filePath),
    coverImage: requireString(frontmatter.coverImage, 'coverImage', filePath),
    category: requireString(frontmatter.category, 'category', filePath),
    tags: normalizeTags(frontmatter.tags, filePath),
    body: parsed.content.trim(),
    html: marked.parse(parsed.content, { async: false }) as string,
    readTime: getReadTime(parsed.content),
  };
}

export const posts = Object.entries(markdownFiles)
  .map(([filePath, rawMarkdown]) => parsePost(filePath, rawMarkdown))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAllTags() {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}
