import { Children, useMemo, useState, useEffect } from 'react'
import './Stepper.css'

export function Step({ children }) {
    return children
}

export default function Stepper({
    children,
    initialStep = 1,
    onStepChange,
    onFinalStepCompleted,
    backButtonText = 'Back',
    nextButtonText = 'Next',
    finalButtonText = 'Submit',
    isNextDisabled = false,
}) {
    const steps = useMemo(() => Children.toArray(children), [children])
    const totalSteps = steps.length
    const safeInitial = Math.min(Math.max(initialStep - 1, 0), Math.max(totalSteps - 1, 0))
    const [currentStep, setCurrentStep] = useState(safeInitial)

    useEffect(() => {
        onStepChange?.(currentStep + 1)
    }, [currentStep, onStepChange])

    const goTo = (index) => {
        if (index < 0 || index >= totalSteps) return
        setCurrentStep(index)
    }

    const goBack = () => goTo(currentStep - 1)

    const nextDisabled = typeof isNextDisabled === 'function'
        ? isNextDisabled(currentStep + 1)
        : Boolean(isNextDisabled)

    const goNext = () => {
        if (nextDisabled) return
        if (currentStep < totalSteps - 1) {
            goTo(currentStep + 1)
            return
        }
        onFinalStepCompleted?.()
    }

    if (!totalSteps) return null

    return (
        <div className="rb-stepper-outer-container">
            <div className="rb-stepper-card">
                <div className="rb-stepper-indicator-row">
                    {steps.map((_, index) => {
                        const isDone = index < currentStep
                        const isActive = index === currentStep

                        return (
                            <div key={`step-indicator-${index}`} className="rb-stepper-indicator-group">
                                <button
                                    className="rb-stepper-indicator"
                                    type="button"
                                    onClick={() => goTo(index)}
                                    aria-label={`Go to step ${index + 1}`}
                                >
                                    <span
                                        className="rb-stepper-indicator-inner"
                                        style={{
                                            background: isDone || isActive ? '#60a5fa' : '#2f2f35',
                                            color: '#ffffff',
                                        }}
                                    >
                                        {isDone ? '✓' : isActive ? <span className="rb-stepper-active-dot" /> : <span className="rb-stepper-number">{index + 1}</span>}
                                    </span>
                                </button>

                                {index < totalSteps - 1 && (
                                    <div className="rb-stepper-connector" aria-hidden="true">
                                        <div
                                            className="rb-stepper-connector-inner"
                                            style={{
                                                width: index < currentStep ? '100%' : '0%',
                                                background: '#60a5fa',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="rb-stepper-content-default">
                    <div className="rb-stepper-step-default">{steps[currentStep]}</div>
                </div>

                <div className="rb-stepper-footer-container">
                    <div className={`rb-stepper-footer-nav ${currentStep === 0 ? 'rb-end' : 'rb-spread'}`}>
                        <button
                            type="button"
                            className={`rb-stepper-back-button ${currentStep === 0 ? 'rb-inactive' : ''}`}
                            onClick={goBack}
                            disabled={currentStep === 0}
                        >
                            {backButtonText}
                        </button>

                        <button
                            type="button"
                            className={`rb-stepper-next-button ${nextDisabled ? 'rb-next-disabled' : ''}`}
                            onClick={goNext}
                            disabled={nextDisabled}
                        >
                            {currentStep === totalSteps - 1 ? finalButtonText : nextButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
