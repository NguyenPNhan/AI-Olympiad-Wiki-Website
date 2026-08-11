import { isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import css from 'highlight.js/lib/languages/css'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import rust from 'highlight.js/lib/languages/rust'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Link, useParams } from 'react-router-dom'
import 'katex/dist/katex.min.css'
import { articles } from '../content'

const highlightLanguages = {
  bash,
  c,
  cpp,
  css,
  java,
  javascript,
  json,
  markdown,
  python,
  rust,
  sql,
  typescript,
  xml,
  yaml,
}

function nodeToText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeToText).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeToText(node.props.children)
  return ''
}

function headingId(value: string) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
}

function cleanHeading(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .replace(/\s+#+\s*$/, '')
    .trim()
}

function articleHeadings(markdown: string) {
  let inCodeBlock = false

  return markdown.split('\n').flatMap((line) => {
    if (/^\s*```/.test(line)) {
      inCodeBlock = !inCodeBlock
      return []
    }

    if (inCodeBlock) return []

    const match = line.trimEnd().match(/^(#{2,3})\s+(.+)$/)
    if (!match) return []

    const title = cleanHeading(match[2])
    return [{ level: match[1].length, title, id: headingId(title) }]
  })
}

function Heading({ level, children }: { level: 1 | 2 | 3 | 4; children?: ReactNode }) {
  const id = headingId(nodeToText(children))
  const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4'

  return (
    <Tag id={id}>
      <span>{children}</span>
      <a className="heading-anchor" href={`#${id}`} aria-label={`Link to ${nodeToText(children)}`}>#</a>
    </Tag>
  )
}

function CodeBlock({ children }: { children?: ReactNode }) {
  const [copied, setCopied] = useState(false)
  const codeElement = Array.isArray(children) ? children.find(isValidElement) : children
  const codeProps = isValidElement<{ className?: string; children?: ReactNode }>(codeElement)
    ? codeElement.props
    : undefined
  const language = codeProps?.className?.match(/(?:^|\s)language-([\w-]+)/)?.[1] || 'text'
  const code = nodeToText(codeProps?.children ?? children).replace(/\n$/, '')

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span>{language}</span>
        <button type="button" onClick={copyCode} aria-label={`Copy ${language} code`}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>{children}</pre>
    </div>
  )
}

function ArticlePage() {
  const { '*': rawSlug = '' } = useParams()
  const slug = rawSlug.split('/').map(decodeURIComponent).join('/')
  const article = articles.find((item) => item.slug === slug)
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    localStorage.getItem('aio-theme') === 'light' ? 'light' : 'dark',
  )
  const [activeHeading, setActiveHeading] = useState('top')

  const headings = useMemo(() => articleHeadings(article?.body ?? ''), [article?.body])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('aio-theme', theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  useEffect(() => {
    if (!article) return

    const updateActiveHeading = () => {
      const candidates = ['top', ...headings.map((heading) => heading.id)]
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element))
      const current = candidates.filter((element) => element.getBoundingClientRect().top <= 130).at(-1)
      setActiveHeading(current?.id ?? 'top')
    }

    updateActiveHeading()
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveHeading)
  }, [article, headings])


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

  return (
    <div className="site-shell article-site-shell min-h-screen">
      <header className="topbar article-topbar sticky top-0 z-50 grid min-h-[68px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-[34px] px-[clamp(18px,3vw,34px)] max-[760px]:min-h-[60px] max-[760px]:grid-cols-[auto_1fr_auto] max-[760px]:gap-3 max-[760px]:px-[15px]">
        <Link className="brand gap-3" to="/" aria-label="AI Olympiad Wiki home">
          <span className="brand-mark" aria-hidden="true"><b>AI</b><i /></span>
          <span>AI Olympiad Wiki</span>
        </Link>

        <nav className="main-nav gap-7 max-[1080px]:gap-[18px]" aria-label="Primary navigation">
        </nav>

        <div className="header-tools gap-3 max-[760px]:col-start-3">
          <span className="header-separator" />
          <button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle color theme">
            <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
          </button>
        </div>
      </header>

      <main id="top" className="article-layout grid min-h-[calc(100vh-68px)] max-[760px]:block max-[760px]:min-h-0">
        <article className="article-column px-12 pt-10 pb-24 max-[760px]:px-4 max-[760px]:pt-7 max-[760px]:pb-16">
          <div className="article-breadcrumbs mb-5 gap-2">
            <Link to="/">Home</Link><span>/</span><Link to={`/#level-${article.categorySlug}`}>{article.category}</Link>
          </div>
          <div className="article-heading mb-9 gap-5">
            <div>
              <span className="mb-2">{article.category} · {article.difficulty}★</span>
              <h1 className="m-0">{article.title}</h1>
            </div>
          </div>

          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, [rehypeHighlight, { detect: false, languages: highlightLanguages }]]}
              components={{
                h1: ({ children }) => <Heading level={1}>{children}</Heading>,
                h2: ({ children }) => <Heading level={2}>{children}</Heading>,
                h3: ({ children }) => <Heading level={3}>{children}</Heading>,
                h4: ({ children }) => <Heading level={4}>{children}</Heading>,
                pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
                table: ({ children }) => <div className="table-wrap markdown-table-wrap"><table>{children}</table></div>,
                a: ({ href, children }) => {
                  const external = href?.startsWith('http://') || href?.startsWith('https://')
                  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}</a>
                },
                img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading="lazy" />,
              }}
            >
              {article.body}
            </ReactMarkdown>
          </div>
        </article>

        <aside className="article-toc px-5 pt-8 pb-12" aria-label="On this page">
          <div className="mb-3">On this page</div>
          <nav>
            <a className={activeHeading === 'top' ? 'is-active' : ''} href="#top">Overview</a>
            {headings.map((heading, index) => (
              <a
                className={`${heading.level === 3 ? 'is-subheading' : ''} ${activeHeading === heading.id ? 'is-active' : ''}`.trim()}
                href={`#${heading.id}`}
                key={`${heading.level}-${heading.id}-${index}`}
              >
                {heading.title}
              </a>
            ))}
          </nav>
        </aside>
      </main>

      <footer className="article-footer gap-6 px-9 py-5 max-[760px]:px-4">
        <a className="brand brand--footer gap-3" href="#top">
          <span className="brand-mark" aria-hidden="true"><b>AI</b><i /></span>
          <span>AI Olympiad Wiki</span>
        </a>
        <p>Create by NPN</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default ArticlePage
