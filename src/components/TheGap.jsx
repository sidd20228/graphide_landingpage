export default function TheGap() {
    return (
        <section className="section section--gap" id="gap">
            <div className="section-inner">
                <span className="section-label" data-reveal="">THE GAP</span>
                <h2 className="section-heading gradient-text" data-reveal="">
                    AI Writes Code.<br />Who Proves It Is Secure?
                </h2>
                <p className="section-paragraph" data-reveal="">
                    Modern software is increasingly AI‑generated, but security tools still rely on pattern matching or
                    probabilistic reasoning. That gap creates noise, false positives, and risk.
                </p>

                <div className="gap-cards">
                    <div className="gap-card" data-reveal="" data-delay="0">
                        <h3 className="gap-card__title">Text‑Based Inference</h3>
                        <p className="gap-card__desc">Security tools guess risk without proving reachability.</p>
                    </div>
                    <div className="gap-card" data-reveal="" data-delay="1">
                        <h3 className="gap-card__title">Alert Fatigue</h3>
                        <p className="gap-card__desc">High false positives overwhelm AppSec teams.</p>
                    </div>
                    <div className="gap-card" data-reveal="" data-delay="2">
                        <h3 className="gap-card__title">No Audit Proof</h3>
                        <p className="gap-card__desc">Lack of deterministic evidence for compliance.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
