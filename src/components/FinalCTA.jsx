import { useEffect, useState } from 'react'
import Stepper, { Step } from './Stepper'

export default function FinalCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalClosing, setIsModalClosing] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [currentStep, setCurrentStep] = useState(1)
    const [submitted, setSubmitted] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const isEmailValid = /\S+@\S+\.\S+/.test(email)

    const isNextDisabled = (step) => {
        if (isSubmitting) return true
        if (step === 2) return name.trim().length < 2
        if (step === 3) return !isEmailValid
        return false
    }

    const openModal = () => {
        setSubmitted(false)
        setSubmitMessage('')
        setCurrentStep(1)
        setSubmitError('')
        setIsModalClosing(false)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        if (!isModalOpen || isModalClosing) return
        setIsModalClosing(true)
    }

    const handleModalAnimationEnd = () => {
        if (!isModalClosing) return
        setIsModalOpen(false)
        setIsModalClosing(false)
    }

    const handleFinalStepCompleted = async () => {
        try {
            setIsSubmitting(true)
            setSubmitError('')

            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim() }),
            })

            const payload = await response.json().catch(() => ({}))
            if (!response.ok) {
                throw new Error(payload.error || 'Failed to submit form.')
            }

            setSubmitMessage(payload.message || 'Thanks! We’ll reach out soon.')
            setSubmitted(true)
            setIsModalClosing(true)
            setName('')
            setEmail('')
        } catch (error) {
            setSubmitError(error.message || 'Failed to submit form.')
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        if (!isModalOpen) return

        const onKeyDown = (e) => {
            if (e.key === 'Escape') closeModal()
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [isModalOpen, isModalClosing])

    return (
        <>
            <section className="section section--cta" id="cta">
                <div className="section-inner">
                    <h2 className="cta-heading gradient-text-large" data-reveal="scale">
                        Secure AI‑Generated Code<br />With Proof
                    </h2>
                    <p className="cta-sub" data-reveal="">Deterministic verification for modern AI‑driven development.</p>
                    <button type="button" className="btn-waitlist btn-waitlist--cta" data-reveal="" onClick={openModal}>
                        <span className="btn-glow"></span>
                        <span className="btn-text">Request Early Access</span>
                    </button>
                    {submitted && <p className="cta-success">{submitMessage || 'Thanks! We’ll reach out soon.'}</p>}
                    <p className="cta-footnote" data-reveal="">Built for teams that cannot afford uncertainty.</p>
                </div>
            </section>

            {isModalOpen && (
                <div
                    className={`waitlist-modal-overlay ${isModalClosing ? 'is-closing' : ''}`}
                    onClick={closeModal}
                    onAnimationEnd={handleModalAnimationEnd}
                >
                    <div
                        className="waitlist-modal"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Request early access form"
                    >
                        <button type="button" className="waitlist-modal-close" onClick={closeModal} aria-label="Close form">×</button>
                        <h3 className="waitlist-modal-title">Request Early Access</h3>
                        <p className="waitlist-modal-sub">Complete the quick form to join the Graphide waitlist.</p>

                        <Stepper
                            initialStep={1}
                            onStepChange={(step) => setCurrentStep(step)}
                            onFinalStepCompleted={handleFinalStepCompleted}
                            backButtonText="Previous"
                            nextButtonText="Next"
                            finalButtonText={isSubmitting ? 'Submitting...' : 'Submit'}
                            isNextDisabled={isNextDisabled}
                        >
                            <Step>
                                <h4 className="waitlist-step-title">Welcome</h4>
                                <p className="waitlist-step-copy">We only need your basic details to keep you updated.</p>
                            </Step>
                            <Step>
                                <h4 className="waitlist-step-title">Your Name</h4>
                                <input
                                    className="waitlist-input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                />
                                {name.trim().length > 0 && name.trim().length < 2 && (
                                    <p className="waitlist-hint">Please enter at least 2 characters.</p>
                                )}
                            </Step>
                            <Step>
                                <h4 className="waitlist-step-title">Your Email</h4>
                                <input
                                    className="waitlist-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                />
                                {email.length > 0 && !isEmailValid && (
                                    <p className="waitlist-hint">Enter a valid email address.</p>
                                )}
                            </Step>
                            <Step>
                                <h4 className="waitlist-step-title">Review</h4>
                                <p className="waitlist-step-copy">Name: <strong>{name || '—'}</strong></p>
                                <p className="waitlist-step-copy">Email: <strong>{email || '—'}</strong></p>
                                <p className="waitlist-hint">Click Submit to finish.</p>
                            </Step>
                        </Stepper>

                        {submitError && <p className="waitlist-error">{submitError}</p>}

                        <p className="waitlist-progress">Step {currentStep} of 4</p>
                    </div>
                </div>
            )}
        </>
    )
}
