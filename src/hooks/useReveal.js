import { useEffect, useRef } from 'react'

export function useReveal() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        /* Reveal elements */
        const els = container.querySelectorAll('[data-reveal]')
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    const d = parseInt(e.target.dataset.delay || '0', 10)
                    setTimeout(() => e.target.classList.add('revealed'), d * 140)
                    revealObs.unobserve(e.target)
                }
            })
        }, { threshold: 0.12 })
        els.forEach((el) => revealObs.observe(el))

        /* Step connector draw-in */
        const connectors = container.querySelectorAll('.step-connector')
        const connObs = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('connector-visible')
                    connObs.unobserve(e.target)
                }
            })
        }, { threshold: 0.5 })
        connectors.forEach((c) => connObs.observe(c))

        /* Smooth scroll for nav links */
        const anchors = container.querySelectorAll('a[href^="#"]')
        const handleClick = (e) => {
            const id = e.currentTarget.getAttribute('href')
            if (id && id !== '#') {
                e.preventDefault()
                document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
            }
        }
        anchors.forEach((a) => a.addEventListener('click', handleClick))

        return () => {
            revealObs.disconnect()
            connObs.disconnect()
            anchors.forEach((a) => a.removeEventListener('click', handleClick))
        }
    }, [])

    return containerRef
}
