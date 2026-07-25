import { create } from 'zustand'

export interface Filters {
  priceRange: number // max price
  gender: 'all' | 'male' | 'female' | 'unisex'
  propertyType: 'all' | 'PG' | 'Hostel' | 'Flat' | 'Co-living'
  verifiedOnly: boolean
}

interface NestSeekerStore {
  wishlist: number[] // property IDs
  toggleWishlist: (id: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filters: Filters
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  resetFilters: () => void
}

const initialFilters: Filters = {
  priceRange: 40000,
  gender: 'all',
  propertyType: 'all',
  verifiedOnly: false,
}

export const useStore = create<NestSeekerStore>((set) => ({
  wishlist: [1, 3], // start with 1 and 3 favorited as in the screenshots
  toggleWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.includes(id)
        ? state.wishlist.filter((wId) => wId !== id)
        : [...state.wishlist, id],
    })),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  filters: initialFilters,
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}))
