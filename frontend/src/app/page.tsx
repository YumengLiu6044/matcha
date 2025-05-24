import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/images/matcha-logo.png" alt="Matcha Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-primary">Matcha</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20">
          <div className="container flex flex-col items-center text-center">
            <div className="relative mb-8 h-32 w-32">
              <Image src="/images/matcha-logo.png" alt="Matcha Logo" fill className="rounded-full object-cover" />
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">Make New Friends at UCI</h1>
            <p className="mb-8 max-w-[700px] text-lg text-muted-foreground">
              Matcha connects UCI students based on shared interests and schedules, suggesting fun on-campus activities
              to help you build meaningful friendships.
            </p>
            <div className="flex gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-accent py-20">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Create Your Profile</h3>
                <p className="text-muted-foreground">
                  Sign up with your UCI credentials, add your interests, and set your availability.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Get Matched</h3>
                <p className="text-muted-foreground">
                  Our AI matches you with compatible students and suggests fun campus activities.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Meet Up</h3>
                <p className="text-muted-foreground">
                  Accept the match, meet your new friend, and enjoy the suggested activity together.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Matcha. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}