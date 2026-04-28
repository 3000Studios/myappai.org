import React from 'react'

export default function DisclosurePage() {
  return (
    <article className="prose-page">
      <header className="prose-header">
        <h1>Advertising & Affiliate Disclosure</h1>
        <p className="prose-lead">
          MyAppAI.org is built to support display advertising, sponsorships,
          and carefully selected affiliate relationships.
        </p>
      </header>

      <section className="prose-section">
        <h2>Display advertising</h2>
        <p>
          Pages on this site may contain advertising units from Google AdSense
          or other ad partners. Those placements help fund editorial operations
          and site maintenance.
        </p>
      </section>

      <section className="prose-section">
        <h2>Affiliate links</h2>
        <p>
          Some guides may link to products or services using affiliate links. If
          you purchase through one of those links, we may receive a commission
          at no extra cost to you.
        </p>
      </section>

      <section className="prose-section">
        <h2>Editorial independence</h2>
        <p>
          Monetization does not guarantee coverage. Articles are selected and
          structured based on audience fit, search demand, and whether the topic
          helps readers make better automation and publishing decisions.
        </p>
      </section>
    </article>
  )
}
