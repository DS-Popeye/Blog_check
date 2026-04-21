export function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="brand footer-brand" href="/" aria-label="Signal and Study home">
          <span className="brand-mark">S</span>
          <span>Signal & Study</span>
        </a>
        <p>Clear thinking on AI, technology, research, and education.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
      <p className="copyright">© 2026 Signal & Study. All rights reserved.</p>
    </footer>
  );
}
