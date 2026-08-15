import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const workflowsDirectory = path.join(repoRoot, '.github', 'workflows')
const prohibitedPatterns = [
  /wrangler\s+pages\s+deploy/i,
  /cloudflare\/wrangler-action/i,
  /cloudflare\/pages-action/i,
  /github\.io/i,
  /vercel/i,
  /netlify/i,
]

function collectWorkflowFiles(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) return collectWorkflowFiles(entryPath)
    return /\.ya?ml$/i.test(entry.name) ? [entryPath] : []
  })
}

const violations = collectWorkflowFiles(workflowsDirectory).flatMap((filePath) => {
  const contents = fs.readFileSync(filePath, 'utf8')
  return prohibitedPatterns.filter((pattern) => pattern.test(contents)).map(() => path.relative(repoRoot, filePath))
})

if (violations.length) {
  throw new Error(`Cloudflare-only deployment policy violation: ${[...new Set(violations)].join(', ')}`)
}

console.log('Cloudflare-only deployment policy passed.')
