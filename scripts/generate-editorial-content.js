import fs from 'node:fs/promises'
import path from 'node:path'
import { repoRoot } from '../server/services/platformPaths.js'

const blogDir = path.join(repoRoot, 'content', 'blog')

const topics = [
  {
    slug: 'ai-content-ops-blueprint',
    category: 'Content Operations',
    title: 'AI Content Ops Blueprint: How to Run an Automated Publishing Engine That Still Feels Human',
    description:
      'A production guide to building a reliable AI publishing workflow with editorial review, SEO structure, monetization slots, and consistent brand voice.',
    excerpt:
      'This blueprint shows how MyAppAI structures topic intake, drafting, quality review, and monetization so articles can publish on schedule without turning into thin AI filler.',
    publishedAt: '2026-04-28',
    readTime: '8 min read',
    heroTag: 'Publishing Systems',
    video:
      'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
    points: [
      'Topic intake should start with a small queue of categories, search intent, and a business goal for every article.',
      'A publishable draft needs structure before prose: title, search angle, promised outcome, proof points, internal links, and the exact monetization surface.',
      'Automation works best when the site can regenerate indexes, sitemap entries, canonical metadata, and ads.txt without manual editing.',
      'Editorial review should focus on factual accuracy, readability, and whether the article earns a real click instead of just filling a slot.',
    ],
    resources: [
      { label: 'Open the guides hub', href: '/guides' },
      { label: 'Read the disclosure policy', href: '/disclosure' },
    ],
  },
  {
    slug: 'google-adsense-site-readiness-checklist',
    category: 'Monetization',
    title: 'Google AdSense Site Readiness Checklist for AI Publications',
    description:
      'The practical checklist for getting an AI-focused content site structurally ready for AdSense review: original content, policy pages, crawlability, UX, and ad-safe layouts.',
    excerpt:
      'AdSense approval gets easier when the site looks finished, trustworthy, and easy to crawl. This checklist breaks the work into what matters on the page and in the repo.',
    publishedAt: '2026-04-27',
    readTime: '7 min read',
    heroTag: 'Ad Readiness',
    video:
      'https://videos.pexels.com/video-files/7989672/7989672-hd_1920_1080_25fps.mp4',
    points: [
      'Every page should have a unique title, useful body copy, a clear purpose, and no template-looking filler.',
      'Required trust pages include About, Contact, Privacy, and disclosure language for ads or affiliate placement.',
      'The public experience needs fast navigation, readable contrast, working mobile layouts, and no dead-end routes.',
      'Ad units should support the content instead of burying it. A strong reading experience is part of policy readiness.',
    ],
    resources: [
      { label: 'View privacy policy', href: '/privacy' },
      { label: 'Browse the latest posts', href: '/blog' },
    ],
  },
  {
    slug: 'editorial-calendar-for-ai-blogs',
    category: 'Growth',
    title: 'Build an Editorial Calendar for an AI Blog Without Burning Out',
    description:
      'A lean editorial calendar model for founders and solo operators who want consistent output, better internal linking, and room for automation.',
    excerpt:
      'A sustainable calendar is less about volume and more about repeatable series, category ownership, and automatic follow-up assets like indexes and email hooks.',
    publishedAt: '2026-04-26',
    readTime: '6 min read',
    heroTag: 'Editorial Planning',
    video:
      'https://videos.pexels.com/video-files/4434242/4434242-hd_1920_1080_25fps.mp4',
    points: [
      'Choose a few durable categories and publish clusters instead of random one-off topics.',
      'Use a numbered archive so readers and search engines can see momentum at a glance.',
      'Pair each article with one primary CTA and one internal link destination. That prevents monetization from feeling bolted on.',
      'Automation should generate the repetitive scaffolding, not erase the editorial point of view.',
    ],
    resources: [
      { label: 'Contact the editorial team', href: '/contact' },
      { label: 'See article categories', href: '/guides' },
    ],
  },
  {
    slug: 'affiliate-content-without-thin-review-spam',
    category: 'Monetization',
    title: 'How to Publish Affiliate Content Without Looking Like Thin Review Spam',
    description:
      'A framework for commercial-intent content that stays useful, transparent, and compliant while still supporting revenue.',
    excerpt:
      'The best affiliate pages earn trust first. Comparison logic, disclosures, and clear buyer guidance matter more than stuffing buttons onto a weak article.',
    publishedAt: '2026-04-25',
    readTime: '7 min read',
    heroTag: 'Affiliate Strategy',
    video:
      'https://videos.pexels.com/video-files/6950397/6950397-hd_1920_1080_25fps.mp4',
    points: [
      'Disclose monetized links clearly and early. Readers should understand how the site makes money without hunting for it.',
      'Comparison content should explain who each tool is for, where it falls short, and what use case wins.',
      'Affiliate CTAs perform better when they appear after evidence instead of replacing evidence.',
      'A monetized article still needs original structure, not copied vendor messaging with a new headline.',
    ],
    resources: [
      { label: 'Read our disclosure page', href: '/disclosure' },
      { label: 'Explore buyer guides', href: '/guides' },
    ],
  },
  {
    slug: 'seo-architecture-for-automation-sites',
    category: 'SEO',
    title: 'SEO Architecture for Automation Sites: Categories, Internal Links, and Crawl Signals',
    description:
      'A technical walkthrough for structuring an automation-focused publication so search engines can understand categories, recency, and authority.',
    excerpt:
      'Good SEO architecture is usually visible in navigation, archives, and metadata before it is visible in rankings. This guide shows the structure MyAppAI uses.',
    publishedAt: '2026-04-24',
    readTime: '9 min read',
    heroTag: 'Technical SEO',
    video:
      'https://videos.pexels.com/video-files/5489398/5489398-hd_1920_1080_25fps.mp4',
    points: [
      'Canonical URLs, sitemap generation, and robots directives should be created from the same route inventory.',
      'A blog archive should reflect chronology, category relevance, and clear pathing back into evergreen guides.',
      'Internal links need intent. Connect tactical articles to foundational pages instead of spraying links everywhere.',
      'Site speed and clean markup matter more when the content model expands automatically.',
    ],
    resources: [
      { label: 'Review the article archive', href: '/blog' },
      { label: 'Visit the about page', href: '/about' },
    ],
  },
  {
    slug: 'newsletter-hooks-for-automated-media-sites',
    category: 'Audience',
    title: 'Newsletter Hooks for Automated Media Sites That Need Subscribers, Not Just Pageviews',
    description:
      'How to place email capture and lead magnets inside a content engine without making the site feel like a popup farm.',
    excerpt:
      'Subscriber growth improves when the opt-in promise is specific, contextual, and tied to the article category the reader is already consuming.',
    publishedAt: '2026-04-23',
    readTime: '5 min read',
    heroTag: 'Audience Growth',
    video:
      'https://videos.pexels.com/video-files/6344242/6344242-hd_1920_1080_25fps.mp4',
    points: [
      'Offer category-specific takeaways like automation checklists, tool updates, or editorial roundups.',
      'Embed lead capture after a reader has received value, not before the page proves itself.',
      'Consistency matters more than complexity. A single strong newsletter loop can outperform a pile of weak forms.',
      'Treat subscriber CTAs as part of the content architecture, not a separate marketing layer.',
    ],
    resources: [
      { label: 'Get in touch', href: '/contact' },
      { label: 'Browse growth guides', href: '/guides' },
    ],
  },
  {
    slug: 'human-review-for-ai-generated-articles',
    category: 'Quality Control',
    title: 'Human Review for AI-Generated Articles: The Minimum Bar Before You Hit Publish',
    description:
      'The editorial pass that catches weak claims, repetition, and machine-like phrasing before AI-assisted content goes live.',
    excerpt:
      'Automation is powerful, but publishing without review usually creates the exact thin content problems that ad platforms and readers both reject.',
    publishedAt: '2026-04-22',
    readTime: '6 min read',
    heroTag: 'Quality Review',
    video:
      'https://videos.pexels.com/video-files/3195650/3195650-hd_1920_1080_25fps.mp4',
    points: [
      'Review should validate claims, remove repetition, and tighten the promise of the article.',
      'Any paragraph that could fit on every site in the category probably should be rewritten or removed.',
      'Editorial polish often comes from examples, concrete framing, and stronger transitions, not more words.',
      'A trustworthy publication needs a visible standard for what gets published and what stays in draft.',
    ],
    resources: [
      { label: 'Read the site mission', href: '/about' },
      { label: 'See the archive', href: '/blog' },
    ],
  },
  {
    slug: 'ad-layouts-that-protect-reader-trust',
    category: 'Monetization',
    title: 'Ad Layouts That Protect Reader Trust on Content-Heavy Sites',
    description:
      'Where to place display ads, inline units, and monetization prompts so the page still feels premium and readable.',
    excerpt:
      'Reader trust drops fast when a page feels stacked with interruptions. The best ad layouts leave the article in control and keep density predictable.',
    publishedAt: '2026-04-21',
    readTime: '6 min read',
    heroTag: 'Ad Experience',
    video:
      'https://videos.pexels.com/video-files/5385875/5385875-hd_1920_1080_25fps.mp4',
    points: [
      'Use defined ad zones with clear spacing so ads feel intentional instead of inserted at random.',
      'Inline units work best after the reader has context, not before the article earns attention.',
      'Avoid stacking ads near navigation, hero messaging, or policy-critical content.',
      'A premium-looking site can still monetize aggressively if the layout remains legible and structured.',
    ],
    resources: [
      { label: 'See the readiness checklist', href: '/blog/google-adsense-site-readiness-checklist' },
      { label: 'Open the homepage', href: '/' },
    ],
  },
]

function makeSections(topic) {
  return [
    {
      heading: 'Why this matters',
      body: topic.points[0],
    },
    {
      heading: 'How the workflow should be structured',
      body: topic.points[1],
    },
    {
      heading: 'What to automate and what to review',
      body: topic.points[2],
    },
    {
      heading: 'Where this creates revenue leverage',
      body: topic.points[3],
    },
  ]
}

function makePost(topic, index) {
  const related = topics
    .filter((candidate) => candidate.slug !== topic.slug)
    .slice(0, 3)
    .map((candidate) => ({
      title: candidate.title,
      href: `/blog/${candidate.slug}`,
    }))

  return {
    updatedFor: 'myappai',
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    excerpt: topic.excerpt,
    publishedAt: topic.publishedAt,
    author: 'MyAppAI Editorial',
    category: topic.category,
    readTime: topic.readTime,
    heroTag: topic.heroTag,
    articleNumber: index + 1,
    tags: ['ai publishing', 'automation', topic.category.toLowerCase()],
    video: {
      src: topic.video,
      title: `${topic.title} background video`,
      attribution: 'Video source: Pexels free video library.',
    },
    sections: makeSections(topic),
    resources: topic.resources,
    relatedLinks: related,
    cta: {
      eyebrow: 'Keep building',
      heading: 'Turn the article into a repeatable publishing system',
      body: 'Use MyAppAI as the operating manual for AI-driven content, monetization, and publishing workflows that stay readable and ad-safe.',
      primaryLabel: 'Browse all articles',
      primaryHref: '/blog',
    },
    updatedAt: new Date().toISOString(),
  }
}

async function writeJson(filePath, payload) {
  await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
}

async function main() {
  await fs.mkdir(blogDir, { recursive: true })
  const existingEntries = await fs.readdir(blogDir, { withFileTypes: true })

  await Promise.all(
    existingEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map((entry) => fs.unlink(path.join(blogDir, entry.name)))
  )

  const posts = topics.map((topic, index) => makePost(topic, index))
  const indexPayload = {
    updatedFor: 'myappai',
    posts: posts.map((post, index) => ({
      number: index + 1,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      category: post.category,
      readTime: post.readTime,
      featured: index < 3,
    })),
    updatedAt: new Date().toISOString(),
  }

  await Promise.all(
    posts.map((post) => writeJson(path.join(blogDir, `${post.slug}.json`), post))
  )
  await writeJson(path.join(blogDir, 'index.json'), indexPayload)
}

main().catch((error) => {
  console.error('Failed to generate editorial content.', error)
  process.exitCode = 1
})
