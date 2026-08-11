import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { publicNavItems } from '../src/siteChrome.js'
import './Navigation.css'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  return <nav className="publication-nav" aria-label="Primary navigation"><Link to="/" className="publication-brand" onClick={() => setOpen(false)}><span>m</span><b>myappai</b><em>.org</em></Link><button className="publication-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><div className={`publication-links ${open ? 'publication-links--open' : ''}`}>{publicNavItems.filter((item) => !['Home', 'Privacy'].includes(item.label)).map((item) => <Link key={item.to} to={item.to} className={location.pathname === item.to ? 'is-active' : ''} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link to="/revenue" className="publication-links__cta" onClick={() => setOpen(false)}>Revenue playbook</Link></div></nav>
}
