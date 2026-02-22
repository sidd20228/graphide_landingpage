import Hero from './components/Hero'
import TheGap from './components/TheGap'
import WhatWeDo from './components/WhatWeDo'
import HowItWorks from './components/HowItWorks'
import Enterprise from './components/Enterprise'
import Comparison from './components/Comparison'
import FinalCTA from './components/FinalCTA'
import { useReveal } from './hooks/useReveal'
import { useGradientAnimation } from './hooks/useGradientAnimation'
import { useEffect, useCallback } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

export default function App() {
    const revealRef = useReveal()
    const gradientRef = useGradientAnimation()

    // Merge both refs into one callback ref
    const containerRef = useCallback((node) => {
        revealRef.current = node
        gradientRef.current = node
    }, [revealRef, gradientRef])

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
            <SpeedInsights />
        </div>
    )
}
