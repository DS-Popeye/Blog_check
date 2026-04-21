import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useState } from 'react';
import { navLinks, site } from '../config/site';

type HeaderProps = {
  currentPath: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

function isActive(href: string, currentPath: string) {
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href);
}

export function Header({ currentPath, theme, onToggleTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label={`${site.name} home`}>
        <span className="brand-mark">S</span>
        <span>{site.name}</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a
            aria-current={isActive(link.href, currentPath) ? 'page' : undefined}
            key={link.href}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="icon-button" href="/blog#search" aria-label="Search articles">
          <Search size={18} />
        </a>
        <button className="icon-button" type="button" aria-label="Toggle dark mode" onClick={onToggleTheme}>
          <ThemeIcon size={18} />
        </button>
        <button
          aria-expanded={isMenuOpen}
          className="icon-button mobile-only"
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {isMenuOpen ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              aria-current={isActive(link.href, currentPath) ? 'page' : undefined}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
