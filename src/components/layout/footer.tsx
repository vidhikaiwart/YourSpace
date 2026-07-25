import { Globe, Mail, Share2, Smartphone, Monitor } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full bg-[#1b253b] text-zinc-300 py-16 px-6 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-sans text-2xl font-black text-white block tracking-tight">
              NestSeeker
            </span>
            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
              Simplifying the housing hunt for students and young professionals. Find verified flats, hostels, and PG options across India and the UK.
            </p>
            <div className="flex gap-4">
              <span className="p-2 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer transition-colors text-white">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer transition-colors text-white">
                <Mail className="w-4 h-4" />
              </span>
              <span className="p-2 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer transition-colors text-white">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Nav Links Cols */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="hover:text-ns-secondary-container cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-ns-secondary-container cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-ns-secondary-container cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Support</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="hover:text-ns-secondary-container cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-ns-secondary-container cursor-pointer transition-colors">Contact Support</li>
                <li className="hover:text-ns-secondary-container cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">Apps</h4>
              <div className="flex flex-col gap-2">
                <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors border border-white/5">
                  <Smartphone className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">iOS App</span>
                </div>
                <div className="bg-white/5 p-3 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors border border-white/5">
                  <Monitor className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">Android App</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} NestSeeker. Your Trusted Guide to Home.</p>
          <p>Made with ❤️ for student co-living.</p>
        </div>
      </div>
    </footer>
  )
}
