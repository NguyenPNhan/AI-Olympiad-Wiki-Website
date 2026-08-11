import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { articleHref, articles, categories } from '../content'

const difficultyGuide = [
  ['★', 'Foundation', 'No prior AI experience required.'],
  ['★★', 'Core', 'Essential knowledge for AI competitions.'],
  ['★★★', 'Advanced', 'Deeper techniques for stronger solutions.'],
  ['★★★★', 'Expert', 'Challenging ideas that need solid foundations.'],
  ['★★★★★', 'Research', 'Specialized topics for the hardest problems.'],
]

function Stars({ count }: { count: number }) {
  return <span className="stars" aria-label={`${count} out of 5 difficulty`}>{'★'.repeat(count)}</span>
}

function SearchPanel({ query, onClose }: { query: string; onClose: () => void }) {
  const lowered = query.trim().toLowerCase()
  const results = useMemo(() => {
    if (!lowered) return articles.slice(0, 6)
    return articles.filter((article) =>
      `${article.title} ${article.category}`.toLowerCase().includes(lowered),
    ).slice(0, 8)
  }, [lowered])

  return (
    <div className="search-results p-2" role="listbox">
      <div className="search-results__label px-2.5 py-2">{lowered ? 'Search results' : 'Articles'}</div>
      {results.length ? results.map((article) => (
        <Link className="search-result gap-3 px-2.5 py-3" to={articleHref(article)} key={article.sourcePath} onClick={onClose}>
          <span>{article.title}</span>
          <small>{article.category} · {article.difficulty}★</small>
        </Link>
      )) : (
        <div className="search-empty">
          {articles.length ? 'No articles match your search.' : 'Add Markdown files to data/markdowns to make them searchable.'}
        </div>
      )}
    </div>
  )
}

export default function MainPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    localStorage.getItem('aio-theme') === 'light' ? 'light' : 'dark',
  )
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('aio-theme', theme)
  }, [theme])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key === '/' && document.activeElement?.tagName !== 'INPUT') || ((event.ctrlKey || event.metaKey) && event.key === 'k')) {
        event.preventDefault()
        setSearchOpen(true)
        window.setTimeout(() => searchRef.current?.focus(), 0)
      }
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="site-shell min-h-screen">
      <header className="topbar sticky top-0 z-50 grid min-h-[68px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[34px] px-[clamp(18px,3vw,34px)] max-[760px]:min-h-[60px] max-[760px]:grid-cols-[auto_1fr] max-[760px]:gap-3 max-[760px]:px-[15px]">
        <a className="brand gap-3" href="#top" aria-label="AI Olympiad Wiki home">
          <span className="brand-mark" aria-hidden="true"><b>AI</b><i /></span>
          <span>AI Olympiad Wiki</span>
        </a>

        <nav className="main-nav gap-7 max-[1080px]:gap-[18px]" aria-label="Primary navigation">
        </nav>

        <div className="header-tools gap-3 max-[760px]:col-start-2">
          <div className={`search-shell gap-2.5 px-3 ${searchOpen ? 'is-open' : ''}`}>
            <span className="search-icon" aria-hidden="true" />
            <input
              ref={searchRef}
              aria-label="Search the wiki"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchOpen(true)}
            />
            {searchOpen && <SearchPanel query={query} onClose={() => setSearchOpen(false)} />}
          </div>
          <span className="header-separator" />
          <button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle color theme">
            <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
          </button>
        </div>
      </header>

      {searchOpen && <button className="search-scrim" aria-label="Close search" onClick={() => setSearchOpen(false)} />}

      <main id="top" className="landing-main mx-auto w-full max-w-[1080px] px-7 pb-28 max-[760px]:px-4">
        <section id="introduction" className="intro-section px-0 pt-20 pb-7 text-center max-[760px]:pt-14">
          <h1 className="m-0">AI Olympiad Wiki</h1>

          <div className="difficulty-block mx-auto mt-10 max-[760px]:mt-16">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Difficulty</th><th>Level</th><th>What to expect</th></tr></thead>
                <tbody>
                  {difficultyGuide.map(([stars, level, description]) => (
                    <tr key={level}><td className="stars">{stars}</td><td>{level}</td><td>{description}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="learning-paths grid gap-4 pt-15 max-[760px]:grid-cols-1 max-[760px]:pt-16">
          <div className="section-kicker">Table of contents</div>

          {categories.map((category, index) => (
            <section className="level-section min-w-0 p-5 max-[760px]:p-4" id={`level-${category.slug}`} key={category.slug}>
              <div className="level-heading mb-4 gap-5">
                <div className="gap-2.5">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{category.title}</h3>
                </div>
              </div>

              <div className="level-article-list gap-2">
                {category.articles.length ? category.articles.map((article) => (
                  <Link className="level-article-link gap-4 px-3 py-2.5" to={articleHref(article)} key={article.sourcePath}>
                    <strong>{article.title}</strong>
                    <div className="level-article-action">
                      <Stars count={article.difficulty} />
                      <span aria-hidden="true">→</span>
                    </div>
                  </Link>
                )) : (
                  <div className="level-empty">No articles in this level yet.</div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="gap-6 px-9 py-5 max-[760px]:px-4">
        <a className="brand brand--footer gap-3" href="#top"><span className="brand-mark" aria-hidden="true"><b>AI</b><i /></span><span>AI Olympiad Wiki</span></a>
        <p>Create by NPN</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}
