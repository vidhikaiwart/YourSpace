'use client'

import { useStore } from '@/store/useStore'
import { Property } from '@/lib/mockData'
import { Heart, Calendar, Clock, Bolt } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface DetailsSidebarProps {
  property: Property
}

export default function DetailsSidebar({ property }: DetailsSidebarProps) {
  const { price, currency, deposit, hostName, hostImage, responseTime, viewsToday } = property
  const [booked, setBooked] = useState(false)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-ns-outline-variant/10 space-y-6">
      {/* Pricing header */}
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-extrabold text-ns-on-surface">
            {currency}
            {price.toLocaleString()}
          </span>
          <span className="text-zinc-500 text-sm font-semibold">/ month</span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Deposit</p>
          <p className="text-sm font-bold text-zinc-700">
            {currency}
            {(deposit ?? price).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Date selector fields */}
      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-ns-surface-container-low border border-ns-outline-variant/20">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
            Check-in Date
          </label>
          <div className="flex justify-between items-center cursor-pointer">
            <span className="text-sm font-bold text-zinc-700">September 1, 2024</span>
            <Calendar className="w-4 h-4 text-ns-primary" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-ns-surface-container-low border border-ns-outline-variant/20">
          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
            Tenancy Period
          </label>
          <div className="flex justify-between items-center cursor-pointer">
            <span className="text-sm font-bold text-zinc-700">12 Months (Fixed)</span>
            <Clock className="w-4 h-4 text-ns-primary" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => setBooked(true)}
          className="w-full py-3 bg-ns-secondary-container text-white font-extrabold text-sm rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
        >
          {booked ? 'Visit Scheduled!' : 'Book Visit'}
        </button>
        <button className="w-full py-3 bg-ns-primary text-white font-extrabold text-sm rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all">
          Contact Owner
        </button>
      </div>

      {/* Host profile info */}
      <div className="flex flex-col gap-4 pt-4 border-t border-ns-outline-variant/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden relative">
            <Image
              src={hostImage ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIYBJCx8AiWGjw0bEYgPeYQp8OIH_bRg60YOxZgRSxgvnAwGr54M9NzuAnPBgS0FXXURu90gdqVZlVulyxk-cPF83uaU2Y45GYgkD89yCDApkBBKCea0F4bNYH1YT0g8TpGnKWgSmkJk5PxEOueQc5lX6WYUekJWYN3EwDaWdVwe-ArO4jTV2V5ELel77Df-HtbzNG9CMJCR67VJ-_3FftfzH0vkFnmYeR5tNDrtkPohcARZjBppmQCQ'}
              alt={hostName ?? 'Host'}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-800">{hostName ?? 'Property Manager'}</p>
            <p className="text-[10px] font-semibold text-zinc-400">Response time: {responseTime ?? '< 1 hour'}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-rose-500">
          <Bolt className="w-4 h-4 fill-rose-500" />
          <span className="text-[10px] font-extrabold uppercase tracking-wide">
            Rare Find: {viewsToday ?? 14} people viewed today
          </span>
        </div>
      </div>
    </div>
  )
}

// Named save button sub-component
export function SaveButton({ id }: { id: number }) {
  const wishlist = useStore((state) => state.wishlist)
  const toggleWishlist = useStore((state) => state.toggleWishlist)
  const isFavorited = wishlist.includes(id)

  return (
    <button
      onClick={() => toggleWishlist(id)}
      className="flex items-center gap-1.5 px-4 py-2 border border-ns-outline-variant/40 rounded-xl hover:bg-zinc-50 transition-colors text-xs font-semibold text-zinc-700 bg-white"
    >
      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
      <span>{isFavorited ? 'Saved' : 'Save'}</span>
    </button>
  )
}

DetailsSidebar.SaveButton = SaveButton
