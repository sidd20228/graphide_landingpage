import { useEffect, useRef, useCallback } from 'react'

/**
 * Hook that adds moving gradient animations to heading elements.
 * Gradients shift based on scroll position and accelerate on mouse hover.
 *
 * Targets: .gradient-text, .gradient-text-large, .hero-heading
 */
export function useGradientAnimation() {
    const containerRef = useRef(null)
    const rafRef = useRef(null)
    const scrollPosRef = useRef(0)
    const mouseMapRef = useRef(new WeakMap()) // stores per-element hover state

    const update = useCallback(() => {
        const container = containerRef.current
        if (!container) return

        const headings = container.querySelectorAll(
            '.gradient-text, .gradient-text-large, .hero-heading'
        )

        const scrollY = window.scrollY || window.pageYOffset
        scrollPosRef.current = scrollY

        headings.forEach((el) => {
            const rect = el.getBoundingClientRect()
            const elCenter = rect.top + rect.height / 2
            const viewH = window.innerHeight

            // Scroll-based offset: how far through the viewport the element is
            // Normalized from 0 (top) to 1 (bottom)
            const scrollNorm = 1 - (elCenter / viewH)

            // Base gradient position from scroll (moves 0% → 100%)
            const scrollOffset = scrollNorm * 100

            // Mouse hover offset (stored per element)
            const mouseState = mouseMapRef.current.get(el) || { x: 0, y: 0, active: false }

            let bgPosX, bgPosY

            if (mouseState.active) {
                // When hovering: combine scroll offset with mouse position for extra movement
                bgPosX = scrollOffset + mouseState.x * 30
                bgPosY = 50 + mouseState.y * 30
            } else {
                bgPosX = scrollOffset
                bgPosY = 50
            }

            el.style.setProperty('--grad-x', `${bgPosX}%`)
            el.style.setProperty('--grad-y', `${bgPosY}%`)
        })

        rafRef.current = requestAnimationFrame(update)
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const headings = container.querySelectorAll(
            '.gradient-text, .gradient-text-large, .hero-heading'
        )

        // Mouse enter / move / leave handlers
        const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5   // -0.5 to 0.5
            mouseMapRef.current.set(e.currentTarget, { x, y, active: true })
        }

        const handleMouseLeave = (e) => {
            mouseMapRef.current.set(e.currentTarget, { x: 0, y: 0, active: false })
        }

        headings.forEach((el) => {
            el.addEventListener('mousemove', handleMouseMove)
            el.addEventListener('mouseleave', handleMouseLeave)
        })

        // Start animation loop
        rafRef.current = requestAnimationFrame(update)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            headings.forEach((el) => {
                el.removeEventListener('mousemove', handleMouseMove)
                el.removeEventListener('mouseleave', handleMouseLeave)
            })
        }
    }, [update])

    return containerRef
}
