import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { getSeoForPath } from '../components/SiteSeo.jsx'
import { blogIndex } from './siteData.js'

export { getSeoForPath }

export const prerenderRoutes = [
  '/',
  '/blog',
  '/guides',
  '/about',
  '/contact',
  '/privacy',
  '/disclosure',
  '/terms',
  '/revenue',
  ...(blogIndex.posts ?? []).map((post) => `/blog/${post.slug}`),
]

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
