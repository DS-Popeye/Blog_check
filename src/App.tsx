import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { useTheme } from './hooks/useTheme';
import { getRoute } from './lib/routing';
import { posts } from './lib/posts';

function App() {
  const route = getRoute();
  const { theme, toggleTheme } = useTheme();

  const page = (() => {
    if (route.name === 'blog') return <BlogPage posts={posts} />;
    if (route.name === 'about') return <AboutPage />;
    if (route.name === 'contact') return <ContactPage />;
    if (route.name === 'post') return <PostPage posts={posts} slug={route.slug} />;
    if (route.name === 'notFound') return <NotFoundPage />;
    return <HomePage posts={posts} />;
  })();

  return (
    <>
      <Header currentPath={window.location.pathname} theme={theme} onToggleTheme={toggleTheme} />
      {page}
      <Footer />
    </>
  );
}

export default App;
