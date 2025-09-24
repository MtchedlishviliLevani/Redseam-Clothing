"use client"

import { useAuthStore } from "@/features/store"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useAuthStore((state) => state.isLogged)
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Handle routing logic
  useEffect(() => {
    if (!isHydrated) return // Wait for hydration to complete

    const publicRoutes = ['/login', '/register', '/listing']
    const protectedRoutes = ['/order']

    // Since we don't persist auth state, we need to handle this differently
    // For now, we'll allow access to all routes and let individual pages handle auth
    // Or you can implement a different auth strategy (like checking for auth tokens in cookies)

    // Don't redirect if we're already on a public route
    if (publicRoutes.includes(pathname)) {
      setLoading(false)
      return
    }

    // For protected routes, redirect to login since we can't persist auth state
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      router.push('/login')
      return
    }

    // Redirect if user logged in & trying to access login/register
    if (isLoggedIn && ['/login', '/register'].includes(pathname)) {
      router.push('/listing')
      return
    }

    // Otherwise, allow rendering
    setLoading(false)
  }, [isLoggedIn, pathname, router, isHydrated])

  if (loading || !isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute