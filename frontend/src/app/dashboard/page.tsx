"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  Loader2,
} from "lucide-react"
import { getAuth, onAuthStateChanged } from "@firebase/auth"
import { app, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useHangoutStore, useUserDataStore } from "@/util/store"
import { getProfileURL } from "@/util/firebase-utils"
import { acceptMatch, getHangoutRecommendation } from "@/util/fetch"
import { generateMatch } from "@/util/fetch"

export default function DashboardPage() {
  const [loading, setLoading] = useState(false)
  const others = useUserDataStore((state) => state.others)
  const currentMatchIndex = useUserDataStore((state) => state.suggestedIndex)

  const pendingHangouts = useHangoutStore((state) => state.pendingHangouts)
  const isLoadingRecommendation = useHangoutStore((state) => state.isLoading)
  const suggestedHangout = useHangoutStore((state) => state.suggestedHangout)

  const setSelfUserData = useUserDataStore.getState().setSelf

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("User not logged in")
        window.location.href = "/login"
        return
      }
      const userRef = doc(db, "users", user.uid)
      getDoc(userRef).then((userDoc) => {
        if (!userDoc.exists()) {
          console.log("User document does not exist")
          return
        }
        const userData = userDoc.data()
        let profileURL = ""
        getProfileURL(userData.profilePicRef)
          .then((url) => {
            profileURL = url ?? ""
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
            })

            generateMatch()
          })
      })
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            Welcome back!
          </h1>
          <p className="text-gray-600 mt-2">Ready to make new friends today?</p>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <Sparkles className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-700">Active</span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Heart className="h-5 w-5 text-green-600" />
                Find New Friends
              </CardTitle>
              <CardDescription>
                We'll match you with fellow UCI students based on your interests and availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-green-200 ring-offset-4">
                    <AvatarImage
                      src={others[currentMatchIndex].profileURL ?? ""}
                      alt={others[currentMatchIndex].name}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white text-lg">
                      {others[currentMatchIndex].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{others[currentMatchIndex].name}</h3>
                  <p className="text-gray-600">
                    {others[currentMatchIndex].major}, {others[currentMatchIndex].year}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
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

                <div className="mt-6 w-full rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-4 border border-green-200">
                  <h4 className="mb-3 font-semibold text-green-800 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Suggested Hangout
                  </h4>
                  {isLoadingRecommendation ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                        <p className="text-sm text-green-700 font-medium">Finding the perfect activity...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-700">
                        <CalendarDays className="h-4 w-4" />
                        <span>{suggestedHangout?.date ?? "May 25, 2025"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <Clock className="h-4 w-4" />
                        <span>{suggestedHangout?.time ?? "10:00 AM"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <MapPin className="h-4 w-4" />
                        <span>{suggestedHangout?.location}</span>
                      </div>
                      <div className="mt-3 p-3 bg-white/80 rounded-lg border border-green-200">
                        <div className="font-medium text-green-800">{suggestedHangout?.name}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50/50 border-t border-green-100">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
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
                className="rounded-full border-green-200 hover:bg-green-50 hover:border-green-300"
              >
                <RefreshCw className={`h-4 w-4 text-green-600 ${loading ? "animate-spin" : ""}`} />
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

        <div className="space-y-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Clock className="h-5 w-5 text-green-600" />
                  Pending Hangouts
                </CardTitle>
                <CardDescription>Waiting for confirmation from your matches</CardDescription>
              </div>
              <Badge variant="outline" className="gap-1 border-green-200 text-green-700">
                <Users className="h-3 w-3" />
                {pendingHangouts.length}
              </Badge>
            </CardHeader>
            <CardContent>
              {pendingHangouts.length === 0 ? (
                <div className="flex h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center bg-gray-50/50">
                  <div className="mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No pending hangouts yet</p>
                  <p className="text-xs text-gray-400 mt-1">Connect with someone to create a hangout</p>
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
                          src={hangout.users[0].profileURL || "/placeholder.svg"}
                          alt={hangout.users[0].name}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                          {hangout.users[0].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{hangout.users[0].name}</h4>
                        <p className="text-sm text-gray-600">{hangout.name}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <CalendarDays className="h-3 w-3" />
                          <span>{hangout.time}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border border-green-200">Pending</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CalendarDays className="h-5 w-5 text-green-600" />
                  Upcoming Hangouts
                </CardTitle>
                <CardDescription>Your confirmed hangouts with new friends</CardDescription>
              </div>
              <Badge variant="outline" className="gap-1 border-green-200 text-green-700">
                <CalendarDays className="h-3 w-3" />
                {0}
              </Badge>
            </CardHeader>
            <CardContent>
              {true ? (
                <div className="flex h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center bg-gray-50/50">
                  <div className="mb-3 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CalendarDays className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500 font-medium">No upcoming hangouts</p>
                  <p className="text-xs text-gray-400 mt-1">Your confirmed hangouts will appear here</p>
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
                          src={hangout.users[0].profileURL || "/placeholder.svg"}
                          alt={hangout.users[0].name}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                          {hangout.users[0].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{hangout.users[0].name}</h4>
                        <p className="text-sm text-gray-600">{hangout.name}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <CalendarDays className="h-3 w-3" />
                          <span>{hangout.time}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{hangout.location}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50" asChild>
                        <Link href={`/dashboard/hangouts/${hangout.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-green-200 hover:bg-green-50" asChild>
                <Link href="/dashboard/hangouts">View All Hangouts</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
