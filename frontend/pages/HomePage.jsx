import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Mail, Sparkles } from 'lucide-react'
import { blogIndex, blogPosts } from '../src/siteData.js'
import './HomePage.css'

const pillars = [
  ['01', 'Build useful content', 'Editorial systems that turn expertise into useful, reader-first articles with a clear point of view.'],
  ['02', 'Grow with intent', 'Practical SEO, internal linking, and newsletter loops that make every article work harder.'],
  ['03', 'Monetize with trust', 'Ads, affiliates, sponsorships, and paid resources placed where they help—not interrupt.'],
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const featured = blogIndex.posts.filter((post) => post.featured).slice(0, 3)
  const latest = blogPosts.slice(0, 3)

  function joinBriefing(event) {
    event.preventDefault()
    if (!email) return
    window.location.href = `mailto:editor@myappai.org?subject=${encodeURIComponent('The Operator Briefing subscription')}&body=${encodeURIComponent(`Please add ${email} to The Operator Briefing.`)}`
    setJoined(true)
  }

  return (
    <article className="publication-home">
      <section className="pub-hero">
        <div className="pub-hero__copy">
          <p className="pub-kicker"><Sparkles size={15} /> The independent guide to AI publishing</p>
          <h1>Build a media business people trust.</h1>
          <p className="pub-hero__lede">MyAppAI is a practical field guide for creators and small teams building useful, sustainable sites with AI—without sacrificing the human judgment that earns an audience.</p>
          <div className="pub-actions">
            <Link className="pub-button pub-button--dark" to="/blog">Start reading <ArrowRight size={17} /></Link>
            <Link className="pub-text-link" to="/guides">Explore the playbooks <ArrowRight size={16} /></Link>
          </div>
          <div className="pub-hero__trust"><span>Evidence-led publishing</span><span>•</span><span>Clear disclosures</span><span>•</span><span>Reader-first revenue</span></div>
        </div>
        <aside className="pub-hero__edition" aria-label="Latest issue">
          <div className="edition-topline"><span>THE OPERATOR</span><span>ISSUE 01</span></div>
          <div className="edition-mark">M</div>
          <p className="edition-label">THE WEEKLY BRIEFING</p>
          <h2>The system behind a site that compounds.</h2>
          <p>How to build the editorial, search, and revenue foundations before you publish at scale.</p>
          <Link to="/guides" className="edition-link">Read the field notes <ArrowRight size={16} /></Link>
        </aside>
      </section>

      <section className="pub-marquee" aria-label="What we cover"><span>Editorial systems</span><span>Search strategy</span><span>Creator revenue</span><span>AdSense readiness</span><span>Audience ownership</span></section>

      <section className="pub-section pub-intro-grid">
        <div><p className="pub-kicker">A better way to grow</p><h2>Less content noise. More durable value.</h2></div>
        <p className="pub-body">The best publishing businesses do not chase every trend. They develop a useful point of view, create pathways through their knowledge, and give readers honest ways to support the work. That is what we document here.</p>
      </section>

      <section className="pub-pillars" aria-label="Core pillars">
        {pillars.map(([number, title, body]) => <article key={number} className="pub-pillar"><span>{number}</span><h3>{title}</h3><p>{body}</p><Link to="/guides">See how <ArrowRight size={15} /></Link></article>)}
      </section>

      <section className="pub-section pub-featured">
        <div className="pub-section-heading"><div><p className="pub-kicker">Start here</p><h2>Essential reading for modern publishers.</h2></div><Link className="pub-text-link" to="/blog">View all articles <ArrowRight size={16} /></Link></div>
        <div className="pub-story-grid">
          {featured.map((post, index) => <Link className={`pub-story pub-story--${index + 1}`} key={post.slug} to={`/blog/${post.slug}`}><div className="story-art"><span>{String(index + 1).padStart(2, '0')}</span></div><p className="story-meta">{post.category} <i /> {post.readTime}</p><h3>{post.title}</h3><p>{post.excerpt}</p><span className="pub-read-link">Read article <ArrowRight size={15} /></span></Link>)}
        </div>
      </section>

      <section className="pub-revenue">
        <div><p className="pub-kicker">Revenue, with restraint</p><h2>Multiple income streams. One trusted relationship.</h2><p>We teach a balanced model: respectful advertising, transparently disclosed recommendations, paid tools and templates, sponsorships that fit the audience, and an email list you own.</p><Link className="pub-button pub-button--light" to="/revenue">Explore revenue systems <ArrowRight size={17} /></Link></div>
        <ol><li><span>01</span><div><strong>Useful free content</strong><p>Build a library worth returning to.</p></div></li><li><span>02</span><div><strong>Reader-supported offers</strong><p>Templates, deep dives, and tools that save time.</p></div></li><li><span>03</span><div><strong>Aligned partnerships</strong><p>Affiliates and sponsors with plain-language disclosures.</p></div></li></ol>
      </section>

      <section className="pub-section pub-latest"><div className="pub-section-heading"><div><p className="pub-kicker">From the desk</p><h2>Fresh field notes.</h2></div><Link className="pub-text-link" to="/blog">Browse the archive <ArrowRight size={16} /></Link></div><div className="pub-latest-list">{latest.map((post) => <Link to={`/blog/${post.slug}`} key={post.slug}><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><ArrowRight size={18} /></Link>)}</div></section>

      <section className="pub-newsletter">
        <div><p className="pub-kicker"><Mail size={15} /> The Operator Briefing</p><h2>One useful idea, each week.</h2><p>A short, thoughtful note on building the systems behind a durable publishing business. No growth hacks. No noise.</p></div>
        <form onSubmit={joinBriefing}>{joined ? <p className="pub-form-success"><Check size={18} /> Your email app should be open—thank you.</p> : <><label htmlFor="briefing-email">Email address</label><div><input id="briefing-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /><button type="submit">Join free</button></div><small>By subscribing, you agree to our <Link to="/privacy">privacy policy</Link>.</small></>}</form>
      </section>
    </article>
  )
}
