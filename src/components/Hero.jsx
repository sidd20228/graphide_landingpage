export default function Hero() {
    return (
        <section className="hero-section" id="hero">
            {/* Fullscreen Background Video */}
            <div className="video-bg">
                <video autoPlay muted loop playsInline>
                    <source
                        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260217_030345_246c0224-10a4-422c-b324-070b7c0eceda.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="video-overlay"></div>
            </div>

            {/* Interface Layer */}
            <div className="interface">
                {/* Centered Wordmark */}
                <div className="wordmark-hero">
                    <span className="wordmark">GRAPHIDE</span>
                </div>

                {/* Hero Content */}
                <main className="hero">
                    <div className="hero-content">
                        <div className="badge-pill">
                            <span className="badge-dot"></span>
                            <span className="badge-label">Private beta launching</span>
                            <span className="badge-date">&nbsp;April 2026</span>
                        </div>
                        <h1 className="hero-heading">Graphide IDE: Code at the Speed of Thought</h1>
                        <p className="hero-subtitle">
                            Graphide IDE transforms your codebase into a living knowledge graph, enabling real‑time context,
                            intelligent navigation, and seamless collaboration. Build faster, reason deeper, and ship with
                            clarity.
                        </p>
                        <a href="#cta" className="btn-waitlist btn-waitlist--cta">
                            <span className="btn-glow"></span>
                            <span className="btn-text">Join Waitlist</span>
                        </a>
                    </div>
                </main>
            </div>
        </section>
    )
}
