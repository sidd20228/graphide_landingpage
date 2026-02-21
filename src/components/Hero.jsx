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
                {/* Navbar */}
                <nav className="navbar">
                    <div className="nav-left">
                        <a href="/" className="wordmark">GRAPHIDE</a>
                        <ul className="nav-links">
                            <li>
                                <a href="#" className="nav-link">
                                    Product{' '}
                                    <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link">
                                    Developers{' '}
                                    <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link">
                                    Docs{' '}
                                    <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="nav-link">
                                    Community{' '}
                                    <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-right">
                        <a href="#cta" className="btn-waitlist btn-waitlist--nav">
                            <span className="btn-glow"></span>
                            <span className="btn-text">Join Waitlist</span>
                        </a>
                    </div>
                </nav>

                {/* Hero Content */}
                <main className="hero">
                    <div className="hero-content">
                        <div className="badge-pill">
                            <span className="badge-dot"></span>
                            <span className="badge-label">Private beta launching</span>
                            <span className="badge-date">&nbsp;April 2026</span>
                        </div>
                        <h1 className="hero-heading">Code at the Speed of Thought</h1>
                        <p className="hero-subtitle">
                            Graphide transforms your codebase into a living knowledge graph, enabling real‑time context,
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
