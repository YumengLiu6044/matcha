import { v4 as uuidv4 } from "uuid";
import { useHangoutStore, useUserDataStore } from "./store";
import { JointRecommendedEvent } from "./types";

const END_POINT = "https://matcha-o0es.onrender.com/";

export function getHangoutRecommendation() {
	const { self, others, suggestedIndex } = useUserDataStore.getState();
	const match = others[suggestedIndex];

	const { setSuggestedHangout, setIsLoading } = useHangoutStore.getState();

	const request = {
		user1_interests:
			self.interests.length > 0 ? self.interests.join(",") : "",
		user1_bio: self.bio ?? "",
		user2_interests:
			match.interests.length > 0 ? match.interests.join(",") : "",
		user2_bio: match.bio ?? "",
	};

	setIsLoading(true);

	fetch(END_POINT + "match_friends", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify(request),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			const parsed = data.joint_recommendation
				.recommendation as JointRecommendedEvent;
			setSuggestedHangout({
				...parsed,
				description: data.joint_recommendation.message,
				time: parsed.time ?? "10:00 AM",
				date: parsed.date ?? "May 25, 2025",
				users: [match, self],
				id: uuidv4(),
			});
		})
		.finally(() => {
			setIsLoading(false);
		});
}

export function generateMatch() {
	const others = useUserDataStore.getState().others;
	const setCurrentMatchIndex = useUserDataStore.getState().setSuggestedIndex;

	const newIndex = Math.floor(Math.random() * (others.length)) + 0;
	setCurrentMatchIndex(newIndex);

	getHangoutRecommendation();
}

export const acceptMatch = () => {
	const {
		suggestedHangout,
		isLoading: isLoadingRecommendation,
		pendingHangouts,
		setPendingHangouts,
	} = useHangoutStore.getState();

	if (isLoadingRecommendation || !suggestedHangout) return;
	setPendingHangouts([...pendingHangouts, suggestedHangout]);

	generateMatch();
};
