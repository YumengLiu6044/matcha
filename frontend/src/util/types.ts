import { UUID } from "crypto";
import { User } from "firebase/auth";

export type UserData = {
	availability?: Record<string, { start: string; end: string }>;
	name: string;
	email?: string;
	major?: string;
	year?: string;
	profileURL?: string;
	createdAt?: string;
	interests: string[];
	uid?: string;
};

export type JointRecommendedEvent = {
	type: string;
	name: string;
	description: string;
	time?: string;
	location: string;
	url?: string;
	organizer?: string;
	items_needed?: string;
};

export type JointRecommendationOutput = {
	recommendation: JointRecommendedEvent;
	message: string;
};

export type Hangout = JointRecommendedEvent & { users: UserData[];
  id: UUID
 };
