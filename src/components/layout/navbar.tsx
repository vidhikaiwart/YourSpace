'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Heart, Bell, Search } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const wishlist = useStore((state) => state.wishlist)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f9ff]/80 backdrop-blur-md border-b border-ns-outline-variant/20 shadow-sm">
      <nav className="max-w-[1280px] mx-auto px-6 h-20 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-12">
          <Link href="/">
            <span className="font-sans text-2xl font-extrabold text-ns-primary cursor-pointer tracking-tight">
              NestSeeker
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`font-sans text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'text-ns-primary font-bold border-b-2 border-ns-primary pb-1'
                        : 'text-ns-on-surface-variant hover:text-ns-primary'
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              )
            })}
            <span className="font-sans text-sm font-medium text-ns-on-surface-variant hover:text-ns-primary cursor-pointer transition-colors">
              List Property
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-6">
          {/* Search bar helper (explore path only or other pages) */}
          {pathname !== '/explore' && (
            <Link href="/explore">
              <div className="hidden lg:flex items-center bg-ns-surface-container-low px-4 py-2 rounded-full border border-ns-outline-variant/30 cursor-pointer hover:shadow-md transition-shadow">
                <Search className="w-4 h-4 text-ns-on-surface-variant mr-2" />
                <span className="text-xs font-semibold text-ns-on-surface-variant pr-4">
                  Find student housing...
                </span>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-4">
            {/* Wishlist Link */}
            <Link href="/dashboard">
              <button className="p-2 text-ns-on-surface-variant hover:text-ns-primary hover:bg-ns-surface-container-low rounded-full transition-all relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-ns-secondary-container text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </Link>

            {/* Notification Bell */}
            <button className="p-2 text-ns-on-surface-variant hover:text-ns-primary hover:bg-ns-surface-container-low rounded-full transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            {/* User Profile Avatar */}
            <Link href="/dashboard">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-ns-primary cursor-pointer active:scale-95 transition-transform relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFgFdlFsqJ4obY9mfox_FbTNGVRQnJixzpZmgihUGycQMFRITtxTGBT1isT59DgNt-JZ5_k9cvEO7dDc7tFOTFkRgeLeRsin3AnK_m0-QW9Am3q-rgNrPwschr1drWxYE4dxeNDvdNtP1W9f7V4xm0HDOQbY2A5bR9hsx_dC7IdbssILwyYs7i2fHLL10WinI2CsXXDhQOHYUnaQaLc2rw-duFy8FIlRUBWUj0umP2U1ZK2Pe03wfDLA"
                  alt="Sarah Avatar"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
