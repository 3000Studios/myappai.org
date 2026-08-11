import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Download, Megaphone, Sparkles } from 'lucide-react'

const offers = [
  {
    title: 'AI Publishing Launch Kit',
    body: 'A paid checklist and template bundle for planning article clusters, review steps, disclosures, and ad-ready pages.',
    icon: Download,
    href: '/contact',
    label: 'Request the kit',
  },
  {
    title: 'Sponsored Field Notes',
    body: 'Sponsor an article series that fits AI publishing, automation, creator tools, or responsible monetization.',
    icon: Megaphone,
    href: '/contact',
    label: 'Discuss sponsorship',
  },
  {
    title: 'Portfolio Launch Help',
    body: 'Use 3000 Studios to turn one working publishing system into another focused website or lead-generation asset.',
    icon: Sparkles,
    href: 'https://3000studios.vip/',
    label: 'Visit 3000 Studios',
    external: true,
  },
]

const networkLinks = [
  ['VoiceToWebsite', 'https://voicetowebsite.com/', 'Turn a prompt into a site plan'],
  ['Referrals.live', 'https://referrals.live/', 'Referral and offer workflow ideas'],
  ['3000Studios.vip', 'https://3000studios.vip/', 'Production and publishing hub'],
]

export default function MonetizationPanel() {
  return (
    <section className="monetization-panel" aria-labelledby="monetization-heading">
      <div className="monetization-panel__intro">
        <p className="pub-kicker">Monetizable purpose</p>
        <h2 id="monetization-heading">MyAppAI helps operators build AI publishing systems that can earn responsibly.</h2>
        <p>
          The site now has a clear business model: helpful public education, visible ad inventory,
          sponsor opportunities, paid implementation resources, and a relevant 3000 Studios network.
        </p>
      </div>
      <div className="monetization-offers">
        {offers.map((offer) => {
          const Icon = offer.icon
          const content = (
            <>
              <Icon size={22} />
              <h3>{offer.title}</h3>
              <p>{offer.body}</p>
              <span>{offer.label} <ArrowUpRight size={15} /></span>
            </>
          )

          return offer.external ? (
            <a key={offer.title} href={offer.href} target="_blank" rel="noopener noreferrer" className="monetization-offer">
              {content}
            </a>
          ) : (
            <Link key={offer.title} to={offer.href} className="monetization-offer">
              {content}
            </Link>
          )
        })}
      </div>
      <div className="network-strip" aria-label="Related 3000 Studios domains">
        {networkLinks.map(([name, href, label]) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            <strong>{name}</strong>
            <span>{label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
