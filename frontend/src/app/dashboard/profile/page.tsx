"use client";

import { LoaderCircle, User, Camera, Clock, Heart } from "lucide-react";
import type React from "react";

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
import { getAuth } from "firebase/auth";
import { app, db, storage } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
      if (selected.size > 20 * 1024 * 1024) {
        console.log("File Too Big");
        return;
      }

      if (selected) {
        setIsUploading(true);

        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) return;

        const uid = auth.currentUser.uid;
        const parts = selected.name.split(".");
        const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : "";
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
            profileURL: downloadURL,
          });
        } catch (error) {
          console.error("Error uploading profile picture:", error);
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  const handleUploadButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    fileInputRef.current?.click();
    e.stopPropagation();
  };

  useEffect(() => {
    setName(selfUserData.name);
    setAvailability(selfUserData.availability ?? availability);
    setEmail(selfUserData.email ?? email);
    setBio(selfUserData.bio ?? bio);
    setMajor(selfUserData.major ?? major);
    setYear(selfUserData.year ?? year);
    setProfileURL(selfUserData.profileURL ?? profileURL);
  }, []);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
          Your Profile
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your personal information, interests, and availability
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-5 w-5 text-green-600" />
                Profile Picture
              </CardTitle>
              <CardDescription>
                Upload a photo to personalize your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-32 w-32 ring-4 ring-green-200 ring-offset-4">
                  {isUploading ? (
                    <div className="flex items-center justify-center w-full h-full bg-green-50">
                      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                    </div>
                  ) : (
                    <>
                      <AvatarImage
                        src={profileURL || "/placeholder.svg"}
                        alt="Profile"
                      />
                      <AvatarFallback className="bg-gradient-to-r from-green-600 to-green-500 text-white text-2xl">
                        {}
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="h-4 w-4 text-white" />
                </div>
              </div>
              <Button
                className="mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg"
                onClick={handleUploadButtonClick}
                disabled={isUploading}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Photo"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="basic">
            <TabsList className="mb-6 grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm shadow-lg border-0 p-1">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="interests"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                Interests
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200"
              >
                Availability
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="h-5 w-5 text-green-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-green-700 font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/50 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-green-700 font-medium"
                    >
                      UCI Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="bg-gray-50 border-gray-200"
                    />
                    <p className="text-xs text-gray-500">
                      Your UCI email cannot be changed
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="major"
                        className="text-green-700 font-medium"
                      >
                        Major
                      </Label>
                      <Input
                        id="major"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="bg-white/50 border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="year"
                        className="text-green-700 font-medium"
                      >
                        Year
                      </Label>
                      <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full rounded-md border border-green-200 bg-white/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Graduate">Graduate</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-green-700 font-medium">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[120px] bg-white/50 border-green-200 focus:border-green-500 focus:ring-green-500"
                    />
                    <p className="text-xs text-gray-500">
                      Tell other students about yourself, your hobbies, and what
                      you're looking for in a friendship
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50/50 border-t border-green-100">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg"
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
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Heart className="h-5 w-5 text-green-600" />
                    Your Interests
                  </CardTitle>
                  <CardDescription>
                    Select interests to help us match you with compatible
                    friends
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
                          checked={selectedInterests.includes(interest)}
                          onCheckedChange={() => handleInterestToggle(interest)}
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                        <Label
                          htmlFor={interest}
                          className="text-sm cursor-pointer"
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50/50 border-t border-green-100">
                  <Button
                    onClick={handleSave}
                    disabled={loading || selectedInterests.length < 3}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg"
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
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Clock className="h-5 w-5 text-green-600" />
                    Your Availability
                  </CardTitle>
                  <CardDescription>
                    Let us know when you're free to hang out on campus
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                            <Label
                              htmlFor={`${day}-start`}
                              className="text-green-700 font-medium"
                            >
                              Start Time
                            </Label>
                            <TimePickerInput
                              id={`${day}-start`}
                              value={availability[day].start}
                              onChange={(value) =>
                                handleAvailabilityChange(day, "start", value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor={`${day}-end`}
                              className="text-green-700 font-medium"
                            >
                              End Time
                            </Label>
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
                </CardContent>
                <CardFooter className="bg-gray-50/50 border-t border-green-100">
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg"
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
