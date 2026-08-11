import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SiteFrame from '../components/SiteFrame.jsx'

vi.mock('../src/siteApi.js', () => ({
  trackConversionEvent: vi.fn(() => Promise.resolve()),
}))

describe('SiteFrame', () => {
  it('renders the publication shell, trust links, and editorial footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<SiteFrame />}>
            <Route path="/" element={<h1>Home</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByText('Built for readers, not algorithms.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Terms' })).toBeInTheDocument()
  })
})
