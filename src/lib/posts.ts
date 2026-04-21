import { marked } from 'marked';
import { parse } from 'yaml';
import { site } from '../config/site';

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
  title?: unknown;
  slug?: unknown;
  date?: unknown;
  author?: unknown;
  excerpt?: unknown;
  coverImage?: unknown;
  category?: unknown;
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

function warnInvalidPost(filePath: string, message: string) {
  console.warn(`[content] Skipping invalid post ${filePath}: ${message}`);
}

function readString(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  return value.trim();
}

function readRequiredString(
  value: unknown,
  field: keyof PostFrontmatter | 'body',
  filePath: string,
  errors: string[],
) {
  const result = readString(value);
  if (!result) {
    errors.push(`missing or invalid "${field}"`);
  }

  return result;
}

function readOptionalString(value: unknown, fallback: string, field: keyof PostFrontmatter, filePath: string) {
  const result = readString(value);
  if (!result) {
    console.warn(`[content] Using fallback for "${field}" in ${filePath}`);
    return fallback;
  }

  return result;
}

function normalizeTags(tags: PostFrontmatter['tags'], filePath: string) {
  if (Array.isArray(tags)) {
    const normalized = tags.map((tag) => String(tag).trim()).filter(Boolean);
    if (normalized.length) return normalized;
  }

  if (typeof tags === 'string') {
    const normalized = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    if (normalized.length) return normalized;
  }

  console.warn(`[content] Using fallback for "tags" in ${filePath}`);
  return ['Uncategorized'];
}

function getReadTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function normalizeDate(value: unknown, filePath: string, errors: string[]) {
  let candidate: string | null = null;

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    candidate = value.toISOString().slice(0, 10);
  } else if (typeof value === 'string') {
    candidate = value.trim().slice(0, 10);
  }

  if (!candidate || !/^\d{4}-\d{2}-\d{2}$/.test(candidate)) {
    errors.push('missing or invalid "date"; expected YYYY-MM-DD');
    return null;
  }

  const parsed = new Date(`${candidate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== candidate) {
    errors.push(`invalid calendar date "${candidate}"`);
    return null;
  }

  if (typeof value === 'string' && value.trim() !== candidate) {
    console.warn(`[content] Normalized date "${value}" to "${candidate}" in ${filePath}`);
  }

  return candidate;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

function parseMarkdownWithFrontmatter(filePath: string, rawMarkdown: string): ParsedMarkdown | null {
  if (!rawMarkdown.startsWith('---')) {
    warnInvalidPost(filePath, 'missing YAML frontmatter block');
    return null;
  }

  const closingFenceIndex = rawMarkdown.indexOf('\n---', 3);
  if (closingFenceIndex === -1) {
    warnInvalidPost(filePath, 'unclosed YAML frontmatter block');
    return null;
  }

  const frontmatterBlock = rawMarkdown.slice(3, closingFenceIndex).trim();
  const content = rawMarkdown.slice(closingFenceIndex + 4).trim();
  const data = parse(frontmatterBlock) as PostFrontmatter | null;

  return { data: data ?? {}, content };
}

function parsePost(filePath: string, rawMarkdown: string): BlogPost | null {
  let parsed: ParsedMarkdown | null = null;

  try {
    parsed = parseMarkdownWithFrontmatter(filePath, rawMarkdown);
  } catch (error) {
    warnInvalidPost(filePath, error instanceof Error ? error.message : 'unable to parse frontmatter');
    return null;
  }

  if (!parsed) return null;

  const frontmatter = parsed.data;
  const errors: string[] = [];
  const title = readRequiredString(frontmatter.title, 'title', filePath, errors);
  const slug = readRequiredString(frontmatter.slug, 'slug', filePath, errors);
  const date = normalizeDate(frontmatter.date, filePath, errors);
  const excerpt = readRequiredString(frontmatter.excerpt, 'excerpt', filePath, errors);
  const body = readRequiredString(parsed.content, 'body', filePath, errors);

  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    errors.push(`invalid "slug" "${slug}"; expected lowercase letters, numbers, and hyphens`);
  }

  if (errors.length || !title || !slug || !date || !excerpt || !body) {
    warnInvalidPost(filePath, errors.join('; '));
    return null;
  }

  let html = '';
  try {
    html = marked.parse(body, { async: false }) as string;
  } catch (error) {
    warnInvalidPost(filePath, error instanceof Error ? error.message : 'unable to render markdown body');
    return null;
  }

  return {
    title,
    slug,
    date,
    displayDate: formatDate(date),
    author: readOptionalString(frontmatter.author, 'Signal & Study Editors', 'author', filePath),
    excerpt,
    coverImage: readOptionalString(frontmatter.coverImage, site.defaultImage, 'coverImage', filePath),
    category: readOptionalString(frontmatter.category, 'Uncategorized', 'category', filePath),
    tags: normalizeTags(frontmatter.tags, filePath),
    body,
    html,
    readTime: getReadTime(body),
  };
}

export const posts = Object.entries(markdownFiles)
  .map(([filePath, rawMarkdown]) => parsePost(filePath, rawMarkdown))
  .filter((post): post is BlogPost => post !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAllTags() {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}
