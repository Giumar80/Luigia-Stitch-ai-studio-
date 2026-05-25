import { FC, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Heart, CheckCircle, Truck, ShoppingBag, Plus, Minus, Sparkles, Send, MapPin, Calendar, HelpCircle } from 'lucide-react';
import { useAppContext } from '../store';

export const CartView: FC = () => {
  const { cart, updateQuantity, removeFromCart, setView, addToCart, clearCart, products } = useAppContext();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [clientData, setClientData] = useState({
    nome: '',
    telefono: '',
    email: '',
    dataRitiro: '',
    metodo: 'Ritiro', // 'Ritiro' o 'Domicilio'
    note: ''
  });

  // Cross sells (items not in cart)
  const crossSells = products.filter(p => !cart.some(c => c.product.id === p.id)).slice(0, 2);

  const handleSubmitRequest = (e: FormEvent) => {
    e.preventDefault();
    if (!clientData.nome || !clientData.telefono) {
      alert("Inserici almeno il Nome e un contatto Telefono/WhatsApp.");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleFinish = () => {
    clearCart();
    setSubmitted(false);
    setView('home');
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="pt-28 pb-32 md:pb-24 min-h-screen px-4 flex flex-col justify-center items-center text-center text-chocolate bg-cream"
      >
        <div className="max-w-2xl bg-white border border-outline/30 p-12 shadow-2xl rounded-sm flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center text-sage mb-6 animate-bounce">
            <CheckCircle size={44} strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-chocolate-deep mb-4">Preventivo Inviato!</h1>
          <p className="text-base text-chocolate/80 leading-relaxed mb-8 max-w-lg">
            Grazie per la tua richiesta, <span className="font-bold text-chocolate-deep">{clientData.nome}</span>. 
            Il nostro laboratorio a <span className="font-medium text-chocolate-deep">Montecalvo Irpino</span> ha preso in carico la tua prenotazione per le delizie selezionate.
            <br/><br/>
            Ti contatteremo nelle prossime ore via <span className="font-medium text-chocolate-deep">WhatsApp ({clientData.telefono})</span> per fornirti i dettagli di consegna e il preventivo personalizzato.
          </p>

          <div className="border border-outline/20 p-6 bg-surface-low text-left w-full mb-8 text-sm space-y-2">
            <p className="font-bold text-chocolate uppercase text-xs tracking-wider border-b border-outline/10 pb-2 mb-2">Riepilogo della richiesta:</p>
            <p><strong>Cliente:</strong> {clientData.nome}</p>
            <p><strong>Contatto:</strong> {clientData.telefono}</p>
            {clientData.dataRitiro && <p><strong>Data Desiderata:</strong> {clientData.dataRitiro}</p>}
            <p><strong>Modalità:</strong> {clientData.metodo === 'Ritiro' ? 'Ritiro in Pasticceria (Montecalvo Irpino)' : 'Consegna a Domicilio'}</p>
          </div>

          <button 
            onClick={handleFinish}
            className="bg-chocolate text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors shadow-lg"
          >
            Torna alla Bottega
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-32 md:pb-24 min-h-screen">
      
      <header className="mb-12 text-center px-4">
        <h1 className="font-display text-4xl md:text-5xl text-chocolate mb-4">La tua Richiesta</h1>
        <p className="text-chocolate/70 max-w-2xl mx-auto text-lg leading-relaxed">
          Tutte le nostre creazioni sono preparate espressamente su prenotazione, senza magazzino, garantendo la massima fragranza e autenticità.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-12">
          
          {cart.length === 0 ? (
            <div className="bg-white border border-outline/30 p-12 text-center rounded-sm shadow-sm">
              <ShoppingBag size={48} className="mx-auto text-outline mb-6" strokeWidth={1} />
              <h3 className="font-display text-2xl text-chocolate mb-4">La tua lista è vuota</h3>
              <p className="text-chocolate/70 text-sm max-w-md mx-auto leading-relaxed">
                Non hai ancora inserito prodotti nella tua lista di preventivo. Sfoglia il nostro catalogo per raccogliere i dolci artigianali che desideri.
              </p>
              <button 
                onClick={() => setView('catalog')}
                className="mt-8 border border-chocolate text-chocolate px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-chocolate hover:text-white transition-colors"
              >
                Esplora i cataloghi
              </button>
            </div>
          ) : (
            <div className="bg-white border border-outline/30 rounded-sm shadow-sm">
              <div className="p-6 border-b border-outline/20">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold">Prodotti Selezionati ({cart.length})</span>
              </div>
              <div className="divide-y divide-outline/20">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div 
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                    >
                      <div className="w-24 h-24 flex-shrink-0 bg-surface-dim rounded-sm overflow-hidden border border-outline/10 cursor-pointer" onClick={() => setView('product', item.product.id)}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow w-full">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display text-xl text-chocolate-deep cursor-pointer hover:text-gold transition-colors" onClick={() => setView('product', item.product.id)}>
                            {item.product.name}
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-outline hover:text-red-700 transition-colors pt-1"
                            title="Rimuovi"
                          >
                            <Trash2 size={18} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-sage mb-4">{item.product.category}</p>
                        
                        <div className="flex justify-between items-center bg-surface-low p-2 rounded-sm border border-outline/5">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-chocolate/60">Quantità:</span>
                            <div className="flex items-center border border-outline rounded-sm bg-white">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="px-1.5 py-1 text-chocolate hover:text-gold transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-chocolate-deep">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="px-1.5 py-1 text-chocolate hover:text-gold transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-gold tracking-widest">Su Misura</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Cross Sells (Prodotti Consigliati) */}
          {crossSells.length > 0 && (
            <section className="pt-4">
              <h2 className="font-display text-2xl text-chocolate mb-6 flex items-center gap-3">
                <Sparkles size={20} className="text-gold" />
                Specialità consigliate
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {crossSells.map(product => (
                  <div key={product.id} className="bg-surface-low border border-transparent hover:border-gold/30 p-4 rounded-sm flex gap-4 items-center group transition-all shadow-sm">
                    <div className="w-16 h-16 bg-white rounded-sm overflow-hidden flex-shrink-0 shadow-sm cursor-pointer" onClick={() => setView('product', product.id)}>
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={product.name} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-chocolate mb-1 hover:text-gold cursor-pointer text-sm transition-colors" onClick={() => setView('product', product.id)}>
                        {product.name}
                      </h4>
                      <p className="text-[10px] uppercase tracking-wider text-sage font-medium mb-1">{product.category}</p>
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="text-[10px] uppercase font-bold tracking-widest text-chocolate hover:text-gold transition-colors flex items-center gap-1"
                      >
                        Aggiungi <Plus size={10} strokeWidth={2}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
        </div>

        {/* Dynamic Quote Form Sidebar */}
        <aside className="lg:col-span-5">
          <div className="bg-white border border-outline/30 rounded-sm p-6 md:p-8 sticky top-28 shadow-md">
            <h2 className="font-display text-3xl text-chocolate mb-4 pb-4 border-b border-outline/20">Richiesta Preventivo</h2>
            
            <p className="text-xs text-chocolate/70 leading-relaxed mb-6">
              Compila i dettagli di ritiro. Ti risponderemo subito con disponibilità, allergie e importi personalizzati.
            </p>

            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Nome e Cognome *</label>
                <input 
                  type="text" 
                  required
                  disabled={cart.length === 0}
                  value={clientData.nome}
                  onChange={e => setClientData({...clientData, nome: e.target.value})}
                  placeholder="es. Francesca Neri" 
                  className="w-full bg-cream/10 border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Cellulare / WhatsApp *</label>
                <input 
                  type="tel" 
                  required
                  disabled={cart.length === 0}
                  value={clientData.telefono}
                  onChange={e => setClientData({...clientData, telefono: e.target.value})}
                  placeholder="es. 333 9876543" 
                  className="w-full bg-cream/10 border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                    <Calendar size={12} /> Giorno Desiderato
                  </label>
                  <input 
                    type="date" 
                    disabled={cart.length === 0}
                    value={clientData.dataRitiro}
                    onChange={e => setClientData({...clientData, dataRitiro: e.target.value})}
                    className="w-full bg-cream/10 border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Tipo di Servizio</label>
                  <select 
                    disabled={cart.length === 0}
                    value={clientData.metodo}
                    onChange={e => setClientData({...clientData, metodo: e.target.value})}
                    className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm cursor-pointer disabled:opacity-50"
                  >
                    <option value="Ritiro">Ritiro in Pasticceria</option>
                    <option value="Domicilio">Consegna a Domicilio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Note Speciali (es. allergie, candeline...)</label>
                <textarea 
                  disabled={cart.length === 0}
                  value={clientData.note}
                  onChange={e => setClientData({...clientData, note: e.target.value})}
                  placeholder="es. Scrittura dedica, tolleranza glutine..." 
                  rows={2}
                  className="w-full bg-cream/10 border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm resize-none disabled:opacity-50"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={cart.length === 0 || loading}
                  className="w-full bg-chocolate-deep text-white font-bold text-xs uppercase tracking-widest py-5 rounded-sm hover:bg-chocolate transition-all disabled:opacity-50 disabled:hover:bg-chocolate-deep shadow-lg flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                       <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                       </svg>
                       Invio in corso...
                    </span>
                  ) : (
                    <>
                      <Send size={14} />
                      Richiedi Preventivo Libero
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-outline/20 space-y-4">
              <div className="flex items-center gap-3 text-xs text-chocolate/70">
                <MapPin size={16} className="text-sage" />
                Laboratorio Artigianale a Montecalvo Irpino
              </div>
              <div className="flex items-center gap-3 text-xs text-chocolate/70">
                <Truck size={16} className="text-sage" />
                Spedizioni fresche e veloci 24/48h
              </div>
              <div className="flex items-center gap-3 text-xs text-chocolate/70">
                <HelpCircle size={16} className="text-sage" />
                Preventivo gratuito e senza impegno
              </div>
            </div>
          </div>
        </aside>

      </div>
    </motion.div>
  );
};
