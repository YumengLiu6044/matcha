"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
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
        <h1 className="text-3xl font-bold">Your Hangouts</h1>
        <p className="text-muted-foreground">Manage your scheduled and pending hangouts with UCI friends</p>
      </div>

      <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Hangouts</CardTitle>
              <CardDescription>Your confirmed hangouts with new friends</CardDescription>
            </CardHeader>
            <CardContent>
              {UPCOMING_HANGOUTS.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">No upcoming hangouts</p>
                  <p className="text-xs text-muted-foreground">Your confirmed hangouts will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {UPCOMING_HANGOUTS.map((hangout) => (
                    <div
                      key={hangout.id}
                      className="flex flex-col gap-4 rounded-lg border p-6 sm:flex-row sm:items-center"
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={hangout.user.avatar || "/placeholder.svg"} alt={hangout.user.name} />
                        <AvatarFallback>{hangout.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-lg font-medium">{hangout.user.name}</h4>
                          <Badge className="mt-1 w-fit sm:mt-0">Confirmed</Badge>
                        </div>
                        <p className="mt-1 font-medium text-primary">{hangout.activity}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              {hangout.date}, {hangout.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{hangout.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" asChild>
                            <Link href={`/dashboard/hangouts/${hangout.id}`}>View Details</Link>
                          </Button>
                          <Button size="sm" variant="outline">
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
          <Card>
            <CardHeader>
              <CardTitle>Pending Hangouts</CardTitle>
              <CardDescription>Waiting for confirmation from your matches</CardDescription>
            </CardHeader>
            <CardContent>
              {PENDING_HANGOUTS.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">No pending hangouts</p>
                  <p className="text-xs text-muted-foreground">Connect with someone to create a hangout</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {PENDING_HANGOUTS.map((hangout) => (
                    <div
                      key={hangout.id}
                      className="flex flex-col gap-4 rounded-lg border p-6 sm:flex-row sm:items-center"
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={hangout.user.avatar || "/placeholder.svg"} alt={hangout.user.name} />
                        <AvatarFallback>{hangout.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-lg font-medium">{hangout.user.name}</h4>
                          <Badge variant="outline" className="mt-1 w-fit sm:mt-0">
                            Pending
                          </Badge>
                        </div>
                        <p className="mt-1 font-medium text-primary">{hangout.activity}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              {hangout.date}, {hangout.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{hangout.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
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
          <Card>
            <CardHeader>
              <CardTitle>Past Hangouts</CardTitle>
              <CardDescription>Your completed hangouts with UCI friends</CardDescription>
            </CardHeader>
            <CardContent>
              {PAST_HANGOUTS.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">No past hangouts</p>
                  <p className="text-xs text-muted-foreground">Your completed hangouts will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {PAST_HANGOUTS.map((hangout) => (
                    <div
                      key={hangout.id}
                      className="flex flex-col gap-4 rounded-lg border p-6 sm:flex-row sm:items-center"
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={hangout.user.avatar || "/placeholder.svg"} alt={hangout.user.name} />
                        <AvatarFallback>{hangout.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="text-lg font-medium">{hangout.user.name}</h4>
                          <Badge variant="secondary" className="mt-1 w-fit sm:mt-0">
                            Completed
                          </Badge>
                        </div>
                        <p className="mt-1 font-medium text-primary">{hangout.activity}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              {hangout.date}, {hangout.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{hangout.location}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
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