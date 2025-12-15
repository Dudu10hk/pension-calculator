import { notFound } from 'next/navigation'
import Step1Marketing from '@/components/steps/Step1Marketing'
import Step2Age from '@/components/steps/Step2Age'
import Step3RetirementAge from '@/components/steps/Step3RetirementAge'
import Step4MonthlyIncome from '@/components/steps/Step4MonthlyIncome'
import Step5MonthlyExpenses from '@/components/steps/Step5MonthlyExpenses'

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
    case 5:
      return <Step5MonthlyExpenses />
    default:
      return <div>שלב {stepNumber} - בהכנה</div>
  }
}

