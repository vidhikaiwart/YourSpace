'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store/useStore'
import { mockProperties } from '@/lib/mockData'
import PropertyCard from '@/components/property/property-card'
import { Search, MapPin, Building2, Hotel, Home as HomeIcon, Users, ArrowRight, HomeIcon as HomeCtaIcon } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const setSearchQuery = useStore((state) => state.setSearchQuery)
  const setFilter = useStore((state) => state.setFilter)

  // Local inputs
  const [searchTerm, setSearchTerm] = useState('')
  const [locationTerm, setLocationTerm] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Update store
    setSearchQuery(searchTerm)
    if (locationTerm) {
      // simulate location filter or just set search query
      setSearchQuery(`${searchTerm} ${locationTerm}`.trim())
    }
    router.push('/explore')
  }

  const handleCategoryClick = (type: 'PG' | 'Hostel' | 'Flat' | 'Co-living') => {
    setFilter('propertyType', type)
    router.push('/explore')
  }

  const handleBentoClick = (query: string) => {
    setSearchQuery(query)
    router.push('/explore')
  }

  // Showcase 4 properties near the user (Bangalore ones)
  const featuredProperties = mockProperties.filter((p) => p.city === 'Bangalore')

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-10000 hover:scale-105"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1mpcvQOJKZLf9vyiP686ZRdM_bCQIsVNRqYxC9AAZHzU1u6EI4tqehfMqRa3j0YCADkPEurj57vDreKKzjcXHK8VAPRslfdSuBSplFp_PP4JWKGfo_U8kPAblyw6SdMFf9UerOXAeZtw0u3DOJ8QXKysAK95OuMDX4K6vISjI9cWDXxckRdyWcAi9Gc5kLBOJqbt8IIq6Rku0oadf23kn0Df3Kq8IVB-hIuBCJyVNpCG9MExOdXxy6A')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#004ac6]/40 via-[#004ac6]/20 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full text-white">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg leading-tight">
              Your reliable guide to a home away from home.
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md font-medium">
              Verified PG, Hostels, and Flats for students and young professionals.
            </p>

            {/* Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-2 rounded-full shadow-2xl flex items-center max-w-2xl overflow-hidden ring-1 ring-zinc-200"
            >
              <div className="flex-1 flex items-center px-4 gap-2">
                <Search className="w-5 h-5 text-ns-primary" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-zinc-800 text-sm py-2"
                  placeholder="Find your next home..."
                  type="text"
                />
              </div>
              <div className="h-6 w-[1px] bg-zinc-200" />
              <div className="flex-1 flex items-center px-4 gap-2 hidden lg:flex">
                <MapPin className="w-5 h-5 text-ns-primary" />
                <input
                  value={locationTerm}
                  onChange={(e) => setLocationTerm(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-zinc-800 text-sm py-2"
                  placeholder="Location"
                  type="text"
                />
              </div>
              <button
                type="submit"
                className="bg-ns-secondary-container text-white font-semibold text-sm px-8 py-3 rounded-full hover:shadow-lg active:scale-95 transition-all"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            onClick={() => handleCategoryClick('PG')}
            className="group flex flex-col items-center p-8 bg-[#eff4ff] rounded-2xl cursor-pointer hover:bg-ns-primary-container hover:text-white transition-all duration-300 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform text-ns-primary">
              <Building2 className="w-8 h-8" />
            </div>
            <span className="font-bold text-sm">PG</span>
          </div>

          <div
            onClick={() => handleCategoryClick('Hostel')}
            className="group flex flex-col items-center p-8 bg-[#eff4ff] rounded-2xl cursor-pointer hover:bg-ns-primary-container hover:text-white transition-all duration-300 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform text-ns-primary">
              <Hotel className="w-8 h-8" />
            </div>
            <span className="font-bold text-sm">Hostel</span>
          </div>

          <div
            onClick={() => handleCategoryClick('Flat')}
            className="group flex flex-col items-center p-8 bg-[#eff4ff] rounded-2xl cursor-pointer hover:bg-ns-primary-container hover:text-white transition-all duration-300 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform text-ns-primary">
              <HomeIcon className="w-8 h-8" />
            </div>
            <span className="font-bold text-sm">Flat</span>
          </div>

          <div
            onClick={() => handleCategoryClick('Co-living')}
            className="group flex flex-col items-center p-8 bg-[#eff4ff] rounded-2xl cursor-pointer hover:bg-ns-primary-container hover:text-white transition-all duration-300 shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform text-ns-primary">
              <Users className="w-8 h-8" />
            </div>
            <span className="font-bold text-sm">Co-living</span>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-[#004ac6] mb-1">Featured Near You</h2>
            <p className="text-zinc-500 text-sm">Top-rated picks in your current area.</p>
          </div>
          <button
            onClick={() => router.push('/explore')}
            className="text-ns-primary font-bold text-sm flex items-center gap-1 hover:underline"
          >
            View all Explore <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Popular locations (Bento Layout) */}
      <section className="bg-[#eff4ff] py-16 mt-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-[#004ac6] mb-8">Popular in Bangalore</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
            {/* Main electronic city bento card */}
            <div
              onClick={() => handleBentoClick('Electronic City')}
              className="md:col-span-2 relative rounded-3xl overflow-hidden group shadow-md cursor-pointer"
            >
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2I-CLfbBghoK95YkS_amtOggmla3RU5tCQ26xdtEzQdGuZpQ1CE17wwAVBiSIXKDz6Aj0_KQsEK_ta8CRvHbaGTpZ_QsBhHZVvvFCYsrekEz1SIkmY37hhIMp5sEUdqAQ8BSHC9u5dGSmBtRI5e_WAiYute4iTQoOe0VqZ8GHetRTzpMmTIWEz9bB4AhPQZHA1gehCrxZ_2cHot3EZjOuaEw7qvo-CrgIrqLWrMqPbkNl1A5_XiQpDg')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 space-y-1">
                <span className="bg-ns-secondary-container text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  Most Searched
                </span>
                <h3 className="text-white text-3xl font-extrabold">Electronic City Hub</h3>
                <p className="text-white/80 text-sm">240+ verified listings from ₹8,000</p>
              </div>
            </div>

            {/* Side Card 1 - Indiranagar */}
            <div
              onClick={() => handleBentoClick('Indiranagar')}
              className="relative rounded-3xl overflow-hidden group shadow-md cursor-pointer"
            >
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJLHYcUYFBL9AgXJmpgA6sqrPDJRi0MphE0dOzF-YggMsNcEAaWr5vUOjHuJF_aEotHRb-x0pBmbjpe7pCx5bh_Rz6-DgtgPNCaL28xOJLEudL8rD7N0Z7u-m9wyy_lcByrFHqMA1SZp0Wb19M0_nWnwbVdG6PlKRoCIimRYpPJfL9MX14caMb_AdQnlLF6w0tVJ-Uo_iruZ5ZJA7r2h52r2akdADCKxdTeuOZQCDilcI3e0rmUK58KA')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-xl font-bold">Indiranagar</h3>
                <p className="text-white/80 text-xs">The heart of nightlife & dining</p>
              </div>
            </div>

            {/* Side Card 2 - Whitefield */}
            <div
              onClick={() => handleBentoClick('Whitefield')}
              className="relative rounded-3xl overflow-hidden group shadow-md cursor-pointer"
            >
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4pP2lKwb8TYn54ojgiMU3hwsNGipQCy8xp8r3qhHtmxlaZOy3C4mr52fMUXIb5uqSBA2iNkFulBzWO571EDfo1TVxsDpw9SjEwrqCOx7DtpPE6MUIm3D15IPRXBZsA4FLsxwZnnm8qWAjemvL57pyPfghxHuxvEPBOhvTC95KOforbQraXKfscYrqa1vxY7CIY9XPO-n4XacXF5JgndHn3ENhs2RQIxRVP-gzXKs5jSmGhgsiiyZu8A')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-xl font-bold">Whitefield</h3>
                <p className="text-white/80 text-xs">Ideal for IT professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="bg-[#1b253b] text-white rounded-3xl p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ns-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="flex-1 space-y-6 z-10">
            <h2 className="text-3xl font-extrabold">Are you a property owner?</h2>
            <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
              List your property with NestSeeker and reach thousands of verified seekers. Enjoy hassle-free management, automated invoicing, and 24/7 support.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="bg-ns-secondary-container text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:shadow-xl active:scale-95 transition-all">
                List Property Now
              </button>
              <button className="border border-white/20 text-white font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all">
                How it works
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/3 z-10 flex justify-center">
            <div className="w-44 h-44 bg-ns-primary/20 rounded-full flex items-center justify-center animate-pulse">
              <HomeCtaIcon className="w-20 h-20 text-ns-primary-container" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
