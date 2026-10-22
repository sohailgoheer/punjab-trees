const milestones = [
  { title: 'One tree, one identity', details: 'A tree will keep the same permanent profile across all future dated photo updates.' },
  { title: 'Location privacy first', details: 'Exact GPS details will remain private; public maps will use approximate positions.' },
  { title: 'Web + mobile, same rules', details: 'The React interface and future Capacitor app will share one Laravel API.' },
] as const;

export default function App() {
  return (
    <div className="app-shell">
      <header className="top-bar">
        <a href="/" className="brand" aria-label="TreeStory foundation home">
          <span className="brand-icon" aria-hidden="true">🌳</span>
          <span><strong>TreeStory</strong><small>Working title · Phase 00</small></span>
        </a>
        <span className="stage-tag">Foundation preview</span>
      </header>
      <main>
        <section className="welcome" aria-labelledby="welcome-heading">
          <div className="eyebrow">A community tree atlas · engineering foundation</div>
          <h1 id="welcome-heading">Every tree deserves<br /><em>a lasting story.</em></h1>
          <p>We are preparing the web and mobile foundation for a community where people can preserve the history of a real tree through photos, dates and responsible location sharing.</p>
          <p className="disclaimer">This is a Phase 00 placeholder — not a working social platform. No accounts, uploads or database are connected yet.</p>
        </section>
        <section aria-labelledby="principles-heading" className="principles">
          <div className="section-heading"><span className="eyebrow">Project principles</span><h2 id="principles-heading">Designed to grow responsibly</h2></div>
          <div className="card-grid">
            {milestones.map(({ title, details }, index) => (
              <article key={title} className="feature-card">
                <span className="feature-number">0{index + 1}</span>
                <h3>{title}</h3><p>{details}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer>TreeStory is a placeholder name. Phase 01 requires explicit owner approval.</footer>
    </div>
  );
}
