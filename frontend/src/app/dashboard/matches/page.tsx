"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useHangoutStore, useUserDataStore } from "@/util/store";
import { acceptMatch, generateMatch, getHangoutRecommendation } from "@/util/fetch";

// Campus activities
const CAMPUS_ACTIVITIES = [
	"Visit the Anteater Recreation Center together",
	"Study session at Langson Library",
	"Coffee chat at the Student Center",
	"Explore the Aldrich Park",
	"Grab lunch at the Food Court",
	"Go to the ARC together",
	"Go on campus groups and pick a club meeting to attend together",
];

export default function MatchesPage() {
	const [loading, setLoading] = useState(false);
	const currentMatchIndex = useUserDataStore((state) => state.suggestedIndex);
	const others = useUserDataStore((state) => state.others);
	const suggestedHangout = useHangoutStore((state) => state.suggestedHangout);
	const [activity, setActivity] = useState(CAMPUS_ACTIVITIES[0]);
	const [date, setDate] = useState("May 15, 2025");
	const [time, setTime] = useState("3:00 PM");
	const [location, setLocation] = useState("Anteater Recreation Center");
	const pendingHangouts = useHangoutStore((state) => state.pendingHangouts);
  
	return (
		<div className="container py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Find New Friends</h1>
				<p className="text-muted-foreground">
					We'll match you with fellow UCI students based on your
					interests and availability
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-3">
				<div className="md:col-span-2">
					<Card className="h-full">
						<CardHeader>
							<CardTitle>Suggested Match</CardTitle>
							<CardDescription>
								Connect with this student or skip to see another
								match
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-6 md:space-y-0">
								<Avatar className="h-32 w-32">
									<AvatarImage
										src={
											others[currentMatchIndex]
												.profileURL ||
											"/placeholder.svg"
										}
										alt={others[currentMatchIndex].name}
									/>
									<AvatarFallback>
										{others[currentMatchIndex].name.charAt(
											0
										)}
									</AvatarFallback>
								</Avatar>

								<div className="flex-1 space-y-4 text-center md:text-left">
									<div>
										<h3 className="text-2xl font-semibold">
											{others[currentMatchIndex].name}
										</h3>
										<p className="text-muted-foreground">
											{others[currentMatchIndex].major},{" "}
											{others[currentMatchIndex].year}
										</p>
									</div>

									<div>
										<h4 className="font-medium">
											Interests
										</h4>
										<div className="mt-1 flex flex-wrap gap-2">
											{others[
												currentMatchIndex
											].interests.map((interest) => (
												<Badge
													key={interest}
													variant="secondary"
												>
													{interest}
												</Badge>
											))}
										</div>
									</div>

									<div>
										<h4 className="font-medium">Bio</h4>
										<p className="text-sm text-muted-foreground">
											{others[currentMatchIndex].bio}
										</p>
									</div>

									<div className="rounded-lg bg-accent p-4">
										<h4 className="mb-2 font-semibold">
											Suggested Hangout
										</h4>
										<div className="space-y-2">
											<div className="flex items-center gap-2">
												<CalendarDays className="h-4 w-4 text-muted-foreground" />
												<span>
													{suggestedHangout?.date ??
														date}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<Clock className="h-4 w-4 text-muted-foreground" />
												<span>
													{suggestedHangout?.time ??
														time}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 text-muted-foreground" />
												<span>
													{suggestedHangout?.location ??
														location}
												</span>
											</div>
											<div className="mt-2 font-medium text-primary">
												{suggestedHangout?.name ??
													activity}
											</div>
											<Button
												variant="ghost"
												size="sm"
												className="mt-2 gap-1"
												onClick={
													getHangoutRecommendation
												}
												disabled={loading}
											>
												<RefreshCw
													className={`h-3 w-3 ${
														loading
															? "animate-spin"
															: ""
													}`}
												/>
												Generate another activity
											</Button>
										</div>
									</div>
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
								onClick={generateMatch}
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

				<div>
					<Card className="h-full">
						<CardHeader>
							<CardTitle>Pending Matches</CardTitle>
							<CardDescription>
								Waiting for confirmation from your matches
							</CardDescription>
						</CardHeader>
						<CardContent>
							{pendingHangouts.length === 0 ? (
								<div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
									<p className="text-sm text-muted-foreground">
										No pending matches yet
									</p>
									<p className="text-xs text-muted-foreground">
										Connect with someone to create a match
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
														hangout.users[0].profileURL ||
														"/placeholder.svg"
													}
													alt={hangout.users[0].name}
												/>
												<AvatarFallback>
													{hangout.users[0].name.charAt(0)}
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
													<span>
														{hangout.date},{" "}
														{hangout.time}
													</span>
												</div>
											</div>
											<Badge>Pending</Badge>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
