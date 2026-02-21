export default function WhatWeDo() {
    return (
        <section className="section section--what" id="what">
            <div className="section-inner what-grid">
                {/* Left column */}
                <div className="what-text">
                    <span className="section-label" data-reveal="left">WHAT WE DO</span>
                    <h2 className="section-heading-left gradient-text" data-reveal="left">
                        Proof Before<br />AI Reasoning
                    </h2>
                    <p className="what-subtext" data-reveal="left">
                        Graphide transforms code into structural program graphs and validates real execution paths before
                        any AI reasoning is applied.
                    </p>
                    <ul className="what-bullets" data-reveal="left">
                        <li><span className="bullet-dot"></span>Graph‑based reachability validation</li>
                        <li><span className="bullet-dot"></span>Progressive code slicing</li>
                        <li><span className="bullet-dot"></span>AI applied only to verified slices</li>
                    </ul>
                </div>

                {/* Right column — Graph Visual */}
                <div className="what-visual" data-reveal="right" data-delay="1">
                    <div className="graph-container">
                        <div className="graph-glow"></div>
                        <svg className="graph-svg" viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Edges (non-highlighted) */}
                            <line x1="80" y1="60" x2="200" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                            <line x1="340" y1="60" x2="200" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                            <line x1="200" y1="120" x2="120" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                            <line x1="200" y1="120" x2="300" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                            <line x1="120" y1="200" x2="300" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

                            {/* Highlighted source-to-sink path */}
                            <line x1="80" y1="60" x2="200" y2="120" stroke="url(#blueGrad)" strokeWidth="2.5" className="path-line" />
                            <line x1="200" y1="120" x2="300" y2="200" stroke="url(#blueGrad)" strokeWidth="2.5" className="path-line" />
                            <line x1="300" y1="200" x2="260" y2="280" stroke="url(#blueGrad)" strokeWidth="2.5" className="path-line" />

                            {/* Gradient definition */}
                            <defs>
                                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#60a5fa" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>

                            {/* Nodes */}
                            <circle cx="80" cy="60" r="8" fill="#60a5fa" className="node-source" />
                            <circle cx="340" cy="60" r="6" fill="rgba(255,255,255,0.15)" />
                            <circle cx="200" cy="120" r="7" fill="rgba(255,255,255,0.2)" />
                            <circle cx="120" cy="200" r="6" fill="rgba(255,255,255,0.12)" />
                            <circle cx="300" cy="200" r="7" fill="#60a5fa" className="node-mid" />
                            <circle cx="260" cy="280" r="8" fill="#3b82f6" className="node-sink" />
                            <circle cx="160" cy="280" r="5" fill="rgba(255,255,255,0.1)" />

                            {/* Source label */}
                            <text x="80" y="42" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="General Sans, sans-serif">source</text>
                            {/* Sink label */}
                            <text x="260" y="300" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="General Sans, sans-serif">sink</text>
                        </svg>

                        <span className="graph-label">Verified Path</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
