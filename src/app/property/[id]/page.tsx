import Image from 'next/image'
import Link from 'next/link'
import { mockProperties } from '@/lib/mockData'
import { notFound } from 'next/navigation'
import {
  CheckCircle2,
  ChevronRight,
  Share2,
  Bed,
  Bath,
  Maximize,
  Wifi,
  Wind,
  WashingMachine,
  Briefcase,
  ShieldCheck,
  Dumbbell,
  Sparkles,
  MapPin,
} from 'lucide-react'
import DetailsSidebar from './details-sidebar'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PropertyDetails({ params }: PageProps) {
  const { id } = await params
  const propertyId = parseInt(id)

  const property = mockProperties.find((p) => p.id === propertyId)

  if (!property) {
    notFound()
  }

  // Define secondary images for showcase gallery (mock fallback images)
  const secondaryImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDOgFTcwtbzjcDaxieEHzeca42ZQ-nqwCMGR8QdD2WW39FqVkRmHsGe5TsCduieI2ro_nz__BbuCU0JEM6A70Vxa7MwzCz8Uoli0PZUGI6wc5XrCy7zTLPKodrtfVcBPhsBGNLGT3OX7pvcDxw4Bc7YGk9Xcxt2ycKk04CF0K0SqjjlIgquK5Vw7HPj9udoN6zOPnVSrq8AucaWCmEgI1qb4zXlGA6_efVXYLYoRZ9Io0PcLX6xmHEm8g',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnk1cEVUhID2RMJVsdOIbWUWNRY6tWMkjfzyNOdq1-C9XAyAjKKZxPnIdM5YMlFqQVcqTtFvdh_DBFMzNNVqHD5C-BtHwWjN4Jc4W8ym4r9iSznlWsOcSTaIQn1N4u1RTXMl4V8DpVwNS2t_odI88gVBqrORyKT-1qSgANymcP9rG_h-HFbErL-16YHb5UHeUvc1XyQkCucJ-01Gi1eJoR6l-jqTUabGlSoBXbeTZrE32sXSq3IpCbgQ',
  ]

  // Map icons to amenity strings
  const renderAmenityIcon = (name: string) => {
    const lower = name.toLowerCase()
    if (lower.includes('wifi')) return <Wifi className="w-5 h-5" />
    if (lower.includes('ac') || lower.includes('air')) return <Wind className="w-5 h-5" />
    if (lower.includes('laundry') || lower.includes('wash')) return <WashingMachine className="w-5 h-5" />
    if (lower.includes('workspace')) return <Briefcase className="w-5 h-5" />
    if (lower.includes('security') || lower.includes('concierge')) return <ShieldCheck className="w-5 h-5" />
    if (lower.includes('gym') || lower.includes('fitness')) return <Dumbbell className="w-5 h-5" />
    return <Sparkles className="w-5 h-5" />
  };

  return (
    <main className="pt-24 pb-16 max-w-[1280px] mx-auto px-6">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold">
            <Link href="/explore" className="hover:text-ns-primary">
              Explore
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-ns-primary cursor-pointer">{property.city}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-ns-primary font-bold">{property.title}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-ns-on-surface">{property.title}</h1>

          <div className="flex flex-wrap items-center gap-3">
            {property.verified && (
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-ns-tertiary border border-emerald-500/20 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 fill-ns-tertiary text-white" />
                <span>Verified Property</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-zinc-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 border border-ns-outline-variant/40 rounded-xl hover:bg-zinc-50 transition-colors text-xs font-semibold text-zinc-700 bg-white">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <DetailsSidebar.SaveButton id={property.id} />
        </div>
      </div>

      {/* Gallery Showcase */}
      <section className="grid grid-cols-12 gap-3 h-[450px] mb-12 rounded-2xl overflow-hidden shadow-sm relative">
        <div className="col-span-12 md:col-span-8 relative group overflow-hidden">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-101"
          />
        </div>
        <div className="hidden md:flex md:col-span-4 flex-col gap-3 h-full">
          <div className="relative flex-1 group overflow-hidden">
            <Image
              src={secondaryImages[0]}
              alt={`${property.title} interior`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-103"
            />
          </div>
          <div className="relative flex-1 group overflow-hidden">
            <Image
              src={secondaryImages[1]}
              alt={`${property.title} bedroom`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-103"
            />
            <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-zinc-800 px-4 py-2 rounded-xl text-xs font-bold shadow-lg hover:bg-ns-primary hover:text-white transition-all">
              Show all photos
            </button>
          </div>
        </div>
      </section>

      {/* Details Split Layout */}
      <div className="grid grid-cols-12 gap-12 items-start">
        {/* Left Column: Details */}
        <div className="col-span-12 lg:col-span-8 space-y-12">
          
          {/* Highlights */}
          <div className="flex flex-wrap gap-6 py-6 border-y border-ns-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-ns-surface-container flex items-center justify-center text-ns-primary">
                <Bed className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-ns-on-surface">{property.bedrooms ?? 1} Bedrooms</p>
                <p className="text-zinc-500 text-xs font-medium">Standard Furnished</p>
              </div>
            </div>

            <div className="w-px h-10 bg-ns-outline-variant/20 hidden md:block" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-ns-surface-container flex items-center justify-center text-ns-primary">
                <Bath className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-ns-on-surface">{property.bathrooms ?? 1} Bathrooms</p>
                <p className="text-zinc-500 text-xs font-medium">Private Access</p>
              </div>
            </div>

            <div className="w-px h-10 bg-ns-outline-variant/20 hidden md:block" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-ns-surface-container flex items-center justify-center text-ns-primary">
                <Maximize className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-ns-on-surface">{property.sqft ?? 200} SQFT</p>
                <p className="text-zinc-500 text-xs font-medium">Spacious Interior</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ns-on-surface">About this property</h2>
            <div className="text-sm md:text-base text-zinc-600 space-y-4 leading-relaxed font-medium">
              <p>{property.description}</p>
              <p>
                Perfectly situated close to public transport links and educational institutions, this property has been carefully curated to support study routines and young professional lifestyle needs. Comes complete with shared networking spaces and high-efficiency utilities.
              </p>
            </div>
          </section>

          {/* Amenities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-ns-on-surface">What this place offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 p-4 rounded-xl bg-ns-surface-container-low border border-transparent hover:border-ns-primary/20 transition-all group"
                >
                  <span className="text-ns-primary group-hover:scale-110 transition-transform">
                    {renderAmenityIcon(amenity)}
                  </span>
                  <span className="text-sm font-bold text-zinc-800">{amenity}</span>
                </div>
              ))}
            </div>
            <button className="px-6 py-2.5 border border-ns-primary text-ns-primary font-bold text-xs rounded-xl hover:bg-ns-surface-container transition-colors">
              Show all amenities
            </button>
          </section>

          {/* Location details */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-ns-on-surface">Location</h2>
              <span className="text-zinc-500 text-sm font-semibold">{property.location}</span>
            </div>
            <div className="w-full h-80 rounded-2xl overflow-hidden relative shadow-sm border border-ns-outline-variant/20">
              <Image
                src={
                  property.city === 'London'
                    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI7cJN-cTp2RMURYfiOpdGvGgxocM3Mdye-zmQEN1FDuiVtxg3USYrnHzAGQVmcygm0wyTKnOfXwrYP0aFJ6oBRE22hmPFhT6e1ild-wAD5rwNzVIaTS2tXEyffpCwB5r8gSym0KWjDYT0kFOE2Fs-71egmYtfF_2M22M7t-aYWw0ysWK1WK14X5-bRQ5CXHzorLTZyLepLIbQpm6qNev_9_QqEVxccg3HMTeFHUm3EgYvmUlywi8MTg'
                    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxVwwbA6fCspSF4hbD43x7bgweG0o5j06K1CeVsclHmYNPHCvbd_ohrjCfNET5fBObpXxGAAQPi-yVuduh9MUKpDOPCH5CYFF3-oSvtHK0s0R50gavceQoQQUNyCt4LDWyxtFJTe_D26bVLNOaqRzKjdyFn2QrBoZ_uAEmJtfOPCusze6lFG3Pyc9YsHUzG10E4vI4J6AChjd_2IeqIm7poQ8-encg3uC2rFVaAOr1g7tlD_i6P0RJcA'
                }
                alt="Map view"
                fill
                className="object-cover grayscale-[10%]"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center">
                  <div className="bg-ns-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 fill-white text-ns-primary" />
                    <span>{property.title}</span>
                  </div>
                  <div className="w-4 h-4 bg-ns-primary rounded-full border-2 border-white shadow-lg ring-4 ring-ns-primary/20" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky booking sidebar */}
        <aside className="col-span-12 lg:col-span-4 lg:sticky lg:top-28">
          <DetailsSidebar property={property} />
        </aside>
      </div>
    </main>
  )
}
