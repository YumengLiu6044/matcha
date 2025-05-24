"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimePickerInput } from "@/components/time-picker-input";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

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

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [bio, setBio] = useState("");
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
  const [authisReady, setAuthIsReady] = useState(false);

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

  const handleSubmit = async () => {
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
    })
      .then(() => {
        console.log("User data updated successfully");
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.error("Error updating user data: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.error("User not authenticated");
        window.location.href = "/signup";
        return;
      }
      console.log("auth is ready");
      setAuthIsReady(true);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col items-center justify-center py-10 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-transparent to-green-100/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>

      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 z-10">
        <Button variant="ghost" className="gap-2 hover:bg-white/80">
          <ArrowLeft className="h-4 w-4" />
          <Image
            src="/images/matcha-logo.png"
            alt="Matcha Logo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="font-bold text-green-600">Back to Matcha</span>
        </Button>
      </Link>

      {/* Progress Indicator */}
      <div className="mb-8 flex w-full max-w-md items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              step >= 1
                ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
                : "border-2 border-gray-300 text-gray-400 bg-white"
            }`}
          >
            {step >= 1 ? <Sparkles className="h-4 w-4" /> : "1"}
          </div>
          <span
            className={`text-sm font-medium transition-colors ${
              step >= 1 ? "text-green-700" : "text-gray-400"
            }`}
          >
            Interests
          </span>
        </div>
        <div
          className={`h-1 w-10 rounded-full transition-colors ${
            step >= 2 ? "bg-green-500" : "bg-gray-200"
          }`}
        ></div>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              step >= 2
                ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
                : "border-2 border-gray-300 text-gray-400 bg-white"
            }`}
          >
            2
          </div>
          <span
            className={`text-sm font-medium transition-colors ${
              step >= 2 ? "text-green-700" : "text-gray-400"
            }`}
          >
            Bio
          </span>
        </div>
        <div
          className={`h-1 w-10 rounded-full transition-colors ${
            step >= 3 ? "bg-green-500" : "bg-gray-200"
          }`}
        ></div>
        <div className="flex items-center gap-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
              step >= 3
                ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
                : "border-2 border-gray-300 text-gray-400 bg-white"
            }`}
          >
            3
          </div>
          <span
            className={`text-sm font-medium transition-colors ${
              step >= 3 ? "text-green-700" : "text-gray-400"
            }`}
          >
            Availability
          </span>
        </div>
      </div>

      <Card className="w-full max-w-md relative bg-white/80 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === 1 && "Select Your Interests"}
            {step === 2 && "Tell Us About Yourself"}
            {step === 3 && "Set Your Availability"}
          </CardTitle>
          <CardDescription>
            {step === 1 &&
              "Choose at least 3 interests to help us match you with compatible friends"}
            {step === 2 &&
              "Write a short bio to introduce yourself to potential friends"}
            {step === 3 && "Let us know when you're free to hang out on campus"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={selectedInterests.includes(interest)}
                    onCheckedChange={() => handleInterestToggle(interest)}
                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                  <Label htmlFor={interest} className="text-sm cursor-pointer">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your major, hobbies, and what you're looking for in a friendship..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[150px] bg-white/50 border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Tabs defaultValue="Monday">
                <TabsList className="grid w-full grid-cols-7 bg-green-50">
                  {days.map((day) => (
                    <TabsTrigger
                      key={day}
                      value={day}
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      {day.substring(0, 3)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {days.map((day) => (
                  <TabsContent key={day} value={day} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-medium text-green-700">
                        {day}
                      </Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${day}-start`}>Start Time</Label>
                        <TimePickerInput
                          id={`${day}-start`}
                          value={availability[day].start}
                          onChange={(value) =>
                            handleAvailabilityChange(day, "start", value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${day}-end`}>End Time</Label>
                        <TimePickerInput
                          id={`${day}-end`}
                          value={availability[day].end}
                          onChange={(value) =>
                            handleAvailabilityChange(day, "end", value)
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="border-green-200 hover:bg-green-50"
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && selectedInterests.length < 3}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading || !authisReady}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
