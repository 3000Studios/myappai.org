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
        <h2>Information you provide</h2>
        <p>
          If you contact us or ask to join a briefing, we receive the details
          you choose to include, such as your email address and message. We use
          those details only to respond or provide the requested communication.
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
          When advertising is enabled, third-party advertising partners may use
          cookies or similar technologies to measure delivery, limit duplicate
          impressions, and—in settings where you allow it—personalize ads. In
          regions where consent is required, advertising cookies will not be
          enabled until an appropriate consent choice is available. You can
          also manage ad personalization through your browser and Google ad
          settings.
        </p>
      </section>

      <section className="prose-section">
        <h2>Your choices</h2>
        <p>
          You can decline optional cookies where a consent choice is presented,
          adjust browser cookie controls, and unsubscribe from email at any
          time. To ask about or request deletion of information you provided,
          contact us using the address below.
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
