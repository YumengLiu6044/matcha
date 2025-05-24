import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image
                src="/images/matcha-logo.png"
                alt="Matcha Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Matcha
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-green-50">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg">
                Sign up
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-transparent to-green-100/30"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>

          <div className="container relative flex flex-col items-center text-center">
            <Badge
              variant="secondary"
              className="mb-6 bg-green-100 text-green-700 border-green-200"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Now Live at UCI
            </Badge>

            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur-2xl opacity-20 scale-110"></div>
              <div className="relative h-32 w-32 bg-white rounded-full p-4 shadow-2xl">
                <Image
                  src="/images/matcha-logo.png"
                  alt="Matcha Logo"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-6xl">
              Make New{" "}
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 bg-clip-text text-transparent">
                Friends
              </span>{" "}
              at UCI
            </h1>

            <p className="mb-8 max-w-[700px] text-xl text-gray-600 leading-relaxed">
              Matcha connects UCI students based on shared interests and
              schedules, suggesting fun on-campus activities to help you build
              meaningful friendships.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-xl text-lg px-8 py-6 group animate-fade-in"
                  style={{ animationDelay: "0s", animationFillMode: "both" }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-200 hover:bg-green-50 text-lg px-8 py-6 animate-fade-in"
                  style={{ animationDelay: "0.7s", animationFillMode: "both" }}
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Three simple steps to start building meaningful friendships at
                UCI
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card
                className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-white group hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: "0s", animationFillMode: "both" }}
              >
                <CardContent className="p-8 text-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-400 text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                      1
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">
                    Create Your Profile
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Sign up with your UCI credentials, add your interests, and
                    set your availability for campus activities.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-white group hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: "0.7s", animationFillMode: "both" }}
              >
                <CardContent className="p-8 text-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-400 text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                      2
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">Get Matched</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our AI matches you with compatible students and suggests fun
                    campus activities based on your interests.
                  </p>
                </CardContent>
              </Card>

              <Card
                className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-white group hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: "1.4s", animationFillMode: "both" }}
              >
                <CardContent className="p-8 text-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-400 text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
                      3
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">Meet Up</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Accept the match, meet your new friend, and enjoy the
                    suggested activity together on campus.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Matcha?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built specifically for UCI students with features that matter
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">Interest-Based Matching</h3>
                <p className="text-sm text-gray-600">
                  Connect with students who share your passions
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">UCI Community</h3>
                <p className="text-sm text-gray-600">
                  Exclusive to UCI students with verified accounts
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">Smart Scheduling</h3>
                <p className="text-sm text-gray-600">
                  Find friends when you're both available
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">Campus Activities</h3>
                <p className="text-sm text-gray-600">
                  Discover new places and events on campus
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 text-white">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Make New Friends?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of UCI students who have already found their campus
              community through Matcha.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/matcha-logo.png"
                  alt="Matcha Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-lg font-bold text-green-600">Matcha</span>
              </div>
              <p className="text-sm text-gray-600">
                Connecting UCI students through shared interests and meaningful
                activities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/features" className="hover:text-green-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-green-600">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-green-600">
                    Safety
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/help" className="hover:text-green-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-green-600">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/terms" className="hover:text-green-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-green-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-green-600">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Matcha. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 mt-2 md:mt-0">
              Made with ❤️ for UCI students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
