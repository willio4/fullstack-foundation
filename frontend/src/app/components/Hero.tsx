import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 to-blue-400 text-black">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="max-w-3xl">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            The Future of Tech is Here
          </h2>
          <p className="text-xl sm:text-2xl mb-8 text-black/80">
            Discover cutting-edge gadgets and electronics that transform your digital lifestyle
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-gray-900 text-white hover:text-yellow-300 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-black/10 backdrop-blur-sm text-black rounded-full border-2 border-black/30 hover:bg-black/20 transition-colors">
              View Deals
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
}
