import { create } from "zustand";
import { HangoutStore, UserData, UserDataStore } from "./types";

export const useUserDataStore = create<UserDataStore>((set) => ({
	self: {
		name: "Student",
		interests: [],
		email: "student@uci.edu",
	},
	suggestedIndex: 0,
	others: [
		{
			name: "Alex Kim",
			major: "Computer Science",
			year: "Junior",
			interests: ["Technology", "Gaming", "Music"],
			profileURL:
				"https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
			bio: "Junior Computer Science major passionate about tech innovation. Loves gaming, building side projects, and jamming to synth-pop playlists.",
		},
		{
			name: "Jordan Lee",
			major: "Biology",
			year: "Sophomore",
			interests: ["Science", "Outdoor Activities", "Reading"],
			profileURL:
				"https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
			bio: "Sophomore Biology student who enjoys exploring the outdoors, diving into science podcasts, and getting lost in a good book.",
		},
		{
			name: "Taylor Chen",
			major: "Business Economics",
			year: "Senior",
			interests: ["Entrepreneurship", "Sports & Fitness", "Travel"],
			profileURL:
				"https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
			bio: "Senior in Business Economics with a drive for entrepreneurship. When not pitching ideas, you'll find them working out or planning their next trip.",
		},
		{
			name: "Morgan Patel",
			major: "Psychology",
			year: "Freshman",
			interests: ["Mental Health", "Poetry", "Volunteering"],
			profileURL:
				"https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
			bio: "Psychology freshman dedicated to mental wellness and community service. Writes poetry and volunteers at local youth centers.",
		},
		{
			name: "Casey Rivera",
			major: "Mechanical Engineering",
			year: "Senior",
			interests: ["Robotics", "DIY Projects", "Cars"],
			profileURL:
				"https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
			bio: "Senior Mechanical Engineering student obsessed with robotics and all things mechanical. Loves hands-on DIY projects and tuning up their car.",
		},
		{
			name: "Samira Ali",
			major: "Art History",
			year: "Junior",
			interests: ["Painting", "Museums", "Photography"],
			profileURL:
				"https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
			bio: "Art History junior who spends weekends at museums and evenings painting. Passionate about visual storytelling and capturing moments through photography.",
		},
		{
			name: "Leo Zhang",
			major: "Mathematics",
			year: "Sophomore",
			interests: ["Puzzles", "Chess", "Machine Learning"],
			profileURL:
				"https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg?height=80&width=80",
			bio: "Sophomore Math major and puzzle fanatic. Enjoys solving complex problems, playing chess, and experimenting with machine learning models.",
		},
	],
	setSelf: (newState: UserData) => set({ self: newState }),
	setSuggestedIndex: (newState: number) => set({ suggestedIndex: newState }),
	setOthers: (newState: UserData[]) => set({ others: newState }),
}));

export const useHangoutStore = create<HangoutStore>((set) => ({
	pendingHangouts: [],
	suggestedHangout: null,
	pastHangouts: [],
	isLoading: false,
	setSuggestedHangout: (newState) => set({ suggestedHangout: newState }),
	setPendingHangouts: (newState) => set({ pendingHangouts: newState }),
	setIsLoading: (newState) => set({ isLoading: newState }),
}));
