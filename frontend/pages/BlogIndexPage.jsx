import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { blogIndex, blogPosts } from '../src/siteData.js'
import workspaceImage from '../assets/editorial-workspace.png'

export default function BlogIndexPage() {
  const featuredPosts = blogIndex.posts.filter((post) => post.featured).slice(0, 3)
  const videoPosts = blogPosts.filter((post) => post.video?.src).slice(0, 3)
  return <article className="archive-page">
    <section className="archive-hero"><div><p className="pub-kicker">The MyAppAI archive</p><h1>Ideas for the people behind the publishing.</h1><p>Practical systems for editorial operations, audience growth, search strategy, and revenue that respects the reader.</p></div><img src={workspaceImage} alt="Independent publisher working at a desk" /></section>
    <section className="archive-feature"><div className="pub-section-heading"><div><p className="pub-kicker">Editor’s picks</p><h2>Begin with the systems that matter most.</h2></div></div><div className="archive-feature__grid">{featuredPosts.map((post, index) => <Link key={post.slug} to={`/blog/${post.slug}`}><span className="archive-number">0{index + 1}</span><p>{post.category} · {post.readTime}</p><h3>{post.title}</h3><span>Read field note <ArrowRight size={15} /></span></Link>)}</div></section>
    <section className="archive-video"><div><p className="pub-kicker"><Play size={15} /> Video companions</p><h2>Watch the workflow, then make it your own.</h2><p>Selected field notes include a calm visual companion for readers who prefer to see the operating model in motion.</p></div><div className="archive-video__list">{videoPosts.map((post) => <Link to={`/blog/${post.slug}`} key={post.slug}><span><Play size={16} fill="currentColor" /></span><div><p>{post.category}</p><h3>{post.title}</h3></div><ArrowRight size={18} /></Link>)}</div></section>
    <section className="archive-index"><div><p className="pub-kicker">Every field note</p><h2>Latest from the desk.</h2></div><div>{blogIndex.posts.map((post) => <Link key={post.slug} to={`/blog/${post.slug}`}><span>{String(post.number).padStart(2, '0')}</span><div><p>{post.category} · {post.publishedAt} · {post.readTime}</p><h3>{post.title}</h3><small>{post.excerpt}</small></div><ArrowRight size={18} /></Link>)}</div></section>
  </article>
}
