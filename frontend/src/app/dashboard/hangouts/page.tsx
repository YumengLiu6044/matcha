"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Clock, CheckCircle, History } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample user data
const USERS = [
  {
    id: 1,
    name: "Alex Kim",
    major: "Computer Science",
    year: "Junior",
    interests: ["Technology", "Gaming", "Music"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Jordan Lee",
    major: "Biology",
    year: "Sophomore",
    interests: ["Science", "Outdoor Activities", "Reading"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Taylor Chen",
    major: "Business Economics",
    year: "Senior",
    interests: ["Entrepreneurship", "Sports & Fitness", "Travel"],
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

// Sample hangout data
const UPCOMING_HANGOUTS = [
  {
    id: 1,
    user: USERS[2],
    activity: "Study session at Langson Library",
    date: "May 14, 2025",
    time: "2:00 PM",
    location: "Langson Library, 4th Floor",
    status: "confirmed",
  },
]

const PENDING_HANGOUTS = [
  {
    id: 2,
    user: USERS[0],
    activity: "Coffee chat at the Student Center",
    date: "May 16, 2025",
    time: "11:00 AM",
    location: "UCI Student Center",
    status: "pending",
  },
]

const PAST_HANGOUTS = [
  {
    id: 3,
    user: USERS[1],
    activity: "Visit the Anteater Recreation Center",
    date: "May 5, 2025",
    time: "4:00 PM",
    location: "Anteater Recreation Center",
    status: "completed",
  },
]

export default function HangoutsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
          Your Hangouts
        </h1>
        <p className="text-gray-600 mt-2">Manage your scheduled and pending hangouts with UCI friends</p>
      </div>

      <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg border-0 p-1">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
          >
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarDays className="h-5 w-5 text-green-600" />
                Upcoming Hangouts
              </CardTitle>
              <CardDescription>Your confirmed hangouts with new friends</CardDescription>
            </CardHeader>
            <CardContent>
              {UPCOMING_HANGOUTS.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center bg-gray-50/50">
                  <div className="mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CalendarDays className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No upcoming hangouts</p>
                  <p className="text-xs text-gray-400 mt-1">Your confirmed hangouts will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {UPCOMING_HANGOUTS.map((hangout) => (
                    <div
                      key={hangout.id}
                      className="flex flex-col gap-4 rounded-lg border border-green-200 bg-green-50/50 p-6 sm:flex-row sm:items-center hover:bg-green-50 transition-colors"
                    >
                      <Avatar className="h-16 w-16 ring-2 ring-green-200">
                        <AvatarImage src={hangout.user.avatar || "/placeholder.svg"} alt={hangout.user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                          {hangout.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-lg font-medium text-gray-800">{hangout.user.name}</h4>
                          <Badge className="mt-1 w-fit sm:mt-0 bg-green-100 text-green-700 border border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Confirmed
                          </Badge>
                        </div>
                        <p className="mt-1 font-medium text-green-700">{hangout.activity}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4 text-green-600" />
                            <span>
                              {hangout.date}, {hangout.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span>{hangout.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                            asChild
                          >
                            <Link href={`/dashboard/hangouts/${hangout.id}`}>View Details</Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-200 hover:bg-green-50 hover:text-green-700"
                          >
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-5 w-5 text-green-600" />
                Pending Hangouts
              </CardTitle>
              <CardDescription>Waiting for confirmation from your matches</CardDescription>
            </CardHeader>
            <CardContent>
              {PENDING_HANGOUTS.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center bg-gray-50/50">
                  <div className="mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No pending hangouts</p>
                  <p className="text-xs text-gray-400 mt-1">Connect with someone to create a hangout</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {PENDING_HANGOUTS.map((hangout) => (
                    <div
                      key={hangout.id}
                      className="flex flex-col gap-4 rounded-lg border border-green-200 bg-green-50/50 p-6 sm:flex-row sm:items-center hover:bg-green-50 transition-colors"
                    >
                      <Avatar className="h-16 w-16 ring-2 ring-green-200">
                        <AvatarImage src={hangout.user.avatar || "/placeholder.svg"} alt={hangout.user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                          {hangout.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-lg font-medium text-gray-800">{hangout.user.name}</h4>
                          <Badge
                            variant="outline"
                            className="mt-1 w-fit sm:mt-0 border-green-200 text-green-700 bg-green-50"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        </div>
                        <p className="mt-1 font-medium text-green-700">{hangout.activity}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4 text-green-600" />
                            <span>
                              {hangout.date}, {hangout.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span>{hangout.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-200 hover:bg-green-50 hover:text-green-700"
                          >
                            Cancel Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <History className="h-5 w-5 text-green-600" />
                Past Hangouts
              </CardTitle>
              <CardDescription>Your completed hangouts with UCI friends</CardDescription>
            </CardHeader>
            <CardContent>
              {PAST_HANGOUTS.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center bg-gray-50/50">
                  <div className="mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <History className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No past hangouts</p>
                  <p className="text-xs text-gray-400 mt-1">Your completed hangouts will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {PAST_HANGOUTS.map((hangout) => (
                    <div
                      key={hangout.id}
                      className="flex flex-col gap-4 rounded-lg border border-green-200 bg-green-50/50 p-6 sm:flex-row sm:items-center hover:bg-green-50 transition-colors"
                    >
                      <Avatar className="h-16 w-16 ring-2 ring-green-200">
                        <AvatarImage src={hangout.user.avatar || "/placeholder.svg"} alt={hangout.user.name} />
                        <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                          {hangout.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-lg font-medium text-gray-800">{hangout.user.name}</h4>
                          <Badge
                            variant="secondary"
                            className="mt-1 w-fit sm:mt-0 bg-green-100 text-green-700 border border-green-200"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        </div>
                        <p className="mt-1 font-medium text-green-700">{hangout.activity}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4 text-green-600" />
                            <span>
                              {hangout.date}, {hangout.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-green-600" />
                            <span>{hangout.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-200 hover:bg-green-50 hover:text-green-700"
                          >
                            Connect Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
