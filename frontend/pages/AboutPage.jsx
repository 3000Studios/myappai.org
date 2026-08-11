import React from 'react'
import { SITE_DISPLAY_NAME, SUPPORT_EMAIL } from '../src/siteMeta.js'

export default function AboutPage() {
  return (
    <article className="prose-page">
      <header className="prose-header">
        <h1>About {SITE_DISPLAY_NAME}</h1>
        <p className="prose-lead">
          {SITE_DISPLAY_NAME} is an independent publishing brand focused on AI content systems,
          editorial automation, monetization strategy, and the practical work
          required to keep an ad-ready site useful.
        </p>
      </header>

      <section className="prose-section">
        <h2>What the site covers</h2>
        <p>
          We publish implementation-focused articles on AI-assisted blogging,
          SEO architecture, content operations, audience growth, affiliate
          strategy, and Google AdSense readiness. The goal is to help operators
          build sites that look finished, publish consistently, and monetize
          without degrading trust.
        </p>
      </section>

      <section className="prose-section">
        <h2>Our editorial standards</h2>
        <p>
          We publish original, practical work designed to answer a real reader
          question. AI may assist research and drafting, but each article is
          reviewed for clarity, usefulness, and factual accuracy before it is
          published. We correct material errors when they are brought to us.
        </p>
      </section>

      <section className="prose-section">
        <h2>How the site is structured</h2>
        <p>
          The public archive is generated from source content inside the repo.
          During builds, the blog index, ads.txt, robots.txt, and sitemap are
          regenerated so the site stays synchronized as new posts are added.
        </p>
      </section>

      <section className="prose-section">
        <h2>Who this is for</h2>
        <ul>
          <li>Publishers building AI-assisted content sites.</li>
          <li>Operators preparing a site for AdSense review.</li>
          <li>Founders who want monetization and SEO systems, not vague advice.</li>
          <li>Teams turning one site into a repeatable media asset.</li>
        </ul>
      </section>

      <section className="prose-cta">
        <p>
          Questions or editorial inquiries can be sent to{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </section>
    </article>
  )
}
