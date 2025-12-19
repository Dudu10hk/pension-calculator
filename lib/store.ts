import { create } from 'zustand'

export interface LeadData {
  currentAge?: number
  retirementAge?: number
  monthlyIncome?: number
  monthlyExpenses?: number
  currentSavings?: number
  email?: string
  phone?: string
  name?: string
  idNumber?: string
  idIssueDate?: string
  termsAccepted?: boolean
  pensionClearinghouseContact?: boolean
}

interface LeadStore {
  data: LeadData
  setData: (data: Partial<LeadData>) => void
  reset: () => void
}

const initialState: LeadData = {}

export const useLeadStore = create<LeadStore>((set) => ({
  data: initialState,
  setData: (newData) =>
    set((state) => ({
      data: { ...state.data, ...newData },
    })),
  reset: () => set({ data: initialState }),
}))

