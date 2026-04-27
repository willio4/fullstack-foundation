import { ShoppingCart, Search, Menu, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
              <h1 className="text-2xl font-bold">TechHub</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Shop</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Categories</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Deals</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-300" />
            </button>
            <button className="relative p-2 hover:bg-gray-800 rounded-full transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-300" />
              <span className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-blue-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                3
              </span>
            </button>
            <button className="md:hidden p-2 hover:bg-gray-800 rounded-full transition-colors">
              <Menu className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
