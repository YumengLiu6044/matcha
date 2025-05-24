export type UserData = {
	availability?: Record<string, { start: string; end: string }>;
	name: string;
	email?: string;
	major?: string;
	year?: string;
	profileURL?: string;
	createdAt?: string;
	bio?: string;
	interests: string[];
	uid?: string;
};

export type JointRecommendedEvent = {
	type: string;
	name: string;
	date?: string;
	description: string;
	time?: string;
	location: string;
	url?: string;
	organizer?: string;
	items_needed?: string;
};

export type Hangout = JointRecommendedEvent & { users: UserData[]; id: string };

export type UserDataStore = {
	self: UserData;
	others: UserData[];
	suggestedIndex: number;

	setSelf: (newState: UserData) => void;
	setSuggestedIndex: (newState: number) => void;
	setOthers: (newState: UserData[]) => void;
};

export type HangoutStore = {
	pendingHangouts: Hangout[];
  suggestedHangout: Hangout | null;
  pastHangouts: Hangout[]

  isLoading: boolean

  setPendingHangouts: (newState: Hangout[]) => void;
  setIsLoading: (newState: boolean) => void;
  setSuggestedHangout: (newState: Hangout) => void
};
