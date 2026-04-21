import { Menu, Search } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Signal and Study home">
        <span className="brand-mark">S</span>
        <span>Signal & Study</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Search">
          <Search size={18} />
        </button>
        <button className="icon-button mobile-only" type="button" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
