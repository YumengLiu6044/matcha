"use client";

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
  Sparkles,
  Heart,
} from "lucide-react";
import { useHangoutStore, useUserDataStore } from "@/util/store";
import {
  acceptMatch,
  generateMatch,
  getHangoutRecommendation,
} from "@/util/fetch";

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
  const activity = CAMPUS_ACTIVITIES[0];
  const date = "May 15, 2025";
  const time = "3:00 PM";
  const location = "Anteater Recreation Center";

  const currentMatchIndex = useUserDataStore((state) => state.suggestedIndex);
  const others = useUserDataStore((state) => state.others);
  const suggestedHangout = useHangoutStore((state) => state.suggestedHangout);
  const loading = useHangoutStore((state) => state.isLoading);

  const pendingHangouts = useHangoutStore((state) => state.pendingHangouts);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
          Find New Friends
        </h1>
        <p className="text-gray-600 mt-2">
          We'll match you with fellow UCI students based on your interests and
          availability
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Heart className="h-5 w-5 text-green-600" />
                Suggested Match
              </CardTitle>
              <CardDescription>
                Connect with this student or skip to see another match
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                <div className="relative">
                  <Avatar className="h-32 w-32 ring-4 ring-green-200 ring-offset-4">
                    <AvatarImage
                      src={
                        others[currentMatchIndex].profileURL ||
                        "/placeholder.svg"
                      }
                      alt={others[currentMatchIndex].name}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white text-2xl">
                      {others[currentMatchIndex].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {others[currentMatchIndex].name}
                    </h3>
                    <p className="text-gray-600">
                      {others[currentMatchIndex].major},{" "}
                      {others[currentMatchIndex].year}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-700 mb-2">
                      Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {others[currentMatchIndex].interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="bg-green-100 text-green-700 hover:bg-green-200 border border-green-200"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Bio</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {others[currentMatchIndex].bio}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-4 border border-green-200">
                    <h4 className="mb-3 font-semibold text-green-800 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Suggested Hangout
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-700">
                        <CalendarDays className="h-4 w-4" />
                        <span>{suggestedHangout?.date ?? date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <Clock className="h-4 w-4" />
                        <span>{suggestedHangout?.time ?? time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <MapPin className="h-4 w-4" />
                        <span>{suggestedHangout?.location ?? location}</span>
                      </div>
                      <div className="mt-3 p-3 bg-white/80 rounded-lg border border-green-200">
                        <div className="font-medium text-green-800">
                          {suggestedHangout?.name ?? activity}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 gap-2 text-green-600 hover:bg-green-100 hover:text-green-700"
                        onClick={getHangoutRecommendation}
                        disabled={loading}
                      >
                        <RefreshCw
                          className={`h-3 w-3 ${loading ? "animate-spin" : ""}`}
                        />
                        Generate another activity
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50/50 border-t border-green-100">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
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
                className="rounded-full border-green-200 hover:bg-green-50 hover:border-green-300"
              >
                <RefreshCw
                  className={`h-4 w-4 text-green-600 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
              </Button>
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg"
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
          <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="h-5 w-5 text-green-600" />
                Pending Matches
              </CardTitle>
              <CardDescription>
                Waiting for confirmation from your matches
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingHangouts.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center bg-gray-50/50">
                  <div className="mb-3 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    No pending matches yet
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Connect with someone to create a match
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingHangouts.map((hangout, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-lg border border-green-200 bg-green-50/50 p-4 hover:bg-green-50 transition-colors"
                    >
                      <Avatar className="ring-2 ring-green-200">
                        <AvatarImage
                          src={
                            hangout.users[0].profileURL || "/placeholder.svg"
                          }
                          alt={hangout.users[0].name}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                          {hangout.users[0].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">
                          {hangout.users[0].name}
                        </h4>
                        <p className="text-sm text-gray-600">{hangout.name}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <CalendarDays className="h-3 w-3" />
                          <span>
                            {hangout.date}, {hangout.time}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border border-green-200">
                        Pending
                      </Badge>
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
