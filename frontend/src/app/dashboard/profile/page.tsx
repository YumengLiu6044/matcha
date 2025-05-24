"use client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TimePickerInput } from "@/components/time-picker-input";
import { Loader2 } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getProfileURL } from "@/util/firebase-utils";
import { useUserDataStore } from "@/util/store";

const interests = [
	"Sports & Fitness",
	"Arts & Creativity",
	"Music",
	"Technology",
	"Gaming",
	"Reading",
	"Movies & TV",
	"Food & Cooking",
	"Outdoor Activities",
	"Travel",
	"Photography",
	"Science",
	"Languages",
	"Volunteering",
	"Entrepreneurship",
	"Fashion",
	"Dance",
	"Anime & Manga",
	"Board Games",
	"Pets & Animals",
];

const days = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export default function ProfilePage() {
	const selfUserData = useUserDataStore((state) => state.self);
	const setSelfUserData = useUserDataStore.getState().setSelf;

	const [name, setName] = useState("UCI Student");
	const [email, setEmail] = useState("student@uci.edu");
	const [major, setMajor] = useState("Computer Science");
	const [year, setYear] = useState("Junior");
	const [bio, setBio] = useState(
		"CS major who loves coding and gaming. Looking to meet people outside my major!"
	);
	const [selectedInterests, setSelectedInterests] = useState<string[]>([
		"Technology",
		"Gaming",
		"Music",
	]);
	const [availability, setAvailability] = useState<
		Record<string, { start: string; end: string }>
	>({
		Monday: { start: "09:00", end: "17:00" },
		Tuesday: { start: "09:00", end: "17:00" },
		Wednesday: { start: "09:00", end: "17:00" },
		Thursday: { start: "09:00", end: "17:00" },
		Friday: { start: "09:00", end: "17:00" },
		Saturday: { start: "09:00", end: "17:00" },
		Sunday: { start: "09:00", end: "17:00" },
	});
	const [loading, setLoading] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [_, setSelectedFile] = useState<File | null>(null);
	const [profileURL, setProfileURL] = useState("");

	const handleInterestToggle = (interest: string) => {
		setSelectedInterests((prev) =>
			prev.includes(interest)
				? prev.filter((i) => i !== interest)
				: [...prev, interest]
		);
	};

	const handleAvailabilityChange = (
		day: string,
		field: "start" | "end",
		value: string
	) => {
		setAvailability((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				[field]: value,
			},
		}));
	};

	const handleSave = () => {
		setLoading(true);
		const auth = getAuth(app);
		const user = auth.currentUser;
		if (!user) {
			setLoading(false);
			console.error("User not authenticated");
			return;
		}

		const docRef = doc(db, "users", user.uid);
		updateDoc(docRef, {
			interests: selectedInterests,
			bio: bio,
			availability: availability,
			major: major,
			year: year,
			name: name,
		})
			.then(() => {
				console.log("User data updated successfully");
				setSelfUserData({
					name: name,
					email: email,
					major: major,
					year: year,
					bio: bio,
					availability: availability,
					profileURL: selfUserData.profileURL,
					interests: interests,
				});
			})
			.catch((error) => {
				console.error("Error updating user data: ", error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selected = e.target.files[0];
			if (selected.size > 5000000) {
				console.log("File Too Big");
				return;
			}
			setSelectedFile(selected);

			if (selected) {
				setIsUploading(true);

				const auth = getAuth(app);
				const user = auth.currentUser;
				if (!user) return;

				const uid = auth.currentUser.uid;
				const parts = selected.name.split(".");
				const extension =
					parts.length > 1 ? parts.pop()?.toLowerCase() : "";
				const storageRef = ref(
					storage,
					`profile_pics/${uid}/profile.${extension}`
				);
				try {
					await uploadBytes(storageRef, selected);

					// Update user's Firestore document
					const userDocRef = doc(db, "users", uid);
					await updateDoc(userDocRef, {
						profilePicRef: storageRef.fullPath,
					});

					// Update local
					const downloadURL = await getDownloadURL(storageRef);
					setProfileURL(downloadURL);
          setSelfUserData({
            ...selfUserData,
            profileURL: downloadURL
          })
				} catch (error) {
					console.error("Error uploading profile picture:", error);
				} finally {
					setIsUploading(false);
				}
			}
		}
	};

	const handleUploadButtonClick = (
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		fileInputRef.current?.click();
		e.stopPropagation();
	};

  useEffect(() => {
    setName(selfUserData.name)
    setAvailability(selfUserData.availability ?? availability)
    setEmail(selfUserData.email ?? email)
    setBio(selfUserData.bio ?? bio)
    setMajor(selfUserData.major ?? major)
    setYear(selfUserData.year ?? year)
    setProfileURL(selfUserData.profileURL ?? profileURL)
  }, [])

	const fileInputRef = useRef<HTMLInputElement | null>(null);


	return (
		<div className="container py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Your Profile</h1>
				<p className="text-muted-foreground">
					Manage your personal information, interests, and
					availability
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-3">
				<div className="md:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle>Profile Picture</CardTitle>
							<CardDescription>
								Upload a photo to personalize your profile
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col items-center">
							<Avatar className="h-32 w-32">
								{isUploading ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									<>
										<AvatarImage
											src={profileURL}
											alt="Profile"
										/>
										<AvatarFallback>{name}</AvatarFallback>
									</>
								)}
							</Avatar>
							<Button
								className="mt-4"
								variant="outline"
								onClick={handleUploadButtonClick}
							>
								<input
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="hidden"
									ref={fileInputRef}
								/>
								Upload Photo
							</Button>
						</CardContent>
					</Card>
				</div>

				<div className="md:col-span-2">
					<Tabs defaultValue="basic">
						<TabsList className="mb-6 grid w-full grid-cols-3">
							<TabsTrigger value="basic">Basic Info</TabsTrigger>
							<TabsTrigger value="interests">
								Interests
							</TabsTrigger>
							<TabsTrigger value="availability">
								Availability
							</TabsTrigger>
						</TabsList>

						<TabsContent value="basic">
							<Card>
								<CardHeader>
									<CardTitle>Basic Information</CardTitle>
									<CardDescription>
										Update your personal details
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="name">Full Name</Label>
										<Input
											id="name"
											value={name}
											onChange={(e) =>
												setName(e.target.value)
											}
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">UCI Email</Label>
										<Input
											id="email"
											type="email"
											value={email}
											disabled
										/>
										<p className="text-xs text-muted-foreground">
											Your UCI email cannot be changed
										</p>
									</div>
									<div className="grid gap-4 sm:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor="major">Major</Label>
											<Input
												id="major"
												value={major}
												onChange={(e) =>
													setMajor(e.target.value)
												}
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="year">Year</Label>
											<select
												id="year"
												value={year}
												onChange={(e) =>
													setYear(e.target.value)
												}
												className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
											>
												<option value="Freshman">
													Freshman
												</option>
												<option value="Sophomore">
													Sophomore
												</option>
												<option value="Junior">
													Junior
												</option>
												<option value="Senior">
													Senior
												</option>
												<option value="Graduate">
													Graduate
												</option>
											</select>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="bio">Bio</Label>
										<Textarea
											id="bio"
											value={bio}
											onChange={(e) =>
												setBio(e.target.value)
											}
											className="min-h-[120px]"
										/>
										<p className="text-xs text-muted-foreground">
											Tell other students about yourself,
											your hobbies, and what you're
											looking for in a friendship
										</p>
									</div>
								</CardContent>
								<CardFooter>
									<Button
										onClick={handleSave}
										disabled={loading}
									>
										{loading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Saving...
											</>
										) : (
											"Save Changes"
										)}
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>

						<TabsContent value="interests">
							<Card>
								<CardHeader>
									<CardTitle>Your Interests</CardTitle>
									<CardDescription>
										Select interests to help us match you
										with compatible friends
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
										{interests.map((interest) => (
											<div
												key={interest}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={interest}
													checked={selectedInterests.includes(
														interest
													)}
													onCheckedChange={() =>
														handleInterestToggle(
															interest
														)
													}
												/>
												<Label
													htmlFor={interest}
													className="text-sm"
												>
													{interest}
												</Label>
											</div>
										))}
									</div>
								</CardContent>
								<CardFooter>
									<Button
										onClick={handleSave}
										disabled={
											loading ||
											selectedInterests.length < 3
										}
									>
										{loading ? (
											<>
												<LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
												Saving...
											</>
										) : (
											"Save Changes"
										)}
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>

						<TabsContent value="availability">
							<Card>
								<CardHeader>
									<CardTitle>Your Availability</CardTitle>
									<CardDescription>
										Let us know when you're free to hang out
										on campus
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Tabs defaultValue="Monday">
										<TabsList className="grid w-full grid-cols-7">
											{days.map((day) => (
												<TabsTrigger
													key={day}
													value={day}
												>
													{day.substring(0, 3)}
												</TabsTrigger>
											))}
										</TabsList>
										{days.map((day) => (
											<TabsContent
												key={day}
												value={day}
												className="space-y-4"
											>
												<div className="flex items-center justify-between">
													<Label>{day}</Label>
												</div>
												<div className="grid grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label
															htmlFor={`${day}-start`}
														>
															Start Time
														</Label>
														<TimePickerInput
															id={`${day}-start`}
															value={
																availability[
																	day
																].start
															}
															onChange={(value) =>
																handleAvailabilityChange(
																	day,
																	"start",
																	value
																)
															}
														/>
													</div>
													<div className="space-y-2">
														<Label
															htmlFor={`${day}-end`}
														>
															End Time
														</Label>
														<TimePickerInput
															id={`${day}-end`}
															value={
																availability[
																	day
																].end
															}
															onChange={(value) =>
																handleAvailabilityChange(
																	day,
																	"end",
																	value
																)
															}
														/>
													</div>
												</div>
											</TabsContent>
										))}
									</Tabs>
								</CardContent>
								<CardFooter>
									<Button
										onClick={handleSave}
										disabled={loading}
									>
										{loading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Saving...
											</>
										) : (
											"Save Changes"
										)}
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
