import React from 'react'
import { CONTACT_EMAIL, SITE_DISPLAY_NAME } from '../src/siteMeta.js'

export default function PrivacyPage() {
  return (
    <article className="prose-page">
      <header className="prose-header">
        <h1>Privacy Policy</h1>
        <p className="prose-lead">
          {SITE_DISPLAY_NAME} uses basic analytics, advertising integrations,
          contact forms, and editorial automation systems to operate the site.
        </p>
      </header>

      <section className="prose-section">
        <h2>What we collect</h2>
        <p>
          We may collect pageview data, browser and device information, contact
          form details you choose to submit, and advertising-related signals
          used to measure site performance and ad delivery.
        </p>
      </section>

      <section className="prose-section">
        <h2>How data is used</h2>
        <p>
          We use this information to improve the website, understand what
          content performs well, respond to inquiries, and support monetization
          systems such as Google AdSense or affiliate partnerships.
        </p>
      </section>

      <section className="prose-section">
        <h2>Cookies and advertising</h2>
        <p>
          Third-party advertising partners may use cookies or similar
          technologies to personalize ads, measure campaign performance, and
          limit duplicate impressions. You can manage ad personalization through
          your browser and Google ad settings.
        </p>
      </section>

      <section className="prose-section">
        <h2>Contact</h2>
        <p>
          Questions about privacy can be sent to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </article>
  )
}
