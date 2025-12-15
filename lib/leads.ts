import { supabase } from './supabase'

export interface LeadSubmission {
  currentAge: number
  retirementAge: number
  monthlyIncome?: number
  monthlyExpenses?: number
  email?: string
  phone?: string
  name?: string
  simulationResult?: any
}

export async function submitLead(data: LeadSubmission): Promise<{
  success: boolean
  lead?: any
  error?: string
}> {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'שגיאה בשמירת הנתונים',
      }
    }

    return {
      success: true,
      lead: result.lead,
    }
  } catch (error) {
    console.error('Error submitting lead:', error)
    return {
      success: false,
      error: 'שגיאה בחיבור לשרת',
    }
  }
}

