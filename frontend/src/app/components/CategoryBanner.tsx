import { Smartphone, Laptop, Headphones, Watch } from 'lucide-react';

const categories = [
  { name: 'Smartphones', icon: Smartphone, gradient: 'from-yellow-400 to-blue-400' },
  { name: 'Laptops', icon: Laptop, gradient: 'from-yellow-400 to-blue-300' },
  { name: 'Audio', icon: Headphones, gradient: 'from-yellow-400 to-blue-400' },
  { name: 'Wearables', icon: Watch, gradient: 'from-yellow-500 to-blue-400' }
];

export function CategoryBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="group relative overflow-hidden bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-semibold text-gray-100">{category.name}</h3>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
