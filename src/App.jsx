import Hero from './components/Hero'
import TheGap from './components/TheGap'
import WhatWeDo from './components/WhatWeDo'
import HowItWorks from './components/HowItWorks'
import Enterprise from './components/Enterprise'
import Comparison from './components/Comparison'
import FinalCTA from './components/FinalCTA'
import { useReveal } from './hooks/useReveal'

export default function App() {
    const containerRef = useReveal()

    return (
        <div ref={containerRef}>
            <Hero />
            <TheGap />
            <WhatWeDo />
            <HowItWorks />
            <Enterprise />
            <Comparison />
            <FinalCTA />
        </div>
    )
}
