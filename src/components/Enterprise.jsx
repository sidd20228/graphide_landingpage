export default function Enterprise() {
    return (
        <section className="section section--enterprise" id="enterprise">
            <div className="section-inner">
                <span className="section-label" data-reveal="">ENTERPRISE</span>
                <h2 className="section-heading gradient-text" data-reveal="">
                    Built for Real‑World<br />Engineering Workflows
                </h2>
                <p className="section-paragraph" data-reveal="">
                    Graphide integrates directly into CI pipelines and existing developer workflows, producing verified
                    findings and audit‑ready outputs.
                </p>

                <div className="ent-grid">
                    <div className="ent-item" data-reveal="" data-delay="0">
                        <svg className="ent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                        <span className="ent-label">CI‑Native Integration</span>
                    </div>
                    <div className="ent-item" data-reveal="" data-delay="1">
                        <svg className="ent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <polyline points="9 12 11 14 15 10"></polyline>
                        </svg>
                        <span className="ent-label">Deterministic Evidence</span>
                    </div>
                    <div className="ent-item" data-reveal="" data-delay="2">
                        <svg className="ent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                            <polyline points="17 18 23 18 23 12"></polyline>
                        </svg>
                        <span className="ent-label">Reduced False Positives</span>
                    </div>
                    <div className="ent-item" data-reveal="" data-delay="3">
                        <svg className="ent-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <polyline points="9 15 11 17 15 13"></polyline>
                        </svg>
                        <span className="ent-label">Audit‑Ready Reports</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
