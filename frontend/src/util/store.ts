import { create } from 'zustand'
import { UserData, UserDataStore } from './types'

export const useUserDataStore = create<UserDataStore>((set) => ({
  self: {
    name: 'Student',
    interests: [],
    email: 'student@uci.edu',
  },

  others: [
    {
      name: "Alex Kim",
      major: "Computer Science",
      year: "Junior",
      interests: ["Technology", "Gaming", "Music"],
      profileURL: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
    },
    {
      name: "Jordan Lee",
      major: "Biology",
      year: "Sophomore",
      interests: ["Science", "Outdoor Activities", "Reading"],
      profileURL: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
    },
    {
      name: "Taylor Chen",
      major: "Business Economics",
      year: "Senior",
      interests: ["Entrepreneurship", "Sports & Fitness", "Travel"],
      profileURL: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
    },
    {
      name: "Morgan Patel",
      major: "Psychology",
      year: "Freshman",
      interests: ["Mental Health", "Poetry", "Volunteering"],
      profileURL: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
    },
    {
      name: "Casey Rivera",
      major: "Mechanical Engineering",
      year: "Senior",
      interests: ["Robotics", "DIY Projects", "Cars"],
      profileURL: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
    },
    {
      name: "Samira Ali",
      major: "Art History",
      year: "Junior",
      interests: ["Painting", "Museums", "Photography"],
      profileURL: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
    },
    {
      name: "Leo Zhang",
      major: "Mathematics",
      year: "Sophomore",
      interests: ["Puzzles", "Chess", "Machine Learning"],
      profileURL: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
    },
  ],

  setSelf: (newState: UserData) => set({ self: newState }),

  setOthers: (newState: UserData[]) => set({ others: newState }),
}))