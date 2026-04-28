const runtimeEnv =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : typeof process !== 'undefined'
      ? process.env
      : {}

export const REPOSITORY_URL = 'https://github.com/3000Studios/myappai'

export const SITE_DISPLAY_NAME = 'MyAppAI.org'
export const SITE_LEGAL_NAME = 'MyAppAI.org'
export const SITE_DOMAIN = 'myappai.org'
export const SITE_URL = `https://${SITE_DOMAIN}`
export const WWW_SITE_URL = `https://www.${SITE_DOMAIN}`
export const SITE_CATEGORY =
  'AI publishing systems, automated blogs, and monetization workflows'
export const SITE_DEFAULT_TITLE = `${SITE_DISPLAY_NAME} | Automated publishing and AdSense-ready growth`
export const SITE_DEFAULT_DESCRIPTION =
  'MyAppAI.org publishes practical guides on AI content systems, automated blogs, monetization, and the operational setup required for ad-ready publishing sites.'
export const COPYRIGHT_HOLDER = SITE_LEGAL_NAME
export const SUPPORT_EMAIL = 'editor@myappai.org'
export const CONTACT_EMAIL = SUPPORT_EMAIL
export const PAYMENT_FALLBACK_LABEL = 'your configured checkout provider'
export const ADSENSE_CLIENT_ID = runtimeEnv.VITE_ADSENSE_CLIENT_ID ?? ''
export const ADS_ENABLED =
  String(runtimeEnv.VITE_ENABLE_ADS ?? 'false').toLowerCase() === 'true'

export function getCopyrightLine() {
  return `© ${new Date().getFullYear()} ${COPYRIGHT_HOLDER} · ${SITE_DOMAIN} · All rights reserved`
}
