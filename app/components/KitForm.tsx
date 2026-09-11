'use client'

import { useEffect, useRef } from 'react'

export default function KitForm() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (containerRef.current.querySelector('script')) return
    const script = document.createElement('script')
    script.src = 'https://visitrhosneigr-wales.kit.com/XXXX/index.js'
    script.async = true
    script.dataset.uid = 'XXXX'
    containerRef.current.appendChild(script)
  }, [])

  return <div ref={containerRef} />
}
