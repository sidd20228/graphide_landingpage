import Hero from './components/Hero'
import TheGap from './components/TheGap'
import WhatWeDo from './components/WhatWeDo'
import HowItWorks from './components/HowItWorks'
import Enterprise from './components/Enterprise'
import Comparison from './components/Comparison'
import FinalCTA from './components/FinalCTA'
import { useReveal } from './hooks/useReveal'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
    const containerRef = useReveal()

    useEffect(() => {
        const canonicalHref = `${window.location.origin}${window.location.pathname}`
        let canonicalEl = document.querySelector('link[rel="canonical"]')

        if (!canonicalEl) {
            canonicalEl = document.createElement('link')
            canonicalEl.setAttribute('rel', 'canonical')
            document.head.appendChild(canonicalEl)
        }

        canonicalEl.setAttribute('href', canonicalHref)
    }, [])

    return (
        <div ref={containerRef}>
            <Hero />
            <TheGap />
            <WhatWeDo />
            <HowItWorks />
            <Enterprise />
            <Comparison />
            <FinalCTA />
            <Analytics />
        </div>
    )
}
