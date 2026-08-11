import React from 'react'
import { ADSENSE_CLIENT_ID, ADS_ENABLED } from '../src/siteMeta.js'

export default function AdSenseSlot({
  slot = '',
  label = 'Advertisement',
  className = '',
}) {
  const hasRealSlot = /^\d+$/u.test(String(slot))

  React.useEffect(() => {
    if (!ADS_ENABLED || !ADSENSE_CLIENT_ID || !hasRealSlot || typeof window === 'undefined') {
      return
    }

    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch {
      // Ignore client-side ad script timing issues in development.
    }
  }, [])

  if (!ADS_ENABLED || !ADSENSE_CLIENT_ID) {
    return null
  }

  return (
    <aside className={`ad-slot ${className}`.trim()} aria-label={label}>
      <div className="ad-slot__label">{label}</div>
      {hasRealSlot ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="ad-slot__placeholder">
          <strong>AdSense-ready space</strong>
          <span>Visible display inventory for approved Google AdSense units or direct sponsors.</span>
        </div>
      )}
    </aside>
  )
}
