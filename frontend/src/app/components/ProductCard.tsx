import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  rating: number;
  gradient: string;
}

export function ProductCard({ name, price, image, rating, gradient }: ProductCardProps) {
  return (
    <div className="group relative bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2">
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r`}></div>

      <div className="aspect-square overflow-hidden bg-gray-900">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
            />
          ))}
          <span className="text-sm text-gray-400 ml-2">({rating})</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <span className={`text-2xl font-bold bg-gradient-to-r text-white bg-clip-text`}>
            ${price}
          </span>
          <button className={`p-3 bg-gradient-to-r ${gradient} text-black rounded-full hover:shadow-lg transition-all duration-300 hover:scale-110`}>
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
