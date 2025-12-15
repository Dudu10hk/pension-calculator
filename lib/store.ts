import { create } from 'zustand'

export interface LeadData {
  currentAge?: number
  retirementAge?: number
  monthlyIncome?: number
  monthlyExpenses?: number
  email?: string
  phone?: string
  name?: string
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

