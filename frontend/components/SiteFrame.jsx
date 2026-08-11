import React, { useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import SiteSeo from './SiteSeo.jsx'
import Navigation from './Navigation.jsx'
import AdSenseSlot from './AdSenseSlot.jsx'
import { getCopyrightLine, SUPPORT_EMAIL } from '../src/siteMeta.js'
import { trackConversionEvent } from '../src/siteApi.js'

export default function SiteFrame() {
  const location = useLocation()
  useEffect(() => { trackConversionEvent('page_view', { path: `${location.pathname}${location.search}` }).catch(() => {}) }, [location.pathname, location.search])
  return <div className="publication-shell"><SiteSeo /><header className="publication-header"><Navigation /></header><main className="publication-main"><Outlet /></main><AdSenseSlot className="ad-slot--footer" /><footer className="publication-footer"><div className="publication-footer__main"><div><Link to="/" className="publication-brand"><span>m</span><b>myappai</b><em>.org</em></Link><p>Independent field notes for people building useful, sustainable AI-powered publishing businesses.</p></div><div><h2>Explore</h2><Link to="/blog">Articles</Link><Link to="/guides">Guides</Link><Link to="/revenue">Revenue playbook</Link></div><div><h2>Trust</h2><Link to="/about">About</Link><Link to="/disclosure">Disclosure</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div><div><h2>Work with us</h2><p>Editorial, partnership, and sponsorship enquiries are always welcome.</p><a href={`mailto:${SUPPORT_EMAIL}`}>Contact the editor ↗</a></div></div><div className="publication-footer__bottom"><span>{getCopyrightLine()}</span><span>Built for readers, not algorithms.</span></div></footer></div>
}
