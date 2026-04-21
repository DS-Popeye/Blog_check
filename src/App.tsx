import { useMemo } from 'react';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { posts } from './data/posts';

type Route =
  | { name: 'home' }
  | { name: 'blog' }
  | { name: 'post'; slug: string }
  | { name: 'about' }
  | { name: 'contact' };

function getRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/') return { name: 'home' };
  if (path === '/blog') return { name: 'blog' };
  if (path === '/about') return { name: 'about' };
  if (path === '/contact') return { name: 'contact' };
  if (path.startsWith('/blog/')) return { name: 'post', slug: path.split('/').pop() ?? '' };

  return { name: 'home' };
}

function App() {
  const route = useMemo(getRoute, []);

  const page = (() => {
    if (route.name === 'blog') return <BlogPage posts={posts} />;
    if (route.name === 'about') return <AboutPage />;
    if (route.name === 'contact') return <ContactPage />;
    if (route.name === 'post') return <PostPage posts={posts} slug={route.slug} />;
    return <HomePage posts={posts} />;
  })();

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}

export default App;
