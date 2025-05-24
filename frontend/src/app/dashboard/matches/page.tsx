"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react"

// Campus activities
const CAMPUS_ACTIVITIES = [
  "Visit the Anteater Recreation Center together",
  "Study session at Langson Library",
  "Coffee chat at the Student Center",
  "Explore the Aldrich Park",
  "Grab lunch at the Food Court",
  "Go to the ARC together",
  "Go on campus groups and pick a club meeting to attend together"
]

// Sample user data
const USERS = [
  {
    id: 1,
    name: "Alex Kim",
    major: "Computer Science",
    year: "Junior",
    interests: ["Technology", "Gaming", "Music"],
    bio: "CS major who loves coding and gaming. Looking to meet people outside my major!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Jordan Lee",
    major: "Biology",
    year: "Sophomore",
    interests: ["Science", "Outdoor Activities", "Reading"],
    bio: "Pre-med student who enjoys hiking on weekends. Always up for a study session!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Taylor Chen",
    major: "Business Economics",
    year: "Senior",
    interests: ["Entrepreneurship", "Sports & Fitness", "Travel"],
    bio: "Econ major with a passion for startups. Love playing basketball and exploring new places.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Morgan Zhang",
    major: "Psychology",
    year: "Junior",
    interests: ["Reading", "Movies & TV", "Arts & Creativity"],
    bio: "Psychology student interested in cognitive science. Big fan of indie films and art.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Casey Patel",
    major: "Engineering",
    year: "Sophomore",
    interests: ["Technology", "Science", "Gaming"],
    bio: "Engineering student working on robotics projects. Looking for friends to game with!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function MatchesPage() {
  const [loading, setLoading] = useState(false)
  const [currentMatch, setCurrentMatch] = useState(USERS[0])
  const [activity, setActivity] = useState(CAMPUS_ACTIVITIES[0])
  const [date, setDate] = useState("May 15, 2025")
  const [time, setTime] = useState("3:00 PM")
  const [location, setLocation] = useState("Anteater Recreation Center")
  const [pendingMatches, setPendingMatches] = useState<any[]>([])

  const generateNewMatch = async () => {
    setLoading(true)

    // Get random user
    const randomUser = USERS[Math.floor(Math.random() * USERS.length)]

    // Pick a random activity
    const randomActivity = CAMPUS_ACTIVITIES[Math.floor(Math.random() * CAMPUS_ACTIVITIES.length)]

    // Generate random date and time
    const today = new Date()
    const futureDate = new Date(today)
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 7) + 1)

    const month = futureDate.toLocaleString("default", { month: "long" })
    const day = futureDate.getDate()
    const year = futureDate.getFullYear()
    const formattedDate = `${month} ${day}, ${year}`

    let formattedTime = ""
    let newLocation = ""

    if (randomActivity === "Go on campus groups and pick a club meeting to attend together") {
      formattedTime = "6:00 PM"
      newLocation = "In front of Donald Bren Hall"
    } else {
      const hours = Math.floor(Math.random() * 8) + 10 // 10 AM to 6 PM
      const minutes = [0, 30][Math.floor(Math.random() * 2)]
      const ampm = hours >= 12 ? "PM" : "AM"
      const formattedHours = hours % 12 || 12
      formattedTime = `${formattedHours}:${minutes === 0 ? "00" : minutes} ${ampm}`

      // Set location based on activity
      if (randomActivity.includes("ARC") || randomActivity.includes("Recreation")) {
        newLocation = "Anteater Recreation Center"
      } else if (randomActivity.includes("Library")) {
        newLocation = "Langson Library"
      } else if (randomActivity.includes("Student Center")) {
        newLocation = "UCI Student Center"
      } else if (randomActivity.includes("Park")) {
        newLocation = "Aldrich Park"
      } else {
        newLocation = "UCI Campus"
      }
    }

    setCurrentMatch(randomUser)
    setActivity(randomActivity)
    setDate(formattedDate)
    setTime(formattedTime)
    setLocation(newLocation)
    setLoading(false)
  }

  const acceptMatch = () => {
    const newMatch = {
      id: Date.now(),
      user: currentMatch,
      activity,
      date,
      time,
      location,
    }

    setPendingMatches([...pendingMatches, newMatch])
    generateNewMatch()
  }

  const rejectMatch = () => {
    generateNewMatch()
  }

  const regenerateActivity = async () => {
    setLoading(true)
    // Randomly select a new activity that is different from the current one
    let newActivity = activity
    let attempts = 0
    while (newActivity === activity && attempts < 10) {
      newActivity = CAMPUS_ACTIVITIES[Math.floor(Math.random() * CAMPUS_ACTIVITIES.length)]
      attempts++
    }

    let formattedTime = ""
    let newLocation = ""

    if (newActivity === "Go on campus groups and pick a club meeting to attend together") {
      formattedTime = "6:00 PM"
      newLocation = "In front of Donald Bren Hall"
    } else {
      const hours = Math.floor(Math.random() * 8) + 10 // 10 AM to 6 PM
      const minutes = [0, 30][Math.floor(Math.random() * 2)]
      const ampm = hours >= 12 ? "PM" : "AM"
      const formattedHours = hours % 12 || 12
      formattedTime = `${formattedHours}:${minutes === 0 ? "00" : minutes} ${ampm}`

      if (newActivity.includes("ARC") || newActivity.includes("Recreation")) {
        newLocation = "Anteater Recreation Center"
      } else if (newActivity.includes("Library")) {
        newLocation = "Langson Library"
      } else if (newActivity.includes("Student Center")) {
        newLocation = "UCI Student Center"
      } else if (newActivity.includes("Park")) {
        newLocation = "Aldrich Park"
      } else {
        newLocation = "UCI Campus"
      }
    }

    setActivity(newActivity)
    setTime(formattedTime)
    setLocation(newLocation)
    setLoading(false)
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Find New Friends</h1>
        <p className="text-muted-foreground">
          We'll match you with fellow UCI students based on your interests and availability
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Suggested Match</CardTitle>
              <CardDescription>Connect with this student or skip to see another match</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={currentMatch.avatar || "/placeholder.svg"} alt={currentMatch.name} />
                  <AvatarFallback>{currentMatch.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h3 className="text-2xl font-semibold">{currentMatch.name}</h3>
                    <p className="text-muted-foreground">
                      {currentMatch.major}, {currentMatch.year}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Interests</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {currentMatch.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Bio</h4>
                    <p className="text-sm text-muted-foreground">{currentMatch.bio}</p>
                  </div>

                  <div className="rounded-lg bg-accent p-4">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 gap-1"
                        onClick={regenerateActivity}
                        disabled={loading}
                      >
                        <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
                        Generate another activity
                      </Button>
                    </div>
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

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Pending Matches</CardTitle>
              <CardDescription>Waiting for confirmation from your matches</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingMatches.length === 0 ? (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">No pending matches yet</p>
                  <p className="text-xs text-muted-foreground">Connect with someone to create a match</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingMatches.map((match) => (
                    <div key={match.id} className="flex items-center gap-4 rounded-lg border p-4">
                      <Avatar>
                        <AvatarImage src={match.user.avatar || "/placeholder.svg"} alt={match.user.name} />
                        <AvatarFallback>{match.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{match.user.name}</h4>
                        <p className="text-sm text-muted-foreground">{match.activity}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3" />
                          <span>
                            {match.date}, {match.time}
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
  )
}