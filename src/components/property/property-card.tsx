'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useStore } from '@/store/useStore'
import { Property } from '@/lib/mockData'
import { Star, MapPin, Heart, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { id, title, location, price, currency, rating, verified, amenities, imageUrl } = property
  const wishlist = useStore((state) => state.wishlist)
  const toggleWishlist = useStore((state) => state.toggleWishlist)
  const isFavorited = wishlist.includes(id)

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 border border-ns-outline-variant/10 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative h-52 w-full overflow-hidden bg-zinc-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-4 left-4 bg-ns-tertiary text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5 fill-white text-ns-tertiary" />
            <span>Verified</span>
          </div>
        )}

        {/* Heart button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(id)
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-zinc-600 hover:text-rose-500 shadow-md transition-colors active:scale-90"
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Info Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-sans font-bold text-lg text-ns-on-surface truncate pr-2 group-hover:text-ns-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-ns-secondary-container bg-amber-500/10 px-2 py-0.5 rounded text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-ns-secondary-container text-ns-secondary-container" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Location */}
        <p className="text-xs text-ns-on-surface-variant mb-4 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
          <span className="truncate">{location}</span>
        </p>

        {/* Amenities Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {amenities.map((amenity) => (
            <span
              key={amenity}
              className="bg-ns-surface-container text-ns-primary px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border border-ns-primary/5"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-4 border-t border-ns-outline-variant/15 flex items-center justify-between">
          <div>
            <span className="font-sans text-xl font-extrabold text-ns-primary">
              {currency}
              {price.toLocaleString()}
            </span>
            <span className="text-zinc-500 text-xs font-medium">/mo</span>
          </div>

          <Link href={`/property/${id}`}>
            <Button size="sm" className="bg-ns-primary hover:bg-ns-primary-container text-white rounded-xl shadow-md">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
