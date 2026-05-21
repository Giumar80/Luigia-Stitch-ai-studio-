import { FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Heart, CheckCircle, Truck, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useAppContext, PRODUCTS } from '../store';

export const CartView: FC = () => {
  const { cart, updateQuantity, removeFromCart, setView, addToCart } = useAppContext();

  // Basic derived values
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const standardShipping = 5.90;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : standardShipping; // Free shipping over 50
  const total = subtotal + shipping;

  // Cross sells (items not in cart)
  const crossSells = PRODUCTS.filter(p => !cart.some(c => c.product.id === p.id)).slice(0, 2);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-32 md:pb-24 min-h-screen">
      
      <header className="mb-12 text-center px-4">
        <h1 className="font-display text-4xl md:text-5xl text-chocolate mb-4">Il tuo Carrello</h1>
        <p className="text-chocolate/70 max-w-2xl mx-auto text-lg">
          Tutte le nostre creazioni sono preparate artigianalmente al momento dell'ordine per garantirvi la massima freschezza.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-12">
          
          {cart.length === 0 ? (
            <div className="bg-white border border-outline/30 p-12 text-center rounded-sm">
              <ShoppingBag size={48} className="mx-auto text-outline mb-6" strokeWidth={1} />
              <h3 className="font-display text-2xl text-chocolate mb-4">Il tuo carrello è vuoto</h3>
              <button 
                onClick={() => setView('catalog')}
                className="mt-6 border border-chocolate text-chocolate px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-chocolate hover:text-white transition-colors"
              >
                Esplora i dolci
              </button>
            </div>
          ) : (
            <div className="bg-white border border-outline/30 rounded-sm">
              <div className="divide-y divide-outline/20">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div 
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center"
                    >
                      <div className="w-full md:w-32 h-32 flex-shrink-0 bg-surface-dim rounded-sm overflow-hidden border border-outline/10 cursor-pointer" onClick={() => setView('product', item.product.id)}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow w-full">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display text-2xl text-chocolate-deep cursor-pointer hover:text-gold transition-colors" onClick={() => setView('product', item.product.id)}>
                            {item.product.name}
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-outline hover:text-red-700 transition-colors pt-1"
                            title="Rimuovi"
                          >
                            <Trash2 size={20} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-sage mb-4">{item.product.category}</p>
                        
                        <div className="flex justify-between items-end">
                          <div className="flex items-center border border-outline rounded-sm">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 text-chocolate hover:text-gold transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-chocolate-deep">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 text-chocolate hover:text-gold transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-lg text-chocolate">€{(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Cross Sells (Spesso acquistati insieme) */}
          {crossSells.length > 0 && (
            <section className="pt-8">
              <h2 className="font-display text-2xl text-chocolate mb-6 flex items-center gap-3">
                <Sparkles size={24} className="text-gold" />
                Spesso acquistati insieme
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {crossSells.map(product => (
                  <div key={product.id} className="bg-surface-low border border-transparent hover:border-gold/30 p-4 rounded-sm flex gap-4 items-center group transition-all">
                    <div className="w-20 h-20 bg-white rounded-sm overflow-hidden flex-shrink-0 shadow-sm cursor-pointer" onClick={() => setView('product', product.id)}>
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={product.name} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-chocolate mb-1 hover:text-gold cursor-pointer transition-colors" onClick={() => setView('product', product.id)}>
                        {product.name}
                      </h4>
                      <p className="text-xs text-chocolate/70 mb-2">€{product.price.toFixed(2)}</p>
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="text-[10px] uppercase font-bold tracking-widest text-chocolate hover:text-gold transition-colors flex items-center gap-1"
                      >
                        Aggiungi <Plus size={12} strokeWidth={2}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-4">
          <div className="bg-white border border-outline/30 rounded-sm p-8 sticky top-28 shadow-sm">
            <h2 className="font-display text-3xl text-chocolate mb-6 pb-6 border-b border-outline/20">Riepilogo</h2>
            
            <div className="space-y-4 mb-8 text-chocolate/80">
              <div className="flex justify-between">
                <span>Subtotale</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Spedizione (Refrigerata)</span>
                <span>{shipping === 0 ? 'Gratuita' : `€${shipping.toFixed(2)}`}</span>
              </div>
              {shipping === 0 && subtotal > 0 && (
                <div className="text-[10px] tracking-widest uppercase font-bold text-sage">Hai sbloccato la spedizione gratuita!</div>
              )}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-chocolate mb-8">
              <span className="font-display text-2xl text-chocolate">Totale</span>
              <span className="font-display text-3xl text-chocolate-deep font-bold">€{total.toFixed(2)}</span>
            </div>

            <div className="space-y-4 text-center">
              <button 
                disabled={cart.length === 0}
                className="w-full bg-chocolate-deep text-white font-bold text-xs uppercase tracking-widest py-5 rounded-sm hover:bg-chocolate transition-all disabled:opacity-50 disabled:hover:bg-chocolate-deep shadow-lg"
              >
                Procedi Alla Prenotazione
              </button>
              <button 
                onClick={() => setView('catalog')}
                className="w-full bg-transparent border border-outline text-chocolate font-bold text-xs uppercase tracking-widest py-5 rounded-sm hover:border-chocolate-deep transition-all"
              >
                Continua Lo Shopping
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-outline/20 space-y-4">
              <div className="flex items-center gap-3 text-sm text-chocolate/70">
                <CheckCircle size={18} className="text-sage" />
                Prenotazione sicura e veloce
              </div>
              <div className="flex items-center gap-3 text-sm text-chocolate/70">
                <Truck size={18} className="text-sage" />
                Consegna controllata in 24/48h
              </div>
            </div>
          </div>
        </aside>

      </div>
    </motion.div>
  );
};
