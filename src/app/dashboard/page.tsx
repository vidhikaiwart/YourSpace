'use client'

import { useStore } from '@/store/useStore'
import { mockProperties } from '@/lib/mockData'
import PropertyCard from '@/components/property/property-card'
import {
  User as UserIcon,
  Heart,
  Calendar,
  Settings,
  LogOut,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Dashboard() {
  const wishlist = useStore((state) => state.wishlist)

  // Retrieve favorited property items
  const savedProperties = mockProperties.filter((p) => wishlist.includes(p.id))

  const sidebarLinks = [
    { name: 'Profile', icon: <UserIcon className="w-5 h-5" />, active: false },
    { name: 'Wishlist', icon: <Heart className="w-5 h-5 fill-ns-primary text-ns-primary" />, active: true },
    { name: 'My Bookings', icon: <Calendar className="w-5 h-5" />, active: false },
    { name: 'Account Settings', icon: <Settings className="w-5 h-5" />, active: false },
  ]

  return (
    <main className="pt-20 flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-72 fixed h-[calc(100vh-80px)] bg-white border-r border-ns-outline-variant/30 px-6 py-8 hidden md:block">
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                  link.active
                    ? 'bg-ns-primary text-white shadow-lg shadow-ns-primary/20'
                    : 'text-ns-on-surface-variant hover:bg-ns-surface-container-low hover:text-ns-primary'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-ns-outline-variant/20 pt-6">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all font-bold text-sm">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 md:ml-72 bg-[#f8f9ff] p-6 md:p-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Profile Summary Header */}
          <section className="relative overflow-hidden rounded-3xl bg-ns-primary text-white p-8 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl relative">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFgFdlFsqJ4obY9mfox_FbTNGVRQnJixzpZmgihUGycQMFRITtxTGBT1isT59DgNt-JZ5_k9cvEO7dDc7tFOTFkRgeLeRsin3AnK_m0-QW9Am3q-rgNrPwschr1drWxYE4dxeNDvdNtP1W9f7V4xm0HDOQbY2A5bR9hsx_dC7IdbssILwyYs7i2fHLL10WinI2CsXXDhQOHYUnaQaLc2rw-duFy8FIlRUBWUj0umP2U1ZK2Pe03wfDLA"
                    alt="Sarah Profile Picture"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#6ffbbe] text-[#002113] px-2.5 py-1 rounded-full flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider shadow-md">
                  <CheckCircle2 className="w-3 h-3 fill-[#002113] text-[#6ffbbe]" />
                  <span>Verified</span>
                </div>
              </div>

              <div className="text-center md:text-left flex-grow space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, Sarah!</h1>
                <p className="text-white/80 text-sm font-medium">
                  Premium Member since March 2024 • {savedProperties.length} Saved Properties
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                    <span>London, UK</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6ffbbe]" />
                    <span>ID Verified</span>
                  </div>
                </div>
              </div>

              <button className="bg-ns-secondary-container hover:bg-ns-secondary-container/90 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg active:scale-95 transition-all">
                Edit Profile
              </button>
            </div>
          </section>

          {/* Wishlist Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-ns-on-surface">My Wishlist</h2>
                <p className="text-zinc-500 text-sm">Properties you&apos;ve saved for future reference.</p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 bg-white px-4 py-2 rounded-xl text-zinc-700 font-bold text-xs border border-ns-outline-variant/30 hover:bg-zinc-50">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                <button className="flex items-center gap-1 bg-white px-4 py-2 rounded-xl text-zinc-700 font-bold text-xs border border-ns-outline-variant/30 hover:bg-zinc-50">
                  <span>Sort</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {savedProperties.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-ns-outline-variant/20 flex flex-col items-center justify-center space-y-4">
                <Heart className="w-16 h-16 text-zinc-200" />
                <h3 className="text-lg font-bold text-zinc-800">Your wishlist is empty</h3>
                <p className="text-zinc-500 text-sm max-w-sm">
                  Start searching for accommodations in Bangalore or London and tap the heart icon to save them.
                </p>
                <Link href="/explore">
                  <button className="mt-2 bg-ns-primary text-white font-bold text-xs px-6 py-3 rounded-xl hover:shadow-md">
                    Explore Accommodations
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </section>

          {/* Bento Recommendations */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Roommate Finder Card */}
            <div className="md:col-span-2 bg-[#eff4ff] rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center relative overflow-hidden shadow-sm">
              <div className="flex-1 space-y-4 z-10">
                <div className="inline-block bg-ns-secondary-container/10 text-ns-secondary-container px-3 py-1 rounded-full text-xs font-bold border border-ns-secondary-container/20">
                  Roommate Matcher
                </div>
                <h3 className="text-2xl font-bold text-ns-on-surface">Find a roommate?</h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  Based on your saved London properties, we found 3 potential student roommates matching your profile preferences. Save up to 40% on rent.
                </p>
                <button className="bg-ns-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md">
                  Explore Connections
                </button>
              </div>
              <div className="w-full md:w-44 h-44 rounded-2xl overflow-hidden shadow-2xl rotate-3 relative z-10">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgH3MDUhxUkjlCn4oeuabcjy96psVtEHfScM8ob-7gwB1aUU1RPbVNWXrgUA373LpMBs6QGau0ezm_y67bpyrQAmtbWl2onUjuHB9n7UFgBBqJJzpfsBCR4nBDg0Akta8JzlLjBF8DxdCCWMRUAC0hsaI_gegjMSkRNN9B_ot6Ok0xfJMXO_FmdXC5zCNtdOXYLDz4sct5wJNs7hh-G5m3DU-LZCACjvdWrArZx__BMPzY58lC8zq73w"
                  alt="Roommate matches"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-ns-primary/5 rounded-full -mr-32 -mt-32" />
            </div>

            {/* Premium Upgrade Card */}
            <div className="bg-[#1b253b] text-white rounded-3xl p-8 flex flex-col justify-center gap-4 relative overflow-hidden group shadow-md border border-white/5">
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-bold">NestSeeker Plus</h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Unlock priority viewing slots, verified landlord direct chats, and zero-deposit bookings.
                </p>
                <button className="w-full bg-white text-zinc-950 font-bold py-3 rounded-xl text-xs hover:bg-[#6ffbbe] transition-colors">
                  Upgrade Now
                </button>
              </div>
              <Sparkles className="w-40 h-40 text-white/5 absolute -bottom-8 -right-8 rotate-12 transition-transform duration-700 group-hover:scale-105" />
            </div>
          </section>

        </div>
      </section>
    </main>
  )
}
