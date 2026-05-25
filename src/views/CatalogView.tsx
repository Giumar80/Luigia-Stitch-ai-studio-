import { FC, useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useAppContext, Category } from '../store';

export const CatalogView: FC = () => {
  const { setView, addToCart, setCustomCakeModalOpen, products } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<'Tutti' | Category>('Tutti');

  const filters = ['Tutti', 'Torte', 'Biscotti', 'Eventi', 'Idee Regalo'];

  const filteredProducts = activeFilter === 'Tutti' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 min-h-screen">
      
      {/* Hero Catalog */}
      <section className="max-w-7xl mx-auto px-4 md:px-16 mb-16 text-center">
        <h2 className="font-display text-4xl md:text-5xl text-chocolate mb-6 italic">Dolcezze che raccontano storie</h2>
        <div className="w-24 h-px bg-gold mx-auto mb-8"></div>
        <p className="text-lg text-chocolate/80 max-w-2xl mx-auto leading-relaxed">
          Dalla nostra bottega a casa tua, ricette tramandate per generazioni realizzate esclusivamente con ingredienti freschi e di stagione.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 md:px-16 mb-12">
        <div className="flex flex-wrap justify-center gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-6 py-3 border rounded-full text-[10px] uppercase font-bold tracking-widest transition-all ${
                activeFilter === filter 
                  ? 'bg-chocolate-deep text-white border-chocolate-deep shadow-md' 
                  : 'border-outline text-chocolate hover:border-chocolate'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-16 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-transparent cursor-pointer transition-all duration-500">
              <div 
                className="relative overflow-hidden aspect-square mb-6 bg-surface-dim rounded-sm shadow-sm hover:shadow-xl transition-shadow"
                onClick={() => setView('product', product.id)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.tags[0] && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-sage px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-full shadow-sm">
                    {product.tags[0]}
                  </span>
                )}
                <div className="absolute inset-0 bg-chocolate/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              
              <div className="px-2 flex justify-between items-start mt-2">
                <div onClick={() => setView('product', product.id)} className="flex-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-chocolate/50 mb-2 block">{product.category}</span>
                  <h3 className="font-display text-2xl text-chocolate mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-chocolate">€{product.price.toFixed(2)}</span>
                    <span className="text-chocolate/30">•</span>
                    <span className="text-gold uppercase text-[10px] tracking-widest font-bold">Lotto Artigianale</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToCart(product, 1); }}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-surface hover:bg-chocolate hover:text-white text-chocolate transition-colors shadow-sm ml-4 shrink-0"
                  title="Aggiungi alla richiesta"
                >
                  <Plus size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="max-w-5xl mx-auto px-4 md:px-16 mb-12">
        <div className="bg-surface-dim border border-outline/50 p-8 md:p-16 text-center rounded-sm">
          <h2 className="font-display text-3xl text-chocolate mb-6">Ogni ordine è preparato su misura</h2>
          <p className="text-lg text-chocolate/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Non abbiamo magazzino. I nostri dolci vengono realizzati con ingredienti freschi solo al momento dell'ordine per garantire la massima fragranza.
          </p>
          <button 
            onClick={() => setCustomCakeModalOpen(true)}
            className="bg-chocolate-deep text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-chocolate transition-all hover:scale-[1.01] shadow-lg"
          >
            Richiedi Torta Personalizzata
          </button>
        </div>
      </section>
      
    </motion.div>
  );
};
