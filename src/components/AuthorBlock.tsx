export function AuthorBlock() {
  return (
    <section className="author-block" aria-labelledby="author-title">
      <div className="author-photo" aria-hidden="true">
        S&S
      </div>
      <div>
        <p className="eyebrow">About the Publication</p>
        <h2 id="author-title">Written for people building the future of learning.</h2>
        <p>
          Signal & Study publishes practical essays for educators, researchers, product
          teams, and curious professionals who want technology to make learning more humane,
          rigorous, and useful.
        </p>
        <a className="button button-secondary" href="/about">
          Learn more
        </a>
      </div>
    </section>
  );
}
