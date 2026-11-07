/**
 * Build-time prerender for the public MyAppAI surface.
 *
 * Runs as `postbuild` after the client bundle exists in dist/. It renders
 * each public route with the real React app (react-dom/server + the Vite
 * SSR build of frontend/src/entry-server.jsx) and writes static HTML into
 * dist/ so crawlers and AdSense reviewers get the full page content in the
 * raw response — the same content visitors see once the app boots.
 *
 * Output shape: route "/" overwrites dist/index.html; other routes are
 * written as dist/<route>.html, which Cloudflare Pages serves directly at
 * the extensionless URL with a 200.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(repoRoot, 'dist')
const ssrDir = path.join(repoRoot, 'frontend', 'dist-ssr')

function escapeAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function escapeTitle(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function wordCount(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text ? text.split(' ').length : 0
}

function replaceOrFail(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: could not find ${label} in dist/index.html template`)
  }
  return html.replace(pattern, replacement)
}

console.log('==> Prerender: building SSR bundle')
execSync('npx vite build --ssr src/entry-server.jsx --outDir dist-ssr --emptyOutDir', {
  cwd: repoRoot,
  stdio: 'inherit',
})

const entryFile = path.join(ssrDir, 'entry-server.js')
if (!fs.existsSync(entryFile)) {
  throw new Error(`prerender: SSR entry not found at ${entryFile}`)
}

const { render, getSeoForPath, prerenderRoutes } = await import(
  pathToFileURL(entryFile).href
)

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: dist/index.html does not contain an empty #root mount point')
}

for (const route of prerenderRoutes) {
  const seo = getSeoForPath(route)
  const appHtml = render(route)

  let html = template
  html = replaceOrFail(
    html,
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeTitle(seo.title)}</title>`,
    '<title>'
  )
  html = replaceOrFail(
    html,
    /(<meta\s+name="description"\s+content=")[^"]*(")/s,
    `$1${escapeAttr(seo.description)}$2`,
    'meta description'
  )
  html = replaceOrFail(
    html,
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/s,
    `$1${escapeAttr(seo.title)}$2`,
    'og:title'
  )
  html = replaceOrFail(
    html,
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/s,
    `$1${escapeAttr(seo.description)}$2`,
    'og:description'
  )
  html = replaceOrFail(
    html,
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/s,
    `$1${escapeAttr(seo.canonicalUrl)}$2`,
    'og:url'
  )
  html = replaceOrFail(
    html,
    /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/s,
    `$1${escapeAttr(seo.title)}$2`,
    'twitter:title'
  )
  html = replaceOrFail(
    html,
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/s,
    `$1${escapeAttr(seo.description)}$2`,
    'twitter:description'
  )
  html = replaceOrFail(
    html,
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/s,
    `$1${escapeAttr(seo.canonicalUrl)}$2`,
    'canonical link'
  )

  if (seo.schemas?.length) {
    const ldJson = `<script type="application/ld+json">${JSON.stringify(seo.schemas)}</script>`
    html = html.replace('</head>', `    ${ldJson}\n  </head>`)
  }

  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

  const outFile =
    route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, `${route.replace(/^\//, '')}.html`)
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, html, 'utf8')
  console.log(`==> Prerendered ${route} -> ${path.relative(repoRoot, outFile)} (${wordCount(html)} words)`)
}

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`==> Prerender complete: ${prerenderRoutes.length} routes`)
