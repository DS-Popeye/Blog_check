import { navLinks, site } from '../config/site';

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="brand footer-brand" href="/" aria-label={`${site.name} home`}>
          <span className="brand-mark">S</span>
          <span>{site.name}</span>
        </a>
        <p>{site.description}</p>
      </div>
      <nav aria-label="Footer navigation">
        {navLinks.slice(1).map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <p className="copyright">© 2026 Signal & Study. All rights reserved.</p>
    </footer>
  );
}
