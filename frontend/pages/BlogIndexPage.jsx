import React from 'react'
import { Link } from 'react-router-dom'
import PrismHeadline from '../components/PrismHeadline.jsx'
import { blogIndex } from '../src/siteData.js'

export default function BlogIndexPage() {
  const featuredPosts = blogIndex.posts.filter((post) => post.featured)

  return (
    <article className="editorial-shell stack-2xl">
      <section className="editorial-hero section-card">
        <div className="stack-lg">
          <span className="meta-line">Automated archive</span>
          <PrismHeadline text="Every article, numbered and publish-ready." />
          <p className="section-intro editorial-hero__intro">
            MyAppAI.org rebuilds its archive from source content so the sitemap,
            chronological index, article cards, and monetization hooks stay in
            sync.
          </p>
        </div>
      </section>

      <section className="editorial-featured-grid">
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
            <span className="editorial-link">Read article</span>
          </Link>
        ))}
      </section>

      <section className="section-card stack-lg">
        <div className="stack-sm">
          <span className="meta-line">Chronological index</span>
          <h2>Latest entries</h2>
          <p className="section-intro">
            The archive is generated in publish order and refreshed during site
            builds so new content lands here automatically.
          </p>
        </div>

        <div className="editorial-index-list">
          {blogIndex.posts.map((post) => (
            <Link
              key={post.slug}
              className="editorial-index-row"
              to={`/blog/${post.slug}`}
            >
              <div className="editorial-index-row__number">
                {String(post.number).padStart(2, '0')}
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
    </article>
  )
}
