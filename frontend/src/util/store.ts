import { create } from 'zustand'
import { UserData, UserDataStore } from './types'

export const useUserDataStore = create<UserDataStore>((set) => ({
  self: {
    name: 'Student',
    interests: [],
    email: 'student@uci.edu',
  },

  others: [],

  setSelf: (newState: UserData) => set({ self: newState }),

  setOthers: (newState: UserData[]) => set({ others: newState }),
}))