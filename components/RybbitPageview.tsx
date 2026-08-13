'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    rybbit?: { pageview: () => void }
  }
}

export default function RybbitPageview() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    window.rybbit?.pageview()
  }, [pathname, searchParams])

  return null
}
