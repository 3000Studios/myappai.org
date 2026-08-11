import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, BookOpen, Mail, Play, Users } from 'lucide-react'
import workspaceImage from '../assets/editorial-workspace.png'
import './RevenueStreams.css'

const streams = [
  { number: '01', title: 'Respectful advertising', body: 'Ad placements belong after useful context—not before it. Build enough original editorial depth that ads feel like a trade, not a toll.' },
  { number: '02', title: 'Thoughtful recommendations', body: 'Recommend the tools you genuinely use, tell readers when a relationship exists, and keep each review useful even without a click.' },
  { number: '03', title: 'Products that save time', body: 'Turn repeatable systems into paid templates, checklists, and practical workshops that make a reader’s next step easier.' },
  { number: '04', title: 'An audience you own', body: 'Use email to turn one-time search visits into a trusted reading habit—then build member and sponsor opportunities from that foundation.' },
]

const principles = [
  ['Earn attention first', 'Every commercial surface follows a genuinely useful piece of work.'],
  ['Make the relationship clear', 'Disclosures are specific, visible, and written for humans.'],
  ['Keep choice with the reader', 'No forced popups, fake scarcity, or misleading claims.'],
]

export default function RevenueStreams() {
  return <article className="revenue-page">
    <section className="revenue-hero"><div><p className="pub-kicker">The revenue playbook</p><h1>Make the work sustainable without making it noisy.</h1><p>Revenue works when it protects the reader experience. This is the practical model we use to make a publishing site more durable—and more valuable—over time.</p><div className="pub-actions"><Link className="pub-button pub-button--dark" to="/guides">Explore trusted tools <ArrowRight size={17} /></Link><Link className="pub-text-link" to="/disclosure">Read our disclosure <ArrowRight size={16} /></Link></div></div><img src={workspaceImage} alt="Publisher reviewing an editorial calendar at a desk" /></section>
    <section className="revenue-principles"><p className="pub-kicker">Our operating standard</p><h2>A calmer path to creator revenue.</h2><div>{principles.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="revenue-stream-list"><div className="revenue-stream-list__intro"><p className="pub-kicker">The four-part model</p><h2>Build from trust outward.</h2><p>Each layer has a role. Together they create a business that does not depend on a single platform, traffic spike, or opaque algorithm.</p></div><div>{streams.map((stream) => <article key={stream.number}><span>{stream.number}</span><div><h3>{stream.title}</h3><p>{stream.body}</p></div><ArrowRight size={20} /></article>)}</div></section>
    <section className="revenue-learning"><div><p className="pub-kicker"><Play size={15} /> Watch & learn</p><h2>Short visual lessons for the long game.</h2><p>Our article library includes focused video companions on editorial operations, search architecture, and responsible monetization. Start with a walkthrough, then use the written guide as your working reference.</p><Link className="pub-button pub-button--light" to="/blog/ai-content-ops-blueprint">Watch the publishing workflow <ArrowRight size={17} /></Link></div><div className="revenue-learning__screen"><span className="revenue-learning__play"><Play size={20} fill="currentColor" /></span><p>VIDEO FIELD NOTE</p><strong>How to run a publishing engine that still feels human</strong></div></section>
    <section className="revenue-offers"><div><BookOpen size={24} /><h2>Build the library before the offer.</h2><p>Start with useful articles. Once readers repeatedly ask for the same help, package your best systems into something that saves them time.</p></div><div><Users size={24} /><h2>Earn a relationship before a sponsor.</h2><p>A small, focused audience with clear needs is more valuable than anonymous traffic. Sponsorships should fit the reader, the topic, and the editorial standard.</p></div><div><Mail size={24} /><h2>Invite the next conversation.</h2><p>Make email an extension of your point of view: concise, useful, and consistently worth opening.</p></div></section>
    <section className="revenue-close"><BadgeCheck size={20} /><div><p className="pub-kicker">A note on transparency</p><h2>We disclose commercial relationships in plain language.</h2><p>Whether a page contains advertising, a sponsored placement, or an affiliate link, the reader deserves to know. That is non-negotiable.</p></div><Link className="pub-text-link" to="/disclosure">Disclosure policy <ArrowRight size={16} /></Link></section>
  </article>
}
