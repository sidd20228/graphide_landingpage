export default function HowItWorks() {
    const steps = [
        { num: '01', title: 'Ingest', desc: 'Repository is parsed into structural graphs.' },
        { num: '02', title: 'Slice', desc: 'Security rules narrow the scope.' },
        { num: '03', title: 'Prove', desc: 'Execution paths are validated.' },
        { num: '04', title: 'Remediate', desc: 'AST‑validated fixes are safely applied.' },
    ]

    return (
        <section className="section section--how" id="how">
            <div className="section-inner">
                <span className="section-label" data-reveal="">PROCESS</span>
                <h2 className="section-heading gradient-text" data-reveal="">From Repository to Verified Fix</h2>

                <div className="steps">
                    {steps.map((step, i) => (
                        <div key={step.num} style={{ display: 'contents' }}>
                            <div className="step" data-reveal="" data-delay={i}>
                                <div className="step-number">{step.num}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="step-connector" aria-hidden="true"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
