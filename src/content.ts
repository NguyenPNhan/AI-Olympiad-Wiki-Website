export type Article = {
  title: string
  difficulty: number
  category: string
  categorySlug: string
  slug: string
  sourcePath: string
  body: string
}

export type Category = {
  slug: string
  title: string
  articles: Article[]
}

type CategoryDefinition = Omit<Category, 'articles'>

const categoryDefinitions: CategoryDefinition[] = [
  {
    slug: 'beginner',
    title: 'Beginner',
  },
  {
    slug: 'intermediate',
    title: 'Intermediate',
  },
  {
    slug: 'advanced',
    title: 'Advanced',
  },
  {
    slug: 'expert',
    title: 'Expert',
  },
]

const rawMarkdownFiles = import.meta.glob('/data/markdowns/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-')
}

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function categoryForFolder(folder: string): Omit<Category, 'articles'> {
  const normalized = normalize(folder)
  const known = categoryDefinitions.find((item) => item.slug === normalized)

  if (known) {
    return known
  }

  return {
    slug: normalized,
    title: titleCase(folder),
  }
}

function cleanValue(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, '')
}

function parseFrontmatter(raw: string) {
  if (!raw.startsWith('---')) return { attributes: {} as Record<string, string>, body: raw }

  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { attributes: {} as Record<string, string>, body: raw }

  const attributes: Record<string, string> = {}
  raw
    .slice(3, end)
    .split('\n')
    .forEach((line) => {
      const separator = line.indexOf(':')
      if (separator === -1) return
      attributes[normalize(line.slice(0, separator))] = cleanValue(line.slice(separator + 1))
    })

  return { attributes, body: raw.slice(end + 4).trim() }
}

function titleFromFilename(filename: string) {
  return titleCase(filename.replace(/\.md$/i, ''))
}

function toArticle(sourcePath: string, raw: string): Article {
  const relativePath = sourcePath.replace(/^.*?data\/markdowns\//, '')
  const parts = relativePath.split('/')
  const filename = parts.at(-1) ?? 'untitled.md'
  const folder = parts[0] || 'beginner'
  const category = categoryForFolder(folder)
  const { attributes, body } = parseFrontmatter(raw)
  const heading = body.match(/^#\s+(.+)$/m)?.[1]
  const difficulty = Number.parseInt(attributes.difficulty ?? attributes.level ?? '1', 10)

  return {
    title: attributes.title || heading || titleFromFilename(filename),
    difficulty: Number.isFinite(difficulty) ? Math.min(5, Math.max(1, difficulty)) : 1,
    category: category.title,
    categorySlug: category.slug,
    slug: relativePath.replace(/\.md$/i, ''),
    sourcePath,
    body,
  }
}

export const articles = Object.entries(rawMarkdownFiles)
  .map(([path, raw]) => toArticle(path, raw))
  .sort((a, b) => a.title.localeCompare(b.title))

const discoveredFolders = new Set(
  Object.keys(rawMarkdownFiles).map((path) => path.replace(/^.*?data\/markdowns\//, '').split('/')[0]),
)

const visibleDefinitions = categoryDefinitions
const customCategories = [...discoveredFolders]
  .map(categoryForFolder)
  .filter((category) => !visibleDefinitions.some((known) => known.slug === category.slug))
  .sort((a, b) => a.title.localeCompare(b.title))

export const categories: Category[] = [...visibleDefinitions, ...customCategories]
  .map((category) => ({
    ...category,
    articles: articles.filter((article) => article.categorySlug === category.slug),
  }))

export function articleHref(article: Pick<Article, 'slug'>) {
  return `/article/${article.slug.split('/').map(encodeURIComponent).join('/')}`
}
