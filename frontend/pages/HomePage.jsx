import React from 'react'
import { Link } from 'react-router-dom'
import PrismHeadline from '../components/PrismHeadline.jsx'
import { blogIndex, blogPosts } from '../src/siteData.js'
import './HomePage.css'

const categoryHighlights = [
  {
    title: 'Automated publishing',
    body: 'Systems for drafting, reviewing, indexing, and shipping useful AI-assisted articles without relying on thin filler.',
  },
  {
    title: 'AdSense readiness',
    body: 'Practical site structure for policy pages, original content, trust signals, ad placement, and crawlable metadata.',
  },
  {
    title: 'Monetization systems',
    body: 'Playbooks for affiliate strategy, lead capture, newsletter loops, and revenue surfaces that fit editorial UX.',
  },
]

export default function HomePage() {
  const featuredPosts = blogIndex.posts.slice(0, 3)
  const latestPosts = blogPosts.slice(0, 6)

  return (
    <article className="editorial-shell stack-2xl">
      <section className="editorial-hero section-card section-anchor">
        <div className="editorial-hero__copy">
          <span className="meta-line">MyAppAI.org</span>
          <PrismHeadline text="Automated blog systems for AI publishers who still care about quality." />
          <p className="section-intro editorial-hero__intro">
            Build a real publishing engine with original articles, a numbered
            archive, compliance pages, monetization hooks, and ad-ready
            structure wired into the same repo.
          </p>
          <div className="hero__actions editorial-hero__actions">
            <Link className="button button--primary" to="/blog">
              Browse the archive
            </Link>
            <Link className="button button--ghost" to="/guides">
              Explore growth guides
            </Link>
          </div>
        </div>

        <div className="editorial-hero__panel">
          <div className="editorial-wireframe">
            <div className="editorial-wireframe__orb" />
          </div>

          <div className="editorial-signal-grid">
            <div className="hero-stat-card">
              <span className="meta-line">Archive</span>
              <strong>{blogIndex.posts.length} generated articles</strong>
              <p>Chronological index rebuilt automatically during site builds.</p>
            </div>
            <div className="hero-stat-card">
              <span className="meta-line">Monetization</span>
              <strong>Ads + affiliate ready</strong>
              <p>Disclosure, privacy, ads.txt, and article ad zones are in place.</p>
            </div>
            <div className="hero-stat-card">
              <span className="meta-line">Operational model</span>
              <strong>Source-driven publishing</strong>
              <p>Content inventory, sitemap routes, and metadata stay synchronized.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-grid editorial-grid--three">
        {categoryHighlights.map((item) => (
          <div key={item.title} className="content-card editorial-glow-card">
            <span className="meta-line">Core track</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </div>
        ))}
      </section>

      <section className="section-card stack-lg">
        <div className="stack-sm">
          <span className="meta-line">Featured reads</span>
          <h2>What the site is built to teach</h2>
          <p className="section-intro">
            Each article is written to move a publisher closer to a working,
            monetizable content engine rather than a collection of disconnected
            blog posts.
          </p>
        </div>

        <div className="editorial-featured-grid">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              className="editorial-feature-card section-card"
              to={`/blog/${post.slug}`}
            >
              <span className="meta-line">
                #{post.number} · {post.category}
              </span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="editorial-link">Read the article</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card stack-lg">
        <div className="stack-sm">
          <span className="meta-line">Latest index</span>
          <h2>Numbered archive for readers and crawlers</h2>
          <p className="section-intro">
            The archive view is chronological, labeled, and linked so new
            content can slot directly into the site structure.
          </p>
        </div>

        <div className="editorial-index-list">
          {latestPosts.map((post, index) => (
            <Link
              key={post.slug}
              className="editorial-index-row"
              to={`/blog/${post.slug}`}
            >
              <div className="editorial-index-row__number">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="editorial-index-row__content">
                <div className="editorial-index-row__meta">
                  <span>{post.category}</span>
                  <span>{post.publishedAt}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="editorial-grid editorial-grid--two">
        <div className="section-card stack-md editorial-panel">
          <span className="meta-line">Ad-ready foundations</span>
          <h2>What makes the site monetization ready</h2>
          <ul className="editorial-list">
            <li>Original long-form articles with real informational value.</li>
            <li>Privacy and disclosure pages linked into the public nav.</li>
            <li>Automated sitemap, robots.txt, and ads.txt generation.</li>
            <li>Responsive layouts with dedicated content and ad surfaces.</li>
          </ul>
        </div>

        <div className="section-card stack-md editorial-panel">
          <span className="meta-line">Built-in growth loop</span>
          <h2>How the content engine compounds</h2>
          <ul className="editorial-list">
            <li>Every new article lands in the index automatically.</li>
            <li>Internal links route readers into categories and evergreen guides.</li>
            <li>Featured rails and CTA blocks create monetization paths without clutter.</li>
            <li>Public pages stay consistent under one `.org` publishing identity.</li>
          </ul>
        </div>
      </section>
    </article>
  )
}
