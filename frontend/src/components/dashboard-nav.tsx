"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarDays,
  Globe,
  Home,
  LogOut,

  Settings,
  User,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { useUserDataStore } from "@/util/store";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/matches", label: "Matches", icon: Users },
  { href: "/dashboard/network", label: "Network", icon: Globe },
  { href: "/dashboard/hangouts", label: "Hangouts", icon: CalendarDays },
  { href: "/dashboard/profile", label: "Profile", icon: User },

];

export default function DashboardNav() {
  const pathname = usePathname();

  const selfUserData = useUserDataStore((state) => state.self);

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <div
              className="flex items-center gap-2"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <Image
                src="/images/matcha-logo.png"
                alt="Matcha Logo"
                width={45}
                height={45}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-primary">Matcha</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-12 w-15">
                  <AvatarImage src={selfUserData.profileURL} alt="User" />
                  <AvatarFallback>
                    {selfUserData?.name ? selfUserData.name.charAt(0) : "?"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {selfUserData.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {selfUserData.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex w-full cursor-pointer items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="flex w-full cursor-pointer items-center"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/"
                  className="flex w-full cursor-pointer items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
