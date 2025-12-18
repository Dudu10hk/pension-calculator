'use client'

import { notFound, useParams, usePathname } from 'next/navigation'
import Step1Marketing from '@/components/steps/Step1Marketing'
import Step2Age from '@/components/steps/Step2Age'
import Step3RetirementAge from '@/components/steps/Step3RetirementAge'
import Step4FinancialBalance from '@/components/steps/Step4FinancialBalance'
import Step6Savings from '@/components/steps/Step6Savings'
import Step7Results from '@/components/steps/Step7Results'
import StepTransition from '@/components/StepTransition'

export default function StepPage() {
  const params = useParams()
  const stepNumber = parseInt(params.stepNumber as string)
  const pathname = usePathname()

  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 6) {
    notFound()
  }

  const renderStep = () => {
    switch (stepNumber) {
      case 1:
        return <Step1Marketing />
      case 2:
        return <Step2Age />
      case 3:
        return <Step3RetirementAge />
      case 4:
        return <Step4FinancialBalance />
      case 5:
        return <Step6Savings />
      case 6:
        return <Step7Results />
      default:
        return <div>שלב {stepNumber} - בהכנה</div>
    }
  }

  return (
    <StepTransition stepKey={pathname}>
      {renderStep()}
    </StepTransition>
  )
}
