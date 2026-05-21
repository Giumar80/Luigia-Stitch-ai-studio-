import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShoppingBag, Leaf, Sparkles, Heart } from 'lucide-react';
import { useAppContext, PRODUCTS } from '../store';

export const ProductView: FC = () => {
  const { activePayload, setView, addToCart } = useAppContext();
  const product = PRODUCTS.find(p => p.id === activePayload) || PRODUCTS[0];
  
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>('ingredienti');

  if (!product) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-32 md:pb-24 min-h-screen max-w-7xl mx-auto px-4 md:px-16">
      
      {/* Breadcrumbs */}
      <div className="py-6 flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest mb-4">
        <button onClick={() => setView('catalog')} className="text-chocolate/50 hover:text-gold transition-colors">Bottega</button>
        <span className="text-outline">•</span>
        <button onClick={() => setView('catalog')} className="text-chocolate/50 hover:text-gold transition-colors">{product.category}</button>
        <span className="text-outline">•</span>
        <span className="text-chocolate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
        
        {/* Image Gallery */}
        <div className="md:col-span-6 lg:col-span-7 relative group">
          <div className="absolute -inset-4 bg-surface-dim rounded-sm opacity-50 -z-10 block hidden md:block"></div>
          <div className="relative rounded-sm overflow-hidden bg-surface-dim aspect-square md:aspect-[4/5] shadow-sm border border-outline/20">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <button className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/90 p-3 rounded-full backdrop-blur-sm text-chocolate hover:text-gold shadow-md transition-colors">
            <Heart size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Product Details */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center py-4">
          <div className="mb-8">
            <div className="flex gap-2 flex-wrap mb-4">
              {product.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center px-4 py-1.5 rounded-full bg-sage/10 text-sage text-[10px] font-bold uppercase tracking-widest border border-sage/20">
                  {i % 2 === 0 ? <Leaf size={12} className="mr-2" /> : <Sparkles size={12} className="mr-2" />}
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-chocolate-deep mb-4 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-gold uppercase text-xs tracking-widest font-bold mb-6">Su Prenotazione • Prodotto Fresco</p>
            
            <div className="w-16 h-px bg-gold mb-8"></div>
            
            <p className="text-lg text-chocolate/80 mb-10 leading-relaxed font-body">
              {product.description}
            </p>
          </div>

          {/* Action Area */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-outline py-2 px-1 rounded-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-chocolate hover:text-gold transition-colors"
                >
                  <span className="text-xl leading-none">-</span>
                </button>
                <span className="w-8 text-center text-lg font-bold text-chocolate">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-chocolate hover:text-gold transition-colors"
                >
                  <span className="text-xl leading-none">+</span>
                </button>
              </div>
              
              <button 
                onClick={() => {
                  addToCart(product, quantity);
                  setView('cart');
                }}
                className="flex-1 py-5 px-6 bg-chocolate-deep text-white text-xs font-bold uppercase tracking-widest hover:bg-chocolate transition-colors shadow-lg flex justify-center items-center gap-3"
              >
                <ShoppingBag size={18} />
                Aggiungi alla Richiesta
              </button>
            </div>
          </div>

          {/* Accordion */}
          <div className="border-t border-outline/30">
            {['Ingredienti & Segreti', 'Consigli di Degustazione', 'Spedizioni'].map((section, idx) => {
              const id = section.toLowerCase();
              const isOpen = openSection === id;
              return (
                <div key={id} className="border-b border-outline/30">
                  <button 
                    onClick={() => setOpenSection(isOpen ? null : id)}
                    className="w-full flex justify-between items-center py-6 group"
                  >
                    <span className="font-display text-2xl text-chocolate">{section}</span>
                    <ChevronDown size={20} className={`text-outline transition-transform duration-300 ${isOpen ? 'rotate-180 text-chocolate' : 'group-hover:text-gold'}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-chocolate/70 leading-relaxed text-sm">
                          {idx === 0 && "Farina di grano tenero tipo 00, burro di centrifuga olandese, zucchero a velo, mandorle tostate intere, uova fresche biologiche sbattute, lievito in polvere. Nessun conservante o colorante aggiunto. Lavorato interamente a mano secondo la ricetta del 1926."}
                          {idx === 1 && "Consigliamo di degustare il prodotto a temperatura ambiente, accompagnato da un ottimo caffè espresso, un tè nero leggero o un vino passito che ne esalti i profumi burrosi e tostati."}
                          {idx === 2 && "Preparato su ordinazione. Spedizione refrigerata in 24/48h dalla produzione in tutto il territorio nazionale per preservarne freschezza e integrità strutturale."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </motion.div>
  );
};
