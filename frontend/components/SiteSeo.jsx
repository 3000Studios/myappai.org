import React from 'react'
import { useLocation } from 'react-router-dom'
import {
  ADSENSE_CLIENT_ID,
  ADS_ENABLED,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_DISPLAY_NAME,
  SITE_URL,
  WWW_SITE_URL,
} from '../src/siteMeta.js'
import { blogLookup } from '../src/siteData.js'

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })

  return element
}

function ensureLink(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })

  return element
}

function ensureScript(id, attributes = {}) {
  let element = document.getElementById(id)
  if (!element) {
    element = document.createElement('script')
    element.id = id
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'textContent') {
      element.textContent = value
    } else {
      element.setAttribute(key, value)
    }
  })

  return element
}

function removeIfPresent(id) {
  document.getElementById(id)?.remove()
}

function getSeoForPath(pathname) {
  const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  const canonicalUrl =
    normalizedPath === '/' ? SITE_URL : `${SITE_URL}${normalizedPath}`

  const base = {
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    canonicalUrl,
    noindex: false,
    adsEligible: false,
    schemas: [],
  }

  if (normalizedPath === '/') {
    return {
      ...base,
      title: `${SITE_DISPLAY_NAME} | Automated blogs, AI publishing systems, and ad-ready growth`,
      description:
        'MyAppAI publishes practical systems for automated blogs, AI-assisted editorial workflows, SEO structure, and reader-first monetization.',
      adsEligible: true,
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_DISPLAY_NAME,
          description: SITE_DEFAULT_DESCRIPTION,
          url: SITE_URL,
          inLanguage: 'en-US',
          creator: {
            '@type': 'Organization',
            name: SITE_DISPLAY_NAME,
            url: SITE_URL,
            sameAs: [SITE_URL, WWW_SITE_URL],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'editor@myappai.org',
            },
          },
        },
      ],
    }
  }

  if (normalizedPath === '/blog') {
    return {
      ...base,
      title: `${SITE_DISPLAY_NAME} | Automated blog archive`,
      description:
        'Browse the numbered article archive covering AI publishing, monetization, audience growth, and ad-ready site operations.',
      adsEligible: true,
    }
  }

  if (normalizedPath.startsWith('/blog/')) {
    const slug = normalizedPath.replace('/blog/', '')
    const article = blogLookup[slug]

    if (!article) {
      return {
        ...base,
        title: `${SITE_DISPLAY_NAME} | Article not found`,
        noindex: true,
      }
    }

    return {
      ...base,
      title: `${article.title} | ${SITE_DISPLAY_NAME}`,
      description: article.description ?? article.excerpt ?? SITE_DEFAULT_DESCRIPTION,
      adsEligible: true,
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description ?? article.excerpt,
          datePublished: article.publishedAt,
          author: {
            '@type': 'Organization',
            name: article.author ?? SITE_DISPLAY_NAME,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_DISPLAY_NAME,
            url: SITE_URL,
          },
          mainEntityOfPage: article.canonicalUrl ?? `${SITE_URL}${normalizedPath}`,
        },
      ],
    }
  }

  if (['/guides', '/about', '/contact', '/privacy', '/disclosure', '/terms'].includes(normalizedPath)) {
    return {
      ...base,
      noindex: false,
      adsEligible: ['/guides', '/about'].includes(normalizedPath),
    }
  }

  if (normalizedPath.startsWith('/admin')) {
    return {
      ...base,
      title: `${SITE_DISPLAY_NAME} | Protected operator route`,
      description: 'Protected operational route.',
      noindex: true,
    }
  }

  return {
    ...base,
    noindex: true,
  }
}

export default function SiteSeo() {
  const location = useLocation()

  React.useEffect(() => {
    const seo = getSeoForPath(location.pathname)
    document.title = seo.title
    document.documentElement.lang = 'en'

    ensureMeta('meta[name="description"]', {
      name: 'description',
      content: seo.description,
    })
    ensureMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: seo.title,
    })
    ensureMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: seo.description,
    })
    ensureMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    })
    ensureMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: seo.canonicalUrl,
    })
    ensureMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_DISPLAY_NAME,
    })
    ensureMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    ensureMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: seo.title,
    })
    ensureMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: seo.description,
    })
    ensureMeta('meta[name="robots"]', {
      name: 'robots',
      content: seo.noindex ? 'noindex, nofollow' : 'index, follow',
    })
    ensureLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: seo.canonicalUrl,
    })

    if (seo.schemas.length > 0) {
      ensureScript('site-structured-data', {
        type: 'application/ld+json',
        textContent: JSON.stringify(seo.schemas),
      })
    } else {
      removeIfPresent('site-structured-data')
    }

    if (ADS_ENABLED && ADSENSE_CLIENT_ID && seo.adsEligible) {
      ensureScript('adsense-loader', {
        async: '',
        crossorigin: 'anonymous',
        src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`,
      })
    } else {
      removeIfPresent('adsense-loader')
    }
  }, [location.pathname])

  return null
}
