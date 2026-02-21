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

        /* Scroll default + cursor-hover override on headings */
        const gradEls = container.querySelectorAll('.gradient-text, .gradient-text-large, .hero-heading')
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        const activeHoverEls = new Set()
        let ticking = false

        const setGradientFromProgress = (el, progress) => {
            const angle = 90 + progress * 160
            const radians = ((angle - 90) * Math.PI) / 180
            const shadowDistance = 14
            const shadowX = Math.cos(radians) * shadowDistance
            const shadowY = Math.sin(radians) * shadowDistance * 0.7
            const shadowAlpha = 0.1 + progress * 0.16

            el.style.setProperty('--grad-angle', `${angle.toFixed(2)}deg`)
            el.style.setProperty('--shadow-x', `${shadowX.toFixed(2)}px`)
            el.style.setProperty('--shadow-y', `${shadowY.toFixed(2)}px`)
            el.style.setProperty('--shadow-alpha', shadowAlpha.toFixed(3))
        }

        const setGradientFromScroll = (el) => {
            const vh = window.innerHeight
            const rect = el.getBoundingClientRect()
            const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
            setGradientFromProgress(el, progress)
        }

        const updateGradients = () => {
            if (prefersReducedMotion) {
                gradEls.forEach((el) => {
                    el.style.setProperty('--grad-angle', '144.5deg')
                    el.style.setProperty('--shadow-x', '0px')
                    el.style.setProperty('--shadow-y', '10px')
                    el.style.setProperty('--shadow-alpha', '0.14')
                })
                ticking = false
                return
            }

            gradEls.forEach((el) => {
                if (!activeHoverEls.has(el)) setGradientFromScroll(el)
            })

            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateGradients)
                ticking = true
            }
        }

        const handlePointerMove = (e) => {
            const el = e.currentTarget
            activeHoverEls.add(el)
            const rect = el.getBoundingClientRect()
            const nx = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
            const ny = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1)
            const dx = nx - 0.5
            const dy = ny - 0.5

            const angle = 144.5 + dx * 140 + dy * 60
            const shadowX = dx * 30
            const shadowY = 10 + dy * 20
            const shadowAlpha = Math.min(0.3, 0.12 + (Math.abs(dx) + Math.abs(dy)) * 0.22)

            el.style.setProperty('--grad-angle', `${angle.toFixed(2)}deg`)
            el.style.setProperty('--shadow-x', `${shadowX.toFixed(2)}px`)
            el.style.setProperty('--shadow-y', `${shadowY.toFixed(2)}px`)
            el.style.setProperty('--shadow-alpha', shadowAlpha.toFixed(3))
        }

        const handlePointerLeave = (e) => {
            const el = e.currentTarget
            activeHoverEls.delete(el)
            setGradientFromScroll(el)
        }

        updateGradients()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)

        if (!prefersReducedMotion && supportsHover) {
            gradEls.forEach((el) => {
                el.addEventListener('pointermove', handlePointerMove)
                el.addEventListener('pointerleave', handlePointerLeave)
            })
        }

        return () => {
            revealObs.disconnect()
            connObs.disconnect()
            anchors.forEach((a) => a.removeEventListener('click', handleClick))
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            gradEls.forEach((el) => {
                el.removeEventListener('pointermove', handlePointerMove)
                el.removeEventListener('pointerleave', handlePointerLeave)
            })
        }
    }, [])

    return containerRef
}
