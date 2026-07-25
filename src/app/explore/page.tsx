'use client'

import { useStore } from '@/store/useStore'
import { mockProperties } from '@/lib/mockData'
import PropertyCard from '@/components/property/property-card'
import { SlidersHorizontal, MapPin, Navigation, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useMemo } from 'react'

export default function Explore() {
  const searchQuery = useStore((state) => state.searchQuery)
  const setSearchQuery = useStore((state) => state.setSearchQuery)
  const filters = useStore((state) => state.filters)
  const setFilter = useStore((state) => state.setFilter)
  const resetFilters = useStore((state) => state.resetFilters)

  // Local state for toggling visual UI details
  const [hoveredPin, setHoveredPin] = useState<number | null>(null)

  // Filter properties in memory
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // 1. Search Query (Matches title, location, city)
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesQuery =
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query)
        if (!matchesQuery) return false
      }

      // 2. Property Type
      if (filters.propertyType !== 'all') {
        if (property.type !== filters.propertyType) return false
      }

      // 3. Price Filter (Maximum price check)
      // Since Bangalore is ₹ and London is £, let's normalize price for filter slider.
      // We'll scale £ by 100 to make it comparable to ₹ on a single slider, or just filter standard number.
      // Let's keep it simple: if London, compare directly or multiply.
      const normalizedPrice = property.currency === '£' ? property.price * 100 : property.price
      const normalizedFilter = filters.priceRange
      if (normalizedPrice > normalizedFilter) return false

      // 4. Verified Only
      if (filters.verifiedOnly && !property.verified) return false

      return true
    })
  }, [searchQuery, filters])

  // Determine active city for map view
  const activeCity = useMemo(() => {
    if (searchQuery.toLowerCase().includes('london') || filteredProperties.some((p) => p.city === 'London')) {
      return 'London'
    }
    return 'Bangalore'
  }, [searchQuery, filteredProperties])

  const mapImage =
    activeCity === 'London'
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI7cJN-cTp2RMURYfiOpdGvGgxocM3Mdye-zmQEN1FDuiVtxg3USYrnHzAGQVmcygm0wyTKnOfXwrYP0aFJ6oBRE22hmPFhT6e1ild-wAD5rwNzVIaTS2tXEyffpCwB5r8gSym0KWjDYT0kFOE2Fs-71egmYtfF_2M22M7t-aYWw0ysWK1WK14X5-bRQ5CXHzorLTZyLepLIbQpm6qNev_9_QqEVxccg3HMTeFHUm3EgYvmUlywi8MTg'
      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxVwwbA6fCspSF4hbD43x7bgweG0o5j06K1CeVsclHmYNPHCvbd_ohrjCfNET5fBObpXxGAAQPi-yVuduh9MUKpDOPCH5CYFF3-oSvtHK0s0R50gavceQoQQUNyCt4LDWyxtFJTe_D26bVLNOaqRzKjdyFn2QrBoZ_uAEmJtfOPCusze6lFG3Pyc9YsHUzG10E4vI4J6AChjd_2IeqIm7poQ8-encg3uC2rFVaAOr1g7tlD_i6P0RJcA'

  // Coordinates for mock pins on the map
  const mockPins = useMemo(() => {
    if (activeCity === 'London') {
      return [
        { id: 5, top: '30%', left: '40%' },
        { id: 6, top: '55%', left: '25%' },
        { id: 7, top: '45%', left: '65%' },
        { id: 9, top: '20%', left: '55%' },
      ]
    } else {
      return [
        { id: 1, top: '40%', left: '30%' },
        { id: 2, top: '50%', left: '60%' },
        { id: 3, top: '30%', left: '50%' },
        { id: 4, top: '65%', left: '45%' },
      ]
    }
  }, [activeCity])

  return (
    <main className="pt-20 flex h-[calc(100vh-80px)] w-full overflow-hidden">
      {/* Left: Search Results & Filter Controls */}
      <section className="w-full md:w-[55%] lg:w-[60%] flex flex-col h-full bg-white border-r border-ns-outline-variant/30">
        
        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-ns-outline-variant/20 bg-white z-10 space-y-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {/* Filter Toggle Button */}
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-ns-outline-variant/40 bg-zinc-50 hover:bg-zinc-100 transition-colors text-xs font-semibold text-zinc-700">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <div className="h-6 w-[1px] bg-zinc-200" />

            {/* Property Type Dropdown/Buttons */}
            {(['all', 'PG', 'Hostel', 'Flat', 'Co-living'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter('propertyType', type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  filters.propertyType === type
                    ? 'bg-ns-primary border-ns-primary text-white shadow-sm'
                    : 'border-ns-outline-variant/40 bg-white hover:bg-zinc-50 text-zinc-700'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}

            <div className="h-6 w-[1px] bg-zinc-200" />

            {/* Verified Toggle */}
            <button
              onClick={() => setFilter('verifiedOnly', !filters.verifiedOnly)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 ${
                filters.verifiedOnly
                  ? 'bg-ns-tertiary border-ns-tertiary text-white shadow-sm'
                  : 'border-ns-outline-variant/40 bg-white hover:bg-zinc-50 text-zinc-700'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Only</span>
            </button>
          </div>

          {/* Range Slider for Price Limit */}
          <div className="flex items-center gap-4 py-1 text-xs">
            <span className="text-zinc-500 font-semibold uppercase tracking-wider">Max Price Scale:</span>
            <input
              type="range"
              min={5000}
              max={100000}
              step={2000}
              value={filters.priceRange}
              onChange={(e) => setFilter('priceRange', Number(e.target.value))}
              className="w-48 h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-ns-primary"
            />
            <span className="font-bold text-ns-primary">
              Under {activeCity === 'London' ? '£' : '₹'}
              {(activeCity === 'London' ? filters.priceRange / 100 : filters.priceRange).toLocaleString()}
            </span>
            {(searchQuery || filters.propertyType !== 'all' || filters.verifiedOnly) && (
              <button
                onClick={() => {
                  resetFilters()
                  setSearchQuery('')
                }}
                className="text-ns-primary hover:underline font-bold ml-auto"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Results list */}
        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin">
          <div className="mb-4 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-black text-ns-on-surface">
                Homes in {activeCity}
              </h1>
              <p className="text-ns-on-surface-variant text-sm">
                {filteredProperties.length} properties available
              </p>
            </div>
            {searchQuery && (
              <span className="text-xs bg-ns-surface-container text-ns-primary px-3 py-1 rounded-full font-semibold">
                Search: &quot;{searchQuery}&quot;
              </span>
            )}
          </div>

          {filteredProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
              <MapPin className="w-16 h-16 text-zinc-300 mb-4 animate-bounce" />
              <p className="text-sm font-bold">No property matches your current filters.</p>
              <button
                onClick={() => {
                  resetFilters()
                  setSearchQuery('')
                }}
                className="mt-4 bg-ns-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:shadow-md"
              >
                Reset search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  onMouseEnter={() => setHoveredPin(property.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Right: Map View (Static with active map pins overlay) */}
      <section className="hidden md:block md:w-[45%] lg:w-[40%] relative bg-zinc-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={mapImage}
            alt={`${activeCity} Map View`}
            fill
            className="object-cover grayscale-[10%]"
          />
        </div>

        {/* Map Interactions Overlay */}
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-10">
          <div className="flex justify-end gap-2 pointer-events-auto">
            <div className="flex flex-col gap-2">
              <button className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-zinc-50 font-bold text-zinc-800 border border-zinc-200">
                +
              </button>
              <button className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-zinc-50 font-bold text-zinc-800 border border-zinc-200">
                -
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end pointer-events-auto">
            <button className="px-4 py-2 bg-white rounded-full shadow-lg flex items-center gap-1.5 font-bold text-xs hover:bg-ns-surface-container transition-colors text-zinc-800 border border-zinc-200">
              <Navigation className="w-3.5 h-3.5 text-ns-primary" />
              <span>Show current location</span>
            </button>
          </div>
        </div>

        {/* Mock Map Markers mapped to filtered list */}
        {mockPins.map((pin) => {
          const prop = mockProperties.find((p) => p.id === pin.id)
          if (!prop) return null

          // Check if this property is in the filtered list
          const isAvailable = filteredProperties.some((p) => p.id === pin.id)
          if (!isAvailable) return null

          const isHovered = hoveredPin === pin.id

          return (
            <div
              key={pin.id}
              style={{ top: pin.top, left: pin.left }}
              className="absolute pointer-events-auto z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative group cursor-pointer">
                <div
                  className={`px-3 py-1 rounded-full shadow-xl font-extrabold text-xs transition-all relative ${
                    isHovered
                      ? 'bg-ns-primary text-white scale-110'
                      : 'bg-white text-ns-primary border border-ns-primary/50'
                  }`}
                >
                  {prop.currency}
                  {prop.price.toLocaleString()}
                </div>
                <div
                  className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] mx-auto -mt-[1px] ${
                    isHovered ? 'border-t-ns-primary' : 'border-t-white'
                  }`}
                />

                {/* Hover details tooltip */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none w-48 transition-all ${
                    isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-2xl p-2 border border-ns-outline-variant/30 space-y-1">
                    <div className="h-20 w-full rounded-lg overflow-hidden relative">
                      <Image
                        src={prop.imageUrl}
                        alt={prop.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-[10px] font-extrabold text-zinc-800 truncate px-1">
                      {prop.title}
                    </p>
                    <p className="text-[9px] text-zinc-500 px-1">
                      {prop.location.split(',')[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
