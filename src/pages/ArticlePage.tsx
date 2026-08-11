import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Link, useParams } from 'react-router-dom'
import 'katex/dist/katex.min.css'
import { articleHref, articles, categories } from '../content'

function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function ArticlePage() {
  const { '*': rawSlug = '' } = useParams()
  const slug = rawSlug.split('/').map(decodeURIComponent).join('/')
  const article = articles.find((item) => item.slug === slug)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    localStorage.getItem('aio-theme') === 'light' ? 'light' : 'dark',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('aio-theme', theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!article) {
    return (
      <main className="not-found-page">
        <span>404</span>
        <h1>Article not found</h1>
        <p>The Markdown file may have been moved or renamed.</p>
        <Link to="/">Return to the wiki</Link>
      </main>
    )
  }

  const currentCategory = categories.find((category) => category.slug === article.categorySlug)
  const headings = article.body
    .split('\n')
    .filter((line) => /^##\s+/.test(line))
    .map((line) => line.replace(/^##\s+/, '').trim())

  return (
    <div className="site-shell article-site-shell min-h-screen">
      <header className="topbar article-topbar sticky top-0 z-50 grid min-h-[68px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[34px] px-[clamp(18px,3vw,34px)] max-[760px]:min-h-[60px] max-[760px]:grid-cols-[auto_1fr_auto] max-[760px]:gap-3 max-[760px]:px-[15px]">
        <Link className="brand gap-3" to="/" aria-label="AI Olympiad Wiki home">
          <span className="brand-mark" aria-hidden="true"><b>AI</b><i /></span>
          <span>AI Olympiad Wiki</span>
        </Link>

        <nav className="main-nav gap-7 max-[1080px]:gap-[18px]" aria-label="Primary navigation">
          <Link to="/">Home</Link>
          <Link to="/#level-beginner">Getting Started</Link>
          <span className="nav-current">{article.category}<span className="nav-dot" /></span>
        </nav>

        <div className="header-tools gap-3 max-[760px]:col-start-3">
          <Link className="article-library-link" to="/">Browse library</Link>
          <span className="header-separator" />
          <button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle color theme">
            <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
          </button>
        </div>
      </header>

      <main id="top" className="article-layout grid min-h-[calc(100vh-68px)] max-[760px]:block max-[760px]:min-h-0">
        <aside className="article-sidebar px-6 pt-8 pb-16" aria-label="Wiki navigation">
          <div className="sidebar-group-title mb-2">Learning paths</div>
          <nav className="grid gap-1">
            {categories.map((category) => (
              <Link
                className={category.slug === article.categorySlug ? 'is-active' : ''}
                to={`/#level-${category.slug}`}
                key={category.slug}
              >
                {category.title}
              </Link>
            ))}
          </nav>

          {currentCategory && currentCategory.articles.length > 0 && (
            <>
              <div className="sidebar-group-title sidebar-group-title--articles mt-7 mb-2">In this level</div>
              <nav className="grid gap-1">
                {currentCategory.articles.map((item) => (
                  <Link className={item.slug === article.slug ? 'is-active' : ''} to={articleHref(item)} key={item.slug}>
                    {item.title}
                  </Link>
                ))}
              </nav>
            </>
          )}
        </aside>

        <article className="article-column px-12 pt-10 pb-24 max-[760px]:px-4 max-[760px]:pt-7 max-[760px]:pb-16">
          <div className="article-breadcrumbs mb-5 gap-2">
            <Link to="/">Home</Link><span>/</span><Link to={`/#level-${article.categorySlug}`}>{article.category}</Link>
          </div>
          <div className="article-heading mb-9 gap-5">
            <div>
              <span className="mb-2">{article.category} · {article.difficulty}★</span>
              <h1 className="m-0">{article.title}</h1>
            </div>
            <Link to="/" className="copy-page-button px-3 py-2">All articles</Link>
          </div>

          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
                table: ({ children }) => <div className="table-wrap markdown-table-wrap"><table>{children}</table></div>,
              }}
            >
              {article.body}
            </ReactMarkdown>
          </div>
        </article>

        <aside className="article-toc px-5 pt-8 pb-12" aria-label="On this page">
          <div className="mb-3">On this page</div>
          <a href="#top">Overview</a>
          {headings.map((heading) => <a href={`#${headingId(heading)}`} key={heading}>{heading}</a>)}
        </aside>
      </main>
    </div>
  )
}

export default ArticlePage
