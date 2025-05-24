"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin, RefreshCw, ThumbsDown, ThumbsUp, Users } from "lucide-react"


// Sample campus activities
const CAMPUS_ACTIVITIES = [
  "Visit the Anteater Recreation Center together",
  "Study session at Langson Library",
  "Coffee chat at the Student Center",
  "Attend a club meeting together",
  "Explore the Aldrich Park",
  "Grab lunch at the Food Court",
  "Check out an art exhibition at the Beall Center",
  "Watch a movie at the Student Center",
  "Attend a campus workshop or seminar",
  "Play basketball at the ARC courts",
]

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

export default function DashboardPage() {
  const [loading, setLoading] = useState(false)
  const [currentMatch, setCurrentMatch] = useState(USERS[0])
  const [activity, setActivity] = useState(CAMPUS_ACTIVITIES[0])
  const [date, setDate] = useState("May 15, 2025")
  const [time, setTime] = useState("3:00 PM")
  const [location, setLocation] = useState("Anteater Recreation Center")
  const [pendingHangouts, setPendingHangouts] = useState<any[]>([])
  const [upcomingHangouts, setUpcomingHangouts] = useState<any[]>([
    {
      id: 1,
      user: USERS[2],
      activity: "Study session at Langson Library",
      date: "May 14, 2025",
      time: "2:00 PM",
      location: "Langson Library, 4th Floor",
    },
  ])

  const generateNewMatch = async () => {
    setLoading(true)

    // Get random user
    const randomUser = USERS[Math.floor(Math.random() * USERS.length)]

    try {

      // Generate random date and time
      const today = new Date()
      const futureDate = new Date(today)
      futureDate.setDate(today.getDate() + Math.floor(Math.random() * 7) + 1)

      const month = futureDate.toLocaleString("default", { month: "long" })
      const day = futureDate.getDate()
      const year = futureDate.getFullYear()
      const formattedDate = `${month} ${day}, ${year}`

      const hours = Math.floor(Math.random() * 8) + 10 // 10 AM to 6 PM
      const minutes = [0, 30][Math.floor(Math.random() * 2)]
      const ampm = hours >= 12 ? "PM" : "AM"
      const formattedHours = hours % 12 || 12
      const formattedTime = `${formattedHours}:${minutes === 0 ? "00" : minutes} ${ampm}`

      // Set new match data
      setCurrentMatch(randomUser)
      setActivity(CAMPUS_ACTIVITIES[Math.floor(Math.random() * CAMPUS_ACTIVITIES.length)])
      setDate(formattedDate)
      setTime(formattedTime)
      setLocation("UCI Campus")
    } catch (error) {
      console.error("Error generating match:", error)
      // Fallback to random selection if AI fails
      setCurrentMatch(randomUser)
      setActivity(CAMPUS_ACTIVITIES[Math.floor(Math.random() * CAMPUS_ACTIVITIES.length)])
    } finally {
      setLoading(false)
    }
  }

  const acceptMatch = () => {
    const newHangout = {
      id: Date.now(),
      user: currentMatch,
      activity,
      date,
      time,
      location,
    }

    setPendingHangouts([...pendingHangouts, newHangout])
    generateNewMatch()
  }

  const rejectMatch = () => {
    generateNewMatch()
  }

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
                We'll match you with fellow UCI students based on your interests and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentMatch.avatar || "/placeholder.svg"} alt={currentMatch.name} />
                  <AvatarFallback>{currentMatch.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{currentMatch.name}</h3>
                  <p className="text-muted-foreground">
                    {currentMatch.major}, {currentMatch.year}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {currentMatch.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>

                <div className="mt-6 w-full rounded-lg bg-accent p-4">
                  <h4 className="mb-2 font-semibold">Suggested Hangout</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{location}</span>
                    </div>
                    <div className="mt-2 font-medium text-primary">{activity}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="lg" className="gap-2" onClick={rejectMatch} disabled={loading}>
                <ThumbsDown className="h-4 w-4" />
                Skip
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={generateNewMatch}
                disabled={loading}
                className="rounded-full"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
              <Button size="lg" className="gap-2" onClick={acceptMatch} disabled={loading}>
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
                <CardDescription>Waiting for confirmation from your matches</CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <Users className="h-3 w-3" />
                {pendingHangouts.length}
              </Badge>
            </CardHeader>
            <CardContent>
              {pendingHangouts.length === 0 ? (
                <div className="flex h-[100px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">No pending hangouts yet</p>
                  <p className="text-xs text-muted-foreground">Connect with someone to create a hangout</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingHangouts.map((hangout) => (
                    <div key={hangout.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <Avatar>
                        <AvatarImage src={hangout.user.avatar || "/placeholder.svg"} alt={hangout.user.name} />
                        <AvatarFallback>{hangout.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{hangout.user.name}</h4>
                        <p className="text-sm text-muted-foreground">{hangout.activity}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3" />
                          <span>
                            {hangout.date}, {hangout.time}
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Hangouts</CardTitle>
                <CardDescription>Your confirmed hangouts with new friends</CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <CalendarDays className="h-3 w-3" />
                {upcomingHangouts.length}
              </Badge>
            </CardHeader>
            <CardContent>
              {upcomingHangouts.length === 0 ? (
                <div className="flex h-[100px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">No upcoming hangouts</p>
                  <p className="text-xs text-muted-foreground">Your confirmed hangouts will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingHangouts.map((hangout) => (
                    <div key={hangout.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <Avatar>
                        <AvatarImage src={hangout.user.avatar || "/placeholder.svg"} alt={hangout.user.name} />
                        <AvatarFallback>{hangout.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{hangout.user.name}</h4>
                        <p className="text-sm text-muted-foreground">{hangout.activity}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3" />
                          <span>
                            {hangout.date}, {hangout.time}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{hangout.location}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/hangouts/${hangout.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/hangouts">View All Hangouts</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
