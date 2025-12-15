import { notFound } from 'next/navigation'
import Step1Marketing from '@/components/steps/Step1Marketing'
import Step2Age from '@/components/steps/Step2Age'
import Step3RetirementAge from '@/components/steps/Step3RetirementAge'
import Step4MonthlyIncome from '@/components/steps/Step4MonthlyIncome'

export default function StepPage({
  params,
}: {
  params: { stepNumber: string }
}) {
  const stepNumber = parseInt(params.stepNumber)

  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 6) {
    notFound()
  }

  switch (stepNumber) {
    case 1:
      return <Step1Marketing />
    case 2:
      return <Step2Age />
    case 3:
      return <Step3RetirementAge />
    case 4:
      return <Step4MonthlyIncome />
    default:
      return <div>שלב {stepNumber} - בהכנה</div>
  }
}

