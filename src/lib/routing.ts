export type Route =
  | { name: 'home' }
  | { name: 'blog' }
  | { name: 'post'; slug: string }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'notFound' };

export function getRoute(pathname = window.location.pathname): Route {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/') return { name: 'home' };
  if (path === '/blog') return { name: 'blog' };
  if (path === '/about') return { name: 'about' };
  if (path === '/contact') return { name: 'contact' };
  if (path.startsWith('/blog/')) return { name: 'post', slug: path.split('/').pop() ?? '' };

  return { name: 'notFound' };
}
