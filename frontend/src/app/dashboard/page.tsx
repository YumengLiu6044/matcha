"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	CalendarDays,
	Clock,
	MapPin,
	RefreshCw,
	ThumbsDown,
	ThumbsUp,
	Users,
} from "lucide-react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useHangoutStore, useUserDataStore } from "@/util/store";
import { getProfileURL } from "@/util/firebase-utils";
import { acceptMatch, getHangoutRecommendation } from "@/util/fetch";
import { generateMatch } from "@/util/fetch";

export default function DashboardPage() {
	const [loading, setLoading] = useState(false);
	const others = useUserDataStore((state) => state.others);
	const currentMatchIndex = useUserDataStore((state) => state.suggestedIndex);

	const pendingHangouts = useHangoutStore((state) => state.pendingHangouts);
	const isLoadingRecommendation = useHangoutStore((state) => state.isLoading);
	const suggestedHangout = useHangoutStore((state) => state.suggestedHangout);

	const setSelfUserData = useUserDataStore.getState().setSelf;

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				console.log("User not logged in");
				window.location.href = "/login";
				return;
			}
			const userRef = doc(db, "users", user.uid);
			getDoc(userRef).then((userDoc) => {
				if (!userDoc.exists()) {
					console.log("User document does not exist");
					return;
				}
				const userData = userDoc.data();
				let profileURL = "";
				getProfileURL(userData.profilePicRef)
					.then((url) => {
						profileURL = url ?? "";
					})
					.finally(() => {
						setSelfUserData({
							name: userData.name,
							email: userData.email,
							major: userData.major,
							year: userData.year,
							bio: userData.bio,
							availability: userData.availability,
							profileURL: profileURL,
							interests: userData.interests,
						});

						generateMatch();
					});
			});
		});

		return () => unsubscribe();
	}, []);

	return (
		<div className="container py-8">
			<div className="mb-8 flex items-center justify-between">
				<h1 className="text-3xl font-bold">Dashboard</h1>
			</div>

			<div className="grid gap-8 md:grid-cols-2">
				<div className="space-y-8">
					<Card>
						<CardHeader>
							<CardTitle>Find New Friends</CardTitle>
							<CardDescription>
								We'll match you with fellow UCI students based
								on your interests and availability
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col items-center space-y-4">
								<Avatar className="h-20 w-20">
									<AvatarImage
										src={
											others[currentMatchIndex]
												.profileURL ?? ""
										}
										alt={others[currentMatchIndex].name}
									/>
									<AvatarFallback>
										{others[currentMatchIndex].name.charAt(
											0
										)}
									</AvatarFallback>
								</Avatar>
								<div className="text-center">
									<h3 className="text-xl font-semibold">
										{others[currentMatchIndex].name}
									</h3>
									<p className="text-muted-foreground">
										{others[currentMatchIndex].major},{" "}
										{others[currentMatchIndex].year}
									</p>
								</div>
								<div className="flex flex-wrap justify-center gap-2">
									{others[currentMatchIndex].interests.map(
										(interest) => (
											<Badge
												key={interest}
												variant="secondary"
											>
												{interest}
											</Badge>
										)
									)}
								</div>

								<div className="mt-6 w-full rounded-lg bg-accent p-4">
									<h4 className="mb-2 font-semibold">
										Suggested Hangout
									</h4>
									{isLoadingRecommendation ? (
										<div>Loading</div>
									) : (
										<div className="space-y-2">
											<div className="flex items-center gap-2">
												<CalendarDays className="h-4 w-4 text-muted-foreground" />
												<span>
													{suggestedHangout?.date ??
														"May 25, 2025"}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<Clock className="h-4 w-4 text-muted-foreground" />
												<span>
													{suggestedHangout?.time ??
														"10:00 AM"}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span>
													{suggestedHangout?.location}
												</span>
											</div>
											<div className="mt-2 font-medium text-primary">
												{suggestedHangout?.name}
											</div>
										</div>
									)}
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button
								variant="outline"
								size="lg"
								className="gap-2"
								onClick={generateMatch}
								disabled={loading}
							>
								<ThumbsDown className="h-4 w-4" />
								Skip
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={getHangoutRecommendation}
								disabled={loading}
								className="rounded-full"
							>
								<RefreshCw
									className={`h-4 w-4 ${
										loading ? "animate-spin" : ""
									}`}
								/>
							</Button>
							<Button
								size="lg"
								className="gap-2"
								onClick={acceptMatch}
								disabled={loading}
							>
								<ThumbsUp className="h-4 w-4" />
								Connect
							</Button>
						</CardFooter>
					</Card>
				</div>

				<div className="space-y-8">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>Pending Hangouts</CardTitle>
								<CardDescription>
									Waiting for confirmation from your matches
								</CardDescription>
							</div>
							<Badge variant="outline" className="gap-1">
								<Users className="h-3 w-3" />
								{pendingHangouts.length}
							</Badge>
						</CardHeader>
						<CardContent>
							{pendingHangouts.length === 0 ? (
								<div className="flex h-[100px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
									<p className="text-sm text-muted-foreground">
										No pending hangouts yet
									</p>
									<p className="text-xs text-muted-foreground">
										Connect with someone to create a hangout
									</p>
								</div>
							) : (
								<div className="space-y-4">
									{pendingHangouts.map((hangout, index) => (
										<div
											key={index}
											className="flex items-center gap-4 rounded-lg border p-4"
										>
											<Avatar>
												<AvatarImage
													src={
														hangout.users[0]
															.profileURL ||
														"/placeholder.svg"
													}
													alt={hangout.users[0].name}
												/>
												<AvatarFallback>
													{hangout.users[0].name.charAt(
														0
													)}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<h4 className="font-medium">
													{hangout.users[0].name}
												</h4>
												<p className="text-sm text-muted-foreground">
													{hangout.name}
												</p>
												<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
													<CalendarDays className="h-3 w-3" />
													<span>{hangout.time}</span>
												</div>
											</div>
											<Badge>Pending</Badge>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between">
							<div>
								<CardTitle>Upcoming Hangouts</CardTitle>
								<CardDescription>
									Your confirmed hangouts with new friends
								</CardDescription>
							</div>
							<Badge variant="outline" className="gap-1">
								<CalendarDays className="h-3 w-3" />
								{0}
							</Badge>
						</CardHeader>
						<CardContent>
							{true ? (
								<div className="flex h-[100px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
									<p className="text-sm text-muted-foreground">
										No upcoming hangouts
									</p>
									<p className="text-xs text-muted-foreground">
										Your confirmed hangouts will appear here
									</p>
								</div>
							) : (
								<div className="space-y-4">
									{pendingHangouts.map((hangout, index) => (
										<div
											key={index}
											className="flex items-center gap-4 rounded-lg border p-4"
										>
											<Avatar>
												<AvatarImage
													src={
														hangout.users[0]
															.profileURL ||
														"/placeholder.svg"
													}
													alt={hangout.users[0].name}
												/>
												<AvatarFallback>
													{hangout.users[0].name.charAt(
														0
													)}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<h4 className="font-medium">
													{hangout.users[0].name}
												</h4>
												<p className="text-sm text-muted-foreground">
													{hangout.name}
												</p>
												<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
													<CalendarDays className="h-3 w-3" />
													<span>{hangout.time}</span>
												</div>
												<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
													<MapPin className="h-3 w-3" />
													<span>
														{hangout.location}
													</span>
												</div>
											</div>
											<Button
												variant="outline"
												size="sm"
												asChild
											>
												<Link
													href={`/dashboard/hangouts/${hangout.id}`}
												>
													View
												</Link>
											</Button>
										</div>
									))}
								</div>
							)}
						</CardContent>
						<CardFooter>
							<Button
								variant="outline"
								className="w-full"
								asChild
							>
								<Link href="/dashboard/hangouts">
									View All Hangouts
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
