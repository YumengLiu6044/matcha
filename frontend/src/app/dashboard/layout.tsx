import type { ReactNode } from "react"
import DashboardNav from "@/components/dashboard-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-green-100/10 pointer-events-none"></div>
      <div className="fixed top-20 left-10 w-72 h-72 bg-green-200/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-green-300/10 rounded-full blur-3xl pointer-events-none"></div>

      <DashboardNav />
      <main className="flex-1 relative z-10">{children}</main>
    </div>
  )
}
