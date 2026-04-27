import { ProductCard } from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Premium Smartphone Collection',
    price: 999,
    image: 'https://images.unsplash.com/photo-1771860886819-1c75b9c0d0cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0cyUyMGVsZWN0cm9uaWNzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc3MzE5MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    gradient: 'from-yellow-400 to-blue-400'
  },
  {
    id: 2,
    name: 'Ultra Series - Latest Generation',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1707485122968-56916bd2c464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0ZWNoJTIwZ2FkZ2V0cyUyMGVsZWN0cm9uaWNzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc3MzE5MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    gradient: 'from-yellow-400 to-blue-300'
  },
  {
    id: 3,
    name: 'Pro Series Dual Camera Phone',
    price: 899,
    image: 'https://images.unsplash.com/photo-1761877945239-4d15febdeddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx0ZWNoJTIwZ2FkZ2V0cyUyMGVsZWN0cm9uaWNzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc3MzE5MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    gradient: 'from-yellow-400 to-blue-400'
  },
  {
    id: 4,
    name: 'Gaming Bundle - Console & Accessories',
    price: 599,
    image: 'https://images.unsplash.com/photo-1761641466573-f240b6e446de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx0ZWNoJTIwZ2FkZ2V0cyUyMGVsZWN0cm9uaWNzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc3MzE5MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    gradient: 'from-yellow-500 to-blue-400'
  },
  {
    id: 5,
    name: 'Ultimate Productivity Bundle',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1760587162690-95608c8ab2da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx0ZWNoJTIwZ2FkZ2V0cyUyMGVsZWN0cm9uaWNzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc3MzE5MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    gradient: 'from-yellow-400 to-blue-400'
  },
  {
    id: 6,
    name: 'Complete Apple Ecosystem',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1759975652551-cf4cdcf52973?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHx0ZWNoJTIwZ2FkZ2V0cyUyMGVsZWN0cm9uaWNzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc3MzE5MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5.0,
    gradient: 'from-yellow-400 to-blue-400'
  },
  {
    id: 7,
    name: 'Flagship Phones - Triple Set',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1771860886801-52d8400be525?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHx0ZWNoJTIwZ2FkZ2V0cyUyMGVsZWN0cm9uaWNzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc3MzE5MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    gradient: 'from-yellow-500 to-blue-500'
  },
  {
    id: 8,
    name: 'MacBook Pro & Accessories Kit',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1760712491539-431d07f3279a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHx0ZWNoJTIwZ2FkZ2V0cyUyMGVsZWN0cm9uaWNzJTIwcHJvZHVjdHN8ZW58MXx8fHwxNzc3MzE5MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    gradient: 'from-yellow-300 to-blue-300'
  }
];

export function ProductGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-950">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
          Featured Products
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our curated collection of premium tech gadgets and electronics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
