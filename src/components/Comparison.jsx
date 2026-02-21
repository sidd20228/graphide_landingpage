export default function Comparison() {
    return (
        <section className="section section--diff" id="diff">
            <div className="section-inner">
                <span className="section-label" data-reveal="">POSITIONING</span>
                <h2 className="section-heading gradient-text" data-reveal="">
                    Not Another LLM<br />Security Wrapper
                </h2>

                <div className="compare" data-reveal="scale">
                    <div className="compare-col compare-col--old">
                        <h3 className="compare-title">Traditional AI Security</h3>
                        <ul className="compare-list">
                            <li><span className="compare-x">✕</span> Text‑level reasoning</li>
                            <li><span className="compare-x">✕</span> High hallucination risk</li>
                            <li><span className="compare-x">✕</span> No reachability proof</li>
                        </ul>
                    </div>
                    <div className="compare-divider" aria-hidden="true"></div>
                    <div className="compare-col compare-col--new">
                        <h3 className="compare-title compare-title--green">Graphide</h3>
                        <ul className="compare-list">
                            <li><span className="compare-check">✓</span> Graph‑level validation</li>
                            <li><span className="compare-check">✓</span> Minimal speculative reasoning</li>
                            <li><span className="compare-check">✓</span> Structural execution proof</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
