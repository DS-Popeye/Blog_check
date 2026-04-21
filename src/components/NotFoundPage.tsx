import { usePageMeta } from '../hooks/usePageMeta';

export function NotFoundPage() {
  usePageMeta({
    title: 'Page not found',
    description: 'The page you were looking for could not be found.',
    path: '/404',
  });

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow">404</p>
        <h1>This page is outside the archive.</h1>
        <p>The link may be outdated, or the article may have moved.</p>
        <a className="button" href="/blog">
          Browse articles
        </a>
      </section>
    </main>
  );
}
