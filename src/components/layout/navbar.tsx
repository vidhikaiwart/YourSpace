'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { Heart, Bell, Search, Menu, Globe, User, Plus, Grid3X3 } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const wishlist = useStore((state) => state.wishlist)

  const navLinks = [
    { name: 'Discover', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Experiences', href: '/experiences' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <span className="text-slate-300">🌟 New: Virtual property tours available!</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
                <span>EN</span>
              </button>
              <span className="text-slate-600">|</span>
              <button className="text-slate-300 hover:text-white transition-colors">Support</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
        <nav className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left Section - Brand & Navigation */}
            <div className="flex items-center gap-12">
              {/* Brand */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">Y</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">✨</span>
                  </div>
                </div>
                <div>
                  <span className="font-poppins text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    YourSpace
                  </span>
                  <div className="text-xs text-slate-500 -mt-1">Find your perfect space</div>
                </div>
              </Link>

              {/* Navigation Links - Desktop */}
              <div className="hidden lg:flex items-center">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link key={link.name} href={link.href}>
                      <div className={`relative px-4 py-2 mx-1 rounded-full font-medium text-sm transition-all duration-300 ${
                          isActive
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-50'
                        }`}>
                        <span>{link.name}</span>
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"></div>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Center Section - Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="w-full relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <Link href="/explore" className="block w-full">
                  <input
                    className="block w-full pl-12 pr-4 py-3 border border-slate-200 rounded-full bg-slate-50 hover:bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400 text-sm"
                    placeholder="Where do you want to stay?"
                    readOnly
                  />
                </Link>
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
              {/* List Property Button */}
              <button className="hidden lg:flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-full font-medium text-sm transition-all">
                <Plus className="w-4 h-4" />
                <span>List your space</span>
              </button>

              {/* Mobile Search */}
              <Link href="/explore" className="md:hidden">
                <button className="p-3 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                  <Search className="w-5 h-5" />
                </button>
              </Link>

              {/* Notifications */}
              <button className="relative p-3 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Wishlist */}
              <Link href="/dashboard">
                <button className="relative p-3 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                  <Heart className="w-5 h-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </Link>

              {/* Profile Menu */}
              <div className="relative">
                <button className="flex items-center gap-2 p-2 border border-slate-200 rounded-full hover:shadow-md transition-all bg-white">
                  <Menu className="w-4 h-4 text-slate-600" />
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFgFdlFsqJ4obY9mfox_FbTNGVRQnJixzpZmgihUGycQMFRITtxTGBT1isT59DgNt-JZ5_k9cvEO7dDc7tFOTFkRgeLeRsin3AnK_m0-QW9Am3q-rgNrPwschr1drWxYE4dxeNDvdNtP1W9f7V4xm0HDOQbY2A5bR9hsx_dC7IdbssILwyYs7i2fHLL10WinI2CsXXDhQOHYUnaQaLc2rw-duFy8FIlRUBWUj0umP2U1ZK2Pe03wfDLA"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-slate-100 bg-white">
          <div className="flex items-center justify-around py-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link key={link.name} href={link.href}>
                  <div className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
                      isActive ? 'text-emerald-600' : 'text-slate-600'
                    }`}>
                    <Grid3X3 className="w-5 h-5 mb-1" />
                    <span className="text-xs font-medium">{link.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </header>
    </>
  )
}