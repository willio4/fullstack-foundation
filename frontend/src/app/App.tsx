import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryBanner } from './components/CategoryBanner';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <Hero />
      <CategoryBanner />
      <ProductGrid />
      <Footer />
    </div>
  );
}