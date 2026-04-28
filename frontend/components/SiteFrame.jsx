import React, { useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import AuroraBackdrop from '../backgrounds/AuroraBackdrop.jsx'
import SiteSeo from './SiteSeo.jsx'
import Navigation from './Navigation.jsx'
import GlobalTicker from './GlobalTicker.jsx'
import { publicTickerItems, publicNavItems } from '../src/siteChrome.js'
import {
  REPOSITORY_URL,
  getCopyrightLine,
  SITE_URL,
  SITE_DOMAIN,
} from '../src/siteMeta.js'
import { trackConversionEvent } from '../src/siteApi.js'

export default function SiteFrame() {
  const location = useLocation()

  useEffect(() => {
    trackConversionEvent('page_view', {
      path: `${location.pathname}${location.search}`,
    }).catch(() => {})
  }, [location.pathname, location.search])

  return (
    <div className="shell">
      <SiteSeo />
      <AuroraBackdrop variant="public" />

      <header className="site-header">
        <Navigation />
      </header>

      <main className="page page--public">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__grid">
          <section className="site-footer__brand">
            <span className="eyebrow">Why MyAppAI.org</span>
            <h2>
              A publishing system for AI blogs that need structure, trust, and
              monetization discipline.
            </h2>
            <p>
              MyAppAI.org documents the workflows behind automated articles,
              archive generation, SEO scaffolding, and ad-ready public pages.
            </p>
          </section>

          <section className="site-footer__links">
            <span className="eyebrow">Access</span>
            {publicNavItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
            <a href={REPOSITORY_URL} rel="noreferrer">
              GitHub repository
            </a>
          </section>

          <section className="site-footer__cta">
            <span className="eyebrow">Keep reading</span>
            <p>
              Start with the archive if you want the fastest path into the
              publishing system, or review the policy pages if you are preparing
              your own site for monetization.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" to="/blog">
                Open archive
              </Link>
              <Link className="button button--ghost" to="/privacy">
                Privacy policy
              </Link>
            </div>
          </section>
        </div>

        <div className="site-ticker">
          {publicTickerItems.map((item) => (
            <span key={item} className="site-ticker__item">
              {item}
            </span>
          ))}
        </div>

        <p className="site-footer__legal">
          <a href={SITE_URL} rel="noopener noreferrer">
            {SITE_DOMAIN}
          </a>
          <span aria-hidden="true"> · </span>
          <span>{getCopyrightLine()}</span>
          <span aria-hidden="true"> · </span>
          <a href={REPOSITORY_URL} rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </footer>

      {/* Global Ticker */}
      <GlobalTicker />
    </div>
  )
}
